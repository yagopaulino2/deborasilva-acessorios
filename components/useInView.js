"use client";
import { useEffect, useRef, useState } from "react";

/** Informa se o elemento está visível — usamos para pausar o WebGL fora da tela (economiza bateria). */
export default function useInView(margin = "100px") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, visible];
}
