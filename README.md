# Debora Silva Acessórios — Site de joias

Site em **Next.js + React Three Fiber + Framer Motion + Tailwind**, 100% estático (sem servidor).
Paleta e logo vêm da identidade da marca: vinho `#4c102d`, rosa-champagne `#f3d6de` e dourado `#c9a24b`.

## 1. Ver no seu computador
```bash
npm install
npm run dev        # abre em http://localhost:3000
```

## 2. Publicar (grátis, sem servidor próprio)
1. Crie um repositório no GitHub e envie esta pasta.
2. Escolha **uma** plataforma e importe o repositório:
   - **Vercel**: *Add New → Project*. Nenhuma configuração extra.
   - **Netlify**: *Add new site → Import*. Build: `npm run build`, pasta: `out`.
   - **Cloudflare Pages**: build `npm run build`, saída `out`.
   - **GitHub Pages**: defina a variável `NEXT_PUBLIC_BASE_PATH=/nome-do-repositorio` e publique a pasta `out`.
3. Defina `NEXT_PUBLIC_SITE_URL` com o endereço final (ex.: `https://deborasilvaacessorios.com.br`) para o SEO.

## 3. Onde mudar as informações da marca
Tudo em **`config/site.js`**: número do WhatsApp, mensagem automática, e-mail, endereço, Instagram,
imagem/vídeo do Hero e texto da seção "Sobre".
O WhatsApp já está configurado com **(85) 99167-3518**.

## 4. Adicionar ou editar joias (sem programar)
**Opção A — Painel `/admin`** (Decap CMS, grátis): depois de publicar, acesse `seusite.com/admin`.
- *Netlify*: ative **Identity** e **Git Gateway** (Site settings → Identity) e convide seu e-mail.
- *Vercel/Cloudflare*: troque `backend` em `public/admin/config.yml` para o modo `github`
  (comentado no arquivo) e configure um proxy OAuth do GitHub.
Cada alteração vira um commit e o site é republicado sozinho.

**Opção B — Arquivos**: cada joia é um arquivo em `content/products/`. Duplique um, edite e envie ao GitHub.

### Campos de cada produto
`nome, categoria (Anéis/Colares/Brincos/Pulseiras), preco, descricao, material, peso, tamanho, fotos[], video,
modelo3d, imagens360[], estoque, destaque, colecao` + `modelo3d_tipo`, `metal` (gold/rose/silver) e `pedra`
(clear/ruby/pearl/rose) que definem a joia 3D genérica.

## 5. Fotos e vídeos
Em `fotos`, `video`, `modelo3d` e `imagens360` você pode usar:
- **Cloudinary** (recomendado): o site acrescenta `f_auto,q_auto` e a largura certa automaticamente.
- **Google Drive**: compartilhe como "Qualquer pessoa com o link" e cole o link do arquivo.
- **YouTube / Vimeo / Drive** (vídeo) ou link direto `.mp4`.
- Arquivos enviados pelo painel (`/uploads`) ou colocados em `public/images/`.
Vídeos `.mp4` tocam ao passar o mouse sobre a joia na galeria.

## 6. 3D e 360°
- Sem modelo próprio, cada produto mostra uma joia 3D gerada pelo código (leve, sem arquivos).
- Com um arquivo `.glb` em `modelo3d`, o site exibe o modelo real, que gira ao arrastar ou tocar.
- `imagens360`: lista de fotos da peça girando; a aba "360°" aparece sozinha.
- O 3D pausa fora da tela e usa resolução menor no celular.

## 7. Trocar as imagens de demonstração
As 12 joias e as imagens em `public/images/products` são **fictícias** (ilustrações). Substitua por seus
produtos reais pelo painel ou editando `content/products/*.json`, e apague os arquivos de exemplo.
As páginas de **Privacidade** e **Termos** são modelos: revise antes de publicar.
