import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const assetsDir = path.join(root, 'src', 'assets');

async function findImages(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findImages(fullPath));
      continue;
    }
    if (/\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function decodeBase64Image(input) {
  const text = input.toString('utf8');
  const compact = text.replace(/\s+/g, '');
  if (!/^[A-Za-z0-9+/]+=*$/.test(compact) || compact.length % 4 !== 0) {
    return null;
  }

  const decoded = Buffer.from(compact, 'base64');
  if (decoded.length < 16) {
    return null;
  }

  const header = decoded.slice(0, 12);
  const isJpeg = header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff;
  const isPng = header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47;
  const isWebp = header.toString('ascii', 0, 4) === 'RIFF' && header.toString('ascii', 8, 12) === 'WEBP';
  if (!isJpeg && !isPng && !isWebp) {
    return null;
  }

  return decoded;
}

async function optimizeImage(filePath) {
  const input = await fs.readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();

  const decoded = decodeBase64Image(input);
  const source = decoded ?? input;
  const sourceSize = input.length;
  const wasBase64 = Boolean(decoded);

  try {
    let pipeline = sharp(source);

    if (ext === '.png') {
      pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
    } else {
      pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
    }

    const output = await pipeline.toBuffer();
    const shouldWrite = wasBase64 || output.length < sourceSize;
    if (shouldWrite) {
      await fs.writeFile(filePath, output);
      return { saved: Math.max(sourceSize - output.length, 0), replaced: true, skipped: false, wasBase64 };
    }

    return { saved: 0, replaced: false, skipped: false, wasBase64 };
  } catch (error) {
    return { saved: 0, replaced: false, skipped: true, error };
  }
}

const images = await findImages(assetsDir);
if (images.length === 0) {
  console.log('No images found to optimize.');
  process.exit(0);
}

let totalSaved = 0;
for (const file of images) {
  const { saved, replaced, skipped, wasBase64 } = await optimizeImage(file);
  totalSaved += saved;
  if (skipped) {
    console.log(`Skipped (unsupported): ${path.relative(root, file)}`);
  } else {
    const label = replaced ? (wasBase64 ? 'Decoded+optimized' : 'Optimized') : 'Skipped';
    console.log(`${label}: ${path.relative(root, file)}`);
  }
}

console.log(`Total saved: ${(totalSaved / 1024).toFixed(1)} KB`);
