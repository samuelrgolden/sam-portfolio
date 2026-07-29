import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { PHOTOS, CATEGORIES } from "./galleryData.js";

const GAP = 10;

// pack every photo into uniform justified rows that fill the width edge-to-edge,
// cropping nothing — one consistent collage size throughout, nothing blown up.
function layout(photos, W, targetH) {
  const rows = [];
  let row = [];
  let arSum = 0;
  // flush the accumulated row. Justify it to full width UNLESS that would balloon
  // a sparse row (e.g. a lone portrait) — then leave it natural height, ragged.
  const flush = () => {
    if (!row.length) return;
    const h = (W - GAP * (row.length - 1)) / arSum;
    rows.push(h <= targetH * 1.7 ? { items: row.slice(), h, fill: true } : { items: row.slice(), h: targetH, fill: false });
    row = [];
    arSum = 0;
  };
  for (const p of photos) {
    row.push(p);
    arSum += p.w / p.h;
    if (arSum * targetH + GAP * (row.length - 1) >= W) flush();
  }
  flush();
  return rows;
}

function Lightbox({ list, index, onClose, onMove }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onMove(1);
      else if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onMove]);

  const p = list[index];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" onClick={onClose}>
      <button type="button" onClick={onClose} aria-label="Close" className="mono absolute top-5 right-6 z-10 text-sm tracking-widest text-white/70 hover:text-white">
        CLOSE ✕
      </button>
      <span className="mono absolute top-5 left-6 text-xs tracking-widest text-white/50">
        {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
      </span>
      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); onMove(-1); }}
        className="absolute left-3 z-10 flex h-14 w-14 items-center justify-center text-3xl text-white/60 hover:text-white md:left-6"
      >
        ‹
      </button>
      <img
        src={`/gallery/full/${p.id}.webp`}
        alt=""
        className="max-h-[90vh] max-w-[92vw] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        aria-label="Next"
        onClick={(e) => { e.stopPropagation(); onMove(1); }}
        className="absolute right-3 z-10 flex h-14 w-14 items-center justify-center text-3xl text-white/60 hover:text-white md:right-6"
      >
        ›
      </button>
    </div>
  );
}

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [rows, setRows] = useState([]);
  const [lb, setLb] = useState(null); // index into the filtered list, or null
  const wrapRef = useRef(null);

  const list = filter === "all" ? PHOTOS : PHOTOS.filter((p) => p.cat === filter);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const relayout = () => {
      const w = el.clientWidth;
      const targetH = w < 640 ? 200 : w < 1024 ? 270 : 340;
      setRows(layout(list, w, targetH));
    };
    relayout();
    const ro = new ResizeObserver(relayout);
    ro.observe(el);
    return () => ro.disconnect();
  }, [filter]);

  const move = useCallback(
    (d) => setLb((i) => (i == null ? i : (i + d + list.length) % list.length)),
    [list.length]
  );

  const openId = (id) => setLb(list.findIndex((p) => p.id === id));

  return (
    <div className="min-h-screen bg-[hsl(var(--paper))] text-[hsl(var(--ink))]">
      {/* header */}
      <header className="sticky top-0 z-30 border-b border-[hsl(var(--ink)/0.14)] bg-[hsl(var(--paper)/0.92)] backdrop-blur">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-3 md:px-8">
          <a href="/" className="serif text-xl font-bold italic">
            S<span className="text-[hsl(var(--accent))]">G</span><span className="text-[hsl(var(--accent))]">.</span>
          </a>
          <a href="/" className="mono lift text-[0.7rem] tracking-[0.14em] text-[hsl(var(--ink-soft))] uppercase hover:text-[hsl(var(--accent))]">
            ← back to portfolio
          </a>
        </div>
      </header>

      {/* title + chips */}
      <div className="mx-auto max-w-[100rem] px-5 pt-12 pb-6 md:px-8">
        <p className="figlabel">Plate 01 — photography</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h1 className="display text-[2.9rem] font-medium md:text-[4.4rem]">
            Photography<span className="text-[hsl(var(--gold))]">.</span>
          </h1>
          <p className="serif max-w-sm text-lg text-[hsl(var(--ink-soft))] md:text-right">
            Every frame my own — shot across Oregon, the Sierra, the coast, and the sky above them.
          </p>
        </div>
        <div className="mt-7 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={filter === c.key}
              onClick={() => setFilter(c.key)}
              className={`mono lift cursor-pointer border px-3.5 py-1.5 text-[0.7rem] tracking-wide ${
                filter === c.key
                  ? "border-[hsl(var(--ink))] bg-[hsl(var(--ink))] text-[hsl(var(--paper))]"
                  : "border-[hsl(var(--ink)/0.3)] text-[hsl(var(--ink-soft))] hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* the wall */}
      <div ref={wrapRef} className="mx-auto max-w-[100rem] px-5 pb-24 md:px-8">
        {rows.map((r, ri) => (
          <div key={ri} className="flex" style={{ gap: GAP, marginBottom: GAP }}>
            {r.items.map((p) => {
              const ar = p.w / p.h;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => openId(p.id)}
                  className="group relative block cursor-zoom-in overflow-hidden bg-[hsl(var(--paper-deep))]"
                  style={
                    r.fill
                      ? { flexGrow: ar, flexShrink: ar, flexBasis: 0, height: r.h }
                      : { flex: "0 0 auto", width: ar * r.h, height: r.h }
                  }
                >
                  <img
                    src={`/gallery/thumb/${p.id}.webp`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 transition group-hover:bg-[hsl(var(--ink)/0.08)]" />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <footer className="border-t border-[hsl(var(--ink)/0.16)]">
        <div className="mx-auto flex max-w-[100rem] flex-col gap-2 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="mono text-[0.64rem] tracking-wide text-[hsl(var(--muted))]">© 2026 Sam Golden · every photograph taken by me</p>
          <a href="/#contact" className="mono text-[0.64rem] tracking-wide text-[hsl(var(--accent))] hover:underline">
            get in touch →
          </a>
        </div>
      </footer>

      {lb != null && list[lb] && <Lightbox list={list} index={lb} onClose={() => setLb(null)} onMove={move} />}
    </div>
  );
}
