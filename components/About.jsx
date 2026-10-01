"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import site from "@/config/site";
import { img } from "@/lib/media";
import Reveal from "./Reveal";

export default function About() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yCard = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const a = site.about;
  return (
    <section id="sobre" ref={ref} className="relative overflow-hidden bg-champagne-100 px-6 py-24 text-vinho-900 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1300px] items-center gap-14 md:grid-cols-[1fr_1.1fr] md:gap-24">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-vinho-700">
            <motion.div style={{ y: reduce ? 0 : yImg }} className="absolute -inset-[10%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img(a.image, 1000)} alt="Colar de ouro com pérola" loading="lazy" className="h-full w-full object-cover" />
            </motion.div>
          </div>
          <motion.div style={{ y: reduce ? 0 : yCard }} className="absolute -bottom-8 right-[-6%] hidden w-56 border border-ouro-500/60 bg-vinho-800 p-5 text-champagne-100 shadow-2xl md:block">
            <p className="font-serif text-4xl texto-ouro">Feito à mão</p>
            <p className="mt-2 text-sm text-champagne-200/80">Peça por peça, com o cuidado de quem conhece cada detalhe.</p>
          </motion.div>
        </div>

        <div>
          <Reveal>
            <h2 className="font-serif text-[clamp(2.3rem,5vw,4.3rem)] font-light leading-[1.05]">{a.title}</h2>
          </Reveal>
          {a.paragraphs.map((t, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className="mt-6 max-w-xl font-serif text-xl leading-[1.6] text-vinho-800">{t}</p>
            </Reveal>
          ))}
          <dl className="mt-12 grid gap-7 border-t border-ouro-600/40 pt-8 sm:grid-cols-3">
            {a.highlights.map((h, i) => (
              <Reveal key={h.label} delay={0.1 * i}>
                <dt className="font-serif text-xl text-vinho-700">{h.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-vinho-800/80">{h.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
