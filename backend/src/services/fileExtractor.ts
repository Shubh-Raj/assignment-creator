import fs from 'fs';
import path from 'path';

export async function extractTextFromFile(
  filePath: string,
  mimeType: string
): Promise<string> {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.txt') {
    return fs.readFileSync(filePath, 'utf-8');
  }

  if (ext === '.pdf') {
    try {
      // pdf-parse v2 exports a PDFParse class, not a default function
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { PDFParse } = require('pdf-parse') as { PDFParse: new (opts: { data: Buffer }) => { getText(): Promise<{ text: string }> } };
      const buffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      return result.text ?? '';
    } catch (err) {
      console.warn('PDF parsing failed, skipping file context:', err);
      return '';
    }
  }

  // Images (PNG/JPG) — no text extraction without Vision API
  return '';
}
