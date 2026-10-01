/** @type {import('next').NextConfig} */
// "output: export" gera um site 100% estático (pasta /out).
// Funciona em Vercel, Netlify, Cloudflare Pages e GitHub Pages, sem servidor.
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true }, // a otimização é feita pela CDN (veja lib/media.js)
  transpilePackages: ["three"],
  // GitHub Pages em subpasta? Defina NEXT_PUBLIC_BASE_PATH=/nome-do-repo
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};
export default nextConfig;
