import "./globals.css";
import site from "@/config/site";
import StoreProvider from "@/components/StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Panels from "@/components/Panels";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getLiteProducts } from "@/lib/products";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: ["joias", "acessórios", "ouro 18k", "prata 925", "anéis", "colares", "brincos", "pulseiras", "Fortaleza", "Debora Silva"],
  openGraph: { type: "website", locale: "pt_BR", siteName: site.name, title: `${site.name} — ${site.tagline}`, description: site.description, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/og.jpg"] },
  alternates: { canonical: "/" },
};
export const viewport = { themeColor: "#4c102d", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  const lite = getLiteProducts();
  const org = {
    "@context": "https://schema.org", "@type": "JewelryStore", name: site.name, url: site.url, telephone: `+${site.whatsapp}`,
    email: site.email, image: `${site.url}/og.jpg`, description: site.description, address: { "@type": "PostalAddress", addressLocality: "Fortaleza", addressRegion: "CE", addressCountry: "BR" },
  };
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </head>
      <body>
        <StoreProvider products={lite}>
          <Header />
          <main>{children}</main>
          <Footer />
          <Panels />
          <WhatsAppFloat />
        </StoreProvider>
      </body>
    </html>
  );
}
