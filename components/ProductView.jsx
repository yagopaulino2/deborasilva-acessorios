"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "./StoreProvider";
import { IconHeart, IconWhats, IconPlay, IconCube, IconRotate, IconImage, IconBag } from "./Icons";
import VideoPlayer from "./VideoPlayer";
import Viewer360 from "./Viewer360";
import ErrorBoundary from "./ErrorBoundary";
import ProductCard from "./ProductCard";
import { brl, parcelas } from "@/lib/format";
import { img } from "@/lib/media";
import { productWhatsappUrl } from "@/lib/whatsapp";

const Viewer3D = dynamic(() => import("./Viewer3D"), { ssr: false, loading: () => <div className="grid h-full place-items-center text-sm text-champagne-300/60">Carregando modelo 3D…</div> });

export default function ProductView({ p, related }) {
  const { favs, toggleFav, addToCart } = useStore();
  const [modo, setModo] = useState("fotos");
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(null);
  const fav = favs.includes(p.slug);

  const abas = [
    { id: "fotos", label: "Fotos", Icon: IconImage },
    p.video && { id: "video", label: "Vídeo", Icon: IconPlay },
    p.imagens360.length > 1 && { id: "360", label: "360°", Icon: IconRotate },
    { id: "3d", label: "3D", Icon: IconCube },
  ].filter(Boolean);

  const disponibilidade = p.estoque <= 0 ? { t: "Sob encomenda", c: "text-champagne-300" } : p.estoque <= 4 ? { t: `Últimas ${p.estoque} peças`, c: "text-ouro-300" } : { t: "Disponível para pronta entrega", c: "text-emerald-300" };
  const specs = [["Material", p.material], ["Medidas", p.tamanho], ["Peso", p.peso], ["Coleção", p.colecao], ["Categoria", p.categoria]].filter(([, v]) => v);

  const moveZoom = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <article className="px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <nav aria-label="Você está em" className="mx-auto mb-8 max-w-[1300px] text-sm text-champagne-300/70">
        <Link href="/" className="hover:text-ouro-300">Início</Link> <span aria-hidden="true">/</span>{" "}
        <Link href="/#colecoes" className="hover:text-ouro-300">Coleção</Link> <span aria-hidden="true">/</span> <span className="text-champagne-100">{p.nome}</span>
      </nav>

      <div className="mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* Mídia */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden bg-vinho-800 outline outline-1 -outline-offset-1 outline-ouro-500/25">
            <AnimatePresence mode="wait">
              <motion.div key={modo + (modo === "fotos" ? i : "")} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                {modo === "fotos" && (
                  <div className="h-full w-full cursor-zoom-in overflow-hidden" onMouseMove={moveZoom} onMouseLeave={() => setZoom(null)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img(p.fotos[i], 1200)} alt={`${p.nome} — foto ${i + 1}`} className="h-full w-full object-cover transition-transform duration-300 ease-out"
                      style={zoom ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined} />
                  </div>
                )}
                {modo === "video" && <VideoPlayer url={p.video} poster={img(p.fotos[0], 900)} />}
                {modo === "360" && <Viewer360 frames={p.imagens360} alt={p.nome} />}
                {modo === "3d" && (
                  <div className="h-full w-full bg-[radial-gradient(circle_at_50%_40%,#651a3d,#1d0510_75%)]">
                    <ErrorBoundary fallback={<div className="grid h-full place-items-center p-8 text-center text-sm text-champagne-300/70">Seu navegador não conseguiu abrir a visualização 3D. As fotos continuam disponíveis.</div>}>
                      <Viewer3D produto={p} />
                    </ErrorBoundary>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center gap-2 overflow-x-auto scroll-fino">
            {abas.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setModo(id)} aria-pressed={modo === id}
                className={`flex shrink-0 items-center gap-2 border px-4 py-2.5 text-[12px] uppercase tracking-[0.18em] transition ${modo === id ? "border-ouro-400 bg-ouro-400 text-vinho-950" : "border-champagne-200/20 text-champagne-200 hover:border-ouro-400"}`}>
                <Icon width={16} height={16} /> {label}
              </button>
            ))}
          </div>
          {p.fotos.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
              {p.fotos.map((f, k) => (
                <button key={f + k} onClick={() => { setI(k); setModo("fotos"); }} aria-label={`Ver foto ${k + 1}`}
                  className={`aspect-square overflow-hidden outline outline-1 -outline-offset-1 transition ${modo === "fotos" && i === k ? "outline-2 outline-ouro-400" : "outline-champagne-200/20 opacity-70 hover:opacity-100"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(f, 240)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informações */}
        <div>
          {p.colecao && <p className="text-sm text-ouro-300">Coleção {p.colecao}</p>}
          <h1 className="mt-2 font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-[1.02] text-champagne-50">{p.nome}</h1>
          <p className="mt-6 font-serif text-4xl text-ouro-300">{brl(p.preco)}</p>
          {parcelas(p.preco) && <p className="mt-1 text-sm text-champagne-300/70">{parcelas(p.preco)}</p>}
          <p className={`mt-4 text-sm ${disponibilidade.c}`}>{disponibilidade.t}</p>

          <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-champagne-200/90">{p.descricao}</p>

          <dl className="mt-10 divide-y divide-champagne-200/10 border-y border-champagne-200/10">
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 py-3.5 text-sm">
                <dt className="text-champagne-300/70">{k}</dt><dd className="text-champagne-100">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={productWhatsappUrl(p.nome)} target="_blank" rel="noopener noreferrer" className="btn-ouro flex-1 sm:flex-none">Comprar</a>
            <a href={productWhatsappUrl(p.nome)} target="_blank" rel="noopener noreferrer" className="btn-linha flex-1 sm:flex-none"><IconWhats width={18} height={18} /> Falar pelo WhatsApp</a>
          </div>
          <div className="mt-3 flex gap-3">
            <button onClick={() => addToCart(p.slug)} className="btn-linha flex-1 !px-4"><IconBag width={18} height={18} /> Adicionar à sacola</button>
            <button onClick={() => toggleFav(p.slug)} aria-pressed={fav} aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              className={`grid h-[52px] w-[52px] place-items-center border transition ${fav ? "border-ouro-400 text-ouro-300" : "border-champagne-200/25 text-champagne-100 hover:border-ouro-400"}`}>
              <IconHeart filled={fav} />
            </button>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-champagne-300/60">Pagamento, entrega e ajuste de medida são combinados diretamente pelo WhatsApp. Acompanha embalagem para presente.</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-28 max-w-[1300px]" aria-labelledby="rel">
          <h2 id="rel" className="font-serif text-4xl font-light text-champagne-50">Você também pode gostar</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, k) => <ProductCard key={r.slug} p={r} index={k} />)}
          </div>
        </section>
      )}
    </article>
  );
}
