export default function LegalPage({ titulo, children }) {
  return (
    <section className="px-6 pb-24 pt-36 md:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-5xl font-light text-champagne-50">{titulo}</h1>
        <div className="linha-ouro mt-6" />
        <div className="mt-8 space-y-5 text-base leading-relaxed text-champagne-200/85 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-champagne-50">{children}</div>
        <p className="mt-12 text-xs text-champagne-300/50">Modelo de texto para revisão. Adapte-o às práticas reais da loja e, se possível, valide com um profissional jurídico.</p>
      </div>
    </section>
  );
}
