import { useEffect, useRef } from "react";
import Reveal from "./Reveal.jsx";

export default function Hero() {
  const wrapRef = useRef(null);
  const cueRef = useRef(null);

  // scroll-linked exit: the text drifts up faster than the photo and fades
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight || 900;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translateY(calc(-5vh - ${(y * 0.28).toFixed(1)}px))`;
        wrapRef.current.style.opacity = Math.max(0, 1 - y / (vh * 0.6)).toFixed(3);
      }
      if (cueRef.current) {
        cueRef.current.style.opacity = Math.max(0, 1 - y / (vh * 0.3)).toFixed(3);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" data-thread="hero" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden text-center">
      {/* DSC00549 — golden grass, green firs, blue ridges: the palette, photographed */}
      <img
        src="/photos/hero-ridge.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
      />
      {/* photo at full strength; only the very bottom fades to black */}
      <div
        className="absolute inset-x-0 bottom-0 h-56"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.72) 70%, #000 100%)" }}
        aria-hidden="true"
      />

      <div ref={wrapRef} className="relative z-10 max-w-[56.25rem] px-6" style={{ transform: "translateY(-5vh)" }}>
        <Reveal>
          <p className="smallcaps inline-flex items-center gap-3 text-[hsl(var(--ink))]">
            <span className="h-px w-7 bg-[hsl(var(--gold))]" aria-hidden="true" />
            Data science · University of Oregon · Eugene
            <span className="h-px w-7 bg-[hsl(var(--gold))]" aria-hidden="true" />
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="display mt-6 text-[clamp(3.4rem,11vw,9rem)] font-medium leading-[0.95]">
            Sam <span className="italic text-[hsl(var(--gold))]">Golden</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#projects"
              className="smallcaps lift btn-flow [--flow:hsl(var(--accent))] border border-[hsl(var(--accent))] bg-[hsl(var(--ink)/0.45)] px-7 py-3.5 text-[hsl(var(--paper))] shadow-lg backdrop-blur-sm"
            >
              View work
            </a>
            <a
              href="https://sam-6464-oregon-energy-dashboard.hf.space"
              target="_blank"
              rel="noreferrer"
              className="smallcaps lift btn-flow [--flow:hsl(var(--gold))] border border-[hsl(var(--gold))] bg-[hsl(var(--ink)/0.45)] px-7 py-3.5 text-[hsl(var(--paper))] shadow-lg backdrop-blur-sm transition-colors duration-300 hover:text-[hsl(100_8%_12%)]"
            >
              Live dashboard ↗
            </a>
            <a
              href="#contact"
              className="smallcaps lift btn-flow [--flow:hsl(var(--paper))] border border-[hsl(var(--paper)/0.6)] bg-[hsl(var(--ink)/0.45)] px-7 py-3.5 text-[hsl(var(--paper))] backdrop-blur-sm transition-colors duration-300 hover:border-[hsl(var(--paper))] hover:text-[hsl(var(--ink))]"
            >
              Get in touch
            </a>
          </div>
        </Reveal>
        <Reveal delay={280}>
          <p className="mono mt-5 text-[0.66rem] tracking-[0.14em] uppercase text-[hsl(var(--paper))] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            All photos on this website were taken by me
          </p>
        </Reveal>
      </div>

      <div ref={cueRef} className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <div className="cue-line cue-line-lg" aria-hidden="true" />
        <span className="mono text-[0.72rem] tracking-[0.24em] uppercase text-[hsl(var(--gold))]">Scroll</span>
      </div>
    </section>
  );
}
