"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();
    const hideAfterMinimum = () => {
      const remaining = Math.max(0, 1400 - (Date.now() - startedAt));
      window.setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") hideAfterMinimum();
    else window.addEventListener("load", hideAfterMinimum, { once: true });

    const fallback = window.setTimeout(() => setVisible(false), 2600);
    return () => {
      window.removeEventListener("load", hideAfterMinimum);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div className={`preloader${visible ? " is-visible" : " is-hidden"}`} aria-hidden={!visible}>
      <div className="preloader-content" role="status" aria-label="Loading Lotus Ghee">
        <span className="preloader-aura" />
        <img className="preloader-logo" src="/logo.png" alt="" />
        <span className="preloader-wordmark"><strong>LOTUS</strong><b>GHEE</b></span>
        <span className="preloader-tagline">A little goodness is on its way</span>
        <span className="preloader-track"><span /></span>
      </div>
    </div>
  );
}
