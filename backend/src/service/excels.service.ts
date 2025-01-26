import * as XLSX from 'xlsx';
import { Case } from '../config';
import ExcelJS from "exceljs";

const getKeysForFirstRow = (sheet) => {
    return Object.keys(sheet).filter(key => {
        return key.match(/^[A-Z]+1$/);
    });
};

interface IExcelCategory {
    index: string
    label: string
    page: number
    value: string
}

interface IExcelSheet {
    [key: string]: IExcelCategory[]
}


export class ExcelsService {
    async readFile(path: string) {
        const workbook = XLSX.readFile(path);

        if (!workbook)
            throw new Error("Error with the file")

        const result = {}

        for (let sheetName in workbook.Sheets) {
            const workSheet = workbook.Sheets[sheetName];
            
            const firstRow = getKeysForFirstRow(workSheet);

            if (firstRow.length === 0)
                continue;

            result[Object.keys(workbook.Sheets).indexOf(sheetName)] = firstRow.map((key) => ({
                label: key[0],
                index: key,
                sheetName,
                value: workSheet[key].v
            }))
        }

        return result;
    }

    createPromptElement(data: Case[]) {
        if (!data)
            throw new Error("Error with the data")

        const elements = [] as string[];

        let element = data.map((category) =>
            `- ${category.page}${category.column}${category.index}: ${category.name}`
            ).join("\n");

        elements.push(element)

        return elements.join("\n \n");
    }

    async writeExcel(data: IExcelCategory[], path: string, resultPath: string) {
        try {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(path);
    
            for (const item of data) {
                const sheet = workbook.getWorksheet(workbook.worksheets.map(sheet => sheet.name)[item.page]); // Les index des feuilles commencent à 1 dans ExcelJS
                if (!sheet) {
                    console.error(`La feuille d'index ${item.page} n'existe pas.`);
                    continue;
                }
    
                const cell = sheet.getCell(item.index);
    
                cell.value = item.value;
            }
    
            // Enregistrer les modifications dans le fichier de destination
            await workbook.xlsx.writeFile(resultPath);
            console.log(`Fichier Excel modifié enregistré à ${resultPath}`);
        } catch (error) {
            console.error("Erreur lors de la modification du fichier Excel:", error);
            throw error;
        }
    }
}
