import * as fs from 'fs';

export class PDFService {

    async toMd(path: string) {
        const content = fs.readFileSync(path, 'utf-8');

        return content;
    }
}