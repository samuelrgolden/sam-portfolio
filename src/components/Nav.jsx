import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "/photography.html", label: "Photography" },
  { href: "#contact", label: "Contact" },
];

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3a6.5 6.5 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("sg-theme", dark ? "dark" : "light");
    } catch {
      /* private mode — no persistence, fine */
    }
  }, [dark]);
  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="lift text-[hsl(var(--ink-soft))] hover:text-[hsl(var(--gold))]"
    >
      {dark ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[17px] w-[17px]" />}
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[hsl(var(--ink)/0.14)] bg-[hsl(var(--paper)/0.92)] backdrop-blur">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3 md:px-12">
        <a href="#top" className="serif text-xl font-bold italic lift">
          S<span className="text-[hsl(var(--accent))]">G</span><span className="text-[hsl(var(--accent))]">.</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="smallcaps link-wipe text-[hsl(var(--ink-soft))] hover:text-[hsl(var(--accent))]">
              {l.label}
            </a>
          ))}
          <ThemeToggle />
          <a
            href="/SamGolden-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="smallcaps dl btn-flow [--flow:hsl(var(--accent))] border border-[hsl(var(--accent))] px-3.5 py-2 text-[hsl(var(--accent))] transition-colors duration-300 hover:text-[hsl(var(--paper))]"
          >
            Résumé <span className="dl-arrow" aria-hidden="true" />
          </a>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="mono text-sm"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "close ×" : "menu ≡"}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-[hsl(var(--ink)/0.12)] px-6 pb-4 md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="smallcaps block py-2.5 text-[hsl(var(--ink-soft))]">
              {l.label}
            </a>
          ))}
          <a href="/SamGolden-Resume.pdf" target="_blank" rel="noreferrer" className="smallcaps mt-2 inline-block bg-[hsl(var(--accent))] px-3.5 py-2 text-[hsl(var(--paper))]">
            Résumé ↓
          </a>
        </div>
      )}
    </header>
  );
}
