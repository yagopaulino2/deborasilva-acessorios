// Leitura dos produtos em tempo de build (pasta content/products/*.json).
// Para adicionar/editar produtos: edite os arquivos JSON ou use o painel /admin.
import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content", "products");

export function getAllProducts() {
  if (!fs.existsSync(DIR)) return [];
  const items = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const slug = f.replace(/\.json$/, "");
      const data = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      return {
        slug,
        nome: data.nome,
        categoria: data.categoria || "",
        preco: Number(data.preco) || 0,
        descricao: data.descricao || "",
        material: data.material || "",
        peso: data.peso || "",
        tamanho: data.tamanho || "",
        fotos: (data.fotos || []).filter(Boolean),
        video: data.video || "",
        modelo3d: data.modelo3d || "",
        imagens360: (data.imagens360 || []).filter(Boolean),
        estoque: Number(data.estoque ?? 0),
        destaque: !!data.destaque,
        colecao: data.colecao || "",
        modelo3d_tipo: data.modelo3d_tipo || "anel",
        metal: data.metal || "gold",
        pedra: data.pedra || "clear",
      };
    });
  return items.sort((a, b) => Number(b.destaque) - Number(a.destaque) || a.nome.localeCompare(b.nome, "pt-BR"));
}

export function getProduct(slug) {
  return getAllProducts().find((p) => p.slug === slug) || null;
}

/** Versão enxuta enviada ao navegador (busca, favoritos, sacola). */
export function getLiteProducts() {
  return getAllProducts().map((p) => ({
    slug: p.slug, nome: p.nome, preco: p.preco, foto: p.fotos[0] || "", categoria: p.categoria,
    material: p.material, colecao: p.colecao,
  }));
}
