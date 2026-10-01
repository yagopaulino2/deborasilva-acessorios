"use client";
import { motion, useReducedMotion } from "framer-motion";

/** Entrada suave ao rolar: fade + leve zoom/movimento. */
export default function Reveal({ children, delay = 0, y = 36, scale = 0.97, className = "", as = "div", amount = 0.2 }) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
