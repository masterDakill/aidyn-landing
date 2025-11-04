import manifest from '../../public/images/aidyn/manifest.json';
import { logger } from './logger';

type VariantWidth = '320' | '640' | '1280' | '1920';

export interface ManifestEntry {
  slug: string;
  original: string;
  width: number | null;
  height: number | null;
  placeholder: string;
  variants: Record<string, string>;
}

interface ManifestFile {
  generatedAt: string;
  images: ManifestEntry[];
}

const data = manifest as ManifestFile;

export const getImage = (slug: string): ManifestEntry => {
  const entry = data.images.find((item) => item.slug === slug);
  if (!entry) {
    logger.warn('Missing image slug, falling back to placeholder.', { slug });
    return {
      slug,
      original: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
      width: null,
      height: null,
      placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
      variants: {},
    };
  }
  return entry;
};

export const getSrcSet = (entry: ManifestEntry) =>
  (Object.entries(entry.variants) as [VariantWidth, string][])
    .map(([width, url]) => `${url} ${width}w`)
    .join(', ');
