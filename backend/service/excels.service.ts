import * as XLSX from 'xlsx';

const getKeysForFirstRow = (sheet) => {
    return Object.keys(sheet).filter(key => {
        return key.match(/^[A-Z]+1$/);
    });
};

interface IExcelCategory {
    index: string
    label: string
    sheetName: string
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

    createPromptElement(data: IExcelSheet) {
        if (!data)
            throw new Error("Error with the data")

        const elements = [];

        for (let excel in Object.keys(data)) {
            const sheet = data[excel];
            let element = sheet.map((category) =>
            `- ${category.index}: ${category.value} extraite`
            ).join("\n");

            elements.push(element)
        }

        return elements.join("\n \n");
    }

    async writeExcel(data: IExcelCategory[], path: string, resultPath: string) {
        try {
            const workbook = XLSX.readFile(path);
            if (!workbook) {
                throw new Error("Error with the file");
            }

            for (const item of data) {
                const sheetName = item.sheetName;
                const workSheet = workbook.Sheets[sheetName];

                if (!workSheet) {
                    console.error(`La feuille ${sheetName} n'existe pas.`);
                    continue;
                }

                console.log(`Avant modification: `, workSheet[item.index]);

                XLSX.utils.sheet_add_aoa(workSheet, [[item.value]], {
                    origin: item.index
                });

                console.log(`Cellule ${item.index} dans la feuille ${sheetName} modifiée avec ${item.value}`);
            }

            XLSX.writeFile(workbook, resultPath);
        } catch (error) {
            console.error("Erreur lors de la modification du fichier Excel:", error);
            throw error;
        }
    }
}
