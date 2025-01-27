"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIProcessService = void 0;
const excels_service_1 = require("./excels.service");
const pdf_service_1 = require("./pdf.service");
const openai_1 = __importDefault(require("openai"));
const client_1 = require("@prisma/client");
const config_1 = require("../config");
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY
});
class AIProcessService {
    constructor(auditTemplatePath, excelsTemplatePath, leasesPath) {
        this.prisma = new client_1.PrismaClient();
        this.excelsService = new excels_service_1.ExcelsService();
        this.pdfService = new pdf_service_1.PDFService();
        this.processExcels = [];
        this.auditTemplatePath = auditTemplatePath;
        this.excelsTemplatePath = excelsTemplatePath;
        this.leasesPath = leasesPath;
        this.ID = "XXXXXXX"; //Math.random().toString(36).substring(7);
    }
    async storeResultsExcel(fileId, datasourceExcel) {
        try {
            await this.prisma.result.create({
                data: {
                    fileId,
                    datasourceExcel,
                },
            });
            console.log('Excel results stored successfully');
        }
        catch (error) {
            console.error('Error storing Excel results:', error);
        }
    }
    async storeResume(fileId, docResume) {
        try {
            const updatedResult = await this.prisma.result.update({
                where: { fileId },
                data: {
                    docResume,
                },
            });
            console.log('Audit results updated successfully:', updatedResult);
        }
        catch (error) {
            console.error('Error updating Audit results:', error);
            if (error.code === 'P2025') {
                console.error(`Record with fileId ${fileId} not found.`);
            }
        }
    }
    async storeResultsAudit(fileId, datasourceAudit) {
        try {
            const updatedResult = await this.prisma.result.update({
                where: { fileId },
                data: {
                    datasourceAudit,
                },
            });
            console.log('Audit results updated successfully:', updatedResult);
        }
        catch (error) {
            console.error('Error updating Audit results:', error);
            // Handle case where record does not exist
            if (error.code === 'P2025') {
                console.error(`Record with fileId ${fileId} not found.`);
            }
        }
    }
    async auditScan() {
        await this.pdfService.getPDFContent(this.auditTemplatePath);
    }
    async excelsScan() {
        return await this.excelsService.readFile(this.excelsTemplatePath);
    }
    async callToAgent(prompt) {
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
    async leaseGetExcel(leaseID, index, lease, excelScan) {
        for (let use_case of excelScan) {
            const prompt = use_case.prompt;
            const cases = use_case.cases;
            const message = [
                {
                    role: 'system',
                    content: prompt + config_1.metaPrompt.replaceAll("[format]", this.excelsService.createPromptElement(cases))
                },
                {
                    role: 'user',
                    content: lease
                }
            ];
            // const response = await this.callToAgent(message) as any;
            const response = Object.assign({}, ...cases.map((c) => ({
                [`${c.page}${c.column}${c.index}`]: c.name
            })));
            const sheetValues = Object.keys(response).map(key => ({
                label: key[1],
                index: `${key[1]}${parseInt(key.slice(2)) + index}`,
                page: parseInt(key[0]),
                value: response[key]
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
    async leaseGetAudit(leaseID, index, lease, auditScan) {
        let auditEntriesPDF = [];
        for (let use_case of auditScan) {
            const prompt = use_case.prompt;
            const labels = use_case.labels;
            const message = [
                {
                    role: 'system',
                    content: prompt + config_1.metaPrompt.replaceAll("[format]", this.pdfService.createPromptElement(labels))
                },
                {
                    role: 'user',
                    content: lease
                }
            ];
            // const response = await this.callToAgent(message) as any;
            console.log(this.pdfService.createPromptElement(labels));
            const response = { 'element_1': 'test',
                'element_2': 'test',
                'element_3': 'test',
                'element_4': 'test',
                'element_5': 'test',
                'element_6': 'test',
                'element_7': 'test',
                'element_8': 'test',
                'element_9': 'test',
                'element_10': 'test',
                'element_11': 'test',
                'element_12': 'test',
                'element_13': 'test',
                'element_14': 'test',
                'element_15': 'test',
                'element_16': 'test',
                'element_17': 'test',
                'element_18': 'test',
                'element_19': 'test',
                'element_20': 'test',
                'element_21': 'test',
                'element_22': 'test',
                'element_23': 'test',
                'element_24': 'test',
                'element_25': 'test',
                'element_26': 'test',
                'element_27': 'test',
                'element_28': 'test',
                'element_29': 'test',
                'element_30': 'test',
                'element_31': 'test',
                'element_32': 'test',
                'element_33': 'test',
                'element_34': 'test',
                'element_35': 'test',
                'element_36': 'test',
                'element_37': 'test',
                'element_38': 'test',
                'element_39': 'test',
                'element_40': 'test',
                'element_41': 'test',
                'element_42': 'test',
                'element_43': 'test',
                'element_44': 'test',
                'element_45': 'test',
                'element_46': 'test',
                'element_47': 'test',
                'element_48': 'test',
                'element_49': 'test',
                'element_50': 'test',
                'element_51': 'test',
                'element_52': 'test',
                'element_53': 'test',
                'element_54': 'test',
                'element_55': 'test',
                'element_56': 'test',
                'element_57': 'test',
                'element_58': 'test',
                'element_59': 'test',
                'element_60': 'test',
                'element_61': 'test',
                'element_62': 'test',
                'element_63': 'test',
                'element_64': 'test',
                'element_65': 'test',
                'element_66': 'test',
                'element_67': 'test',
                'element_68': 'test',
                'element_69': 'test',
                'element_70': 'test',
                'element_71': 'test',
                'element_72': 'test',
                'element_73': 'test',
                'element_74': 'test',
                'element_75': 'test',
                'element_76': 'test',
                'element_77': 'test',
                'element_78': 'test',
                'element_79': 'test',
                'element_80': 'test',
                'element_81': 'test',
                'element_82': 'test',
                'element_83': 'test',
                'element_84': 'test',
                'element_85': 'test',
                'element_86': 'test',
                'element_87': 'test',
                'element_88': 'test',
                'element_89': 'test',
                'element_90': 'test',
                'element_91': 'test',
                'element_92': 'test',
                'element_93': 'test',
                'element_94': 'test',
                'element_95': 'test',
                'element_96': 'test',
                'element_97': 'test',
                'element_98': 'test',
                'element_99': 'test',
                'element_100': 'test',
                'element_101': 'test',
                'element_102': 'test',
                'element_103': 'test',
                'element_104': 'test',
                'element_105': 'test',
                'element_106': 'test',
                'element_107': 'test',
                'element_108': 'test',
                'element_109': 'test',
                'element_110': 'test',
                'element_111': 'test',
                'element_112': 'test',
                'element_113': 'test',
                'element_114': 'test',
                'element_115': 'test',
                'element_116': 'test',
                'element_117': 'test',
                'element_118': 'test',
                'element_119': 'test',
                'element_120': 'test',
                'element_121': 'test',
                'element_122': 'test',
                'element_123': 'test',
                'element_124': 'test',
                'element_125': 'test',
                'element_126': 'test',
                'element_127': 'test',
                'element_128': 'test',
                'element_129': 'test',
                'element_130': 'test',
                'element_131': 'test',
                'element_132': 'test',
                'element_133': 'test',
                'element_134': 'test',
                'element_135': 'test',
                'element_136': 'test',
                'element_137': 'test',
                'element_138': 'test',
                'element_139': 'test',
                'element_140': 'test',
                'element_141': 'test',
                'element_142': 'test',
                'element_143': 'test',
                'element_144': 'test',
                'element_145': 'test',
                'element_146': 'test',
                'element_147': 'test',
                'element_148': 'test',
                'element_149': 'test',
                'element_150': 'test',
                'element_151': 'test',
                'element_152': 'test',
                'element_153': 'test',
                'element_154': 'test',
                'element_155': 'test',
                'element_156': 'test',
                'element_157': 'test',
                'element_158': 'test',
                'element_159': 'test',
                'element_160': 'test',
                'element_161': 'test',
                'element_162': 'test' };
            const entries = Object.keys(response).map((key) => {
                const values = response[key];
                const element = labels.find((e) => e.id === key);
                console.log(element);
                return {
                    page: element?.page ?? 0,
                    text: values ?? "Aucune information",
                    x: element?.x ?? 0,
                    y: element?.y ?? 0,
                    color: element?.color ?? "black",
                    fontSize: element?.fontSize ?? 0
                };
            }).flat(Infinity);
            auditEntriesPDF.push(...entries);
            break;
        }
        await this.prisma.lease.update({
            where: { id: leaseID },
            data: {
                datasourceAudit: auditEntriesPDF,
            },
        });
        await this.pdfService.editAndCopy(this.auditTemplatePath, `output/lease_pdf/${leaseID}.pdf`, auditEntriesPDF);
    }
    async scanLease(leaseID, leasePath, excelScan, auditScan) {
        const leasePDFtoMD = await this.pdfService.toMd(leasePath);
        await this.leaseGetAudit(leaseID, (this.leasesPath.indexOf(leasePath) + 1), leasePDFtoMD, auditScan);
        await this.leaseGetExcel(leaseID, (this.leasesPath.indexOf(leasePath) + 1), leasePDFtoMD, excelScan);
    }
    async start() {
        // const auditScan = await this.auditScan();
        // const excelsScan = await this.excelsScan();
        for await (const lease of this.leasesPath) {
            const file = await this.prisma.lease.create({
                data: {
                    processId: this.ID,
                },
            });
            const fileId = file.id;
            const result = await this.scanLease(fileId, lease, config_1.excelCase, config_1.auditCase);
        }
        await this.excelsService.writeExcel(this.processExcels, this.excelsTemplatePath, `output/lease_excel/${this.ID}.xlsx`);
    }
}
exports.AIProcessService = AIProcessService;
