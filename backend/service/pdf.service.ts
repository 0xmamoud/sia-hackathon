import * as fs from 'fs';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import axios from 'axios';
import FormData from 'form-data';


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
    y: number
}

export class PDFService {

    async toMd(path: string) {
        //hardcoded section

        //get file with fs

        const result = fs.readFileSync(`output/md/${path.split('/').pop()?.split(".")[0]}.md`)

        return result;

        try {
            // Créer une instance de FormData
            const formData = new FormData();

            // Ajouter le fichier au FormData
            formData.append('file', fs.createReadStream(path), {
                filename: path.split('/').pop(), // Nom du fichier
                contentType: 'application/octet-stream', // Type MIME du fichier
            });

            // Envoyer une requête POST à l'endpoint FastAPI
            const response = await axios.post('http://127.0.0.1:8000/run-process/', formData, {
                headers: {
                    ...formData.getHeaders(), // Ajouter les en-têtes multipart
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

    createPromptElement(data: IPDFContent[]) {
        return data.map((p) => {
            return p.labels.map((label, index) => {
                return `- [${p.page}|${index}]: ${label.name} extraite`
            })
        }).flat().join("\n");
    }

    async editAndCopy(inputPath: string, outputPath: string, entries: IEditPDFEntry[]) {
        try {
            const existingPdfBytes = fs.readFileSync(inputPath);

            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            for (const entry of entries) {
                const { page, text, x, y } = entry;

                if (page < 0 || page >= pdfDoc.getPageCount()) {
                    console.warn(`Page ${page} n'existe pas. Ignorée.`);
                    continue;
                }

                const pdfPage = pdfDoc.getPages()[page];

                let fontSize = 12;
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

                while (lines.length * lineHeight > y && fontSize > 6) {
                    fontSize -= 1;
                    lines = splitTextIntoLines(text, maxWidth);
                }

                const totalTextHeight = lines.length * lineHeight;

                const startY = y + totalTextHeight - lineHeight;

                let currentY = startY;
                for (const line of lines) {
                    pdfPage.drawText(line, {
                        x: x,
                        y: currentY,
                        size: fontSize,
                        font: font,
                        color: rgb(0, 0, 0),
                    });
                    currentY -= lineHeight;
                }
            }

            const modifiedPdfBytes = await pdfDoc.save();
            fs.writeFileSync(outputPath, modifiedPdfBytes);

            console.log(`PDF modifié avec succès : ${outputPath}`);
        } catch (err) {
            console.error("Erreur lors de la modification du PDF :", err);
        }
    }


    async extractTextWithCoordinates(inputPath: string) {
        try {
            const data = new Uint8Array(fs.readFileSync(inputPath));
            const pdf = await pdfjsLib.getDocument({ data }).promise;

            const textData: { page: number; y: number; text: string }[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();

                for (const item of textContent.items as any) {
                    if (typeof item.str === 'string' && item.str.trim() !== "") {
                        const transform = item.transform;
                        const y = transform[5];
                        const text = item.str;
                        textData.push({ page: i, y: y, text: text });
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