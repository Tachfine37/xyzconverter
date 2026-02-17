
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ExtractedPage {
    pageNumber: number;
    text: string;
    items: any[]; // Raw text items for position analysis
}

export async function extractPdfContent(file: File): Promise<ExtractedPage[]> {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    const extractedPages: ExtractedPage[] = [];

    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');

        extractedPages.push({
            pageNumber: i,
            text: pageText,
            items: textContent.items
        });
    }

    return extractedPages;
}
