import Koa from 'koa';
import Router from '@koa/router';
import { Context, Next } from 'koa';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import koaBody from 'koa-body';
import { ensureDir } from 'fs-extra';
import fs from 'fs';
import { AIProcessService } from './service/ai.service';

const prisma = new PrismaClient();
const app = new Koa();
const router = new Router();

// Configure koa-body for multipart uploads
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    uploadDir: 'input',
    keepExtensions: true
  }
}));

const uploadDir = {
  audit: 'input/audit',
  excel: 'input/excel',
  leases: 'input/lease'
};

Object.values(uploadDir).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

router.post('/process', async (ctx: Context) => {
  try {
    const { files } = ctx.request;
    const result: Record<string, string | string[]> = {};

    let auditFileName = "";
    let excelFileName = "";
    let leaseFileName = [] as string[];
    
    
    if (files?.auditPdf) {
      const auditFile = files.auditPdf as any;
      if (auditFile.mimetype === 'application/pdf') {
        auditFileName = auditFile.originalFilename;
        const newPath = path.join(uploadDir.audit, `audit-${Date.now()}${path.extname(auditFile.originalFilename)}`);
        fs.renameSync(auditFile.filepath, newPath);
        result.auditPdf = path.basename(newPath);
      }
    }

    // Handle Excel file
    if (files?.excelFile) {
      const excelFile = files.excelFile as any;
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      if (validTypes.includes(excelFile.mimetype)) {
        excelFileName = excelFile.originalFilename;
        const newPath = path.join(uploadDir.excel, `excel-${Date.now()}${path.extname(excelFile.originalFilename)}`);
        fs.renameSync(excelFile.filepath, newPath);
        result.excelFile = path.basename(newPath);
      }
    }

    if (files?.leasesPdfs) {
      const leaseFiles = Array.isArray(files.leasesPdfs) ? files.leasesPdfs : [files.leasesPdfs];
      result.leasesPdfs = (leaseFiles as any[])
        .filter((file: any) => file.mimetype === 'application/pdf')
        .map((file: any) => {
          leaseFileName.push(file.originalFilename);
          const newPath = path.join(uploadDir.leases, `lease-${Date.now()}${path.extname(file.originalFilename)}`);
          fs.renameSync(file.filepath, newPath);
          return path.basename(newPath);
        });
    }
        
    const aiService = new AIProcessService(
      prisma,
      `input/audit/${result.auditPdf}`,
      `input/excel/${result.excelFile}`,
      (result.leasesPdfs as string[]).map((pdf: string) => `input/lease/${pdf}`),
      auditFileName,
      excelFileName,
      leaseFileName
    );    
    
    ctx.body = {
      message: 'Processing workflow successfully',
      files: await aiService.start()
    };
  } catch (error) {
    ctx.status = 500;
    console.log(error)
    ctx.body = { 
      error: 'Upload failed', 
      details: (error as Error).message 
    };
  }
});

router.get('/get_loans_db', async (ctx) => {
  try {
      const leaseNames = await prisma.lease.findMany({
          select: {
              leaseName: true,
              id: true,
          },
      });
      console.log(leaseNames)
      ctx.body = {
          success: true,
          data: leaseNames.map((lease) => ({
            id: lease.id,
            name: lease.leaseName,
          })),
      };
  } catch (error) {
    console.error('Error fetching lease names:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'Failed to fetch lease names',
      error: (error as Error).message,
    };
  }
});

router.get('/get_loan_details_by_name/:name', async (ctx) => {
try {
    const { name } = ctx.params;

    if (!name) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            message: 'Lease name is required',
        };
        return;
    }

    const loans = await prisma.lease.findMany({
        where: {
            leaseName: name,
        },
        orderBy: {
            leaseName: 'asc',
        },
        select: {
            datasourceAudit: true,
            datasourceExcel: true,
        },
    });

    if (loans.length === 0) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            message: 'No loans found with the given name',
        };
        return;
    }

    ctx.body = {
        success: true,
        data: {
            leaseName: name,
            details: loans,
        },
    };
    
} catch (error) {
    console.error('Error fetching loan details by name:', error);
    ctx.status = 500;
    ctx.body = {
        success: false,
        message: 'Failed to fetch loan details by name',
        error: error.message,
    };
}
});

router.delete('/delete_lease/:id', async (ctx) => {
try {
    const { id } = ctx.params;
    if (!id) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            message: 'Lease ID is required',
        };
        return;
    }

    const parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) {
          ctx.status = 400;
          ctx.body = {
              success: false,
              message: 'Invalid Lease ID format',
          };
          return;
      }
    
    const deletedLease = await prisma.lease.delete({
        where: {
            id: parsedId, // Use the parsed integer ID
        },
    });
    ctx.body = {
        success: true,
        message: 'Lease deleted successfully',
        data: deletedLease,
    };
} catch (error) {
    console.error('Error deleting lease:', error);

    if (error.code === 'P2025') {
        ctx.status = 404;
        ctx.body = {
            success: false,
            message: 'Lease not found',
        };
    } else {
        ctx.status = 500;
        ctx.body = {
            success: false,
            message: 'Failed to delete lease',
            error: error.message,
        };
    }
}
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;