import fs from "fs";
import zlib from "zlib";
import { createCanvas } from "canvas";

const pdfPath = process.argv[2];
const outPath = process.argv[3];
const pdf = fs.readFileSync(pdfPath, "latin1");
const objStart = pdf.indexOf("/Width 1199");
let streamStart = pdf.indexOf("stream", objStart);
const header = pdf.slice(streamStart, streamStart + 12);
streamStart += header.startsWith("stream\r\n") ? 8 : header.startsWith("stream\n") ? 7 : 6;
let streamEnd = pdf.indexOf("~>", streamStart);
if (streamEnd === -1) streamEnd = pdf.indexOf("endstream", streamStart);
let raw = pdf.slice(streamStart, streamEnd);

function isWhiteSpace(ch) {
  return ch === 0x20 || ch === 0x09 || ch === 0x0a || ch === 0x0c || ch === 0x0d || ch === 0x00;
}

function decodeAscii85(bytes) {
  const out = [];
  let pos = 0;
  const getByte = () => (pos < bytes.length ? bytes.charCodeAt(pos++) : -1);
  const input = new Uint8Array(5);
  let c = getByte();
  while (isWhiteSpace(c)) c = getByte();
  while (c !== -1 && c !== 0x7e) {
    if (c === 0x7a) {
      out.push(0, 0, 0, 0);
    } else {
      input[0] = c;
      let i = 1;
      for (; i < 5; i++) {
        c = getByte();
        while (isWhiteSpace(c)) c = getByte();
        input[i] = c;
        if (c === -1 || c === 0x7e) break;
      }
      if (i < 5) {
        input.fill(0x21 + 84, i, 5);
      }
      let t = 0;
      for (let j = 0; j < 5; j++) t = t * 85 + (input[j] - 0x21);
      const count = i < 5 ? i - 1 : 4;
      for (let j = 3; j >= 4 - count; j--) {
        out.push(t & 0xff);
        t >>= 8;
      }
      if (c === -1 || c === 0x7e) break;
    }
    c = getByte();
    while (isWhiteSpace(c)) c = getByte();
  }
  return Buffer.from(out);
}

const decoded = decodeAscii85(raw);
const inflated = zlib.inflateSync(decoded);
const width = 1199;
const height = 1312;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");
const imageData = ctx.createImageData(width, height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const src = (y * width + x) * 3;
    const dst = (y * width + x) * 4;
    imageData.data[dst] = inflated[src];
    imageData.data[dst + 1] = inflated[src + 1];
    imageData.data[dst + 2] = inflated[src + 2];
    imageData.data[dst + 3] = 255;
  }
}
ctx.putImageData(imageData, 0, 0);
fs.mkdirSync(outPath.replace(/[^/\\]+$/, ""), { recursive: true });
fs.writeFileSync(outPath, canvas.toBuffer("image/png"));
console.log("Wrote", outPath, "bytes", inflated.length);