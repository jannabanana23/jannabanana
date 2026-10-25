import manifest from "./images.json";

export type Media = { src: string; width: number; height: number; alt: string };

const sizes = manifest as Record<string, { width: number; height: number }>;

/** Looks up an image produced by `npm run images` (see scripts/extract-images.mjs). */
export function media(name: string, alt: string): Media {
  const src = `/images/${name}.webp`;
  const dims = sizes[src];
  if (!dims) throw new Error(`Missing ${src}. Run \`npm run images\` to extract it from the PDF.`);
  return { src, alt, ...dims };
}
