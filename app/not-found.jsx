import Link from "next/link";
export const metadata = { title: "Página não encontrada" };
export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-6 text-center">
      <div>
        <h1 className="font-serif text-5xl font-light text-champagne-50">Esta página não foi encontrada.</h1>
        <p className="mt-4 text-champagne-300/80">O endereço pode ter mudado. Volte para a coleção e continue explorando.</p>
        <Link href="/#colecoes" className="btn-ouro mt-8">Ver coleção</Link>
      </div>
    </section>
  );
}
