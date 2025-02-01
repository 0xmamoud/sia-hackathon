import Koa from "koa";
import Router from "@koa/router";
import { Context } from "koa";
import path from "path";
import { PrismaClient } from "@prisma/client";
import koaBody from "koa-body";
import fs from "fs";
import { AIProcessService } from "./service/ai.service";
import serve from "koa-static";
import cors from "@koa/cors";
import {
  BedrockRuntimeClient,
  ConverseCommand,
  ConverseCommandInput,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ 
  region: "us-west-2",
});

const prisma = new PrismaClient();
const app = new Koa();
const router = new Router();

app.use(cors());

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
    console.log(error);
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
  
  if (!leases || leases.length === 0) {
    ctx.body = [];
    return;
  }


  ctx.body = leases.map((lease) => ({
    id: lease.id,
    name: lease.leaseName,
    date: lease.createdAt,
    auditTemplatePath: `http://localhost:3001/input/audit/${lease.templateAuditPath.split("/").pop()}`,
    excelTemplatePath: `http://localhost:3001/input/excel/${lease.templateExcelPath.split("/").pop()}`,
    excelPath: `http://localhost:3001/output/${lease.processId}.xlsx`,
    leasePath: `http://localhost:3001/output/${lease.id}.pdf`,
    synthesise: (lease.datasourceExcel as any)?.slice(0, 5).map((data: any) => ({key: data.labelName, value: data.value})) ?? [],
  }));
});

router.post("/chat/:id", async (ctx: Context) => {
  const { id } = ctx.params;
  const { message } = ctx.request.body;

  const lease = await prisma.lease.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!lease) {
    ctx.status = 404;
    ctx.body = { error: "Lease not found" };
    return;
  }
  

  const command = new ConverseCommand({
        modelId: process.env.AWS_MODEL_ID,
        messages: [{
          role: "user",
          content: [{
            text: lease.docResume,
          }],
        }] as ConverseCommandInput["messages"],
        system: [
          {
            text: `Analyse la question suivante en tant qu'expert en droit des baux et avocat spécialisé. Si la question concerne l'analyse d'un bail, réponds directement à l'utilisateur. Sinon, indique que la demande n'a aucun rapport avec l'analyse de baux: "${message}"`,
          }
        ],
        inferenceConfig: { maxTokens: 8192, temperature: 0.5, topP: 0.9 },
    });
  
  const response = await client.send(command);   
  
  if (!response) throw new Error("Pas de réponse de l'API");
      
  const responseText = response.output?.message?.content?.[0]?.text ?? "No response";
  
  
  ctx.body = {
    response: responseText,
  };
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(publicDir));

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;