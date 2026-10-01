"use client";
import { parseVideo } from "@/lib/media";

export default function VideoPlayer({ url, poster }) {
  const v = parseVideo(url);
  if (!v) return null;
  if (v.type === "embed")
    return <iframe src={v.src} title="Vídeo do produto" className="h-full w-full" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
  return <video src={v.src} poster={poster} controls playsInline preload="metadata" className="h-full w-full bg-black object-contain" />;
}
