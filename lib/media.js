// Utilitários de mídia: aceitam URLs de qualquer origem e otimizam quando possível.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function driveId(url = "") {
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
  return m ? m[1] : null;
}

/** Devolve a URL final da imagem, já otimizada (Cloudinary / Drive) ou local. */
export function img(url, width = 900) {
  if (!url) return "";
  if (url.startsWith("/")) return BASE + url; // arquivo local em /public
  // Cloudinary: injeta formato e qualidade automáticos + largura
  if (url.includes("res.cloudinary.com") && url.includes("/upload/") && !url.includes("/upload/f_auto")) {
    return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`);
  }
  // Google Drive: usa o endpoint de miniaturas (o arquivo precisa estar "Qualquer pessoa com o link")
  const id = driveId(url);
  if (id) return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
  // Imagekit / Unsplash / outros CDNs: usa como está (Unsplash aceita ?w=)
  if (url.includes("images.unsplash.com") && !url.includes("w=")) return `${url}${url.includes("?") ? "&" : "?"}w=${width}&q=80&auto=format`;
  return url;
}

export function srcSet(url, widths = [480, 800, 1200]) {
  if (!url || url.startsWith("/") || driveId(url)) return undefined;
  if (!url.includes("res.cloudinary.com") && !url.includes("images.unsplash.com")) return undefined;
  return widths.map((w) => `${img(url, w)} ${w}w`).join(", ");
}

/** Identifica o tipo de vídeo e devolve a origem correta para o player. */
export function parseVideo(url = "") {
  if (!url) return null;
  let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (m) return { type: "embed", src: `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0&modestbranding=1` };
  m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return { type: "embed", src: `https://player.vimeo.com/video/${m[1]}?title=0&byline=0&portrait=0` };
  const id = driveId(url);
  if (id) return { type: "embed", src: `https://drive.google.com/file/d/${id}/preview` };
  if (url.startsWith("/")) return { type: "file", src: BASE + url };
  if (url.includes("res.cloudinary.com") && url.includes("/video/upload/") && !url.includes("f_auto")) {
    return { type: "file", src: url.replace("/upload/", "/upload/f_auto,q_auto/") };
  }
  return { type: "file", src: url };
}

export const isFileVideo = (url) => parseVideo(url)?.type === "file";
