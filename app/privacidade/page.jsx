import LegalPage from "@/components/LegalPage";
import site from "@/config/site";
export const metadata = { title: "Política de privacidade" };
export default function Page() {
  return (
    <LegalPage titulo="Política de privacidade">
      <p>A {site.name} respeita a sua privacidade. Esta página explica quais informações o site utiliza e como elas são tratadas, conforme a Lei Geral de Proteção de Dados (LGPD).</p>
      <h2>Quais dados coletamos</h2>
      <p>O site não possui cadastro nem pagamento online. Quando você entra em contato pelo WhatsApp, e-mail ou formulário, recebemos o nome e as informações que você decidir compartilhar, apenas para responder ao seu atendimento.</p>
      <h2>Favoritos e sacola</h2>
      <p>Seus favoritos e os itens da sacola ficam salvos somente no seu próprio navegador (armazenamento local). Não enviamos essas informações a nenhum servidor.</p>
      <h2>Serviços de terceiros</h2>
      <p>Para exibir fontes, vídeos e mídia, o site pode carregar conteúdo de serviços como Google Fonts, YouTube, Vimeo e redes de entrega de imagens. Esses serviços podem registrar dados técnicos de acesso, como endereço IP.</p>
      <h2>Seus direitos</h2>
      <p>Você pode solicitar acesso, correção ou exclusão dos dados que nos enviou pelo e-mail {site.email} ou pelo WhatsApp {site.whatsappDisplay}.</p>
    </LegalPage>
  );
}
