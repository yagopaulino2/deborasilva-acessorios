"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "./StoreProvider";
import { IconSearch, IconHeart, IconBag, IconMenu, IconClose } from "./Icons";
import site from "@/config/site";
import { img } from "@/lib/media";

const NAV = [
  { label: "Início", href: "/" },
  { label: "Coleções", href: "/#colecoes", cat: "Todas" },
  { label: "Anéis", href: "/#colecoes", cat: "Anéis" },
  { label: "Colares", href: "/#colecoes", cat: "Colares" },
  { label: "Brincos", href: "/#colecoes", cat: "Brincos" },
  { label: "Pulseiras", href: "/#colecoes", cat: "Pulseiras" },
  { label: "Sobre nós", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { setPanel, favs, cartCount } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const go = (e, item) => {
    setOpen(false);
    if (item.cat) {
      e.preventDefault();
      try { sessionStorage.setItem("ds-cat", item.cat); } catch {}
      if (pathname === "/") {
        window.dispatchEvent(new Event("ds-cat"));
        document.getElementById("colecoes")?.scrollIntoView({ behavior: "smooth" });
      } else router.push("/#colecoes");
    } else if (item.href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const Icones = ({ className = "" }) => (
    <div className={`flex items-center gap-1 ${className}`}>
      <button aria-label="Pesquisar" onClick={() => setPanel("search")} className="grid h-11 w-11 place-items-center text-champagne-100 transition hover:text-ouro-300"><IconSearch /></button>
      <button aria-label="Favoritos" onClick={() => setPanel("favs")} className="relative grid h-11 w-11 place-items-center text-champagne-100 transition hover:text-ouro-300">
        <IconHeart filled={favs.length > 0} />
        {favs.length > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-ouro-400" />}
      </button>
      <button aria-label="Sacola" onClick={() => setPanel("cart")} className="relative grid h-11 w-11 place-items-center text-champagne-100 transition hover:text-ouro-300">
        <IconBag />
        {cartCount > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-ouro-400 px-1 text-[10px] font-semibold text-vinho-950">{cartCount}</span>}
      </button>
    </div>
  );

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "border-b border-ouro-500/25 bg-vinho-900/80 py-1 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl" : "bg-transparent py-3"}`}>
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 md:px-10">
          <Link href="/" aria-label={`${site.name} — início`} className="shrink-0">
            <img src={img("/images/brand/logo-nophone.png")} alt={site.name}
              className={`w-auto transition-all duration-500 ${scrolled ? "h-11" : "h-14 md:h-16"}`} />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 xl:flex">
            {NAV.map((item) => (
              <Link key={item.label} href={item.href} onClick={(e) => go(e, item)}
                className="group relative py-2 text-[12px] font-light uppercase tracking-[0.22em] text-champagne-100/90 transition hover:text-ouro-300">
                {item.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ouro-400 transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <Icones />
            <button aria-label="Abrir menu" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center text-champagne-100 xl:hidden"><IconMenu /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(150% at 92% 4%)" }} exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-vinho-800 to-vinho-950 px-8 py-6">
            <div className="flex items-center justify-between">
              <img src={img("/images/brand/logo-nophone.png")} alt={site.name} className="h-14 w-auto" />
              <button aria-label="Fechar menu" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center text-champagne-100"><IconClose /></button>
            </div>
            <nav className="mt-10 flex flex-1 flex-col justify-center gap-1">
              {NAV.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05 }}>
                  <Link href={item.href} onClick={(e) => go(e, item)} className="block border-b border-champagne-200/10 py-3 font-serif text-3xl font-light text-champagne-100 active:text-ouro-300">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <p className="pb-2 text-center text-xs tracking-[0.2em] text-champagne-300/60">{site.whatsappDisplay}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
