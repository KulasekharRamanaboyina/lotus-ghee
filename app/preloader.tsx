"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window { __lotusReady?: boolean }
}

type Phase = "loading" | "blessing" | "opening" | "gone";

const messages = ["The lotus opens", "Warming the ghee", "Filling the pot", "Made with care"];
const rays = Array.from({ length: 18 }, (_, i) => i * 20);

/* Painted diamond chain that follows the curve of the pot's belly. */
const bellyY = (x: number, base: number, sag: number) => {
  const t = (x - 18) / 204;
  return base + sag * 4 * t * (1 - t);
};
const diamonds = Array.from({ length: 12 }, (_, i) => 28 + i * 17);

/** A terracotta ghee pot (kunda) with a painted band and a domed lid. */
function Pot() {
  return (
    <svg className="lp-pot-art" viewBox="0 0 240 260" aria-hidden="true">
      <defs>
        <radialGradient id="clay-body" cx=".32" cy=".32" r=".85">
          <stop offset="0" stopColor="#d98a55" />
          <stop offset=".35" stopColor="#b2602f" />
          <stop offset=".75" stopColor="#8e4620" />
          <stop offset="1" stopColor="#6a3214" />
        </radialGradient>
        <linearGradient id="clay-rim" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c4713f" />
          <stop offset="1" stopColor="#8a431e" />
        </linearGradient>
        <radialGradient id="clay-lid" cx=".36" cy=".2" r=".9">
          <stop offset="0" stopColor="#d58650" />
          <stop offset=".5" stopColor="#a9582a" />
          <stop offset="1" stopColor="#7a3a18" />
        </radialGradient>
        <linearGradient id="ghee-top" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff2c2" />
          <stop offset="1" stopColor="#efcd6a" />
        </linearGradient>
        <clipPath id="clay-clip">
          <path d="M50 120C20 140 14 204 48 232C72 252 168 252 192 232C226 204 220 140 190 120Z" />
        </clipPath>
      </defs>

      {/* inside of the mouth and the ghee */}
      <ellipse cx="120" cy="114" rx="72" ry="16" fill="url(#clay-rim)" />
      <ellipse cx="120" cy="112" rx="58" ry="11" fill="#4a210e" />
      <path className="lp-ghee" d="M64 113C66 102 84 96 98 100C108 91 132 90 144 99C158 95 174 102 176 113C150 120 90 120 64 113Z" fill="url(#ghee-top)" />
      <ellipse className="lp-ghee" cx="104" cy="101" rx="11" ry="3" fill="#fffbe8" opacity=".85" transform="rotate(-8 104 101)" />

      {/* body */}
      <path d="M50 120C20 140 14 204 48 232C72 252 168 252 192 232C226 204 220 140 190 120Z" fill="url(#clay-body)" />
      <g clipPath="url(#clay-clip)">
        <path d={`M18 ${bellyY(18, 150, 20)}Q120 ${150 + 40} 222 150`} fill="none" stroke="#f0c27e" strokeWidth="3.2" />
        <path d={`M18 158Q120 198 222 158`} fill="none" stroke="#f0c27e" strokeWidth="1.6" />
        <path d={`M18 176Q120 216 222 176`} fill="none" stroke="#f0c27e" strokeWidth="1.4" />
        {diamonds.map((x) => {
          const y = bellyY(x, 186, 20);
          return (
            <g key={x}>
              <path d={`M${x} ${y - 5}L${x + 5} ${y}L${x} ${y + 5}L${x - 5} ${y}Z`} fill="none" stroke="#f0c27e" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx={x} cy={y} r="1.5" fill="#f0c27e" />
            </g>
          );
        })}
        <path d={`M18 196Q120 236 222 196`} fill="none" stroke="#f0c27e" strokeWidth="1.6" />
        <path d={`M18 203Q120 243 222 203`} fill="none" stroke="#f0c27e" strokeWidth="3.2" />
        {/* shade the far side, light the near side */}
        <path d="M150 116C214 130 232 214 176 250H250V100Z" fill="#4c200a" opacity=".22" />
        <path d="M50 150C40 172 42 196 54 214" fill="none" stroke="#f6c49a" strokeWidth="9" strokeLinecap="round" opacity=".35" />
      </g>
      {/* front lip of the rim, over the ghee */}
      <path d="M48 114A72 16 0 0 0 192 114L178 113A58 11 0 0 1 62 113Z" fill="url(#clay-rim)" />
      <path d="M52 117A70 15 0 0 0 188 117" fill="none" stroke="#e29a63" strokeWidth="1.4" opacity=".7" />

      {/* ghee running over the lip */}
      <path className="lp-drip" d="M132 121C132 134 129 146 131 158C132 168 143 168 143 158C144 146 141 133 143 121Z" fill="url(#ghee-top)" />
      <ellipse className="lp-splash is-a" cx="72" cy="84" rx="6" ry="3.4" fill="#f6dc8a" />
      <ellipse className="lp-splash is-b" cx="60" cy="70" rx="3.6" ry="2.4" fill="#f6dc8a" />

      {/* lid: sits on the rim, lifts and tips open when the pot is full */}
      <g className="lp-lid">
        <path d="M44 114C46 82 194 82 196 114C160 124 80 124 44 114Z" fill="url(#clay-lid)" />
        <path d="M54 104Q120 86 186 104" fill="none" stroke="#f0c27e" strokeWidth="2.4" />
        <path d="M60 98Q120 82 180 98" fill="none" stroke="#f0c27e" strokeWidth="1.2" strokeDasharray="5 4" />
        <path d="M108 86C108 76 101 72 101 62C101 50 139 50 139 62C139 72 132 76 132 86Z" fill="url(#clay-lid)" />
        <ellipse cx="114" cy="58" rx="6" ry="3" fill="#f2b386" opacity=".55" />
        <path d="M44 114C80 124 160 124 196 114" fill="none" stroke="#6a3214" strokeWidth="1.4" opacity=".6" />
      </g>
    </svg>
  );
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
