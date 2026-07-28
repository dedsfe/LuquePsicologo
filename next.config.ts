import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    // AVIF só: 130KB contra 596KB do WebP na mesma imagem em q=100 — chapa a
    // grama. Sem AVIF na lista, o Next serve WebP e o detalhe fino sobrevive.
    formats: ["image/webp"],
  },
};

export default nextConfig;
