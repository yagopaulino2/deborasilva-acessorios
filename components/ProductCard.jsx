"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "./StoreProvider";
import { IconHeart } from "./Icons";
import { brl } from "@/lib/format";
import { img, srcSet, parseVideo } from "@/lib/media";

export default function ProductCard({ p, index = 0 }) {
  const { favs, toggleFav } = useStore();
  const fav = favs.includes(p.slug);
  const ref = useRef(null);
  const vid = useRef(null);
  const v = parseVideo(p.video);
  const temVideoArquivo = v?.type === "file";

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const el = ref.current;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
  };
  const leave = () => {
    const el = ref.current;
    el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg");
    if (vid.current) { vid.current.pause(); vid.current.currentTime = 0; }
  };
  const enter = () => vid.current?.play().catch(() => {});

  return (
    <motion.article layout initial={{ opacity: 0, y: 40, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.9, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }} className="group" style={{ perspective: 1000 }}>
      <div ref={ref} onMouseMove={move} onMouseLeave={leave} onMouseEnter={enter}
        className="brilho relative aspect-[4/5] overflow-hidden bg-vinho-800 outline outline-1 -outline-offset-1 outline-ouro-500/20 transition-[outline-color,transform] duration-500 group-hover:outline-ouro-400/60"
        style={{ transform: "rotateX(var(--rx,0)) rotateY(var(--ry,0))", transformStyle: "preserve-3d" }}>
        <Link href={`/produto/${p.slug}/`} aria-label={`Ver detalhes de ${p.nome}`} className="absolute inset-0 z-[1]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(p.fotos[0], 800)} srcSet={srcSet(p.fotos[0])} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 92vw" alt={p.nome} loading="lazy" decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
        {p.fotos[1] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img(p.fotos[1], 800)} alt="" loading="lazy" aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />
        )}
        {temVideoArquivo && <video ref={vid} src={v.src} muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />}

        {/* Informações: no computador aparecem ao passar o mouse; no celular ficam sempre visíveis */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] translate-y-3 bg-gradient-to-t from-vinho-950 via-vinho-950/85 to-transparent p-5 pt-20 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:pt-14">
          <h3 className="font-serif text-xl leading-tight text-champagne-50 md:text-2xl">{p.nome}</h3>
          <p className="mt-1 text-sm text-ouro-300">{brl(p.preco)}</p>
          <span className="mt-3 inline-block border-b border-ouro-400 pb-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-champagne-100">Ver detalhes</span>
        </div>

        <button onClick={() => toggleFav(p.slug)} aria-pressed={fav} aria-label={fav ? `Remover ${p.nome} dos favoritos` : `Adicionar ${p.nome} aos favoritos`}
          className={`absolute right-3 top-3 z-[4] grid h-11 w-11 place-items-center rounded-full bg-vinho-950/55 backdrop-blur transition hover:scale-110 hover:bg-vinho-950/80 ${fav ? "text-ouro-300" : "text-champagne-100"}`}>
          <IconHeart filled={fav} width={20} height={20} />
        </button>
        {p.estoque > 0 && p.estoque <= 4 && <span className="absolute left-3 top-3 z-[3] bg-ouro-400 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-vinho-950">Últimas peças</span>}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4 [@media(hover:none)]:hidden">
        <h3 className="font-serif text-lg text-champagne-100">{p.nome}</h3>
        <span className="shrink-0 text-sm text-champagne-300/70">{p.material}</span>
      </div>
    </motion.article>
  );
}
