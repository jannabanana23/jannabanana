import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used by the lightbox so plan linework stays sharp when zoomed
    qualities: [75, 90],
  },
};

export default nextConfig;
