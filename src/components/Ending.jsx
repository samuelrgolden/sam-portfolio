import Reveal from "./Reveal.jsx";

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

const CONTACTS = [
  { label: "Email", value: "samuelrgolden@gmail.com", href: "mailto:samuelrgolden@gmail.com", Icon: MailIcon },
  { label: "LinkedIn", value: "in/sgolden6", href: "https://www.linkedin.com/in/sgolden6/", external: true, Icon: LinkedInIcon },
  { label: "GitHub", value: "samuelrgolden", href: "https://github.com/samuelrgolden", external: true, Icon: GitHubIcon },
  { label: "Résumé", value: "One page, PDF", href: "/SamGolden-Resume.pdf", external: true, Icon: FileIcon },
];

export default function Ending() {
  return (
    <section id="contact" className="scroll-mt-20 pt-10 md:pt-12">
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        <div className="rule-strong" />

        <div className="grid grid-cols-12 gap-x-6 gap-y-10 py-10 md:gap-x-10 md:py-12">
          {/* left: the photographer, and the photography door */}
          <div className="col-span-12 md:col-span-4">
            <Reveal as="figure">
              <div className="aspect-[4/5] overflow-hidden bg-[hsl(var(--paper-deep))]">
                <img
                  src="/photos/finalist.webp"
                  alt="Sam Golden speaking into a microphone at the Clark Honors College Three Minute Thesis finals"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="smallcaps mt-3 text-[hsl(var(--muted))]">
                Presenting at the 3MT finals — Eugene, 2026
              </figcaption>
            </Reveal>
            <Reveal delay={120}>
              <a
                href="/photography.html"
                className="group lift-card mt-6 flex items-center justify-between gap-3 border border-[hsl(var(--gold)/0.5)] px-5 py-4 hover:bg-[hsl(var(--gold)/0.06)]"
              >
                <span>
                  <span className="smallcaps block text-[0.62rem] text-[hsl(var(--muted))]">I also shoot! →</span>
                  <span className="link-wipe serif mt-0.5 inline-block text-xl text-[hsl(var(--gold))]">View my photography</span>
                </span>
                <span aria-hidden="true" className="text-[hsl(var(--muted))] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[hsl(var(--gold))]">
                  →
                </span>
              </a>
            </Reveal>
          </div>

          {/* right: colophon */}
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <p className="smallcaps text-[hsl(var(--muted))]">§ — colophon</p>
              <h2 className="display mt-3 text-[2.8rem] leading-[1.02] md:text-[3.8rem]">
                From raw data
                <br />
                to a <span className="italic text-[hsl(var(--accent))]">story worth telling.</span>
              </h2>
              <p className="serif mt-4 max-w-lg text-lg italic leading-relaxed text-[hsl(var(--ink-soft))] md:text-xl">
                Let's connect! Finishing my MS in 2027 and looking for data science work — always up for a
                conversation before then.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <ul className="mt-8 border-b border-[hsl(var(--ink)/0.18)]">
                {CONTACTS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group lift grid grid-cols-[auto_1fr_auto] items-center gap-x-5 border-t border-[hsl(var(--ink)/0.18)] py-3.5"
                    >
                      <c.Icon className="h-[1.0625rem] w-[1.0625rem] text-[hsl(var(--accent))]" />
                      <span>
                        <span className="smallcaps block text-[0.65rem] text-[hsl(var(--muted))]">{c.label}</span>
                        <span className="link-wipe serif mt-0.5 inline-block text-lg transition-colors duration-300 group-hover:text-[hsl(var(--accent))] md:text-xl">
                          {c.value}
                        </span>
                      </span>
                      <span aria-hidden="true" className="justify-self-end text-[hsl(var(--muted))] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[hsl(var(--accent))]">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

          </div>
        </div>

        <footer className="flex flex-col gap-2 border-t border-[hsl(var(--ink)/0.18)] py-6 md:flex-row md:items-center md:justify-between">
          <p className="smallcaps text-[hsl(var(--muted))]">© 2026 Sam Golden · Eugene, Oregon</p>
          <p className="smallcaps text-[hsl(var(--muted))]">Every photograph here is my own · Set in Newsreader, IBM Plex Sans &amp; IBM Plex Mono</p>
        </footer>
      </div>
    </section>
  );
}
