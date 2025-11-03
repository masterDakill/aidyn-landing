#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const manifestPath = path.join(rootDir, 'public', 'images', 'aidyn', 'manifest.json');
const searchRoots = [path.join(rootDir, 'src'), path.join(rootDir, 'content'), path.join(rootDir, 'README.md')];

const readManifest = async () => {
  try {
    const raw = await fs.readFile(manifestPath, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed.images ?? [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Manifest not found. Run images:opt after images:import.');
      process.exit(1);
    }
    throw error;
  }
};

const gatherFiles = async (entry) => {
  const stats = await fs.stat(entry);
  if (stats.isDirectory()) {
    const children = await fs.readdir(entry);
    const nested = await Promise.all(children.map((child) => gatherFiles(path.join(entry, child))));
    return nested.flat();
  }
  return [entry];
};

const readTargets = async () => {
  const files = await Promise.all(searchRoots.map((entry) => gatherFiles(entry)));
  return files.flat().filter((file) => /\.(tsx?|jsx?|json|md)$/i.test(file));
};

const checkUsage = async () => {
  const manifest = await readManifest();
  const targets = await readTargets();
  const cache = new Map();

  await Promise.all(
    targets.map(async (file) => {
      const content = await fs.readFile(file, 'utf8');
      cache.set(file, content);
    })
  );

  const missing = [];
  for (const entry of manifest) {
    const slug = entry.slug;
    const referenced = Array.from(cache.values()).some(
      (content) => content.includes(`'${slug}'`) || content.includes(`"${slug}"`)
    );
    if (!referenced) {
      missing.push(slug);
    }
  }

  if (missing.length) {
    console.error('The following slugs are not referenced in the codebase:', missing.join(', '));
    process.exit(1);
  }

  console.log('All manifest slugs are referenced.');
};

checkUsage().catch((error) => {
  console.error('Failed to check image usage:', error);
  process.exit(1);
});
