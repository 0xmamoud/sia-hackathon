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
exports.ExcelsService = void 0;
const XLSX = __importStar(require("xlsx"));
const exceljs_1 = __importDefault(require("exceljs"));
const getKeysForFirstRow = (sheet) => {
    return Object.keys(sheet).filter(key => {
        return key.match(/^[A-Z]+1$/);
    });
};
class ExcelsService {
    async readFile(path) {
        const workbook = XLSX.readFile(path);
        if (!workbook)
            throw new Error("Error with the file");
        const result = {};
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
            }));
        }
        return result;
    }
    createPromptElement(data) {
        if (!data)
            throw new Error("Error with the data");
        const elements = [];
        let element = data.map((category) => `- ${category.page}${category.column}${category.index}: ${category.name}`).join("\n");
        elements.push(element);
        return elements.join("\n \n");
    }
    async writeExcel(data, path, resultPath) {
        try {
            const workbook = new exceljs_1.default.Workbook();
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
        }
        catch (error) {
            console.error("Erreur lors de la modification du fichier Excel:", error);
            throw error;
        }
    }
}
exports.ExcelsService = ExcelsService;
