import { notFound } from "next/navigation";
import site from "@/config/site";
import ProductView from "@/components/ProductView";
import { getAllProducts, getProduct } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProduct(params.slug);
  if (!p) return {};
  const foto = p.fotos[0]?.startsWith("/") ? `${site.url}${p.fotos[0]}` : p.fotos[0];
  return {
    title: p.nome,
    description: `${p.nome} — ${p.material}. ${p.descricao}`.slice(0, 160),
    alternates: { canonical: `/produto/${p.slug}/` },
    openGraph: { title: `${p.nome} | ${site.name}`, description: p.descricao, images: foto ? [{ url: foto }] : undefined },
  };
}

export default function ProdutoPage({ params }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const todos = getAllProducts().filter((x) => x.slug !== p.slug);
  const related = [...todos.filter((x) => x.categoria === p.categoria), ...todos.filter((x) => x.categoria !== p.categoria && x.colecao === p.colecao)].slice(0, 3);
  const abs = (u) => (u?.startsWith("/") ? `${site.url}${u}` : u);
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.nome, description: p.descricao,
    image: p.fotos.map(abs), material: p.material, category: p.categoria, brand: { "@type": "Brand", name: site.name },
    offers: { "@type": "Offer", priceCurrency: "BRL", price: p.preco, availability: p.estoque > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder", url: `${site.url}/produto/${p.slug}/` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ProductView p={p} related={related} />
    </>
  );
}
