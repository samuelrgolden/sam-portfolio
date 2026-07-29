import Reveal from "./Reveal.jsx";

/*
 * Four columns, one per résumé group — the landing zone for the thread's fork.
 * Each item carries a paper background so the green line breaks politely
 * behind the words and shows in the gaps. Add a skill = add a string.
 */
const GROUPS = [
  { name: "Languages", items: ["Python", "R", "SQL", "HTML/CSS"] },
  {
    name: "ML & stats",
    items: ["scikit-learn", "XGBoost", "PyTorch", "statsmodels", "regression & classification", "calibration", "IV · DiD · Monte Carlo"],
  },
  { name: "Data & viz", items: ["pandas", "NumPy", "Plotly/Dash", "matplotlib", "seaborn", "Tableau", "ArcGIS"] },
  { name: "Tools", items: ["Git/GitHub", "Netlify", "Hugging Face Spaces", "Jupyter", "Qualtrics", "Excel"] },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[90rem] scroll-mt-20 px-6 pb-16 md:px-12 md:pb-24">
      <Reveal>
        <div className="text-center">
          <h2 className="display text-[2.9rem] font-medium md:text-[3.4rem]">
            <span data-thread="skills-title" className="inline-block bg-[hsl(var(--paper))] px-8 py-3">
              Skills<span className="text-[hsl(var(--gold))]">.</span>
            </span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-[7rem] md:grid-cols-4 md:gap-x-8">
          {GROUPS.map((g, i) => (
            <div key={g.name} data-thread={`skills-col-${i}`} className="flex flex-col items-center">
              <h3 className="serif lift rounded-xl border border-[hsl(var(--ink)/0.16)] bg-[hsl(var(--card))] px-6 py-2.5 text-xl font-semibold shadow-[0_0.1875rem_0.875rem_-0.3125rem_hsl(var(--ink)/0.32)]">
                {g.name}
              </h3>
              {/* cards distribute across the full column height so every column shares a baseline */}
              <div className="mt-5 flex w-full flex-1 flex-col items-center justify-between gap-5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="mono lift rounded-lg border border-[hsl(var(--ink)/0.12)] bg-[hsl(var(--card))] px-4 py-2 text-center text-[0.78rem] text-[hsl(var(--ink-soft))] shadow-[0_0.125rem_0.625rem_-0.25rem_hsl(var(--ink)/0.25)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
