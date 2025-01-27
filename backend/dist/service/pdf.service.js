"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFService = void 0;
const fs = __importStar(require("fs"));
const pdf_lib_1 = require("pdf-lib");
//@ts-ignore
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
class PDFService {
    async toMd(path) {
        const result = fs.readFileSync(path, "utf-8");
        return result;
        try {
            const formData = new form_data_1.default();
            formData.append('file', fs.createReadStream(path), {
                filename: path.split('/').pop(),
                contentType: 'application/octet-stream',
            });
            const response = await axios_1.default.post('http://127.0.0.1:8000/run-process/', formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });
            fs.writeFileSync(`output/md/${path.split('/').pop()?.split(".")[0]}.md`, response.data.markdown_content);
            return response.data.markdown_content;
        }
        catch (error) {
            console.error('Erreur lors de la conversion du fichier :', error);
            throw error;
        }
    }
    async getPDFContent(path) {
        const existingPdfBytes = fs.readFileSync(path);
        if (!existingPdfBytes)
            throw new Error("Error with the file");
        const pdfDoc = await pdf_lib_1.PDFDocument.load(existingPdfBytes);
        const pages = pdfDoc.getPages();
        // return pages.map((page) => ({
        //     page: page,
        //     label: [
        //         {
        //             text: "the variable",
        //             x: 0,
        //             y: 0,
        //         }
        //     ]
        // }));
    }
    createPromptElement(data) {
        return data.map((p) => {
            return `- ${p.id}: ${p.name}`;
        }).flat().join("\n");
    }
    getColor(color) {
        switch (color) {
            case "red":
                return (0, pdf_lib_1.rgb)(1, 0, 0);
            case "blue":
                return (0, pdf_lib_1.rgb)(0, 0, 1);
            case "green":
                return (0, pdf_lib_1.rgb)(0, 1, 0);
            case "black":
                return (0, pdf_lib_1.rgb)(0, 0, 0);
            default:
                return (0, pdf_lib_1.rgb)(0, 0, 0);
        }
    }
    async editAndCopy(inputPath, outputPath, entries) {
        try {
            const pdfjsLib = await import("pdfjs-dist");
            const existingPdfBytes = fs.readFileSync(inputPath);
            const pdfDoc = await pdf_lib_1.PDFDocument.load(existingPdfBytes);
            const font = await pdfDoc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
            for (const entry of entries) {
                let { page, text, x, y, color, fontSize } = entry;
                page++;
                if (page < 0 || page >= pdfDoc.getPageCount()) {
                    console.warn(`Page ${page} n'existe pas. Ignorée.`);
                    continue;
                }
                const pdfPage = pdfDoc.getPages()[page];
                const maxWidth = pdfPage.getWidth() - x - 50;
                const lineHeight = fontSize * 1.2;
                const splitTextIntoLines = (text, maxWidth) => {
                    const words = text.split(' ');
                    const lines = [];
                    let currentLine = words[0];
                    for (let i = 1; i < words.length; i++) {
                        const word = words[i];
                        const testLine = currentLine + ' ' + word;
                        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
                        if (testWidth <= maxWidth) {
                            currentLine = testLine;
                        }
                        else {
                            lines.push(currentLine);
                            currentLine = word;
                        }
                    }
                    lines.push(currentLine);
                    return lines;
                };
                let lines = splitTextIntoLines(text, maxWidth);
                const totalTextHeight = lines.length * lineHeight;
                const startY = y + totalTextHeight - lineHeight;
                let currentY = startY;
                for (const line of lines) {
                    pdfPage.drawText(line, {
                        x: x,
                        y: currentY,
                        size: fontSize,
                        font: font,
                        color: this.getColor(color),
                    });
                    currentY -= lineHeight;
                }
            }
            const modifiedPdfBytes = await pdfDoc.save();
            fs.writeFileSync(outputPath, modifiedPdfBytes);
        }
        catch (err) {
            console.error("Erreur lors de la modification du PDF :", err);
        }
    }
    async extractTextWithCoordinates(inputPath) {
        try {
            const pdfjsLib = await import("pdfjs-dist");
            const data = new Uint8Array(fs.readFileSync(inputPath));
            const pdf = await pdfjsLib.getDocument({ data }).promise;
            const textData = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                for (const item of textContent.items) {
                    if (typeof item.str === 'string' && item.str.trim() !== "") {
                        const transform = item.transform;
                        const y = transform[5];
                        const x = transform[4];
                        const text = item.str;
                        textData.push({ page: i, x: x, y: y, text: text });
                    }
                }
            }
            console.log("Données extraites :", textData);
            return textData;
        }
        catch (err) {
            console.error("Erreur lors de l'extraction des données :", err);
            return [];
        }
    }
}
exports.PDFService = PDFService;
