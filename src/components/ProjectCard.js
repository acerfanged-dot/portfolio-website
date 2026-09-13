import Link from "next/link";

// Live-link icon sits on the card itself so a skimming reader can reach the
// running site without opening the case study first.
function LiveLinkIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M8 12 12 8" />
      <path d="M9.5 5.5 11 4a3 3 0 0 1 4.24 4.24L13.5 10" />
      <path d="M10.5 14.5 9 16a3 3 0 0 1-4.24-4.24L6.5 10" />
    </svg>
  );
}

export default function ProjectCard({ title, hook, tags, href, liveHref }) {
  return (
    <div className="rounded-lg border border-line p-5">
      <div className="flex items-start justify-between gap-3">
        <Link href={href} className="text-base font-semibold hover:text-accent">
          {title}
        </Link>
        {liveHref ? (
          <a
            href={liveHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the live ${title} site`}
            className="shrink-0 text-muted hover:text-accent"
          >
            <LiveLinkIcon />
          </a>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-muted">{hook}</p>
      {tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded border border-line px-2 py-0.5 font-mono text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
