import { ExcelsService } from "./excels.service";
import { IEditPDFEntry, IPDFContent, PDFService } from "./pdf.service";
import OpenAI from "openai";
import {
  auditCase,
  metaPrompt,
  AuditCase,
  ExcelCase,
  excelCase,
} from "../config";
import { setFontAndSize } from "pdf-lib";
import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import { userInfo } from "os";
import { promises as fsp } from "fs";

import {
  BedrockRuntimeClient,
  ConverseCommand,
  ConverseCommandInput,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({ 
  region: "us-west-2",
});

export class AIProcessService {
  private prisma: PrismaClient;
  private excelsService: ExcelsService;
  private pdfService: PDFService;

  private auditTemplatePath: string;
  private excelsTemplatePath: string;
  private leasesPath: string[];

  private leaseFileName: string[];

  private ID: string;
  private processExcels: any;

  private leaseOutputPath: string[];
  private excelOutputPath: string;

  constructor(
    database: PrismaClient,
    auditTemplatePath: string,
    excelsTemplatePath: string,
    leasesPath: string[],
    leaseFileName: string[]
  ) {
    this.prisma = database;

    this.excelsService = new ExcelsService();
    this.pdfService = new PDFService();

    this.leaseOutputPath = [];
    this.excelOutputPath = "";

    this.leaseFileName = leaseFileName;

    this.processExcels = [];

    this.auditTemplatePath = auditTemplatePath;
    this.excelsTemplatePath = excelsTemplatePath;
    this.leasesPath = leasesPath;
    this.ID = "12DE3"; //Math.random().toString(36).substring(7);
  }

  private async storeResultsAudit(fileId: string, datasourceAudit: any) {
    try {
      const updatedResult = await this.prisma.result.update({
        where: { fileId },
        data: {
          datasourceAudit,
        },
      });

      console.log("Audit results updated successfully:", updatedResult);
    } catch (error) {
      console.error("Error updating Audit results:", error);

      // Handle case where record does not exist
      if (error.code === "P2025") {
        console.error(`Record with fileId ${fileId} not found.`);
      }
    }
  }

  private async auditScan() {
    await this.pdfService.getPDFContent(this.auditTemplatePath);
  }

  private async excelsScan() {
    return await this.excelsService.readFile(this.excelsTemplatePath);
  }

  private async callToAgent(
    prompt: ConverseCommandInput["messages"]
  ) {
    
    const command = new ConverseCommand({
      modelId: process.env.AWS_MODEL_ID,
      messages: [prompt[1]],
      system: [prompt[0]?.content[0]],
      inferenceConfig: { maximumLength: 50000, maxTokens: 50000, temperature: 0.5, topP: 0.9 },
  });

    const response = await client.send(command);   

    if (!response) throw new Error("Pas de réponse de l'API");
    
    const responseText = response.output?.message?.content?.[0]?.text ?? "No response";


    return responseText;
  }

  private async leaseGetExcel(
    leaseID: number,
    index: number,
    lease: string,
    excelScan: ExcelCase[]
  ) {
    for (let use_case of excelScan) {
      const prompt = use_case.prompt;
      const cases = use_case.cases;

      const message = [
        {
          role: "assistant",
          content:[
            {
              text: `${ 
                prompt +
                metaPrompt.replaceAll(
                  "[format]",
                  this.excelsService.createPromptElement(cases)
                )}`
            }
          ],
        },
        {
          role: "user",
          content: [{
            text: lease,
          }],
        },
      ] as ConverseCommandInput["messages"];

      await this.callToAgent(message);
      let response;
      if (process.env.NODE_ENV === "development")
        response = await fsp.readFile(`cache/excel-${excelScan.indexOf(use_case)}-${this.leaseFileName[index]}.json`, 'utf8');
      else {
        if (fs.existsSync(`cache/excel-${excelScan.indexOf(use_case)}-${this.leaseFileName[index]}.json`)) {
          response = await fsp.readFile(`cache/excel-${excelScan.indexOf(use_case)}-${this.leaseFileName[index]}.json`, 'utf8');
        } else
          response = (await this.callToAgent(message)) as any;
      }


      let outerJson = JSON.parse(response);
      
      if (typeof outerJson === "string") {
        outerJson = JSON.parse(outerJson);
      }

      const sheetValues = Object.keys(outerJson).map((key) => {
        return ({
          label: key[1],
          labelName: cases.find((c: any) => c.column === key[1] && c.index === parseInt(key.slice(2)))?.name,
          index: `${key[1]}${parseInt(key.slice(2)) + index}`,
          page: parseInt(key[0]),
          value:
              !outerJson[key] ||
              outerJson[key].length === 0 ||
              outerJson[key] === "null"
                  ? "Non indiqué"
                  : outerJson[key],
        })
      });
      
      if (!fs.existsSync(`cache/excel-${excelScan.indexOf(use_case)}-${this.leaseFileName[index]}.json`))
        fs.writeFileSync(`cache/excel-${excelScan.indexOf(use_case)}-${this.leaseFileName[index]}.json`, response);

      await this.prisma.lease.update({
        where: { id: leaseID },
        data: {
          datasourceExcel: sheetValues,
        },
      });

      await this.processExcels.push(...sheetValues);
    }
  }

  private async leaseGetAudit(
    leaseID: number,
    index: number,
    lease: string,
    auditScan: AuditCase[]
  ) {
    let auditEntriesPDF = [] as IEditPDFEntry[];

    for (let use_case of auditScan) {
      const prompt = use_case.prompt;
      const labels = use_case.labels;

      const message = [
        {
          role: "assistant",
          content: [
            {
              text: 
              `${prompt +
              metaPrompt.replaceAll(
                "[format]",
                this.pdfService.createPromptElement(labels)
              )}`
            }
          ],
        },
        {
          role: "user",
          content: [
            {
              text: lease,
            }
          ],
        },
      ] as ConverseCommandInput["messages"];

      let response;
      
      if (fs.existsSync(`cache/audit-${auditCase.indexOf(use_case)}-${this.leaseFileName[index]}.json`))
        response = await fsp.readFile(`cache/audit-${auditCase.indexOf(use_case)}-${this.leaseFileName[index]}.json`, 'utf8');
      else
        response = await this.callToAgent(message) as any;
     
      
      console.log(response)

      let outerJson = JSON.parse(response);

      if (typeof outerJson === "string") {
        outerJson = JSON.parse(outerJson);
      }
      const entries = Object.keys(outerJson)
        .map((key) => {
          const values = outerJson[key];

          const element = labels.find((e) => e.id === key);

          return {
            page: element?.page ?? 0,
            text:
              !values || values.length === 0 || values === "null"
                ? "Aucune"
                : values,
            x: element?.x ?? 0,
            y: element?.y ?? 0,
            color: element?.color ?? "black",
            fontSize: element?.fontSize ?? 0,
          };
        })
        .flat(Infinity) as IEditPDFEntry[];

      auditEntriesPDF.push(...entries);
      
          
      if (!fs.existsSync(`cache/audit-${auditCase.indexOf(use_case)}-${this.leaseFileName[index]}.json`))
        fs.writeFileSync(`cache/audit-${auditCase.indexOf(use_case)}-${this.leaseFileName[index]}.json`, response);
    }

    await this.prisma.lease.update({
      where: { id: leaseID },
      data: {
        datasourceAudit: auditEntriesPDF,
      },
    });
    this.leaseOutputPath.push(`output/lease_pdf/${leaseID}.pdf`);
    await this.pdfService.editAndCopy(
      this.auditTemplatePath,
      `output/${leaseID}.pdf`,
      auditEntriesPDF
    );
  }

  private async scanLease(
    leaseID: number,
    leasePath: string,
    excelScan: any,
    auditScan: any
  ) {
    const leasePDFtoMD = await this.pdfService.toMd(leasePath, this.leaseFileName[this.leasesPath.indexOf(leasePath)].split(".")[0]);
    
    await this.prisma.lease.update({
      where: { id: leaseID },
      data: {
        docResume: leasePDFtoMD,
      },
    });

    await this.leaseGetAudit(
      leaseID,
      this.leasesPath.indexOf(leasePath) + 1,
      leasePDFtoMD,
      auditScan
    );
    await this.leaseGetExcel(
      leaseID,
      this.leasesPath.indexOf(leasePath) + 1,
      leasePDFtoMD,
      excelScan
    );
  }

  public async start() {
    const fileIds = [];


    for await (const lease of this.leasesPath) {
      const file = await this.prisma.lease.create({
        data: {
          leaseName: this.leaseFileName[this.leasesPath.indexOf(lease)]
            .split(".")
            .slice(0, -1)
            .join(".") as string,
          processId: this.ID,
          templateAuditPath: this.auditTemplatePath,
          templateExcelPath: this.excelsTemplatePath,
        },
      });

      const fileId = file.id;
      const result = await this.scanLease(fileId, lease, excelCase, auditCase);
      fileIds.push(fileId);
    }

    await this.excelsService.writeExcel(
      this.processExcels,
      this.excelsTemplatePath,
      `output/${this.ID}.xlsx`
    );

    const leases = await this.prisma.lease.findMany({
        where: {
            id: {
                in: fileIds
            },
        },
        select: {
          leaseName: true,
          processId: true,
          templateAuditPath: true,
          templateExcelPath: true,
          createdAt: true,
          id: true,
        },
    })

    return {
      processId: this.ID,
      excel: `http://localhost:3001/output/${this.ID}.xlsx`,
      leases: leases.map((lease) => ({
        id: lease.id,
        name: lease.leaseName,
        date: lease.createdAt,
        auditTemplatePath: `http://localhost:3001/input/audit/${lease.templateAuditPath.split("/").pop()}`,
        excelTemplatePath: `http://localhost:3001/input/excel/${lease.templateExcelPath.split("/").pop()}`,
        excelPath: `http://localhost:3001/output/${lease.processId}.xlsx`,
        leasePath: `http://localhost:3001/output/${lease.id}.pdf`,
      })),
    };
  }
}
