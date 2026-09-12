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
            How I Work
          </Link>
          {/* Resume page: content is ready (see Job Application/Acer_Fanged_Master_Resume.md)
              but not yet built as its own route -- no link until it exists, per the
              blueprint's own stop point (landing + PEPPOOL + How I Work only, this round). */}
        </nav>
      </div>
    </header>
  );
}
