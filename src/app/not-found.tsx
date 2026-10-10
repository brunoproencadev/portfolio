import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-container recovery-page">
      <p className="eyebrow">404 / Página não encontrada</p>
      <h1>Esse caminho ainda não existe.</h1>
      <p>
        Confira o endereço ou volte aos projetos para continuar explorando o
        portfólio.
      </p>
      <div className="link-row">
        <Link href="/" className="button-link button-primary">
          Voltar ao início
        </Link>
        <Link href="/#projetos" className="text-link">
          Explorar projetos
        </Link>
      </div>
    </main>
  );
}
