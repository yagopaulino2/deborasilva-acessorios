"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

const FAIXAS = [
  { id: "todas", label: "Todas as faixas", min: 0, max: Infinity },
  { id: "a", label: "Até R$ 1.000", min: 0, max: 1000 },
  { id: "b", label: "R$ 1.000 a R$ 3.000", min: 1000, max: 3000 },
  { id: "c", label: "R$ 3.000 a R$ 5.000", min: 3000, max: 5000 },
  { id: "d", label: "Acima de R$ 5.000", min: 5000, max: Infinity },
];

const Select = ({ label, value, onChange, options }) => (
  <label className="flex min-w-[10rem] flex-1 flex-col gap-1.5 text-xs text-champagne-300/70 sm:flex-none">
    {label}
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="border-b border-ouro-500/50 bg-transparent py-2 text-sm text-champagne-100 outline-none transition focus:border-ouro-300">
      {options.map((o) => <option key={o.value} value={o.value} className="bg-vinho-900">{o.label}</option>)}
    </select>
  </label>
);

export default function Gallery({ products }) {
  const [cat, setCat] = useState("Todas");
  const [mat, setMat] = useState("todos");
  const [col, setCol] = useState("todas");
  const [faixa, setFaixa] = useState("todas");

  // Ouve os links do menu (Anéis, Colares...) para aplicar o filtro
  useEffect(() => {
    const aplica = () => {
      try { const c = sessionStorage.getItem("ds-cat"); if (c) { setCat(c); sessionStorage.removeItem("ds-cat"); } } catch {}
    };
    aplica();
    window.addEventListener("ds-cat", aplica);
    return () => window.removeEventListener("ds-cat", aplica);
  }, []);

  const ORDEM = ["Anéis", "Colares", "Brincos", "Pulseiras"];
  const cats = useMemo(() => {
    const todas = [...new Set(products.map((p) => p.categoria).filter(Boolean))];
    return ["Todas", ...todas.sort((a, b) => (ORDEM.indexOf(a) + 1 || 99) - (ORDEM.indexOf(b) + 1 || 99))];
  }, [products]);
  const mats = useMemo(() => [...new Set(products.map((p) => p.material).filter(Boolean))].sort(), [products]);
  const cols = useMemo(() => [...new Set(products.map((p) => p.colecao).filter(Boolean))].sort(), [products]);

  const lista = useMemo(() => {
    const f = FAIXAS.find((x) => x.id === faixa);
    return products.filter((p) =>
      (cat === "Todas" || p.categoria === cat) &&
      (mat === "todos" || p.material === mat) &&
      (col === "todas" || p.colecao === col) &&
      p.preco >= f.min && p.preco < f.max);
  }, [products, cat, mat, col, faixa]);

  const limpar = () => { setCat("Todas"); setMat("todos"); setCol("todas"); setFaixa("todas"); };
  const filtrado = cat !== "Todas" || mat !== "todos" || col !== "todas" || faixa !== "todas";

  return (
    <section id="colecoes" className="relative bg-vinho-950 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="max-w-3xl font-serif text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.02] text-champagne-50">
            Peças para usar, guardar e presentear.
          </h2>
          <p className="mt-5 max-w-xl text-lg font-light text-champagne-300/80">Explore por tipo de joia, material, coleção ou faixa de preço.</p>
        </Reveal>

        <div className="mt-12 border-y border-ouro-500/25 py-6">
          <div className="scroll-fino -mx-6 flex gap-2 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0" role="tablist" aria-label="Categorias">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`shrink-0 border px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] transition duration-300 ${cat === c ? "border-ouro-400 bg-ouro-400 text-vinho-950" : "border-champagne-200/20 text-champagne-200 hover:border-ouro-400 hover:text-ouro-300"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-5">
            <Select label="Material" value={mat} onChange={setMat} options={[{ value: "todos", label: "Todos os materiais" }, ...mats.map((m) => ({ value: m, label: m }))]} />
            <Select label="Coleção" value={col} onChange={setCol} options={[{ value: "todas", label: "Todas as coleções" }, ...cols.map((c) => ({ value: c, label: c }))]} />
            <Select label="Faixa de preço" value={faixa} onChange={setFaixa} options={FAIXAS.map((f) => ({ value: f.id, label: f.label }))} />
            {filtrado && <button onClick={limpar} className="pb-2 text-sm text-ouro-300 underline underline-offset-4">Limpar filtros</button>}
            <p className="ml-auto pb-2 text-sm text-champagne-300/60" aria-live="polite">{lista.length} {lista.length === 1 ? "joia" : "joias"}</p>
          </div>
        </div>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {lista.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
          </AnimatePresence>
        </motion.div>

        {lista.length === 0 && (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl text-champagne-100">Nenhuma joia com esses filtros.</p>
            <button onClick={limpar} className="btn-linha mt-8">Ver todas as joias</button>
          </div>
        )}
      </div>
    </section>
  );
}
