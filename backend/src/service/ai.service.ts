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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
    this.ID = "H3RDC0DE"; //Math.random().toString(36).substring(7);
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
    prompt: { role: "system" | "user"; content: string }[]
  ) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: prompt,
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) throw new Error("Pas de réponse de l'API");

    return response;
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
          role: "system",
          content:
            prompt +
            metaPrompt.replaceAll(
              "[format]",
              this.excelsService.createPromptElement(cases)
            ),
        },
        {
          role: "user",
          content: lease,
        },
      ] as { role: "system" | "user"; content: string }[];

      const response = (await this.callToAgent(message)) as any;

      console.log(response);

      // const response = Object.assign({}, ...cases.map((c) => ({
      //     [`${c.page}${c.column}${c.index}`]: c.name
      // })))

      // const response = await fsp.readFile(`trash/excel-${excelScan.indexOf(use_case)}.json`, 'utf8');

      let outerJson = JSON.parse(response);

      if (typeof outerJson === "string") {
        outerJson = JSON.parse(outerJson);
      }

      const sheetValues = Object.keys(outerJson).map((key) => ({
        label: key[1],
        index: `${key[1]}${parseInt(key.slice(2)) + index}`,
        page: parseInt(key[0]),
        value:
          !outerJson[key] ||
          outerJson[key].length === 0 ||
          outerJson[key] === "null"
            ? "Non indiqué"
            : outerJson[key],
      }));

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
          role: "system",
          content:
            prompt +
            metaPrompt.replaceAll(
              "[format]",
              this.pdfService.createPromptElement(labels)
            ),
        },
        {
          role: "user",
          content: lease,
        },
      ] as { role: "system" | "user"; content: string }[];

      const response = (await this.callToAgent(message)) as any;
      // const response = await fsp.readFile(`trash/${index}-${auditScan.indexOf(use_case)}.json`, 'utf8');

      console.log(response);

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

      // fs.writeFile(`${index}-${auditScan.indexOf(use_case)}.json`, JSON.stringify(response, null, 2), (err) => {
      //     if (err) {
      //         console.error('Erreur lors de la création du fichier JSON :', err);
      //     } else {
      //         console.log(`Fichier JSON créé avec succès : ${index}`);
      //     }
      // });

      auditEntriesPDF.push(...entries);
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
    const leasePDFtoMD = await this.pdfService.toMd(leasePath);

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
    }

    await this.excelsService.writeExcel(
      this.processExcels,
      this.excelsTemplatePath,
      `output/${this.ID}.xlsx`
    );

    return {
      processId: this.ID,
      excel: `http://localhost:3001/output/${this.ID}.xlsx`,
      leases: this.leaseOutputPath.map(
        (path) => `http://localhost:3001/output/${path.split("/").pop()}`
      ),
    };
  }
}
