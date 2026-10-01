import Link from "next/link";
import site from "@/config/site";
import { IconInstagram, IconMail, IconPin, IconWhats } from "./Icons";
import { genericWhatsappUrl } from "@/lib/whatsapp";
import { img } from "@/lib/media";

export default function Footer() {
  return (
    <footer className="relative border-t border-ouro-500/30 bg-vinho-950 pb-10 pt-16">
      <div className="mx-auto grid max-w-[1300px] gap-12 px-6 md:grid-cols-[1.2fr_1fr_1fr_1.2fr] md:px-10">
        <div>
          <img src={img("/images/brand/logo-full.png")} alt={site.name} className="h-36 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-champagne-300/70">{site.tagline}. Design, exclusividade e elegância em cada detalhe.</p>
        </div>
        <div>
          <h3 className="font-serif text-xl text-champagne-100">Navegue</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-champagne-300/80">
            {[["Coleções", "/#colecoes"], ["Sobre nós", "/#sobre"], ["Contato", "/#contato"]].map(([l, h]) => (
              <li key={l}><Link href={h} className="transition hover:text-ouro-300">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-xl text-champagne-100">Institucional</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-champagne-300/80">
            <li><Link href="/privacidade/" className="transition hover:text-ouro-300">Política de privacidade</Link></li>
            <li><Link href="/termos/" className="transition hover:text-ouro-300">Termos de uso</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-xl text-champagne-100">Fale conosco</h3>
          <ul className="mt-4 space-y-3 text-sm text-champagne-300/80">
            <li><a href={genericWhatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition hover:text-ouro-300"><IconWhats width={18} height={18} />{site.whatsappDisplay}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all transition hover:text-ouro-300"><IconMail width={18} height={18} />{site.email}</a></li>
            <li className="flex items-center gap-3"><IconPin width={18} height={18} />{site.address}</li>
            {site.instagram && <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition hover:text-ouro-300"><IconInstagram width={18} height={18} />Instagram</a></li>}
          </ul>
        </div>
      </div>
      <div className="linha-ouro mx-auto mt-14 max-w-[1300px]" />
      <p className="mt-6 text-center text-xs text-champagne-300/50">© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p>
    </footer>
  );
}
