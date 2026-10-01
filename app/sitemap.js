import site from "@/config/site";
import { getAllProducts } from "@/lib/products";
export const dynamic = "force-static";
export default function sitemap() {
  const base = site.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    ...getAllProducts().map((p) => ({ url: `${base}/produto/${p.slug}/`, changeFrequency: "monthly", priority: 0.8 })),
    { url: `${base}/privacidade/`, priority: 0.2 },
    { url: `${base}/termos/`, priority: 0.2 },
  ];
}
