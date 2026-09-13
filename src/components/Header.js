import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          Acer Carl Fanged
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/how-i-work" className="hover:text-foreground">
            How I Work with AI
          </Link>
          <Link href="/resume" className="hover:text-foreground">
            Résumé
          </Link>
        </nav>
      </div>
    </header>
  );
}
