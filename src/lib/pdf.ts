import { PDFDocument, degrees } from "pdf-lib";

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

export function downloadFile(data: Uint8Array, filename: string, type: string) {
  const blob = new Blob([data as unknown as BlobPart], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function splitPdf(file: File): Promise<{ name: string; data: Uint8Array }[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pageCount = pdfDoc.getPageCount();
  const splitFiles = [];

  for (let i = 0; i < pageCount; i++) {
    const newDoc = await PDFDocument.create();
    const [copiedPage] = await newDoc.copyPages(pdfDoc, [i]);
    newDoc.addPage(copiedPage);
    const pdfBytes = await newDoc.save();
    splitFiles.push({
      name: `page_${i + 1}.pdf`,
      data: pdfBytes,
    });
  }

  return splitFiles;
}

export async function rotatePdf(file: File, angleDegrees: number): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const currentRotation = page.getRotation().angle;
    page.setRotation(degrees(currentRotation + angleDegrees));
  }

  return await pdfDoc.save();
}

export async function removePagesFromPdf(file: File, pagesToRemove: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Create a sorted copy of pages to remove in descending order, 
  // so indices don't shift when we remove them.
  const sortedPagesToRemove = [...pagesToRemove].sort((a, b) => b - a);
  
  for (const pageIndex of sortedPagesToRemove) {
    pdfDoc.removePage(pageIndex);
  }

  return await pdfDoc.save();
}

export async function getPdfPageCount(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  return pdfDoc.getPageCount();
}
