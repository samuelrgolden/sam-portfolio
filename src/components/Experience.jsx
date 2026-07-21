import Reveal from "./Reveal.jsx";

/*
 * A vertical record — newest at the top, oldest at the foot of the page.
 * Roles and degrees only; the projects get their own collage below.
 * Add an entry = add an object.
 */
const ENTRIES = [
  {
    year: "2026",
    role: "MS Data Science, Graduate Employee",
    org: "University of Oregon",
    location: "Eugene, OR",
    range: "2026 – Jun 2027 (expected)",
    now: true,
    bullets: [
      "A one-year master's with a graduate-employee appointment — teaching data science while studying it.",
    ],
  },
  {
    year: "2026",
    role: "BS Data Science, Economics Concentration",
    org: "Clark Honors College",
    location: "Eugene, OR",
    range: "2022 – Jun 2026",
    bullets: ["GPA 3.50 · Honors Thesis defended May 2026.",
      "Three Minute Thesis Competition Finalist - presented my research to 250+ faculty, students, and alumni. "
    ],
  },
  {
    year: "2026",
    role: "Quantitative Analyst",
    org: "Oregon Quant Group",
    location: "Eugene, OR",
    range: "Apr 2026 – Present",
    now: true,
    bullets: [
      "Built a regime-gated pairs-trading strategy backtested over 20 years of GLD/SLV data — Markov-switching gate on filtered, non-look-ahead probabilities.",
      "Wrote validation scripts reconciling PnL across every strategy variant.",
      "Found that the strategy PnL returns are increased as the rolling window for a computed z-score increases, contrary to initial belief.",
    ],
  },
  {
    year: "2025",
    role: "AI Quality & Model Evaluation Specialist",
    org: "Handshake AI",
    location: "Remote",
    range: "Jan 2026 – Present",
    now: true,
    bullets: [
      "Designed adversarial prompts to stress-test frontier AI models to identify jailbreaks, unsafe behaviours, hallucinations, and policy failures.",
      "Evaluated large-language-model outputs for accuracy, tone, and safety against structured rubrics, improving prompt and response quality across distributed teams.",
    ],
  },
  {
    year: "2025",
    role: "Resident Assistant",
    org: "University of Oregon Housing",
    location: "Eugene, OR",
    range: "Sep 2023 – Sep 2025",
    bullets: [
      "Led residence-hall programming, emergency response, and administration for two years; trained in first aid and mental-health first response.",
    ],
  },
  {
    year: "2024",
    role: "Event Production Staff Lead",
    org: "Stern Grove Festival",
    location: "San Francisco, CA",
    range: "Summers 2023 – 2026",
    bullets: [
      "Led and delegated perimeter-operations staff at large public concerts under high-pressure, changing conditions.",
    ],
  },
  {
    year: "2022",
    role: "High School Diploma",
    org: "Jewish Community High School of the Bay",
    location: "San Francisco, CA",
    range: "Graduated 2022",
    bullets: [""],
  },
];

const STATS = [
  ["Currently", "OQG · Handshake AI · MS + Teaching"],
  ["Focus", "Climate & Energy · ML&Stats"],
  ["Deployed", "6 Projects · 24 Skills · 4 Languages"],
];

function Entry({ entry, showYear }) {
  return (
    <Reveal
      as="li"
      className="group relative border-t border-[hsl(var(--ink)/0.16)] py-8 first:border-t-0 first:pt-0 md:grid md:grid-cols-[110px_1fr] md:gap-10 md:py-10 md:first:pt-0"
    >
      {/* dot on the vertical line */}
      <span
        aria-hidden="true"
        className="absolute left-[106px] top-[2.9rem] hidden h-[9px] w-[9px] rounded-full bg-[hsl(var(--gold))] outline outline-4 outline-[hsl(var(--paper))] group-first:top-[0.4rem] md:block"
      />
      {/* year marker */}
      <div className="md:pr-10 md:text-right">
        {showYear && <span className="display block text-[1.9rem] leading-none font-medium md:text-[2.1rem]">{entry.year}</span>}
      </div>
      <div className={showYear ? "mt-3 md:mt-0" : ""}>
        <p className="smallcaps flex flex-wrap items-center gap-3 text-[hsl(var(--muted))]">
          {entry.range}
          {entry.now && (
            <span className="smallcaps rounded-[2px] bg-[hsl(var(--accent-deep))] px-2 py-[3px] text-[0.55rem] text-[hsl(var(--paper))]">
              Now
            </span>
          )}
        </p>
        <h3 className="serif mt-3 text-2xl font-medium md:text-[1.75rem]">
          {entry.role} <span className="text-[hsl(var(--muted))]">·</span>{" "}
          <span className="italic text-[hsl(var(--accent))]">{entry.org}</span>
        </h3>
        <p className="smallcaps mt-2 text-[hsl(var(--muted))]">{entry.location}</p>
        <ul className="mt-4 space-y-2">
          {entry.bullets.map((b) => (
            <li key={b} className="serif flex gap-3 text-lg leading-relaxed text-[hsl(var(--ink-soft))]">
              <span aria-hidden="true" className="shrink-0 text-[hsl(var(--muted))]">
                —
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-14 md:py-16">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Reveal>
          <p className="figlabel">Fig. 03 — experience</p>
          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="display text-[2.9rem] font-medium md:text-[4.2rem]">
              <span data-thread="exp-title" className="inline-block bg-[hsl(var(--paper))] pr-8 py-3">
                Experience<span className="text-[hsl(var(--gold))]">.</span>
              </span>
            </h2>
            <p className="serif max-w-md text-lg text-[hsl(var(--ink-soft))] md:text-right">
              A vertical record — newest at the top, oldest at the foot of the page.
            </p>
          </div>
          <div className="ticks mt-8" aria-hidden="true" />
        </Reveal>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12 md:gap-x-10">
          {/* the record */}
          <div className="col-span-12 md:col-span-8">
            <div className="relative border-b border-[hsl(var(--ink)/0.16)] md:pb-2">
              <span aria-hidden="true" data-thread="exp-rail" className="absolute top-2 bottom-2 left-[110px] hidden w-px bg-[hsl(var(--ink)/0.16)] md:block" />
              <ol>
                {ENTRIES.map((entry, i) => (
                  <Entry key={`${entry.role}-${entry.org}`} entry={entry} showYear={i === 0 || ENTRIES[i - 1].year !== entry.year} />
                ))}
              </ol>
            </div>
          </div>

          {/* sticky aside */}
          <div className="col-span-12 md:col-span-4">
            <Reveal delay={150} className="md:sticky md:top-24">
              <figure className="relative overflow-hidden bg-[hsl(var(--paper-deep))]">
                <div className="aspect-[3/4]">
                  <img
                    src="/photos/timeline.webp"
                    alt="Sam Golden with graduation gown slung over one shoulder outside a brick building at the University of Oregon"
                    className="h-full w-full object-cover object-[center_25%]"
                    loading="lazy"
                  />
                </div>
                <figcaption
                  className="absolute inset-x-0 bottom-0 p-4 pt-12"
                  style={{ backgroundImage: "linear-gradient(to top, hsl(var(--ink) / 0.72), hsl(var(--ink) / 0.3) 55%, transparent)" }}
                >
                  <span className="smallcaps block text-[hsl(var(--paper))]">On the record</span>
                  <span className="serif mt-0.5 block text-lg italic text-[hsl(var(--paper))]">University of Oregon, June 2026</span>
                </figcaption>
              </figure>
              <dl className="mt-6 border border-[hsl(var(--ink)/0.2)]">
                {STATS.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-t border-[hsl(var(--ink)/0.12)] px-4 py-3 first:border-t-0">
                    <dt className="smallcaps text-[hsl(var(--muted))]">{k}</dt>
                    <dd className="serif text-right text-[1.02rem]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
