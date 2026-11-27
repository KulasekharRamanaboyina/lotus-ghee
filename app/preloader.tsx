"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window { __lotusReady?: boolean }
}

type Phase = "loading" | "blessing" | "opening" | "gone";

const messages = ["The lotus opens", "Warming the ghee", "Filling the pot", "Made with care"];
const rays = Array.from({ length: 18 }, (_, i) => i * 20);

/** Clay ghee pot (photo cut-out, 1249 × 1024): open lid, ghee pouring from a wooden spoon. */
function Pot() {
  return <img className="lp-pot-art" src="/clay-ghee-pot.webp" alt="" width={1249} height={1024} fetchPriority="high" />;
}

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [msg, setMsg] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const potRef = useRef<HTMLDivElement>(null);
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
      // The pot rises out of the flower as the page loads.
      if (potRef.current) potRef.current.style.transform = `translateY(${((1 - p) * 112).toFixed(2)}%)`;
      const m = p < 0.3 ? 0 : p < 0.66 ? 1 : 2;
      if (m !== lastMsg) { lastMsg = m; setMsg(m); }

      if (t >= 1 && loaded) {
        setPhase("blessing");
        setMsg(3);
        timers.push(window.setTimeout(() => {
          const r = potRef.current?.getBoundingClientRect();
          if (r && rootRef.current) {
            rootRef.current.style.setProperty("--cx", `${r.left + r.width / 2}px`);
            rootRef.current.style.setProperty("--cy", `${r.top + r.height * 0.68}px`);
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
          <svg className="lp-rays" viewBox="0 0 200 200">
            {rays.map((a) => (
              <line key={a} pathLength={1} x1="100" y1="30" x2="100" y2={a % 40 === 0 ? 8 : 16} transform={`rotate(${a} 100 100)`} />
            ))}
          </svg>
          <span className="lp-shadow" />
          <img className="lp-lotus is-back" src="/logo.png" alt="" />
          <div className="lp-window">
            <div className="lp-pot" ref={potRef}><Pot /></div>
          </div>
          <img className="lp-lotus is-front" src="/logo.png" alt="" />
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
