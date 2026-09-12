export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-4xl px-6 py-8 text-sm text-muted">
        {/* "Talun Digital" is deliberately plain text, not a link -- its own
            agency portfolio doesn't exist yet (blueprint §6). A dead "#" link
            here would repeat a mistake already flagged and fixed on PEPPOOL's
            own footer this session -- add the real link once that site ships. */}
        <p>
          Built via Talun Digital.{" "}
          <a href="mailto:acer.fanged@gmail.com" className="hover:text-foreground underline decoration-line underline-offset-2">
            acer.fanged@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
