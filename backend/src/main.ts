import Koa from 'koa';
import Router from '@koa/router';
import koaBody from 'koa-body';
import {Context, Next} from 'koa';
import path from 'path';
import {AIProcessService} from "./service/ai.service";
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import multer from '@koa/multer';
import { ensureDir } from 'fs-extra';

const prisma = new PrismaClient();

const app = new Koa();
const router = new Router();

function hasbody(req: IncomingMessage | undefined): boolean {
    if (!req || !req.headers) return false;
    return !!(
      req.headers['transfer-encoding'] || 
      (req.headers['content-length'] && 
       parseInt(req.headers['content-length'] as string, 10) > 0)
    );
}
  
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      let uploadPath: string;
      switch (file.fieldname) {
        case 'auditPdf':
          uploadPath = 'uploads/audit';
          break;
        case 'excelFile':
          uploadPath = 'uploads/excel';
          break;
        case 'leasesPdfs':
          uploadPath = 'uploads/leases';
          break;
        default:
          uploadPath = 'uploads';
      }
      
      // Ensure directory exists
      try {
        await ensureDir(uploadPath);
        cb(null, uploadPath);
      } catch (err) {
        cb(err as Error, uploadPath);
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
  });
  
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const validMimeTypes = {
      auditPdf: ['application/pdf'],
      excelFile: [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
        'application/vnd.ms-excel'
      ],
      leasesPdfs: ['application/pdf']
    };
  
    const isValidType = validMimeTypes[file.fieldname as keyof typeof validMimeTypes]?.includes(file.mimetype);
    
    if (isValidType) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
};
  
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB max file size
  }
});

const uploadFiles = upload.fields([
  { name: 'auditPdf', maxCount: 1 },
  { name: 'excelFile', maxCount: 1 },
  { name: 'leasesPdfs', maxCount: 50 }
]);

app.use(koaBody({ multipart: true }));

router.post('/upload', async (ctx: Context, next: Next) => {
    if (!hasbody(ctx.req)) {
        ctx.status = 400;
        ctx.body = { error: 'No request body' };
        return;
      }
  
      try {
        await new Promise((resolve, reject) => {
          uploadFiles(ctx.req, ctx.res, (err) => {
            if (err instanceof multer.MulterError) {
              ctx.status = 400;
              ctx.body = { error: err.message };
              return reject(err);
            } else if (err) {
              ctx.status = 500;
              ctx.body = { error: 'Upload failed' };
              return reject(err);
            }
            resolve(null);
          });
        });
    
        ctx.body = {
          message: 'Files uploaded successfully',
          files: {
            auditPdf: (ctx.req as any).files['auditPdf']?.[0]?.filename ?? null,
            excelFile: (ctx.req as any).files['excelFile']?.[0]?.filename ?? null,
            leasesPdfs: (ctx.req as any).files['leasesPdfs']?.map((file: any) => file.filename) ?? []
          }
        };
      } catch (error) {
        ctx.status = 500;
        ctx.body = { error: (error as Error).message };
      }
});

router.post('/get_loans_db', async (ctx) => {
    try {
        const leaseNames = await prisma.lease.findMany({
            select: {
                leaseName: true, 
            },
        });
        console.log(leaseNames)
        ctx.body = {
            success: true,
            data: leaseNames.map((lease) => lease.leaseName),
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


app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;