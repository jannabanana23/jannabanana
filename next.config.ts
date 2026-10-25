import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>/. The deploy workflow passes that
// prefix in; locally it is empty so `npm run dev` stays at the root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // static hosting has no image optimizer; the extracted .webp files are
    // already sized for the web
    unoptimized: true,
  },
};

export default nextConfig;
