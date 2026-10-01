import site from "@/config/site";

export function whatsappUrl(message) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function productMessage(nome) {
  return site.whatsappMessage.replace("{produto}", nome);
}
export function productWhatsappUrl(nome) {
  return whatsappUrl(productMessage(nome));
}
export function genericWhatsappUrl() {
  return whatsappUrl("Olá! Gostaria de conhecer as joias da Debora Silva Acessórios.");
}
