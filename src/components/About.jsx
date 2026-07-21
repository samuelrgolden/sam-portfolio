import Reveal from "./Reveal.jsx";

const FACTS = [
  ["Currently", "MS Data Science, UO · Teaching as a GE"],
  ["Based", "Eugene, OR"],
  ["School", "Oregon · Clark Honors College"],
  ["Class of", "BS '26 → MS '27"],
  ["Current Focus", "Climate & energy"],
];

const PARAGRAPHS = [
  "Hi I'm Sam Golden — a data scientist at the University of Oregon, where I'm finishing a one-year Master's in Data Science and teaching as a graduate employee, after earning my BS in Data Science with an economics concentration through the Clark Honors College. What draws me to data science is it's unmatched ability to transcend diverse fields of research, and it's relevance globally today. I firmly believe that Data Science will only continue to grow in coming years, and I want to be at the forefront of that growth, pushing us into the future.",
  "From quantitative analysis to energy forecasting and contingent valuation research, I've built projects across discplines. My strengths are in Machine Learning, Data Analysis & Visualization, Website Development, and Storytelling. My goal as a data scientist is not only to deepen our understanding of the world, but to transform complex data into clear, compelling stories that inform decisions and drive meaningful change.",
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 pt-14 pb-8 md:pt-20 md:pb-10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 md:gap-x-10">
          {/* section label + facts */}
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <p className="figlabel">§ — introduction</p>
              <h2 className="display mt-3 text-[2.9rem] font-medium md:text-[3.6rem]">
                About<span className="text-[hsl(var(--gold))]">.</span>
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <dl className="mt-10 border-b border-[hsl(var(--ink)/0.18)]">
                {FACTS.map(([label, value]) => (
                  <div key={label} className="border-t border-[hsl(var(--ink)/0.18)] py-4">
                    <dt className="smallcaps text-[hsl(var(--muted))]">{label}</dt>
                    <dd className="serif mt-1 text-lg leading-snug">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* portrait — no fade: it stays opaque so it always masks the thread behind it */}
          <figure className="col-span-12 md:col-span-4">
            {/* on desktop the frame stretches to the grid row so its base lines up
                with the facts list and the bio; mobile keeps the 4:5 plate */}
            <div data-thread="photo" className="aspect-[4/5] max-h-[540px] w-full overflow-hidden bg-[hsl(var(--paper-deep))] md:aspect-auto md:h-full md:max-h-none">
              <img
                src="/photos/about-portrait.webp"
                alt="Sam Golden smiling on a forest path at the University of Oregon in graduation regalia"
                className="h-full w-full object-cover object-[center_100%]"
                loading="lazy"
              />
            </div>
          </figure>

          {/* bio */}
          <div className="col-span-12 md:col-span-5">
            <Reveal delay={80}>
              <div className="serif space-y-5 text-lg leading-relaxed text-[hsl(var(--ink-soft))] md:text-[1.16rem] md:leading-relaxed">
                {PARAGRAPHS.map((text, i) => {
                  if (i === 0) {
                    const [firstWord, ...rest] = text.split(" ");
                    return (
                      <p key={text.slice(0, 24)}>
                        <span className="serif float-left mt-3 pr-2 text-[3em] leading-[0.8] text-[hsl(var(--accent))]">
                          {firstWord}
                        </span>{" "}
                        {rest.join(" ")}
                      </p>
                    );
                  }
                  return <p key={text.slice(0, 24)}>{text}</p>;
                })}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
