"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const WHATSAPP = "919959216999";
const wa = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

type Pack = { size: string; note: string; image: string; scale: number };

const ranges: Record<"cow" | "buffalo", { name: string; te: string; line: string; packs: Pack[] }> = {
  cow: {
    name: "Cow Ghee",
    te: "ఆవు నెయ్యి",
    line: "Traditional, aromatic and rich in nutrition.",
    packs: [
      { size: "15 ml", note: "A first taste", image: "/cow/cow-ghee-15ml-cutout-aligned.webp", scale: 0.5 },
      { size: "50 ml", note: "For the travel bag", image: "/cow/cow-ghee-small-cutout-aligned.webp", scale: 0.66 },
      { size: "100 ml", note: "Try it at home", image: "/cow/cow-ghee-medium-aligned.webp", scale: 0.74 },
      { size: "200 ml", note: "Small kitchens", image: "/cow/cow-ghee-curved-cutout-aligned.webp", scale: 0.8 },
      { size: "500 ml", note: "The everyday jar", image: "/cow/cow-ghee-curved-cutout-aligned.webp", scale: 0.9 },
      { size: "1 ltr", note: "For the whole family", image: "/cow/cow-ghee-curved-cutout-aligned.webp", scale: 1 },
      { size: "15 ltr", note: "Tin, for business & bulk", image: "/cow/cow-ghee-tin-aligned.webp", scale: 1 },
    ],
  },
  buffalo: {
    name: "Buffalo Ghee",
    te: "గేదె నెయ్యి",
    line: "Thicker, creamier and full of flavour.",
    packs: [
      { size: "15 ml", note: "A first taste", image: "/buffalo/buffalo-ghee-15ml-cutout-aligned.webp", scale: 0.5 },
      { size: "50 ml", note: "For the travel bag", image: "/buffalo/buffalo-ghee-small-cutout-aligned.webp", scale: 0.66 },
      { size: "100 ml", note: "Try it at home", image: "/buffalo/buffalo-ghee-cutout-aligned.webp", scale: 0.74 },
      { size: "200 ml", note: "Small kitchens", image: "/buffalo/buffalo-ghee-curved-cutout-aligned.webp", scale: 0.8 },
      { size: "500 ml", note: "The everyday jar", image: "/buffalo/buffalo-ghee-curved-cutout-aligned.webp", scale: 0.9 },
      { size: "1 ltr", note: "For the whole family", image: "/buffalo/buffalo-ghee-curved-cutout-aligned.webp", scale: 1 },
      { size: "15 ltr", note: "Tin, for business & bulk", image: "/buffalo/buffalo-ghee-tin-aligned.webp", scale: 1 },
    ],
  },
};

const promises = [
  { no: "01", title: "Pure & natural", body: "Just ghee. Clean, golden and honest — nothing in the jar that shouldn’t be there.", image: "/natural-origin-cows.webp", alt: "A cow and her calf in a green pasture" },
  { no: "02", title: "Rich aroma", body: "Lift the lid and the whole kitchen knows. A deep, nutty fragrance and the taste of tradition.", image: "/serving-dish.webp", alt: "Ghee poured from a spoon over a brass bowl of food" },
  { no: "03", title: "Nutrient rich", body: "Wholesome nourishment for every day — a spoonful on hot rice, in dal, in sweets for the festival.", image: "/a2-ghee-ultrahd.webp", alt: "A brass bowl filled with golden ghee" },
  { no: "04", title: "Nothing added", body: "No preservatives. No additives. Nothing you wouldn’t find in a home kitchen.", image: "/hero-lotus-ghee.webp", alt: "A jar of Lotus Ghee beside a brass bowl and a lotus flower" },
];

const marqueeWords = ["Cow Ghee", "Buffalo Ghee", "A2 Cow Ghee", "15 ml to 15 ltr", "No preservatives", "Pure · Aromatic · Nutritious"];

/* ——— small pieces ——— */

function Arrow() {
  return <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>;
}

function LotusGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={`glyph ${className}`} viewBox="0 0 40 24" aria-hidden="true">
      <path d="M20 2c-4 4-5 9-5 12s2 7 5 8c3-1 5-5 5-8s-1-8-5-12Z" />
      <path d="M14 11C9 9 5 10 2 12c3 5 8 9 16 10M26 11c5-2 9-1 12 1-3 5-8 9-16 10" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg className="ico" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3.5A12.4 12.4 0 0 0 5.4 22.3L3.8 28.2l6-1.6A12.4 12.4 0 1 0 16 3.5Z" fill="none" />
      <path className="fill" d="M12.4 10.1c-.3-.7-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.6s-1.5 1.5-1.5 3.6 1.5 4.1 1.7 4.4c.2.3 2.9 4.6 7.1 6.2 3.5 1.4 4.2 1.1 5 .9.8-.1 2.5-1 2.8-2 .4-1 .4-1.8.2-2-.1-.2-.4-.3-.9-.6l-2.6-1.2c-.3-.1-.6-.2-.9.2l-1.2 1.5c-.2.3-.5.3-.9.1a10.2 10.2 0 0 1-3-1.9 11.1 11.1 0 0 1-2.1-2.6c-.2-.4 0-.6.2-.8l.7-.8c.2-.3.3-.5.4-.7.1-.3 0-.6 0-.8l-1.2-2.8Z" />
    </svg>
  );
}

/** A kolam-style mandala, drawn stroke by stroke as it scrolls into view. */
function Kolam({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  const dots = Array.from({ length: 16 }, (_, i) => i * 22.5);
  return (
    <svg className={`kolam ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <circle className="draw" pathLength={1} cx="100" cy="100" r="92" />
      <circle className="ring-dots" cx="100" cy="100" r="84" />
      {petals.map((deg) => (
        <path key={deg} className="draw" pathLength={1} transform={`rotate(${deg} 100 100)`} d="M100 100C116 82 118 50 100 26 82 50 84 82 100 100Z" />
      ))}
      {petals.map((deg) => (
        <path key={`o${deg}`} className="draw" pathLength={1} transform={`rotate(${deg + 22.5} 100 100)`} d="M100 62c8-10 8-22 0-30-8 8-8 20 0 30Z" />
      ))}
      <circle className="draw" pathLength={1} cx="100" cy="100" r="14" />
      {dots.map((deg) => (
        <circle key={`d${deg}`} className="dot" cx={100 + 72 * Math.cos((deg * Math.PI) / 180)} cy={100 + 72 * Math.sin((deg * Math.PI) / 180)} r="1.8" />
      ))}
      <circle className="dot" cx="100" cy="100" r="3" />
    </svg>
  );
}

function Words({ text }: { text: string }) {
  return <>{text.split(" ").map((w, i) => <span className="w" key={i}>{w} </span>)}</>;
}

/** A headline line wrapped in an overflow mask, so it can rise into view. */
function Line({ children }: { children: React.ReactNode }) {
  return <span className="line"><span className="line-in">{children}</span></span>;
}

/* ——— page ——— */

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Smooth scroll + every scroll-driven animation. */
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    const raf = (t: number) => lenis?.raf(t * 1000);
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.09 });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const cleanups: Array<() => void> = [];
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {

      mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 960px)" }, (c) => {
        const { motion, desktop } = c.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        /* Header: tuck away on the way down, return on the way up. */
        const header = document.querySelector<HTMLElement>(".site-header");
        ScrollTrigger.create({
          start: 0, end: "max",
          onUpdate: (self) => {
            header?.classList.toggle("is-scrolled", self.scroll() > 40);
            header?.classList.toggle("is-tucked", self.direction === 1 && self.scroll() > 400);
          },
        });

        /* Hero intro — held until the preloader lifts. */
        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } })
          .from(".hero .line-in", { yPercent: 115, rotate: 3, duration: 1.4, stagger: 0.09 })
          .fromTo(".hero-arch", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 0)
          .from(".hero-arch img", { scale: 1.35, duration: 2.2 }, 0.1)
          .from(".hero-te", { yPercent: 30, opacity: 0, duration: 2 }, 0.2)
          .from(".hero .fade-up", { y: 26, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.55)
          .from(".hero-stamp", { scale: 0.4, rotate: -90, opacity: 0, duration: 1.4 }, 0.8);
        const play = () => intro.play();
        if (window.__lotusReady) play(); else window.addEventListener("lotus:ready", play, { once: true });

        /* Hero parallax on the way out. */
        gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } })
          .to(".hero-arch img", { yPercent: 12, scale: 1.08, ease: "none" }, 0)
          .to(".hero-te", { yPercent: -40, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: -18, opacity: 0.2, ease: "none" }, 0)
          .to(".hero-stamp", { rotate: 200, ease: "none" }, 0);

        /* Ribbon: a marquee that leans into your scroll speed. */
        document.querySelectorAll<HTMLElement>(".ribbon-row").forEach((row) => {
          const dir = Number(row.dataset.dir || 1);
          const loop: gsap.core.Tween = gsap.fromTo(row.querySelector(".ribbon-track"), { xPercent: dir > 0 ? 0 : -50 }, {
            xPercent: dir > 0 ? -50 : 0, duration: 38, ease: "none", repeat: -1,
            // Scrolling up plays the loop backwards; never let it run out of rewind.
            onReverseComplete: () => { loop.totalTime(loop.rawTime() + loop.duration() * 100); },
          });
          ScrollTrigger.create({
            trigger: ".ribbon", start: "top bottom", end: "bottom top",
            onUpdate: (self) => {
              const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 400);
              gsap.to(loop, { timeScale: boost * (self.direction === 1 ? 1 : -1), duration: 0.25, overwrite: true });
              gsap.to(loop, { timeScale: self.direction === 1 ? 1 : -1, duration: 1.2, delay: 0.25 });
            },
          });
        });

        /* Manifesto: words ink in as you read. */
        gsap.fromTo(".manifesto .w", { opacity: 0.14 }, {
          opacity: 1, stagger: 0.05, ease: "none",
          scrollTrigger: { trigger: ".manifesto-text", start: "top 78%", end: "bottom 45%", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".manifesto .chip").forEach((chip) => {
          gsap.from(chip, { width: 0, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: chip, start: "top 82%" } });
        });

        /* Generic reveals. */
        gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
          gsap.from(el.querySelectorAll(".line-in"), { yPercent: 115, rotate: 2, duration: 1.3, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
        gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
          gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
        });

        /* Kolam: drawn by the scroll. */
        gsap.utils.toArray<SVGSVGElement>(".kolam").forEach((svg) => {
          const strokes = svg.querySelectorAll(".draw");
          gsap.set(strokes, { strokeDasharray: "1 1", strokeDashoffset: 1 });
          gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 90%", end: "bottom 30%", scrub: 1 } })
            .to(strokes, { strokeDashoffset: 0, stagger: 0.04, ease: "none" })
            .from(svg.querySelectorAll(".dot"), { scale: 0, transformOrigin: "50% 50%", stagger: 0.02 }, 0.3)
            .from(svg.querySelectorAll(".ring-dots"), { opacity: 0 }, 0.2)
            .to(svg, { rotate: 45, ease: "none" }, 0);
        });

        /* Promises: pinned, sideways chapter scroll. */
        if (desktop) {
          const track = document.querySelector<HTMLElement>(".promises-track");
          if (track) {
            const distance = () => track.scrollWidth - window.innerWidth;
            const slide = gsap.to(track, {
              x: () => -distance(), ease: "none",
              scrollTrigger: { trigger: ".promises", start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 },
            });
            gsap.to(".promises-progress span", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".promises", start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true } });
            gsap.utils.toArray<HTMLElement>(".promise").forEach((panel) => {
              const img = panel.querySelector("img");
              if (img) gsap.fromTo(img, { xPercent: -10, scale: 1.15 }, { xPercent: 10, scale: 1.15, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left right", end: "right left", scrub: true } });
              gsap.from(panel.querySelectorAll(".promise-no, .promise h3, .promise p"), { y: 60, opacity: 0, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left 75%", end: "left 35%", scrub: true } });
            });
          }
        }

        /* Range cards: dealt onto the table in 3D as they scroll in. */
        gsap.utils.toArray<HTMLElement>(".shelf").forEach((shelf) => {
          gsap.from(shelf.querySelectorAll(".shelf-head > *"), { y: 30, opacity: 0, duration: 1.1, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: shelf, start: "top 80%" } });
        });
        gsap.set(".card", { opacity: 0, y: 90, rotateX: -24, transformOrigin: "50% 0%" });
        ScrollTrigger.batch(".card", {
          start: "top 90%", once: true,
          onEnter: (batch) => {
            gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 1.3, stagger: 0.09, ease: "expo.out" });
            gsap.from(batch.map((c) => c.querySelector(".card-jar")), { yPercent: 35, scale: 0.85, opacity: 0, duration: 1.4, stagger: 0.09, delay: 0.15, ease: "expo.out" });
          },
        });

        /* Cards tilt toward the cursor; a light follows it across the face. */
        if (window.matchMedia("(hover: hover) and (min-width: 700px)").matches) {
          gsap.utils.toArray<HTMLElement>(".card-inner").forEach((card) => {
            const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
            const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
            const move = (e: PointerEvent) => {
              const r = card.getBoundingClientRect();
              const x = (e.clientX - r.left) / r.width;
              const y = (e.clientY - r.top) / r.height;
              card.style.setProperty("--mx", `${x * 100}%`);
              card.style.setProperty("--my", `${y * 100}%`);
              rx((0.5 - y) * 12);
              ry((x - 0.5) * 14);
            };
            const leave = () => { rx(0); ry(0); };
            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", leave);
            cleanups.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
          });
        }

        /* Origin: a temple-arch window opens to the whole pasture. */
        const originTl = gsap.timeline({ scrollTrigger: { trigger: ".origin", start: "top top", end: desktop ? "+=140%" : "+=90%", pin: true, scrub: 1, anticipatePin: 1 } });
        originTl
          .fromTo(".origin-frame", { clipPath: desktop ? "inset(16% 34% 0% 34% round 300px 300px 0px 0px)" : "inset(22% 14% 0% 14% round 200px 200px 0px 0px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", ease: "power2.inOut" }, 0)
          .fromTo(".origin-frame img", { scale: 1.4 }, { scale: 1, ease: "power2.inOut" }, 0)
          .to(".origin-title-before", { yPercent: -60, opacity: 0, ease: "power2.in" }, 0)
          .from(".origin-copy", { y: 140, opacity: 0, ease: "power3.out" }, 0.5)
          .from(".origin-copy > *", { y: 30, opacity: 0, stagger: 0.06, ease: "power3.out" }, 0.62);

        /* Promise (commitment): image parallax and rule lines. */
        gsap.fromTo(".trust-photo img", { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".trust", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.utils.toArray<HTMLElement>(".trust-item").forEach((item) => {
          gsap.from(item.querySelector(".rule"), { scaleX: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: item, start: "top 85%" } });
        });

        /* Footer: the wordmark rises letter by letter. */
        gsap.from(".footer-word .ch", { yPercent: 110, duration: 1.2, stagger: 0.04, ease: "expo.out", scrollTrigger: { trigger: ".footer-word", start: "top 95%" } });

        /* Magnetic buttons. */
        if (desktop && window.matchMedia("(hover: hover)").matches) {
          gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
            const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
            const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              xTo((e.clientX - r.left - r.width / 2) * 0.25);
              yTo((e.clientY - r.top - r.height / 2) * 0.35);
            };
            const leave = () => { xTo(0); yTo(0); };
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
          });
        }

        return () => {
          window.removeEventListener("lotus:ready", play);
          cleanups.splice(0).forEach((fn) => fn());
        };
      });
    }, root);

    // Images change layout once they load; re-measure pins.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Lock scrolling while the mobile menu is open. */
  useEffect(() => {
    if (menuOpen) lenisRef.current?.stop(); else lenisRef.current?.start();
    document.documentElement.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: 0, duration: 1.6 });
    else el.scrollIntoView();
  };

  const nav = [["our-ghee", "Our ghee"], ["products", "The range"], ["about-us", "Origin"], ["promise", "Our promise"], ["contact", "Contact"]] as const;

  return (
    <div ref={root} className="site">
      {/* ——— Header ——— */}
      <header className="site-header">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go("home"); }} aria-label="Lotus Ghee, back to top">
          <img src="/logo.png" alt="" width={46} height={32} />
          <span className="brand-word"><b>Lotus</b><i>Ghee</i></span>
        </a>
        <nav className="nav" aria-label="Main">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}><span data-text={label}>{label}</span></a>
          ))}
        </nav>
        <a className="header-cta" href={wa("Hi Lotus Ghee, I’d like to know more about your ghee.")} target="_blank" rel="noopener noreferrer"><WaIcon /> Order on WhatsApp</a>
        <button type="button" className={`menu-btn ${menuOpen ? "is-open" : ""}`} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((v) => !v)}>
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span><i /><i />
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile">
          {nav.map(([id, label], i) => (
            <a key={id} href={`#${id}`} tabIndex={menuOpen ? 0 : -1} style={{ "--i": i } as React.CSSProperties} onClick={(e) => { e.preventDefault(); go(id); }}>
              <small>0{i + 1}</small>{label}
            </a>
          ))}
        </nav>
        <a className="btn btn-light" tabIndex={menuOpen ? 0 : -1} href={wa("Hi Lotus Ghee, I’d like to know more about your ghee.")} target="_blank" rel="noopener noreferrer"><WaIcon /> Order on WhatsApp</a>
        <span className="mobile-menu-te" lang="te" aria-hidden="true">నెయ్యి</span>
      </div>

      <main>
        {/* ——— Hero ——— */}
        <section className="hero" id="home">
          <span className="hero-te" lang="te" aria-hidden="true">నెయ్యి</span>
          <div className="hero-copy">
            <p className="kicker fade-up"><LotusGlyph /> Pure <i>·</i> Aromatic <i>·</i> Nutritious</p>
            <h1 className="hero-title">
              <Line>Pure ghee,</Line>
              <Line>the way</Line>
              <Line><em>home</em> made&nbsp;it.</Line>
            </h1>
            <p className="hero-lede fade-up">Golden, fragrant and free of preservatives. Lotus brings the authentic taste of tradition to everyday meals — in cow, buffalo and A2 cow ghee.</p>
            <div className="hero-actions fade-up">
              <a className="btn" data-magnetic href="#products" onClick={(e) => { e.preventDefault(); go("products"); }}><span>See the range</span><Arrow /></a>
              <a className="link" href={wa("Hi Lotus Ghee, I’d like to place an order.")} target="_blank" rel="noopener noreferrer"><WaIcon /> Order on WhatsApp</a>
            </div>
          </div>

          <figure className="hero-art">
            <div className="hero-arch"><img src="/hero-lotus-ghee.webp" alt="A jar of Lotus Ghee beside a brass bowl of ghee and a pink lotus" fetchPriority="high" /></div>
            <div className="hero-stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs><path id="stamp-ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
                <text><textPath href="#stamp-ring">PURE GHEE · MADE WITH CARE · FOR YOUR FAMILY · </textPath></text>
              </svg>
              <img src="/logo.png" alt="" />
            </div>
          </figure>

          <dl className="hero-facts fade-up">
            <div><dt>03</dt><dd>Kinds of ghee</dd></div>
            <div><dt>07</dt><dd>Pack sizes</dd></div>
            <div><dt>00</dt><dd>Preservatives</dd></div>
          </dl>
          <span className="scroll-cue fade-up" aria-hidden="true"><i />Scroll</span>
        </section>

        {/* ——— Ribbon ——— */}
        <section className="ribbon" aria-label="What we make">
          {[1, -1].map((dir) => (
            <div className="ribbon-row" data-dir={dir} key={dir} aria-hidden={dir === -1}>
              <div className="ribbon-track">
                {[0, 1].map((copy) => (
                  <span className="ribbon-set" key={copy} aria-hidden={copy === 1}>
                    {marqueeWords.map((w) => <span key={w}>{w}<LotusGlyph /></span>)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ——— Manifesto ——— */}
        <section className="manifesto" id="story">
          <p className="label" data-rise>(Our story)</p>
          <p className="manifesto-text">
            <Words text="In Indian homes, ghee" />
            <span className="chip"><img src="/a2-ghee-ultrahd.webp" alt="" /></span>
            <Words text="was never just an ingredient. It was the first spoonful on hot rice, the glow of the evening lamp, the secret in every festival sweet." />
            <span className="chip"><img src="/serving-dish.webp" alt="" /></span>
            <Words text="Lotus Ghee is made to be that ghee — pure, fragrant and golden — carried" />
            <span className="chip"><img src="/natural-origin-cows.webp" alt="" /></span>
            <Words text="from healthy cows to your home." />
          </p>
          <Kolam className="manifesto-kolam" />
        </section>

        {/* ——— Promises (pinned sideways scroll) ——— */}
        <section className="promises" id="our-ghee" aria-label="Why Lotus Ghee">
          <div className="promises-track">
            <div className="promises-intro">
              <p className="label">(Why Lotus)</p>
              <h2 data-lines><Line>Four things</Line><Line>we never</Line><Line><em>compromise.</em></Line></h2>
              <p className="promises-hint"><Arrow /> Keep scrolling</p>
            </div>
            {promises.map((p) => (
              <article className="promise" key={p.no}>
                <div className="promise-photo"><img src={p.image} alt={p.alt} loading="lazy" /></div>
                <div className="promise-copy">
                  <span className="promise-no">{p.no}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="promises-progress" aria-hidden="true"><span /></div>
        </section>

        {/* ——— The counter (products) ——— */}
        <section className="counter" id="products">
          <div className="counter-head">
            <p className="label" data-rise>(The range)</p>
            <h2 data-lines><Line>Every jar,</Line><Line><em>every size.</em></Line></h2>
            <p className="counter-sub" data-rise>From a 15 ml taste to a 15 ltr tin. Tap <b>Enquire</b> on any pack for its price and availability on WhatsApp.</p>
          </div>

          <div className="shelves">
            {(Object.keys(ranges) as Array<keyof typeof ranges>).map((key, ri) => {
              const r = ranges[key];
              return (
                <section className={`shelf shelf-${key}`} key={key} aria-labelledby={`shelf-${key}`}>
                  <header className="shelf-head">
                    <span className="shelf-no">0{ri + 1}</span>
                    <div className="shelf-title">
                      <span lang="te">{r.te}</span>
                      <h3 id={`shelf-${key}`}>{r.name}</h3>
                    </div>
                    <p className="shelf-line">{r.line}</p>
                    <span className="shelf-count">{r.packs.length} sizes</span>
                  </header>
                  <ul className="cards">
                    {r.packs.map((p, i) => (
                      <li className={`card${i === r.packs.length - 1 ? " is-wide" : ""}`} key={p.size}>
                        <div className="card-inner">
                          <span className="card-light" aria-hidden="true" />
                          <div className="card-top">
                            <div>
                              <span className="card-size">{p.size}</span>
                              <span className="card-kind">{r.name}</span>
                            </div>
                            <span className="card-no">{String(i + 1).padStart(2, "0")}<i>/{String(r.packs.length).padStart(2, "0")}</i></span>
                          </div>
                          <div className="card-stage">
                            <span className="card-ring" aria-hidden="true" />
                            <span className="card-jar" style={{ "--s": p.scale } as React.CSSProperties}>
                              <img src={p.image} alt={`Lotus ${r.name}, ${p.size} pack`} loading="lazy" />
                            </span>
                          </div>
                          <div className="card-foot">
                            <span className="card-note">{p.note}</span>
                            <a className="card-cta" href={wa(`Hi Lotus Ghee, I’m interested in ${r.name} (${p.size}). Please share the price and availability.`)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire about ${r.name}, ${p.size}, on WhatsApp`}>
                              <span>Enquire</span><i><Arrow /></i>
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          <article className="a2" data-rise>
            <img src="/a2-ghee-ultrahd.webp" alt="A brass bowl of golden A2 cow ghee" loading="lazy" />
            <div>
              <p className="label">(Also from Lotus)</p>
              <h3>A2 Cow Ghee</h3>
              <p>From indigenous cows, crafted for everyday wellness.</p>
            </div>
            <a className="link link-light" href={wa("Hi Lotus Ghee, I’m interested in A2 Cow Ghee. Please share the price and availability.")} target="_blank" rel="noopener noreferrer">Ask about A2 <Arrow /></a>
          </article>
        </section>

        {/* ——— Origin ——— */}
        <section className="origin" id="about-us">
          <h2 className="origin-title-before" aria-hidden="true">Where it <em>begins</em></h2>
          <div className="origin-frame">
            <img src="/natural-origin-cows.webp" alt="A cow and her calf standing together in a green pasture lined with palms" loading="lazy" />
          </div>
          <div className="origin-copy">
            <p className="label">(Natural origin)</p>
            <h2>From healthy cows <br />to your <em>home.</em></h2>
            <p>We believe the best ghee begins with care. From well-cared-for cows to a time-honoured process, every jar brings natural richness and consistent quality to your table.</p>
          </div>
        </section>

        {/* ——— Our promise ——— */}
        <section className="trust" id="promise">
          <div className="trust-photo"><img src="/serving-dish.webp" alt="Ghee poured from a spoon into a brass bowl of food" loading="lazy" /></div>
          <div className="trust-copy">
            <p className="label" data-rise>(Our commitment)</p>
            <h2 data-lines><Line>Purity you</Line><Line>can <em>trust.</em></Line></h2>
            <p className="trust-lede" data-rise>Good food starts with good choices. We keep our process simple and our promise clear.</p>
            <ol className="trust-list">
              {[
                ["Quality sourcing", "Milk from well-cared-for cows and buffaloes."],
                ["Traditional process", "Made the time-honoured way, the way it was always made at home."],
                ["Consistent purity", "The same golden colour and aroma, jar after jar."],
              ].map(([t, d], i) => (
                <li className="trust-item" key={t} data-rise>
                  <span className="rule" aria-hidden="true" />
                  <span className="trust-no">0{i + 1}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
          </div>
          <Kolam className="trust-kolam" />
        </section>
      </main>

      {/* ——— Footer ——— */}
      <footer className="footer" id="contact">
        <div className="footer-cta">
          <h2 data-lines><Line>Bring home</Line><Line>the <em>good</em> ghee.</Line></h2>
          <div className="footer-actions" data-rise>
            <a className="btn btn-gold" data-magnetic href={wa("Hi Lotus Ghee, I’d like to place an order.")} target="_blank" rel="noopener noreferrer"><WaIcon /><span>Order on WhatsApp</span></a>
            <a className="link link-light" href="mailto:hello@lotusghee.com">hello@lotusghee.com <Arrow /></a>
          </div>
        </div>
        <div className="footer-grid">
          <div><p className="label">(Visit)</p>{nav.slice(0, 4).map(([id, label]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>)}</div>
          <div><p className="label">(Talk to us)</p><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">+91 99592 16999</a><a href="mailto:hello@lotusghee.com">hello@lotusghee.com</a></div>
          <div><p className="label">(Our ghee)</p><span>Cow Ghee</span><span>Buffalo Ghee</span><span>A2 Cow Ghee</span></div>
        </div>
        <p className="footer-word" aria-label="Lotus Ghee">
          {"LOTUS GHEE".split("").map((ch, i) => <span className="ch-mask" key={i} aria-hidden="true"><span className="ch">{ch === " " ? " " : ch}</span></span>)}
        </p>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Lotus Ghee</span>
          <span lang="te">స్వచ్ఛమైన నెయ్యి</span>
          <a href="#home" onClick={(e) => { e.preventDefault(); go("home"); }}>Back to top ↑</a>
        </div>
      </footer>

      <a className="wa-float" href={wa("Hi Lotus Ghee, I’m interested in your products. Could you please share more details?")} target="_blank" rel="noopener noreferrer" aria-label="Chat with Lotus Ghee on WhatsApp"><WaIcon /></a>
    </div>
  );
}
