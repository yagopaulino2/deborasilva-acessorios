import LegalPage from "@/components/LegalPage";
import site from "@/config/site";
export const metadata = { title: "Termos de uso" };
export default function Page() {
  return (
    <LegalPage titulo="Termos de uso">
      <p>Ao navegar neste site, você concorda com os termos abaixo. Eles se aplicam ao conteúdo e às compras combinadas com a {site.name}.</p>
      <h2>Conteúdo e imagens</h2>
      <p>Textos, fotografias, vídeos e a identidade visual pertencem à {site.name} e não podem ser copiados ou reutilizados sem autorização. As cores das peças podem variar levemente conforme a tela do seu dispositivo.</p>
      <h2>Preços e disponibilidade</h2>
      <p>Preços e estoque podem mudar sem aviso prévio. A compra é confirmada somente após o combinado com a loja pelo WhatsApp, incluindo forma de pagamento, prazo e entrega.</p>
      <h2>Trocas e garantia</h2>
      <p>Condições de troca, ajuste de medida e garantia são informadas no momento da compra, conforme o Código de Defesa do Consumidor.</p>
      <h2>Contato</h2>
      <p>Dúvidas sobre estes termos podem ser enviadas para {site.email} ou {site.whatsappDisplay}.</p>
    </LegalPage>
  );
}
