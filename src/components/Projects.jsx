import { useState } from "react";
import Reveal from "./Reveal.jsx";

/*
 * The project collage. The thesis rides a full-width featured bar up top
 * (two plate slots — the second awaits a photo); everything else is a
 * masonry wall of matted white cards. Add a project = add an object.
 */
const FILTERS = ["All", "Climate & energy", "ML", "Quant", "Policy & society"];

const FEATURED = {
  title: "Projecting Oregon's Energy Futures",
  context: "Honors thesis · 2025–26",
  description:
    "Built an end to end data pipeline for projecting Climate-driven electricity demand and CO₂ emissions across 3,747 daily observations of Oregon grid data. I developed a hybrid OLS + XGBoost architecture built to extrapolate warming scenarios, and deployed it across 5 climate stations in Oregon, creating projections for the state based on the OCCRI warming scenarios.",
  tags: ["Climate & energy", "ML"],
  href: "https://sam-6464-oregon-energy-dashboard.hf.space",
  linkLabel: "Explore the live dashboard ↗",
  img: "/work/thesis-title.webp",
  imgAlt: "Thesis title slide — Projecting Oregon's Energy Future — over a sunset view of the Mount Hood river valley with transmission lines",
  imgCaption: "Climate and the Oregon Energy Grid — defended May 2026",
  img2: "/work/thesis-emissions.webp",
  img2Alt: "Line chart of projected PACW daily CO₂ emissions from 2024 to 2100 under three SSP warming scenarios",
  img2Caption: "fig. — projected daily CO₂ emissions to 2100, by SSP scenario",
};

const PROJECTS = [
  {
    title: "The Retreat of the Mer de Glace",
    context: "Remote sensing · 2025",
    description: "I used Landsat NDSI snow-index imaging of the Mer de Glace glacier from 1990-2025 to quantify and document ice loss.",
    tags: ["Climate & energy"],
    img: "/work/ndsi.webp",
    imgAlt: "Landsat NDSI snow-index image of the Mer de Glace glacier",
  },
  {
    title: "Regime-Gated Pairs Trading",
    context: "Oregon Quant Group · 2026",
    description: "A complete and backtested GLD/SLV pairs trading strategy over 20 years of data, based on a computed z-score from a rolling spread window with a Markov-switching gate on filtered probabilities, and PnL reconciled across variants.",
    tags: ["Quant"],
    img: "/work/oqg.webp",
    imgAlt: "Cumulative profit and loss chart for each leg of the pairs trade",
  },
  {
    title: "NIH Funding Disparities",
    context: "Data preservation · 2026",
    description: "I rebuilt Federal funding-rate reports after their removal and document a 7.7-point racial funding gap, then visualized it in a newsprint style.",
    tags: ["Policy & society"],
    img: "/work/nih.webp",
    imgAlt: "Newsprint-styled chart of NIH grant funding rates by race",
  },
  {
    title: "Expected-Goals Soccer Model",
    context: "Calibration · 2026",
    description: "A random-forest shot model judged by its honesty: ECE < 0.06 against the real 11.3% goal rate.",
    tags: ["ML"],
    img: "/work/xg.webp",
    imgAlt: "Calibration reliability diagram comparing Logistic Regression, Naive Bayes, SVC, and Random Forest, with predicted-probability histograms",
  },
  {
    title: "What Would You Pay for Climate Policy?",
    context: "Econometrics · 2025",
    description: "A contingent-valuation survey on light pollution, fielded end to end with logit WTP and a protest-zero sensitivity check.",
    tags: ["Policy & society"],
    img: "/work/lightpollution.webp",
    imgAlt: "Title page of Sam Golden's report, 'Light Pollution In Eugene', a contingent-valuation project",
  },
];

const CARD = "border border-[hsl(var(--ink)/0.14)] bg-[hsl(var(--card))] shadow-[0_14px_34px_-18px_hsl(var(--ink)/0.35)]";

function FeaturedBar() {
  return (
    <a
      href={FEATURED.href}
      target="_blank"
      rel="noreferrer"
      className={`lift-card mb-10 block border-2 border-[hsl(var(--gold)/0.7)] bg-[hsl(var(--card))] p-5 shadow-[0_18px_44px_-18px_hsl(var(--ink)/0.4)] md:p-6`}
    >
      <div className="grid grid-cols-12 items-center gap-6 md:gap-8">
        <div className="col-span-12 md:col-span-4">
          <span className="smallcaps inline-block bg-[hsl(var(--gold))] px-2.5 py-1 text-[0.6rem] text-white">Featured</span>
          <p className="mono mt-3 text-[0.64rem] tracking-wide text-[hsl(var(--muted))] uppercase">{FEATURED.context}</p>
          <h3 className="serif mt-1 text-2xl leading-tight font-semibold md:text-[1.7rem]">{FEATURED.title}</h3>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-[hsl(var(--ink-soft))]">{FEATURED.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            {FEATURED.tags.map((t) => (
              <span key={t} className="mono text-[0.62rem] tracking-wide text-[hsl(var(--cool))]">
                {t}
              </span>
            ))}
          </div>
          <span className="smallcaps mt-4 inline-block bg-[hsl(var(--accent))] px-4 py-2.5 text-[hsl(var(--paper))]">
            {FEATURED.linkLabel}
          </span>
        </div>
        {/* two plates: the title slide, and the projected-emissions figure */}
        <div className="col-span-12 grid grid-cols-2 gap-4 md:col-span-8">
          {[
            { img: FEATURED.img, alt: FEATURED.imgAlt, caption: FEATURED.imgCaption },
            { img: FEATURED.img2, alt: FEATURED.img2Alt, caption: FEATURED.img2Caption },
          ].map((plate) => (
            <figure key={plate.img} className="figframe">
              <div className="aspect-[16/9] overflow-hidden bg-[hsl(var(--card))]">
                <img src={plate.img} alt={plate.alt} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <figcaption className="mono border-t border-[hsl(var(--ink)/0.16)] px-3 py-1.5 text-[0.62rem] text-[hsl(var(--muted))]">
                {plate.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));
  return (
    <section id="projects" className="mx-auto max-w-[1440px] scroll-mt-20 px-6 py-14 md:px-12 md:py-16">
      <Reveal>
        <div className="text-center">
          <h2 className="display text-[2.9rem] font-medium md:text-[4.2rem]">
            <span data-thread="projects-title" className="inline-block bg-[hsl(var(--paper))] px-8 py-3">
              Projects<span className="text-[hsl(var(--gold))]">.</span>
            </span>
          </h2>
          <p className="figlabel mt-1">
            <span className="inline-block bg-[hsl(var(--paper))] px-3">Fig. 02 — selected work</span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`mono lift cursor-pointer border px-3 py-1.5 text-[0.68rem] ${
                  filter === f
                    ? "border-[hsl(var(--ink))] bg-[hsl(var(--ink))] text-[hsl(var(--paper))]"
                    : "border-[hsl(var(--ink)/0.3)] bg-[hsl(var(--paper))] text-[hsl(var(--ink-soft))] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-10" data-thread="projects-grid">
          <FeaturedBar />
          <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
            {shown.map((p) => {
              const card = (
                <>
                  <div className="overflow-hidden bg-[hsl(var(--paper-deep))]">
                    {p.img ? (
                      <img src={p.img} alt={p.imgAlt} loading="lazy" className="block h-auto w-full" />
                    ) : (
                      <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2">
                        {p.plate.map((line) => (
                          <span key={line} className="mono text-[0.72rem] text-[hsl(var(--ink-soft))]">
                            {line}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="mono mt-3 text-[0.64rem] tracking-wide text-[hsl(var(--muted))] uppercase">{p.context}</p>
                  <h3 className="serif mt-1 text-xl leading-snug font-semibold">{p.title}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-[hsl(var(--ink-soft))]">{p.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                    {p.tags.map((t) => (
                      <span key={t} className="mono text-[0.62rem] tracking-wide text-[hsl(var(--cool))]">
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              );
              return (
                <article key={p.title} className="mb-8 break-inside-avoid">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer" className={`lift-card block p-3.5 ${CARD}`}>
                      {card}
                    </a>
                  ) : (
                    <div className={`lift-card p-3.5 ${CARD}`}>{card}</div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
