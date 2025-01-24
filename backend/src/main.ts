import { ExcelsService } from "./service/excels.service"
import {AIProcessService} from "./service/ai.service";
import 'dotenv/config';
import { PDFService } from "./service/pdf.service";



(async () => {        
    
    
    const aiProcessService = new AIProcessService(
        "input/audit/XXXXXXX.pdf",
        "input/excel/XXXXXXX.xlsx",
        [
            "output/md/XXXXXXX.md",
        ]
    )

    await aiProcessService.start();
    
    // const pdfService = new PDFService();
    
    // console.log(await pdfService.extractTextWithCoordinates("../input/audit/XXXXXXX.pdf"));
})()