import { ExcelsService } from "./excels.service";
import {PDFService} from "./pdf.service";
import OpenAI from 'openai';

enum Status {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    ERROR = 'ERROR'
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export class AIProcessService {
    private excelsService: ExcelsService;
    private pdfService: PDFService;

    private auditTemplatePath: string;
    private excelsTemplatePath: string;
    private leasesPath: string[];
    private ID: string;
    private status: Status;
    private error: [];
    private processExcels: any;
    
    constructor(auditTemplatePath: string, excelsTemplatePath: string, leasesPath: string[]) {
        this.excelsService = new ExcelsService();
        this.pdfService = new PDFService();

        this.processExcels = [];

        this.auditTemplatePath = auditTemplatePath;
        this.excelsTemplatePath = excelsTemplatePath;
        this.leasesPath = leasesPath;
        this.ID = "XXXXXXX"//Math.random().toString(36).substring(7);
    }

    private async auditScan() {
        //hardcoded
        return [
            "Adresse_du_bien",
            "Nom_du_locataire",
            "Nom_du_bailleur",
            "Date_de_début",
            "Date_de_fin",
            "Durée",
            "Loyer_mensuel",
            "Charges_mensuelles",
            "Garantie",
            "Restrictions_d_usage",
            "Modalités_de_renouvellement",
            "Conditions_de_résiliation"
        ];
    }

    private async excelsScan() {
        return await this.excelsService.readFile(this.excelsTemplatePath);
    }

    private async callToAgent(prompt: { role: 'system' | 'user', content: string }[]) {
        // const completion = await openai.chat.completions.create({
        //     model: 'gpt-4o-mini',
        //     messages: prompt,
        //     response_format: { type: 'json_object' },
        //     temperature: 0.3,
        // });
        //
        // const response = completion.choices[0]?.message?.content;

        //hardcoded
        const response = {
            "A1": "172 re Raimon de Trencavel Le Clos des Muses CS 40066 34075 MONTPELLIER CEDEX 3",
            "B1": "Laélé",
            "C1": "EL, société immatriculée au RCS de Montpellier sous le numéro 535 302 525",
            "D1": "01/10/2016",
            "E1": "30/06/2025"
        }

        if (!response) {
            throw new Error('Pas de réponse de l\'API');
        }

        return response;
    }

    private async leaseGetExcels(index: number, lease: string, excelsScan: any) {
        const message = [
            {
                role: 'system',
                content: "Vous êtes un expert en analyse de bail commercial spécialisé dans l'analyse de documents. Extrayez les informations demandées et répondez UNIQUEMENT avec un JSON valide dans le format spécifié Analysez le document fourni et extrayez les informations clés du bail commercial.\n" +
                    "\n" +
                    "FORMAT DE RÉPONSE REQUIS :\n" +
                    this.excelsService.createPromptElement(excelsScan) +
                    "\n" +
                    "RÈGLES D'EXTRACTION :\n" +
                    "- Si l'information est absente : utiliser null\n" +
                    "- Pour les dates : format JJ/MM/AAAA\n" +
                    "- Pour les adresses : inclure numéro, rue, code postal, ville\n" +
                    "- Pour les noms : inclure la forme juridique si présente\n" +
                    "\n" +
                    "INSTRUCTIONS SUPPLÉMENTAIRES :\n" +
                    "- Ne fournir que le JSON en réponse\n" +
                    "- Aucun texte explicatif\n" +
                    "- Conserver la structure exacte des clés (A1, B1, C1, D1, E1)\n" +
                    "- Assurer la validité du JSON."
            },
            {
                role: 'user',
                content: lease
            }
        ] as { role: 'system' | 'user', content: string }[];

        const response = await this.callToAgent(message) as any;

        const sheetValues = Object.keys(response).map(key => ({
            label: key[0],
            index: `${key[0]}${parseInt(key.slice(1)) + index}`,
            sheetName: "Sheet1",
            value: response[key]
        }))

        this.processExcels.push();
    }

    private async scanLease(leasePath: string, auditScan: string[], excelsScan: any){
        const leasePDFtoMD = await this.pdfService.toMd(leasePath);

        await this.leaseGetExcels((this.leasesPath.indexOf(leasePath) + 1), leasePDFtoMD, excelsScan);
        //ici await pour l'audit du pdf
    }

    public async start() {
        const auditScan = await this.auditScan();
        const excelsScan = await this.excelsScan();

        for await (const lease of this.leasesPath) {
            const result = await this.scanLease(lease, auditScan, excelsScan);
        }

        await this.excelsService.writeExcel(this.processExcels, this.excelsTemplatePath, `output/lease_excel/${this.ID}.xlsx`);

        console.log(this.processExcels);
    }
}

// {
//     "0": [
//     {
//         label: "A",
//         index: "A1",
//         sheetName: "Sheet1",
//         value: "Adresse_du_bien",
//     }, {
//         label: "B",
//         index: "B1",
//         sheetName: "Sheet1",
//         value: "Nom_du_locataire",
//     }, {
//         label: "C",
//         index: "C1",
//         sheetName: "Sheet1",
//         value: "Nom_du_bailleur",
//     }, {
//         label: "D",
//         index: "D1",
//         sheetName: "Sheet1",
//         value: "Date_de_début",
//     }, {
//         label: "E",
//         index: "E1",
//         sheetName: "Sheet1",
//         value: "Date_de_fin",
//     }
// ],
// }
