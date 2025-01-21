import { ExcelsService } from "./service/excels.service"
import {AIProcessService} from "./service/ai.service";
// import { Configuration, OpenAIApi } from 'openai'


(async () => {
    // const excelsService = new ExcelsService();
    //
    // const data = await excelsService.readFile("input/excel/XXXXXXX.xlsx");
    //
    // console.log(excelsService.createPromptElement(data));

    const aiProcessService = new AIProcessService(
        "input/audit/XXXXXXX.pdf",
        "input/excel/XXXXXXX.xlsx",
        [
            "input/md/XXXXXXX.md",
            "input/md/XXXXXXX_1.md",
            "input/md/XXXXXXX_2.md",
            "input/md/XXXXXXX_3.md",
        ]
    )

    await aiProcessService.start();
})()