import Hero from "@/components/Hero";
import Band from "@/components/Band";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { getAllProducts } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();
  return (
    <>
      <Hero />
      <Band />
      <Gallery products={products} />
      <About />
      <Contact />
    </>
  );
}
