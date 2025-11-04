#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sourceDir = process.env.AIDYN_IMG_SRC;
const targetDir = path.join(rootDir, 'public', 'images', 'aidyn');

if (!sourceDir) {
  console.error('AIDYN_IMG_SRC environment variable is not defined.');
  process.exit(1);
}

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const cleanTarget = async () => {
  try {
    await fs.rm(targetDir, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
  await ensureDir(targetDir);
};

const listFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return listFiles(entryPath);
      }
      return entryPath;
    })
  );
  return files.flat();
};

const uniqueName = (existing, base, ext) => {
  let candidate = `${base}${ext}`;
  let index = 1;
  while (existing.has(candidate)) {
    candidate = `${base}-${index}${ext}`;
    index += 1;
  }
  existing.add(candidate);
  return candidate;
};

const copyImages = async () => {
  const sourceFiles = await listFiles(sourceDir);
  const usedNames = new Set();

  await Promise.all(
    sourceFiles.map(async (file) => {
      const { ext, name } = path.parse(file);
      const lowerExt = ext.toLowerCase();
      if (!['.png', '.jpg', '.jpeg', '.webp'].includes(lowerExt)) {
        return;
      }
      const baseSlug = slugify(name);
      if (!baseSlug) {
        console.warn(`Skipping ${file} because the slug is empty.`);
        return;
      }
      const targetName = uniqueName(usedNames, baseSlug, lowerExt);
      const destination = path.join(targetDir, targetName);
      await ensureDir(path.dirname(destination));
      await fs.copyFile(file, destination);
      console.log(`Copied ${file} -> ${destination}`);
    })
  );
};

const run = async () => {
  await cleanTarget();
  await copyImages();
};

run().catch((error) => {
  console.error('Failed to import images:', error);
  process.exit(1);
});
