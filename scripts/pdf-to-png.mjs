import fs from "fs";
import path from "path";
import { createCanvas, Image } from "canvas";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

globalThis.Image = Image;
globalThis.ImageData = createCanvas(1, 1).getContext("2d").createImageData(1, 1).constructor;

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    return { canvas, context: canvas.getContext("2d") };
  }
  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }
  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
  }
}

const pdfPath = process.argv[2];
const outPath = process.argv[3];
const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
const page = await doc.getPage(1);
const scale = 1.5;
const viewport = page.getViewport({ scale });
const canvasFactory = new NodeCanvasFactory();
const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);
await page.render({
  canvasContext: canvasAndContext.context,
  viewport,
  canvasFactory,
}).promise;
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, canvasAndContext.canvas.toBuffer("image/png"));
console.log("Wrote", outPath);