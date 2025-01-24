import { ExcelsService } from "./excels.service";
import {IEditPDFEntry, IPDFContent, PDFService} from "./pdf.service";
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import { auditCase, metaPrompt, AuditCase, ExcelCase, excelCase } from "../config";
import { setFontAndSize } from "pdf-lib";
import path from 'path';
import * as fs from 'fs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export class AIProcessService {
    private prisma: PrismaClient;
    private excelsService: ExcelsService;
    private pdfService: PDFService;

    private auditTemplatePath: string;
    private excelsTemplatePath: string;
    private leasesPath: string[];
    private ID: string;
    private processExcels: any;
    
    constructor(auditTemplatePath: string, excelsTemplatePath: string, leasesPath: string[]) {
        this.prisma = new PrismaClient();


        this.excelsService = new ExcelsService();
        this.pdfService = new PDFService();

        this.processExcels = [];

        this.auditTemplatePath = auditTemplatePath;
        this.excelsTemplatePath = excelsTemplatePath;
        this.leasesPath = leasesPath;
        this.ID = "XXXXXXX"//Math.random().toString(36).substring(7);
    }

    private async auditScan() {
        await this.pdfService.getPDFContent(this.auditTemplatePath);
    }

    private async excelsScan() {
        return await this.excelsService.readFile(this.excelsTemplatePath);
    }

    private async callToAgent(prompt: { role: 'system' | 'user', content: string }[]) {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: prompt,
            response_format: { type: 'json_object' },
            temperature: 0.3,
        });

        const response = completion.choices[0]?.message?.content;

        if (!response)
            throw new Error('Pas de réponse de l\'API');

        return response;
    }

    private async leaseGetResume(leaseID: number, index: number, lease: string) {
        const message = [
            {
                role: 'system',
                content: `You are an assistant specialized in analyzing and summarizing lease documents. 
                      Your task is to extract key information and generate a concise and clear summary of the lease. 
                      Focus on the main clauses, obligations, and rights of the parties involved, as well as any important terms, dates, or financial details.`
            },
            {
                role: 'user',
                content: `\n${lease}`
            }
        ] as { role: 'system' | 'user', content: string }[];
        
        // const response = await this.callToAgent(message) as string;

        // if (!response) {
        //     throw new Error('No response from the LLM agent');
        // }

        // await this.prisma.lease.update({
        //     where: { id: leaseID },
        //     data: {
        //         docResume: response,
        //     },
        // });
    }

    private async leaseRaiseAlert(leaseID: number, index: number, lease: string) {
        const message = [
            {
                role: 'system',
                content: `You are an assistant specializing in lease document analysis. 
                  Your task is to analyze the document and output only a valid JSON object where:
                  - Keys represent alert categories (e.g., 'travaux', 'paiement', etc.).
                  - Values are the relevant detected text.

                  Do not include any extra text or commentary. If no alerts are found, return an empty JSON object: {}.`
            },
            {
                role: 'user',
                content: `\n${lease}`
            }
        ] as { role: 'system' | 'user', content: string }[];
        
        const response = await this.callToAgent(message);

        // if (!response) {
        //     throw new Error('No response from the LLM agent');
        // }

        // let alerts: Record<string, string>;
        // try {
        //     alerts = JSON.parse(response);
        // } catch (error) {
        //     throw new Error('The LLM response is not a valid JSON object');
        // }

        // await this.prisma.lease.update({
        //     where: { id: leaseID },
        //     data: {
        //         docAlert: alerts, // Save the detected alerts in the `docAlert` field as JSON
        //     },
        // });
    }



    private async leaseGetExcel(leaseID: number, index: number, lease: string, excelScan: ExcelCase[]) {
        for (let use_case of excelScan) {
            const prompt = use_case.prompt;
            const cases = use_case.cases;
                        
            const message = [
                {
                    role: 'system',
                    content: prompt + metaPrompt.replaceAll("[format]", this.excelsService.createPromptElement(cases))
                },
                {
                    role: 'user',
                    content: lease
                }
            ] as { role: 'system' | 'user', content: string }[];
            

            // const response = await this.callToAgent(message) as any;
            
            const response = Object.assign({}, ...cases.map((c) => ({
                [`${c.page}${c.column}${c.index}`]: c.name
            })))
            
            const sheetValues = Object.keys(response).map(key => ({
                label: key[1],
                index: `${key[1]}${parseInt(key.slice(2)) + index}`,
                page: parseInt(key[0]),
                value: response[key]
            }))
           
            // await this.prisma.lease.update({
            //     where: { id: leaseID },
            //     data: {
            //         datasourceExcel: sheetValues,
            //     },
            // });
      
            await this.processExcels.push(...sheetValues);
        }
    }

    private async leaseGetAudit(leaseID: number, index: number, lease: string, auditScan: AuditCase[]) {
        let auditEntriesPDF = [] as IEditPDFEntry[];
               
        for (let use_case of auditScan) {
            const prompt = use_case.prompt;
            const labels = use_case.labels;
            
            const message = [
                {
                    role: 'system',
                    content: prompt + metaPrompt.replaceAll("[format]", this.pdfService.createPromptElement(labels))
                },
                {
                    role: 'user',
                    content: lease
                }
            ] as { role: 'system' | 'user', content: string }[];
            
            // const response = await this.callToAgent(message) as any;
            
            console.log(this.pdfService.createPromptElement(labels))
            
            const response = {'element_1': 'test_1',
                'element_2': 'test_2',
                'element_3': 'test_3',
                'element_4': 'test_4',
                'element_5': 'test_5',
                'element_6': 'test_6',
                'element_7': 'test_7',
                'element_8': 'test_8',
                'element_9': 'test_9',
                'element_10': 'test_10',
                'element_11': 'test_11',
                'element_12': 'test_12',
                'element_13': 'test_13',
                'element_14': 'test_14',
                'element_15': 'test_15',
                'element_16': 'test_16',
                'element_17': 'test_17',
                'element_18': 'test_18',
                'element_19': 'test_19',
                'element_20': 'test_20',
                'element_21': 'test_21',
                'element_22': 'test_22',
                'element_23': 'test_23',
                'element_24': 'test_24',
                'element_25': 'test_25',
                'element_26': 'test_26',
                'element_27': 'test_27',
                'element_28': 'test_28',
                'element_29': 'test_29',
                'element_30': 'test_30',
                'element_31': 'test_31',
                'element_32': 'test_32',
                'element_33': 'test_33',
                'element_34': 'test_34',
                'element_35': 'test_35',
                'element_36': 'test_36',
                'element_37': 'test_37',
                'element_38': 'test_38',
                'element_39': 'test_39',
                'element_40': 'test_40',
                'element_41': 'test_41',
                'element_42': 'test_42',
                'element_43': 'test_43',
                'element_44': 'test_44',
                'element_45': 'test_45',
                'element_46': 'test_46',
                'element_47': 'test_47',
                'element_48': 'test_48',
                'element_49': 'test_49',
                'element_50': 'test_50',
                'element_51': 'test_51',
                'element_52': 'test_52',
                'element_53': 'test_53',
                'element_54': 'test_54',
                'element_55': 'test_55',
                'element_56': 'test_56',
                'element_57': 'test_57',
                'element_58': 'test_58',
                'element_59': 'test_59',
                'element_60': 'test_60',
                'element_61': 'test_61',
                'element_62': 'test_62',
                'element_63': 'test_63',
                'element_64': 'test_64',
                'element_65': 'test_65',
                'element_66': 'test_66',
                'element_67': 'test_67',
                'element_68': 'test_68',
                'element_69': 'test_69',
                'element_70': 'test_70',
                'element_71': 'test_71',
                'element_72': 'test_72',
                'element_73': 'test_73',
                'element_74': 'test_74',
                'element_75': 'test_75',
                'element_76': 'test_76',
                'element_77': 'test_77',
                'element_78': 'test_78',
                'element_79': 'test_79',
                'element_80': 'test_80',
                'element_81': 'test_81',
                'element_82': 'test_82',
                'element_83': 'test_83',
                'element_84': 'test_84',
                'element_85': 'test_85',
                'element_86': 'test_86',
                'element_87': 'test_87',
                'element_88': 'test_88',
                'element_89': 'test_89',
                'element_90': 'test_90',
                'element_91': 'test_91',
                'element_92': 'test_92',
                'element_93': 'test_93',
                'element_94': 'test_94',
                'element_95': 'test_95',
                'element_96': 'test_96',
                'element_97': 'test_97',
                'element_98': 'test_98',
                'element_99': 'test_99',
                'element_100': 'test_100',
                'element_101': 'test_101',
                'element_102': 'test_102',
                'element_103': 'test_103',
                'element_104': 'test_104',
                'element_105': 'test_105',
                'element_106': 'test_106',
                'element_107': 'test_107',
                'element_108': 'test_108',
                'element_109': 'test_109',
                'element_110': 'test_110',
                'element_111': 'test_111',
                'element_112': 'test_112',
                'element_113': 'test_113',
                'element_114': 'test_114',
                'element_115': 'test_115',
                'element_116': 'test_116',
                'element_117': 'test_117',
                'element_118': 'test_118',
                'element_119': 'test_119',
                'element_120': 'test_120',
                'element_121': 'test_121',
                'element_122': 'test_122',
                'element_123': 'test_123',
                'element_124': 'test_124',
                'element_125': 'test_125',
                'element_126': 'test_126',
                'element_127': 'test_127',
                'element_128': 'test_128',
                'element_129': 'test_129',
                'element_130': 'test_130',
                'element_131': 'test_131',
                'element_132': 'test_132',
                'element_133': 'test_133',
                'element_134': 'test_134',
                'element_135': 'test_135',
                'element_136': 'test_136',
                'element_137': 'test_137',
                'element_138': 'test_138',
                'element_139': 'test_139',
                'element_140': 'test_140',
                'element_141': 'test_141',
                'element_142': 'test_142',
                'element_143': 'test_143',
                'element_144': 'test_144',
                'element_145': 'test_145',
                'element_146': 'test_146',
                'element_147': 'test_147',
                'element_148': 'test_148',
                'element_149': 'test_149',
                'element_150': 'test_150',
                'element_151': 'test_151',
                'element_152': 'test_152',
                'element_153': 'test_153',
                'element_154': 'test_154',
                'element_155': 'test_155',
                'element_156': 'test_156',
                'element_157': 'test_157',
                'element_158': 'test_158',
                'element_159': 'test_159',
                'element_160': 'test_160',
                'element_161': 'test_161',
                'element_162': 'test_162'} as any;
                        
            const entries = Object.keys(response).map((key) => {
                const values = response[key];
                
                const element = labels.find((e) => e.id === key);
                
                console.log(element)
                return {
                    page: element?.page ?? 0,
                    text: values ?? "Aucune information",
                    x: element?.x ?? 0,
                    y: element?.y ?? 0,
                    color: element?.color ?? "black",
                    fontSize: element?.fontSize ?? 0
                }
            }).flat(Infinity) as IEditPDFEntry[];
            
            auditEntriesPDF.push(...entries);
            
        }
        
        // await this.prisma.lease.update({
        //     where: { id: leaseID },
        //     data: {
        //         datasourceAudit: auditEntriesPDF,
        //     },
        // });
                
        await this.pdfService.editAndCopy(this.auditTemplatePath, `output/lease_pdf/${leaseID}.pdf`, auditEntriesPDF);
    }

    private async scanLease(leaseID: number, leasePath: string, excelScan: any, auditScan: any){
        const leasePDFtoMD = await this.pdfService.toMd(leasePath);

        await this.leaseGetAudit(leaseID, (this.leasesPath.indexOf(leasePath) + 1), leasePDFtoMD, auditScan);
        await this.leaseGetExcel(leaseID, (this.leasesPath.indexOf(leasePath) + 1), leasePDFtoMD, excelScan);
    }

    public async start() {
        // const auditScan = await this.auditScan();
        // const excelsScan = await this.excelsScan();

        for await (const lease of this.leasesPath) {
            const leaseName = path.basename(lease, path.extname(lease)); // Extracts 'bail_1'

            // const file = await this.prisma.lease.create({
            //     data: {
                    // lease_name: leaseName,
            //         processId: this.ID,
            //     },
            // });
            
            // const fileId = file.id;
            const result = await this.scanLease(1, lease, excelCase, auditCase);
            
        }

        await this.excelsService.writeExcel(this.processExcels, this.excelsTemplatePath, `output/lease_excel/${this.ID}.xlsx`);
    }
}
