import { Document, Packer, Paragraph, Table, TableRow, TableCell } from "docx";

async function parseDocx(filePath: string) {
    try {
        const doc = await Document.load(filePath);
        const paragraphs = doc.body.getElementsByType(Paragraph);
        const tables = doc.body.getElementsByType(Table);

        paragraphs.forEach((paragraph, index) => {
            console.log(`Paragraph ${index + 1}:`, paragraph.text);
        });

        tables.forEach((table, index) => {
            console.log(`Table ${index + 1}:`);
            table.rows.forEach((row, rowIndex) => {
                row.cells.forEach((cell, cellIndex) => {
                    console.log(`  Row ${rowIndex + 1}, Cell ${cellIndex + 1}:`, cell.text);
                });
            });
        });
    } catch (error) {
        console.error("Error parsing DOCX:", error);
    }
}

// Utilisation
const filePath = "test.docx";
parseDocx(filePath);