"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "./StoreProvider";
import { IconClose, IconSearch, IconWhats } from "./Icons";
import { brl } from "@/lib/format";
import { img } from "@/lib/media";
import { whatsappUrl } from "@/lib/whatsapp";

function Drawer({ title, onClose, children, footer }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-[60]" initial="h" animate="v" exit="h">
      <motion.button aria-label="Fechar" onClick={onClose} variants={{ h: { opacity: 0 }, v: { opacity: 1 } }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.aside role="dialog" aria-label={title} aria-modal="true"
        variants={{ h: { x: "100%" }, v: { x: 0 } }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-ouro-500/30 bg-vinho-900">
        <div className="flex items-center justify-between border-b border-champagne-200/10 px-6 py-5">
          <h2 className="font-serif text-2xl font-light text-champagne-100">{title}</h2>
          <button onClick={onClose} aria-label="Fechar" className="grid h-10 w-10 place-items-center text-champagne-100 hover:text-ouro-300"><IconClose /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        {footer}
      </motion.aside>
    </motion.div>
  );
}

function Linha({ p, children }) {
  const { setPanel } = useStore();
  return (
    <li className="flex gap-4 border-b border-champagne-200/10 py-4">
      <Link href={`/produto/${p.slug}/`} onClick={() => setPanel(null)} className="h-24 w-20 shrink-0 overflow-hidden bg-vinho-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img(p.foto, 300)} alt={p.nome} className="h-full w-full object-cover" loading="lazy" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <Link href={`/produto/${p.slug}/`} onClick={() => setPanel(null)} className="font-serif text-lg leading-tight text-champagne-100 hover:text-ouro-300">{p.nome}</Link>
          <p className="text-xs text-champagne-300/70">{p.material}</p>
        </div>
        <div className="flex items-end justify-between gap-2">
          <span className="text-sm text-ouro-300">{brl(p.preco)}</span>
          {children}
        </div>
      </div>
    </li>
  );
}

function Busca() {
  const { products } = useStore();
  const { setPanel } = useStore();
  const [q, setQ] = useState("");
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const res = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return [];
    return products.filter((p) => norm(`${p.nome} ${p.material} ${p.categoria} ${p.colecao}`).includes(t));
  }, [q, products]);
  return (
    <>
      <div className="flex items-center gap-3 border-b border-ouro-500/50 pb-2 text-champagne-100">
        <IconSearch />
        <input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome, material ou coleção"
          className="w-full bg-transparent py-2 text-base outline-none placeholder:text-champagne-300/50" />
      </div>
      <ul className="mt-2">
        {res.map((p) => <Linha key={p.slug} p={p} />)}
      </ul>
      {q && res.length === 0 && <p className="mt-8 text-sm text-champagne-300/70">Nenhuma joia encontrada para “{q}”. Tente outro nome, material ou coleção.</p>}
      {!q && (
        <div className="mt-8 flex flex-wrap gap-2">
          {["Ouro 18k", "Prata 925", "Pérola", "Aurora", "Lunar"].map((s) => (
            <button key={s} onClick={() => setQ(s)} className="border border-champagne-200/20 px-4 py-2 text-sm text-champagne-200 transition hover:border-ouro-400 hover:text-ouro-300">{s}</button>
          ))}
        </div>
      )}
    </>
  );
}

export default function Panels() {
  const { panel, setPanel, products, favs, toggleFav, cart, setQty, addToCart } = useStore();
  const close = () => setPanel(null);
  const bySlug = (s) => products.find((p) => p.slug === s);
  const favItems = favs.map(bySlug).filter(Boolean);
  const cartItems = Object.entries(cart).map(([s, q]) => ({ p: bySlug(s), q })).filter((x) => x.p);
  const total = cartItems.reduce((a, { p, q }) => a + p.preco * q, 0);
  const pedido = () => {
    const linhas = cartItems.map(({ p, q }) => `• ${p.nome} (x${q}) — ${brl(p.preco * q)}`).join("\n");
    return whatsappUrl(`Olá! Tenho interesse nas seguintes joias:\n${linhas}\n\nTotal: ${brl(total)}\nGostaria de saber mais informações.`);
  };

  return (
    <AnimatePresence>
      {panel === "search" && <Drawer key="s" title="Pesquisar" onClose={close}><Busca /></Drawer>}
      {panel === "favs" && (
        <Drawer key="f" title="Favoritos" onClose={close}>
          {favItems.length === 0 ? (
            <p className="mt-6 text-sm leading-relaxed text-champagne-300/80">Você ainda não favoritou nenhuma joia. Toque no coração em qualquer peça para guardá-la aqui.</p>
          ) : (
            <ul>{favItems.map((p) => (
              <Linha key={p.slug} p={p}>
                <span className="flex gap-3 text-xs">
                  <button onClick={() => { addToCart(p.slug); }} className="text-ouro-300 underline underline-offset-4">Adicionar à sacola</button>
                  <button onClick={() => toggleFav(p.slug)} className="text-champagne-300/70 hover:text-champagne-100">Remover</button>
                </span>
              </Linha>
            ))}</ul>
          )}
        </Drawer>
      )}
      {panel === "cart" && (
        <Drawer key="c" title="Sacola" onClose={close}
          footer={cartItems.length > 0 && (
            <div className="border-t border-ouro-500/30 bg-vinho-950/60 px-6 py-5">
              <div className="mb-4 flex items-baseline justify-between"><span className="text-sm text-champagne-300/80">Total</span><span className="font-serif text-2xl text-ouro-300">{brl(total)}</span></div>
              <a href={pedido()} target="_blank" rel="noopener noreferrer" className="btn-ouro w-full"><IconWhats width={18} height={18} /> Finalizar pelo WhatsApp</a>
              <p className="mt-3 text-center text-xs text-champagne-300/60">O pedido é combinado por conversa, com pagamento e entrega acertados diretamente.</p>
            </div>
          )}>
          {cartItems.length === 0 ? (
            <p className="mt-6 text-sm leading-relaxed text-champagne-300/80">Sua sacola está vazia. Escolha uma joia na coleção e toque em “Adicionar à sacola”.</p>
          ) : (
            <ul>{cartItems.map(({ p, q }) => (
              <Linha key={p.slug} p={p}>
                <span className="flex items-center gap-2 text-champagne-100">
                  <button aria-label="Diminuir" onClick={() => setQty(p.slug, q - 1)} className="h-7 w-7 border border-champagne-200/25 hover:border-ouro-400">−</button>
                  <span className="w-5 text-center text-sm">{q}</span>
                  <button aria-label="Aumentar" onClick={() => setQty(p.slug, q + 1)} className="h-7 w-7 border border-champagne-200/25 hover:border-ouro-400">+</button>
                </span>
              </Linha>
            ))}</ul>
          )}
        </Drawer>
      )}
    </AnimatePresence>
  );
}
