import Koa from "koa";
import Router from "@koa/router";
import { Context } from "koa";
import path from "path";
import { PrismaClient } from "@prisma/client";
import koaBody from "koa-body";
import fs from "fs";
import { AIProcessService } from "./service/ai.service";
import serve from "koa-static";
import cors from "@koa/cors"; // Importez le middleware CORS

const prisma = new PrismaClient();
const app = new Koa();
const router = new Router();

// Utilisez le middleware CORS
app.use(cors());

// Configure koa-body for multipart uploads
app.use(
    koaBody({
      multipart: true,
      formidable: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
        uploadDir: "input",
        keepExtensions: true,
      },
    })
);

const publicDir = path.join(__dirname, "..", "output");

const uploadDir = {
  leases: "input/lease",
};

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir.leases)) {
  fs.mkdirSync(uploadDir.leases, { recursive: true });
}

router.post("/upload", async (ctx: Context) => {
  try {
    const { files } = ctx.request;
    const result: Record<string, string[]> = {};

    let leaseFileName = [] as string[];

    if (files?.leasesPdfs) {
      const leaseFiles = Array.isArray(files.leasesPdfs)
          ? files.leasesPdfs
          : [files.leasesPdfs];
      result.leasesPdfs = (leaseFiles as any[])
          .filter((file: any) => file.mimetype === "application/pdf")
          .map((file: any) => {
            leaseFileName.push(file.originalFilename);
            const newPath = path.join(
                uploadDir.leases,
                `lease-${Date.now()}${path.extname(file.originalFilename)}`
            );
            fs.renameSync(file.filepath, newPath);
            return path.basename(newPath);
          });
    }

    const aiService = new AIProcessService(
        prisma,
        `input/audit/audit.pdf`,
        `input/excel/excel.xlsx`,
        (result.leasesPdfs as string[]).map(
            (pdf: string) => `input/lease/${pdf}`
        ),
        leaseFileName
    );

    ctx.body = {
      message: "Processing workflow successfully",
      files: await aiService.start(),
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: "Upload failed",
      details: (error as Error).message,
    };
  }
});

router.get("/output/:name", async (ctx: Context) => {
  const fileName = ctx.params.name;
  const filePath = path.join("output", fileName);

  if (fs.existsSync(filePath)) {
    ctx.type = path.extname(filePath);
    ctx.body = fs.createReadStream(filePath);
  } else {
    ctx.status = 404;
    ctx.body = { error: "File not found" };
  }
});

// Route to serve files from the input directory
router.get("/input/excel/:name", async (ctx: Context) => {
  const fileName = ctx.params.name;
  const filePath = path.join("input/excel", fileName);

  if (fs.existsSync(filePath)) {
    ctx.type = path.extname(filePath);
    ctx.body = fs.createReadStream(filePath);
  } else {
    ctx.status = 404;
    ctx.body = { error: "File not found" };
  }
});

router.get("/input/audit/:name", async (ctx: Context) => {
  const fileName = ctx.params.name;
  const filePath = path.join("input/audit", fileName);

  if (fs.existsSync(filePath)) {
    ctx.type = path.extname(filePath);
    ctx.body = fs.createReadStream(filePath);
  } else {
    ctx.status = 404;
    ctx.body = { error: "File not found" };
  }
});

router.get("/leases", async (ctx: Context) => {
  const leases = await prisma.lease.findMany({
    select: {
      leaseName: true,
      processId: true,
      templateAuditPath: true,
      templateExcelPath: true,
      createdAt: true,
      datasourceExcel: true,
      id: true,
    },
  });

  leases.forEach((lease) => {
    console.log((lease.datasourceExcel as any).slice(0, 5));
  });

  ctx.body = leases.map((lease) => ({
    id: lease.id,
    name: lease.leaseName,
    date: lease.createdAt,
    auditTemplatePath: `http://localhost:3001/input/audit/${lease.templateAuditPath.split("/").pop()}`,
    excelTemplatePath: `http://localhost:3001/input/excel/${lease.templateExcelPath.split("/").pop()}`,
    excelPath: `http://localhost:3001/output/${lease.processId}.xlsx`,
    leasePath: `http://localhost:3001/output/${lease.id}.pdf`,
    synthesise: (lease.datasourceExcel as any).slice(0, 5).map((data: any) => ({key: data.labelName, value: data.value})),
  }));
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(publicDir));

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;