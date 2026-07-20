import { useEffect, useRef, useState } from "react";

/*
 * The throughline — one green thread that guides the reader down the page:
 * below the hero → behind the About portrait → through the Skills title →
 * forks into four branches (one per skill column) → converges into the
 * Projects title → snakes between the project cards → merges into the
 * Experience timeline rail. A gold dot rides the lit frontier as you scroll.
 *
 * Fully decorative (aria-hidden), desktop only. Anchored to real element
 * positions via [data-thread] attributes, remeasured on resize/reflow.
 */

const STROKE = 10;
const LEAD = 0.62; // fraction of viewport height where the dot rides

// smooth vertical-flow bezier from (x1,y1) to (x2,y2)
function seg(x1, y1, x2, y2) {
  const my = (y1 + y2) / 2;
  return ` C ${x1.toFixed(1)} ${my.toFixed(1)}, ${x2.toFixed(1)} ${my.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

// fan OUT of a fork point (fx,fy) down to a column top (cx,ct) — leaves the
// fork heading down-and-outward so branches diverge as individual arcs. Control
// points scale with the vertical gap so the arcs fill whatever room they have.
function fanTo(fx, fy, cx, ct) {
  const dx = cx - fx;
  const gap = ct - fy;
  return ` C ${(fx + dx * 0.52).toFixed(1)} ${(fy + gap * 0.26).toFixed(1)}, ${cx.toFixed(1)} ${(ct - gap * 0.42).toFixed(1)}, ${cx.toFixed(1)} ${ct.toFixed(1)}`;
}

// fan IN from a column bottom (cx,cb) to a convergence point (vx,vy) — mirror of fanTo.
function fanMerge(cx, cb, vx, vy) {
  const dx = vx - cx;
  const gap = vy - cb;
  return ` C ${cx.toFixed(1)} ${(cb + gap * 0.42).toFixed(1)}, ${(vx - dx * 0.52).toFixed(1)} ${(vy - gap * 0.26).toFixed(1)}, ${vx.toFixed(1)} ${vy.toFixed(1)}`;
}

export default function Thread() {
  const [geo, setGeo] = useState(null);
  const litRefs = useRef([]);
  const dotRef = useRef(null);
  const samplesRef = useRef([]);
  const lastRef = useRef("");

  // ---- measure the page and build the paths ----
  useEffect(() => {
    const build = () => {
      const q = (k) => document.querySelector(`[data-thread="${k}"]`);
      const hero = q("hero");
      const photo = q("photo");
      const st = q("skills-title");
      const pt = q("projects-title");
      const grid = q("projects-grid");
      const rail = q("exp-rail");
      const expTitle = q("exp-title");
      const cols = [0, 1, 2, 3].map((i) => q(`skills-col-${i}`));
      if (!hero || !photo || !st || !pt || !grid || !rail || !expTitle || cols.some((c) => !c)) return;
      // desktop only — and never measure hidden/zero-sized anchors
      if (window.innerWidth < 768) return;
      const zero = (el) => {
        const r = el.getBoundingClientRect();
        return r.width === 0 && r.height === 0;
      };
      if ([hero, photo, st, pt, grid, rail, expTitle, ...cols].some(zero)) return;

      const Y = window.scrollY;
      const R = (el) => {
        const r = el.getBoundingClientRect();
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 + Y, top: r.top + Y, bot: r.bottom + Y, left: r.left, right: r.right };
      };
      const h = R(hero);
      const p = R(photo);
      const t = R(st);
      const pj = R(pt);
      const g = R(grid);
      const rl = R(rail);
      const et = R(expTitle);
      const C = cols.map(R);

      const start = { x: h.cx, y: h.bot - 70 };
      const fork = { x: t.cx, y: t.bot + 26 };
      const conv = { x: pj.cx, y: pj.cy };

      // spine: hero → photo → skills title → column 2 → projects title → snake → rail
      let d = `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`;
      d += seg(start.x, start.y, p.cx, p.top + 10);
      d += ` L ${p.cx.toFixed(1)} ${(p.bot - 10).toFixed(1)}`;
      d += seg(p.cx, p.bot - 10, t.cx, t.cy);
      d += ` L ${fork.x.toFixed(1)} ${fork.y.toFixed(1)}`;
      d += fanTo(fork.x, fork.y, C[2].cx, C[2].top - 8);
      d += ` L ${C[2].cx.toFixed(1)} ${(C[2].bot + 8).toFixed(1)}`;
      d += fanMerge(C[2].cx, C[2].bot + 8, conv.x, conv.y);
      const gw = g.right - g.left;
      const gh = g.bot - g.top;
      const s1 = { x: g.left + gw * 0.34, y: g.top + gh * 0.34 };
      const s2 = { x: g.left + gw * 0.66, y: g.top + gh * 0.62 };
      const s3 = { x: g.left + gw * 0.45, y: g.bot - 46 };
      d += seg(conv.x, conv.y, s1.x, s1.y);
      d += seg(s1.x, s1.y, s2.x, s2.y);
      d += seg(s2.x, s2.y, s3.x, s3.y);
      // through the Experience title, then straight down the whole timeline rail
      const railX = rl.left + 0.5;
      const titlePt = { x: railX, y: et.cy };
      const railTop = { x: railX, y: rl.top + 4 };
      const end = { x: railX, y: rl.bot - 4 };
      d += seg(s3.x, s3.y, titlePt.x, titlePt.y);
      d += ` L ${railTop.x.toFixed(1)} ${railTop.y.toFixed(1)}`;
      d += ` L ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;

      // branches: fork → columns 0, 1, 3 → converge
      const branches = [0, 1, 3].map((i) => {
        let b = `M ${fork.x.toFixed(1)} ${fork.y.toFixed(1)}`;
        b += fanTo(fork.x, fork.y, C[i].cx, C[i].top - 8);
        b += ` L ${C[i].cx.toFixed(1)} ${(C[i].bot + 8).toFixed(1)}`;
        b += fanMerge(C[i].cx, C[i].bot + 8, conv.x, conv.y);
        return b;
      });

      const dots = [fork, conv, titlePt, end, ...C.map((c) => ({ x: c.cx, y: c.top - 8 }))];
      const next = {
        spine: d,
        branches,
        dots,
        w: document.documentElement.clientWidth,
        h: document.documentElement.scrollHeight,
      };
      const sig = d + branches.join("|");
      if (sig === lastRef.current) return; // no layout change — skip
      lastRef.current = sig;
      setGeo(next);
    };

    build();
    const late = setTimeout(build, 1400); // after fonts & reveal transitions settle
    let rt;
    const onReflow = () => {
      clearTimeout(rt);
      rt = setTimeout(build, 160);
    };
    window.addEventListener("resize", onReflow);
    const ro = new ResizeObserver(onReflow);
    ro.observe(document.body);
    return () => {
      clearTimeout(late);
      clearTimeout(rt);
      window.removeEventListener("resize", onReflow);
      ro.disconnect();
    };
  }, []);

  // ---- sample the paths, then drive line + dot from a scroll-follow rAF lerp ----
  useEffect(() => {
    if (!geo) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // sample each path densely, storing (length, x, y) so the frontier can be
    // interpolated to sub-pixel precision — no stepping on the line or the dot.
    const entries = litRefs.current.filter(Boolean).map((el) => {
      const L = el.getTotalLength();
      const N = 500;
      const pts = [];
      for (let i = 0; i <= N; i++) {
        const at = (L * i) / N;
        const p = el.getPointAtLength(at);
        pts.push({ l: at, x: p.x, y: p.y });
      }
      el.style.strokeDasharray = `${L} ${L}`;
      el.style.strokeDashoffset = `${L}`;
      el.style.transition = "none"; // rAF drives it every frame
      return { el, L, pts };
    });
    samplesRef.current = entries;

    if (reduced) {
      entries.forEach(({ el }) => {
        el.style.strokeDashoffset = "0";
      });
      if (dotRef.current) dotRef.current.style.opacity = "0";
      return undefined;
    }

    // continuous frontier: lerp between the two samples straddling the cut line
    // (paths run monotonically downward, so the first crossing is the frontier)
    const frontier = (pts, L, cutY) => {
      if (cutY <= pts[0].y) return null;
      const last = pts[pts.length - 1];
      if (cutY >= last.y) return { l: L, x: last.x, y: last.y };
      for (let k = 1; k < pts.length; k++) {
        if (pts[k].y >= cutY) {
          const a = pts[k - 1];
          const b = pts[k];
          const t = (cutY - a.y) / (b.y - a.y || 1);
          return { l: a.l + (b.l - a.l) * t, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        }
      }
      return { l: L, x: last.x, y: last.y };
    };

    const apply = (cutY) => {
      entries.forEach(({ el, L, pts }, idx) => {
        const f = frontier(pts, L, cutY);
        const lit = f ? f.l : 0;
        el.style.strokeDashoffset = String(Math.max(0, L - lit));
        if (idx === 0 && dotRef.current) {
          if (f && lit > 2) {
            dotRef.current.style.transform = `translate(${f.x.toFixed(2)}px, ${f.y.toFixed(2)}px)`;
            dotRef.current.style.opacity = "1";
          } else {
            dotRef.current.style.opacity = "0";
          }
        }
      });
    };

    let target = window.scrollY + window.innerHeight * LEAD;
    let current = target; // first paint lands instantly, no sweep from zero
    let raf = null;
    let lastT = 0;
    const EASE = 0.15; // smoothing per 60fps-frame; time-normalized below
    const tick = (now) => {
      const dt = lastT ? Math.min(64, now - lastT) : 16.6667;
      lastT = now;
      const diff = target - current;
      if (Math.abs(diff) < 0.35) {
        current = target;
        apply(current);
        raf = null;
        lastT = 0;
        return;
      }
      // frame-rate-independent easing: identical glide on 60Hz, 120Hz, or dropped frames
      const alpha = 1 - Math.pow(1 - EASE, dt / 16.6667);
      current += diff * alpha;
      apply(current);
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = window.scrollY + window.innerHeight * LEAD;
      if (!raf) {
        lastT = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    apply(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [geo]);

  if (!geo) return null;
  const all = [geo.spine, ...geo.branches];
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
      <svg width={geo.w} height={geo.h} className="absolute top-0 left-0" style={{ overflow: "visible" }}>
        {/* the faded route — always there, slightly present */}
        {all.map((d, i) => (
          <path key={`base-${i}`} d={d} fill="none" stroke="hsl(var(--accent) / 0.15)" strokeWidth={STROKE} strokeLinecap="round" />
        ))}
        {/* the lit thread — extends as you scroll */}
        {all.map((d, i) => (
          <path
            key={`lit-${i}`}
            ref={(el) => {
              litRefs.current[i] = el;
            }}
            d={d}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth={STROKE}
            strokeLinecap="round"
            style={{ strokeDasharray: "0 999999", transition: "stroke-dashoffset 120ms linear" }}
          />
        ))}
        {/* station dots where the thread meets things — gold, to pop off the green line */}
        {geo.dots.map((pt, i) => (
          <circle key={`dot-${i}`} cx={pt.x} cy={pt.y} r="7" fill="hsl(var(--gold))" />
        ))}
        {/* the gold reader — rides the lit frontier */}
        <g ref={dotRef} style={{ opacity: 0, transition: "opacity 0.3s ease" }}>
          <circle r="15" fill="hsl(var(--gold) / 0.3)" />
          <circle r="8.5" fill="hsl(var(--gold))" stroke="hsl(var(--paper))" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}
