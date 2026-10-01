"use client";
import { useRef, useState, useEffect } from "react";
import { img } from "@/lib/media";

/** Visualização 360° por sequência de fotos: arraste (mouse ou toque) para girar. */
export default function Viewer360({ frames, alt }) {
  const [i, setI] = useState(0);
  const start = useRef(null);
  const n = frames.length;

  useEffect(() => { frames.forEach((f) => { const im = new Image(); im.src = img(f, 1000); }); }, [frames]);

  const down = (e) => { start.current = { x: e.clientX, i }; e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e) => {
    if (!start.current) return;
    const step = Math.round((e.clientX - start.current.x) / 14);
    setI((((start.current.i - step) % n) + n) % n);
  };
  const up = () => (start.current = null);

  return (
    <div className="relative h-full w-full cursor-ew-resize select-none" style={{ touchAction: "pan-y" }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(frames[i], 1000)} alt={`${alt} — visão 360°`} draggable={false} className="h-full w-full object-cover" />
      <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[11px] tracking-[0.2em] text-champagne-200/80">
        ARRASTE PARA GIRAR 360°
      </p>
    </div>
  );
}
