export const brl = (v) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(v) || 0);

export const slugify = (s = "") =>
  s.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function parcelas(v) {
  const n = v >= 3000 ? 10 : v >= 1000 ? 6 : v >= 400 ? 3 : 1;
  if (n === 1) return "";
  return `ou ${n}x de ${brl(v / n)} sem juros`;
}
