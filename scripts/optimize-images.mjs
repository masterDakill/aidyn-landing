#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'public', 'images', 'aidyn');
const optimizedDir = path.join(sourceDir, 'optimized');
const manifestPath = path.join(sourceDir, 'manifest.json');
const TARGET_WIDTHS = [320, 640, 1280, 1920];

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const listImages = async () => {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => !name.endsWith('.json') && !name.startsWith('.'))
    .filter((name) => /\.(png|jpe?g|webp)$/i.test(name));
};

const buildPlaceholder = async (filePath) => {
  const buffer = await sharp(filePath).resize(16).blur().toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
};

const optimize = async (file) => {
  const inputPath = path.join(sourceDir, file);
  const baseName = path.parse(file).name;
  const variants = {};
  await ensureDir(optimizedDir);

  for (const width of TARGET_WIDTHS) {
    const outputName = `${baseName}-${width}.webp`;
    const outputPath = path.join(optimizedDir, outputName);
    await sharp(inputPath).resize({ width, fit: 'inside' }).webp({ quality: 80 }).toFile(outputPath);
    variants[width] = `/images/aidyn/optimized/${outputName}`;
  }

  const metadata = await sharp(inputPath).metadata();
  const placeholder = await buildPlaceholder(inputPath);

  return {
    slug: baseName,
    original: `/images/aidyn/${file}`,
    width: metadata.width ?? null,
    height: metadata.height ?? null,
    placeholder,
    variants,
  };
};

const run = async () => {
  const images = await listImages();
  if (!images.length) {
    console.warn('No images found in public/images/aidyn. Run images:import first.');
    return;
  }

  const manifestEntries = [];
  for (const file of images) {
    const entry = await optimize(file);
    manifestEntries.push(entry);
    console.log(`Optimized ${file}`);
  }

  await fs.writeFile(manifestPath, JSON.stringify({ generatedAt: new Date().toISOString(), images: manifestEntries }, null, 2));
  console.log(`Manifest updated at ${manifestPath}`);
};

run().catch((error) => {
  console.error('Failed to optimize images:', error);
  process.exit(1);
});
