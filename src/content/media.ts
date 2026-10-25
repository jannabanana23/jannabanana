import manifest from "./images.json";

export type Media = { src: string; width: number; height: number; alt: string };

const sizes = manifest as Record<string, { width: number; height: number }>;

// next/image doesn't add basePath to src, so do it here (empty outside Pages)
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Looks up an image produced by `npm run images` (see scripts/extract-images.mjs). */
export function media(name: string, alt: string): Media {
  const path = `/images/${name}.webp`;
  const dims = sizes[path];
  if (!dims) throw new Error(`Missing ${path}. Run \`npm run images\` to extract it from the PDF.`);
  return { src: `${base}${path}`, alt, ...dims };
}
