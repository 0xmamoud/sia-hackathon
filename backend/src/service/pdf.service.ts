import * as fs from 'fs';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
//@ts-ignore
import axios from 'axios';
import FormData from 'form-data';
import { Label } from '../config';


interface IPDFLabel {
    name: string,
    x: number,
    y: number,
}

export interface IPDFContent {
    page: number,
    labels: IPDFLabel[]
}

export interface IEditPDFEntry {
    page: number,
    text: string,
    x: number,
    y: number,
    color: "red" | "blue" | "green" | "black",
    fontSize: number
}

export class PDFService {

    async toMd(path: string) {
        const result = fs.readFileSync("input/md/1.md", "utf-8");
        return result;

        try {
            const formData = new FormData();

            formData.append('file', fs.createReadStream(path), {
                filename: path.split('/').pop(),
                contentType: 'application/octet-stream',
            });

            const response = await axios.post('http://127.0.0.1:8000/run-process/', formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });

            fs.writeFileSync(`output/md/${path.split('/').pop()?.split(".")[0]}.md`, response.data.markdown_content);

            return response.data.markdown_content;
        } catch (error) {
            console.error('Erreur lors de la conversion du fichier :', error);
            throw error;
        }
    }
    

    async getPDFContent(path: string) {
        const existingPdfBytes = fs.readFileSync(path);

        if (!existingPdfBytes)
            throw new Error("Error with the file")

        const pdfDoc = await PDFDocument.load(existingPdfBytes);

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

    createPromptElement(data: Label[]) {
        return data.map((p) => {
            return `- ${p.id}: ${p.name}`
        }).flat().join("\n");
    }
    
    getColor(color: "red" | "blue" | "green" | "black") {
        switch (color) {
            case "red":
                return rgb(1, 0, 0);
            case "blue":
                return rgb(0, 0, 1);
            case "green":
                return rgb(0, 1, 0);
            case "black":
                return rgb(0, 0, 0);
            default:
                return rgb(0, 0, 0);
        }
    }
    

    async editAndCopy(inputPath: string, outputPath: string, entries: IEditPDFEntry[]) {
        try {
            const pdfjsLib = await import("pdfjs-dist");
            
            console.log(inputPath)
            
            const existingPdfBytes = fs.readFileSync(inputPath);
    
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
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
                
    
                const splitTextIntoLines = (text: string, maxWidth: number): string[] => {
                    const words = text.split(' ');
                    const lines: string[] = [];
                    let currentLine = words[0];
    
                    for (let i = 1; i < words.length; i++) {
                        const word = words[i];
                        const testLine = currentLine + ' ' + word;
                        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    
                        if (testWidth <= maxWidth) {
                            currentLine = testLine;
                        } else {
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
    
        } catch (err) {
            console.error("Erreur lors de la modification du PDF :", err);
        }
    }


    async extractTextWithCoordinates(inputPath: string) {
        try {
            const pdfjsLib = await import("pdfjs-dist");
            const data = new Uint8Array(fs.readFileSync(inputPath));
            const pdf = await pdfjsLib.getDocument({ data }).promise;

            const textData: { page: number; x: number,  y: number; text: string }[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                for (const item of textContent.items as any) {
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
        } catch (err) {
            console.error("Erreur lors de l'extraction des données :", err);
            return [];
        }
    }
}