"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/** Transição cinematográfica entre o Hero e a coleção: frase em paralaxe sobre fundo vinho com brilho. */
export default function Band() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-22%", "4%"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.55, 0.1]);
  return (
    <section ref={ref} aria-label="Manifesto" className="relative overflow-hidden bg-vinho-900 py-24 md:py-36">
      <motion.div style={{ opacity: reduce ? 0.35 : glow }} className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#c9a24b_0%,transparent_65%)] blur-2xl" aria-hidden="true" />
      <div className="linha-ouro absolute inset-x-0 top-0" />
      <div className="linha-ouro absolute inset-x-0 bottom-0" />
      <motion.p style={{ x: reduce ? 50 : x1 }} className="whitespace-nowrap font-serif text-[clamp(1rem,8vw,8rem)] font-light italic leading-none text-champagne-100/90">
        Cada joia guarda um momento
      </motion.p>
      <motion.p style={{ x: reduce ? 50 : x3 }} className="mt-2 whitespace-nowrap font-serif text-[clamp(1rem,8vw,8rem)] font-light leading-none texto-ouro md:mt-4">
        para ser lembrado para sempre
      </motion.p>
    </section>
  );
}
