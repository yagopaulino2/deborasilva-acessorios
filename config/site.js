// ─────────────────────────────────────────────────────────────
//  CONFIGURAÇÕES DO SITE — edite aqui (não precisa mexer em código)
// ─────────────────────────────────────────────────────────────
const site = {
  name: "Debora Silva Acessórios",
  shortName: "Debora Silva",
  tagline: "Joias que contam histórias",
  description:
    "Joias e acessórios de design exclusivo, acabamento artesanal e elegância em cada detalhe. Conheça a coleção Debora Silva Acessórios.",

  // Endereço público do site (usado em SEO, sitemap e Open Graph).
  // Troque pelo domínio real quando publicar.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://deborasilvaacessorios.com.br",

  // WhatsApp: somente números, com DDI (55) + DDD + número.
  whatsapp: "5585991673518",
  whatsappDisplay: "(85) 99167-3518",
  // {produto} é substituído pelo nome da joia.
  whatsappMessage: "Olá! Tenho interesse na joia {produto}. Gostaria de saber mais informações.",

  email: "contato@deborasilvaacessorios.com.br",
  address: "Fortaleza · Ceará · Brasil",
  instagram: "https://instagram.com/", // ← coloque o link do perfil
  facebook: "",
  tiktok: "",

  currency: "BRL",

  // Mídia do Hero (primeira tela). Use URL de imagem e/ou vídeo .mp4.
  // Deixe vazio para usar apenas o fundo vinho com a joia 3D.
  hero: {
    image: "",
    video: "",
  },

  // Seção "Sobre"
  about: {
    title: "Uma história feita à mão, peça por peça.",
    paragraphs: [
      "A Debora Silva Acessórios nasceu do desejo de transformar momentos em memórias que podem ser usadas. Cada peça é pensada para acompanhar uma história: um encontro, uma conquista, um presente que diz o que as palavras não alcançam.",
      "Selecionamos materiais com cuidado, acompanhamos o acabamento de perto e desenhamos coleções pequenas, para que cada joia tenha personalidade e permaneça especial por muito tempo.",
    ],
    image: "/images/about.svg",
    highlights: [
      { label: "Acabamento artesanal", text: "Cada peça é revisada uma a uma antes de chegar até você." },
      { label: "Edições limitadas", text: "Coleções pequenas, com design exclusivo da marca." },
      { label: "Atendimento próximo", text: "Você conversa direto com a Debora pelo WhatsApp." },
    ],
  },
};

export default site;
