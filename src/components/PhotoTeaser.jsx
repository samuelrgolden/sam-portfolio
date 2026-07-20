import Reveal from "./Reveal.jsx";

const SHOTS = [
  { src: "/photos/pelicans.webp", alt: "Four pelicans silhouetted in front of an orange sun disk" },
  { src: "/photos/aerial-night.webp", alt: "Downtown San Francisco at night, photographed from a small plane" },
  { src: "/photos/oceanbeach.webp", alt: "Aerial view of ocean waves meeting the Sunset District street grid at dusk" },
];

export default function PhotoTeaser() {
  return (
    <section id="photography" className="mx-auto max-w-[1440px] scroll-mt-20 px-6 py-16 md:px-12 md:py-24">
      <Reveal>
        <p className="figlabel">Plate 01 — photography</p>
        <div className="ticks mt-2 mb-8" aria-hidden="true" />
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="display text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium">
            I also <em className="italic text-[hsl(var(--accent))]">shoot</em>
          </h2>
          <a href="/photography.html" className="mono lift text-[0.72rem] tracking-wide text-[hsl(var(--accent))] hover:underline">
            view all 79 photographs →
          </a>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {SHOTS.map((s, i) => (
          <Reveal key={s.src} delay={i * 130}>
            <a href="/photography.html" className="figframe lift-card block">
              <img src={s.src} alt={s.alt} loading="lazy" className="block aspect-[3/2] w-full object-cover" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
