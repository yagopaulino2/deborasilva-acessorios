"use client";
import { useState } from "react";
import site from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { IconWhats, IconMail, IconPin, IconInstagram } from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  const [nome, setNome] = useState("");
  const [msg, setMsg] = useState("");
  const enviar = (e) => {
    e.preventDefault();
    const texto = `Olá! Meu nome é ${nome || "—"}.\n${msg || "Gostaria de conhecer as joias da Debora Silva Acessórios."}`;
    window.open(whatsappUrl(texto), "_blank", "noopener");
  };
  const campo = "w-full border-b border-champagne-200/30 bg-transparent py-3 text-base text-champagne-50 outline-none transition placeholder:text-champagne-300/40 focus:border-ouro-300";
  return (
    <section id="contato" className="relative bg-gradient-to-b from-vinho-800 to-vinho-950 px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1200px] gap-16 md:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-[clamp(2.3rem,5vw,4.3rem)] font-light leading-[1.05] text-champagne-50">Vamos conversar sobre a sua joia?</h2>
          <p className="mt-6 max-w-md text-lg font-light text-champagne-200/80">Tire dúvidas, peça medidas ou encomende uma peça. A resposta vem direto da Debora, pelo WhatsApp.</p>
          <ul className="mt-10 space-y-4 text-champagne-100">
            <li><a href={whatsappUrl("Olá! Gostaria de conhecer as joias da Debora Silva Acessórios.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 transition hover:text-ouro-300"><IconWhats width={20} height={20} />{site.whatsappDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-4 break-all transition hover:text-ouro-300"><IconMail width={20} height={20} />{site.email}</a></li>
            <li className="flex items-center gap-4"><IconPin width={20} height={20} />{site.address}</li>
            {site.instagram && <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 transition hover:text-ouro-300"><IconInstagram width={20} height={20} />Instagram</a></li>}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <form onSubmit={enviar} className="border border-ouro-500/30 bg-vinho-950/40 p-8 backdrop-blur md:p-10">
            <label className="block text-sm text-champagne-300/80">Seu nome
              <input value={nome} onChange={(e) => setNome(e.target.value)} className={campo} placeholder="Como devemos te chamar?" autoComplete="name" />
            </label>
            <label className="mt-7 block text-sm text-champagne-300/80">Sua mensagem
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={4} className={`${campo} resize-none`} placeholder="Conte qual joia você procura ou o que deseja saber." />
            </label>
            <button type="submit" className="btn-ouro mt-9 w-full"><IconWhats width={18} height={18} /> Enviar pelo WhatsApp</button>
            <p className="mt-4 text-center text-xs text-champagne-300/50">Ao enviar, abrimos o WhatsApp com a sua mensagem pronta.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
