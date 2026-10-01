"use client";
import { IconWhats } from "./Icons";
import { genericWhatsappUrl } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  return (
    <a href={genericWhatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-5px_rgba(0,0,0,.6)] transition hover:scale-110 md:bottom-7 md:right-7"
      style={{ animation: "pulsa 3.2s ease-in-out infinite" }}>
      <IconWhats />
    </a>
  );
}
