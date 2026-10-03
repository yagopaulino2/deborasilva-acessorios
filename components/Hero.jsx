"use client";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import site from "@/config/site";
import { img, parseVideo } from "@/lib/media";
import ErrorBoundary from "./ErrorBoundary";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const poeira = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 11) % 96}%`, top: `${40 + ((i * 53) % 55)}%`, size: 2 + (i % 3), d: `${(i * 0.9) % 7}s`, t: `${8 + (i % 5)}s`, dx: `${(i % 2 ? 1 : -1) * (10 + i * 3)}px`,
}));

const linhas = ["ACESSORIOS QUE", "FAZEM PARTE","DA SUAS", "HISTÓRIAS"];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [cena, setCena] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTexto = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opTexto = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yFundo = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const escalaCena = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  // Carrega o 3D quando o navegador está ocioso, para o texto aparecer primeiro
  useEffect(() => {
    const t = "requestIdleCallback" in window ? window.requestIdleCallback(() => setCena(true), { timeout: 1200 }) : setTimeout(() => setCena(true), 400);
    return () => ("cancelIdleCallback" in window ? window.cancelIdleCallback(t) : clearTimeout(t));
  }, []);

  const video = parseVideo(site.hero.video);

  return (
    <section id="inicio" ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden md:items-center">
      {/* Fundo: imagem/vídeo configurável + degradê vinho */}
      <motion.div style={{ y: reduce ? 0 : yFundo }} className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,#7e2a4e_0%,#4c102d_38%,#1d0510_75%)]" />
        {site.hero.image && <img src={img(site.hero.image, 1800)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />}
        {video?.type === "file" && <video src={video.src} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-60" />}
        <div className="absolute inset-0 bg-gradient-to-t from-vinho-950 via-transparent to-vinho-950/50" />
      </motion.div>

      {/* Joia 3D */}
      <motion.div style={{ scale: reduce ? 1 : escalaCena }} className="absolute inset-x-0 top-[5svh] -z-10 h-[42svh] md:inset-y-0 md:left-[30%] md:top-0 md:h-full md:w-[70%]">
        {cena && <ErrorBoundary fallback={null}><HeroScene /></ErrorBoundary>}
      </motion.div>

      {/* Poeira dourada */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {poeira.map((p, i) => (
          <span key={i} className="poeira" style={{ left: p.left, top: p.top, width: p.size, height: p.size, "--d": p.d, "--t": p.t, "--dx": p.dx }} />
        ))}
      </div>

      <motion.div style={{ y: reduce ? 0 : yTexto, opacity: reduce ? 1 : opTexto }} className="relative mx-auto w-full max-w-[1500px] px-6 pb-24 pt-32 md:px-10 md:pb-0">
        <h1 className="font-serif text-[clamp(2.7rem,8vw,7rem)] font-light leading-[0.95] tracking-[0.04em] text-champagne-50">
          {linhas.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.08em]">
              <motion.span className={`block ${i === 1 ? "texto-ouro md:pl-[1.2em]" : ""}`} initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 1.3, delay: 0.25 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}>
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="mt-7 max-w-md text-lg font-light leading-relaxed text-champagne-200/90 md:text-xl"
          initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }}>
          Design, exclusividade e elegância em cada detalhe.
        </motion.p>
        <motion.div className="mt-9" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.3 }}>
          <a href="#colecoes" className="btn-ouro">Explorar coleção</a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block" aria-hidden="true">
        <span className="block h-14 w-px bg-gradient-to-b from-ouro-400 to-transparent" />
      </div>
    </section>
  );
}
