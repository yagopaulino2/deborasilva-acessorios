"use client";
import { motion, useReducedMotion } from "framer-motion";

// Foto do anel em destaque na página principal (substitui o anel 3D).
const FOTO = "/images/products/anel1.jpg";

export default function HeroScene() {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-full w-full items-center justify-center p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 1.2 },
          scale: { duration: 1.2, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative aspect-[4/5] h-full max-h-[34rem] max-w-full"
      >
        {/* Brilho dourado atrás da foto */}
        <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,#c9a24b_0%,transparent_65%)] opacity-40 blur-3xl" aria-hidden="true" />
        {/* Moldura em arco com borda dourada */}
        <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-[2rem] border border-[#c9a24b]/60 shadow-2xl shadow-black/50">
          <motion.img
            src={FOTO}
            alt="Anel de ouro com pedra em destaque"
            className="h-full w-full object-cover"
            animate={reduce ? undefined : { scale: [1.05, 1.15, 1.05] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="pointer-events-none absolute inset-0 rounded-t-full rounded-b-[2rem] ring-1 ring-inset ring-white/10" aria-hidden="true" />
        </div>
      </motion.div>
    </div>
  );
}
