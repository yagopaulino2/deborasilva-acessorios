import site from "@/config/site";
export const dynamic = "force-static";
export default function robots() {
  return { rules: { userAgent: "*", allow: "/", disallow: "/admin/" }, sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml` };
}
