"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window { __lotusReady?: boolean }
}

type Phase = "loading" | "blessing" | "opening" | "gone";

const messages = ["The lotus opens", "Warming the ghee", "Pouring with care", "Made with care"];
// Golden motes rising from the flower: fixed values so server and client render alike.
const motes = Array.from({ length: 22 }, (_, i) => ({
  x: 20 + ((i * 37) % 60),            // start across the middle of the flower (% of stage)
  drift: ((i * 53) % 48) - 24,        // sideways sway (px)
  size: 4 + ((i * 7) % 6),            // px
  dur: 3.6 + ((i * 11) % 9) * 0.25,   // s
  delay: 0.9 + ((i * 13) % 16) * 0.22 // s, after the lotus has opened
}));

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [msg, setMsg] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const lotusRef = useRef<HTMLImageElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("lotus-seen") === "1";
    sessionStorage.setItem("lotus-seen", "1");
    const delay = reduced ? 0 : seen ? 250 : 700; // let the lotus open first
    const duration = reduced ? 150 : seen ? 1300 : 2500;
    const blessFor = reduced ? 0 : seen ? 800 : 1200;
    const openFor = reduced ? 60 : 1150;

    const start = performance.now() + delay;
    let loaded = document.readyState === "complete";
    let raf = 0;
    let lastMsg = -1;
    const timers: number[] = [];
    const onLoad = () => { loaded = true; };
    window.addEventListener("load", onLoad, { once: true });
    timers.push(window.setTimeout(() => { loaded = true; }, 4500));

    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / duration));
      const held = loaded ? t : Math.min(t, 0.9);
      const p = held * held * (3 - 2 * held);
      if (countRef.current) countRef.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      // The lotus fills with colour from the roots up, like ghee rising in a vessel.
      rootRef.current?.style.setProperty("--p", p.toFixed(4));
      const m = p < 0.3 ? 0 : p < 0.66 ? 1 : 2;
      if (m !== lastMsg) { lastMsg = m; setMsg(m); }

      if (t >= 1 && loaded) {
        setPhase("blessing");
        setMsg(3);
        timers.push(window.setTimeout(() => {
          const r = lotusRef.current?.getBoundingClientRect();
          if (r && rootRef.current) {
            rootRef.current.style.setProperty("--cx", `${r.left + r.width / 2}px`);
            rootRef.current.style.setProperty("--cy", `${r.top + r.height * 0.5}px`);
          }
          setPhase("opening");
          document.documentElement.classList.add("is-ready");
          window.__lotusReady = true;
          window.dispatchEvent(new Event("lotus:ready"));
          timers.push(window.setTimeout(() => setPhase("gone"), openFor));
        }, blessFor));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div ref={rootRef} className={`loader is-${phase}`} role="status" aria-label="Loading Lotus Ghee">
      <div className="loader-center" aria-hidden="true">
        <div className="lp-stage">
          <span className="lp-glow" />
          <span className="lp-motes">
            {motes.map((m, i) => (
              <i
                key={i}
                style={{
                  left: `${m.x}%`, width: m.size, height: m.size,
                  "--drift": `${m.drift}px`, animationDuration: `${m.dur}s`, animationDelay: `${m.delay}s`,
                } as React.CSSProperties}
              />
            ))}
          </span>
          <span className="lp-reflect"><img src="/logo.png" alt="" /></span>
          <span className="lp-flower">
            <img className="lp-lotus is-ghost" src="/logo.png" alt="" />
            <span className="lp-fill"><img className="lp-lotus" ref={lotusRef} src="/logo.png" alt="" /></span>
            <span className="lp-level" />
            <span className="lp-sheen" />
          </span>
          <span className="lp-drop" />
          <span className="lp-flash" />
        </div>

        <div className="loader-type">
          <span className="loader-te" lang="te"><span>నెయ్యి</span></span>
          <span className="loader-word">Lotus Ghee</span>
        </div>
      </div>

      <div className="loader-foot" aria-hidden="true">
        <span className="loader-bar"><span ref={barRef} /></span>
        <span className="loader-msg" key={msg}>{messages[msg]}</span>
        <span className="loader-count"><span ref={countRef}>000</span><i>%</i></span>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
