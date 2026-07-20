import Reveal from "./Reveal.jsx";

export default function Recognition() {
  return (
    <section id="recognition" className="mx-auto max-w-[1440px] scroll-mt-20 px-6 py-14 md:px-12 md:py-16">
      <Reveal>
        <p className="figlabel">Fig. 04 — recognition</p>
        <div className="ticks mt-2 mb-8" aria-hidden="true" />
        <h2 className="display text-[2.9rem] font-medium md:text-[4.2rem]">
          Recognition<span className="text-[hsl(var(--gold))]">.</span>
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-8 grid grid-cols-12 items-center gap-6 border-2 border-[hsl(var(--gold)/0.7)] bg-[hsl(var(--card))] p-5 shadow-[0_18px_44px_-18px_hsl(var(--ink)/0.4)] md:gap-10 md:p-6">
          {/* the moment — presenting to the judges */}
          <figure className="col-span-12 md:col-span-7">
            <div className="figframe">
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src="/photos/speaking-wide.webp"
                  alt="Sam Golden presenting his three-minute thesis to the judges in a University of Oregon lecture hall, the 'Climate and the Oregon Energy Grid' slide on screen"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mono border-t border-[hsl(var(--ink)/0.16)] px-3 py-1.5 text-[0.62rem] text-[hsl(var(--muted))]">
                The Finals · Robert D. Clark Honors College · Eugene, April 30 2026
              </figcaption>
            </div>
          </figure>

          {/* the citation */}
          <div className="col-span-12 md:col-span-5">
            <span className="smallcaps inline-block bg-[hsl(var(--gold))] px-2.5 py-1 text-[0.6rem] text-[hsl(var(--paper))]">Finalist · 2026</span>
            <h3 className="serif mt-3 text-2xl leading-tight font-semibold md:text-[1.7rem]">Three-Minute Thesis</h3>
            <p className="mono mt-1 text-[0.66rem] tracking-wide text-[hsl(var(--muted))] uppercase">Clark Honors College · University of Oregon</p>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-[hsl(var(--ink-soft))]">
              The 3MT challenge is a competition for graduating honors students to distill a year-long thesis into{" "}
              <span className="text-[hsl(var(--ink))]">one slide and three minutes</span>, for a public audience. From a field
              of more than 200 eligible honors theses, I was one of eleven finalists chosen, and I
              presented my research to a room of <span className="text-[hsl(var(--ink))]">250+ people</span>.
            </p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-[hsl(var(--ink-soft))]">
              My Project: <em className="serif italic text-[hsl(var(--accent))]"> Climate and the Oregon Energy Grid</em>{" "}
              was the only Data Science thesis within the competition, where I used a decade of hourly grid data and a hybrid climate–demand model, to project what a
              warming Oregon actually does to our power system.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
