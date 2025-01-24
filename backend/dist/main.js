"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ai_service_1 = require("./service/ai.service");
require("dotenv/config");
(async () => {
    const aiProcessService = new ai_service_1.AIProcessService("input/audit/XXXXXXX.pdf", "input/excel/XXXXXXX.xlsx", [
        "output/md/XXXXXXX.md",
    ]);
    await aiProcessService.start();
    // const pdfService = new PDFService();
    // console.log(await pdfService.extractTextWithCoordinates("../input/audit/XXXXXXX.pdf"));
})();
