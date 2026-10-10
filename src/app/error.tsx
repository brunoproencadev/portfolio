"use client";

import Link from "next/link";
import { useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <main className="page-container recovery-page">
      <p className="eyebrow">Não foi possível abrir esta página</p>
      <h1 ref={heading} tabIndex={-1}>
        Vamos tentar novamente?
      </h1>
      <p>
        O conteúdo não pôde ser carregado. Tente novamente ou retorne ao início
        para explorar outros projetos.
      </p>
      <div className="link-row">
        <button
          type="button"
          className="button-link button-primary"
          disabled={pending}
          onClick={() =>
            startTransition(() => {
              router.refresh();
              reset();
            })
          }
        >
          {pending ? "Tentando novamente…" : "Tentar novamente"}
        </button>
        <Link href="/" className="text-link">
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
