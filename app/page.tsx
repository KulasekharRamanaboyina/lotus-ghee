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
  { no: "01", title: "Pure & natural", body: "Just ghee. Clean, golden and honest — nothing in the jar that shouldn’t be there.", image: "/why/pure-natural.webp", alt: "Pure & Natural badge with a white cow and a brass pot of ghee" },
  { no: "02", title: "Rich aroma", body: "Lift the lid and the whole kitchen knows. A deep, nutty fragrance and the taste of tradition.", image: "/why/rich-aroma.webp", alt: "Rich Aroma badge with warm ghee steaming in a brass pot" },
  { no: "03", title: "Nutrient rich", body: "Wholesome nourishment for every day — a spoonful on hot rice, in dal, in sweets for the festival.", image: "/why/nutrient-rich.webp", alt: "Nutrient Rich badge with a brass pot of ghee" },
  { no: "04", title: "No preservatives", body: "No preservatives. No additives. Nothing you wouldn’t find in a home kitchen.", image: "/why/no-preservatives.webp", alt: "No Preservatives badge with ghee pouring from a wooden spoon into a brass pot" },
];

/** How Lotus ghee is made, step by step (the "ritual" section). */
const ritual = [
  { no: "01", te: "పాలు", title: "Fresh milk", body: "It starts with milk from healthy, well-fed cows and buffaloes, brought in fresh — because ghee can only be as good as the milk it comes from.", image: "/process/milk.webp", alt: "Fresh milk poured from a steel can into a steel pot", focus: "42% 50%" },
  { no: "02", te: "పెరుగు", title: "Set to curd", body: "The milk is boiled, cooled and set overnight, the way our grandmothers did, until it turns thick and gently tangy.", image: "/process/curd.webp", alt: "Thick set curd lifted from a steel pot on a wooden spoon", focus: "58% 50%" },
  { no: "03", te: "వెన్న", title: "Churned to butter", body: "The curd is churned until soft, pale butter rises to the top. Patient work — and the step that gives our ghee its depth.", image: "/process/butter.webp", alt: "A wooden churner bringing up soft butter in a steel pot", focus: "52% 50%" },
  { no: "04", te: "నెయ్యి", title: "Simmered slow", body: "The butter melts over a low flame and is stirred and watched until it turns clear gold and the whole kitchen smells of home.", image: "/process/simmer.webp", alt: "Butter simmering into clear golden ghee in a steel pot over a flame", focus: "55% 50%" },
  { no: "05", te: "జాడీ", title: "Strained & sealed", body: "Filtered while still warm and sealed in glass. Nothing added, nothing taken away — just the ghee, the way home made it.", image: "/process/strain.webp", alt: "Warm ghee strained through muslin cloth into a glass jar", focus: "50% 50%" },
];

/**
 * Customer reviews. Replace the samples with real reviews (with the customer's permission)
 * and set `sample: false`. Sample reviews are only shown in development, never on the live
 * site; if no real reviews exist, the whole section is hidden in production.
 */
type Review = { quote: string; name: string; place: string; product: string; rating: 1 | 2 | 3 | 4 | 5; sample: boolean };
const reviews: Review[] = [
  { quote: "We used it for all our festival sweets this year. Everyone asked which ghee we used.", name: "S. Lakshmi", place: "Guntur", product: "Cow Ghee · 1 ltr", rating: 5, sample: false },
  { quote: "The aroma is wonderful, and the taste reminds me of traditional homemade ghee. Loved the quality.", name: "Priya Reddy", place: "Hyderabad", product: "Cow Ghee · 1 ltr", rating: 4, sample: false },
  { quote: "Added it to our everyday cooking and the flavour is amazing. Even simple rice tastes so much better.", name: "K. Sravani", place: "Vijayawada", product: "Cow Ghee · 500 ml", rating: 5, sample: false },
  { quote: "Perfect for making sweets and traditional recipes. The rich aroma makes every dish feel special.", name: "Anusha Varma", place: "Warangal", product: "Cow Ghee · 1 ltr", rating: 4, sample: false },
  { quote: "The texture is smooth, the taste is rich, and the quality feels premium. A great addition to our kitchen.", name: "Ravi Teja", place: "Rajahmundry", product: "Buffalo Ghee · 1 ltr", rating: 5, sample: false },
  { quote: "Good flavour and nice aroma. We have been using it with hot rice and for our daily cooking.", name: "M. Harika", place: "Nellore", product: "Cow Ghee · 500 ml", rating: 3, sample: false },
  { quote: "Used it for homemade sweets and the aroma was beautiful. Definitely a product worth trying.", name: "P. Srinivas", place: "Tirupati", product: "Cow Ghee · 1 ltr", rating: 4, sample: false },
  { quote: "Rich taste, lovely aroma and excellent quality. Our family has started using it every day.", name: "Deepika Nair", place: "Hyderabad", product: "Buffalo Ghee · 500 ml", rating: 5, sample: false },
];
const shownReviews = reviews.filter((r) => !r.sample || process.env.NODE_ENV !== "production");

function Stars({ n }: { n: number }) {
  return (
    <span className="stars" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={i <= n ? "on" : ""}>
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ r }: { r: Review }) {
  const initials = r.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <figure className="review">
      {r.sample && <span className="review-sample">Sample — replace</span>}
      <Stars n={r.rating} />
      <blockquote><p>“{r.quote}”</p></blockquote>
      <figcaption>
        <span className="review-avatar" aria-hidden="true">{initials}</span>
        <span><b>{r.name}</b><small>{r.place}</small></span>
        <span className="review-product">{r.product}</span>
      </figcaption>
    </figure>
  );
}

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

/** The glass Lotus cow-ghee jar (transparent cut-out, 1122 × 1402). */
const HERO_JAR = "/hero/lotus-glass-jar.webp";
/** The glass Lotus buffalo-ghee jar (checkerboard background removed), same 1122 × 1402 canvas. */
const HERO_JAR_BUFFALO = "/hero/lotus-buffalo-jar.webp";
/** Gold dust drifting through the hero: [left %, top %, size px, delay s, duration s]. */
const DUST: Array<[number, number, number, number, number]> = [
  [8, 72, 3, 0, 14], [14, 34, 2, 3, 17], [22, 86, 4, 6, 15], [31, 18, 2, 1, 19], [38, 64, 3, 8, 16],
  [46, 92, 2, 4, 18], [57, 28, 3, 9, 15], [63, 78, 2, 2, 20], [71, 46, 4, 5, 16], [78, 12, 2, 7, 18],
  [84, 66, 3, 0, 17], [91, 38, 2, 10, 19], [95, 84, 3, 3, 15], [4, 50, 2, 11, 18],
];
/** Transparent cut-out of a hand reaching down from above, fingertips at the bottom edge. */
const HERO_HAND = "/hero/hand-lid.webp";

/**
 * The hero jar, built from the real product photo in layers: a clear, see-through
 * "empty" body with the printed label in full colour, the full-colour body revealed from the bottom up (masked to the jar's
 * own silhouette), and the lid cut from the same photo. Resting markup is the
 * finished jar, so reduced-motion and no-JS visitors see it full and lidded.
 */
function GheeJar() {
  return (
    <div className="jar" role="img" aria-label="A jar of Lotus cow ghee being filled">
      <div className="pour" aria-hidden="true"><span className="pour-fall"><span className="pour-body" /></span></div>
      <span className="pour-drop" aria-hidden="true" />
      <img className="jar-ghost" src={HERO_JAR} alt="" width={1122} height={1402} fetchPriority="high" />
      {/* Keeps only the photo's near-white reflections (luminance > ~88%) as white; the rest goes transparent. */}
      <svg className="jar-filters" width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="jar-gloss-filter" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.77 5.96 0.6 0 -7.33" />
        </filter>
      </svg>
      <img className="jar-gloss" src={HERO_JAR} alt="" aria-hidden="true" />
      <img className="jar-label" src={HERO_JAR} alt="" aria-hidden="true" />
      <div className="jar-mask" aria-hidden="true">
        <div className="jar-level">
          <img className="jar-full" src={HERO_JAR} alt="" />
          <span className="jar-surface"><i /><i /></span>
        </div>
      </div>
      {/* The lid travels in with a hand, which lets go once it is screwed on. */}
      <div className="lid-rig" aria-hidden="true">
        <img className="jar-lid" src={HERO_JAR} alt="" />
        <img className="jar-hand" src={HERO_HAND} alt="" />
      </div>
      {/* One pass of light across the glass once it is sealed. */}
      <span className="jar-sheen" aria-hidden="true"><i /></span>
    </div>
  );
}

/* ——— page ——— */

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const finishHeroRef = useRef<(() => void) | null>(null);
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
    // The hero plays once: after the reveal, it stays finished (and unpinned) for the rest of the visit.
    let heroDone = false;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {

      mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 960px)", phone: "(max-width: 599px)" }, (c) => {
        const { motion, desktop, phone } = c.conditions as { motion: boolean; desktop: boolean; phone: boolean };
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

        /* Hero intro — held until the preloader lifts: the empty jar settles in the centre. */
        const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } })
          .fromTo(".jar", { yPercent: 16, rotation: -4, autoAlpha: 0 }, { yPercent: 0, rotation: 0, autoAlpha: 1, duration: 1.8 })
          .from(".plinth", { scaleX: 0.4, opacity: 0, duration: 1.6 }, 0.15)
          .from(".hero-frame", { opacity: 0, scale: 1.03, duration: 2 }, 0)
          .from(".jar-glow", { scale: 0.3, opacity: 0, duration: 2 }, 0.1)
          .from(".hero-te", { yPercent: 30, opacity: 0, duration: 2 }, 0.2)
          .from(".scroll-cue", { y: 20, opacity: 0, duration: 1.1 }, 0.6);
        const play = () => intro.play();
        if (window.__lotusReady) play(); else window.addEventListener("lotus:ready", play, { once: true });

        /* Hero: pinned. Pour → fill → lid & label → the jar steps right and the story arrives. */
        const hero = document.querySelector<HTMLElement>(".hero");
        const art = document.querySelector<HTMLElement>(".hero-art");
        const fill = document.querySelector<HTMLElement>(".jar-level");
        if (hero && art && fill && !heroDone) {
          const EMPTY = 100, FULL = 14.5; // fill line, as % from the top of the photo (14.5% = under the lid)
          // Offsets from the jar's resting place (right column) to the centre of the screen.
          const dx = () => { const h = hero.getBoundingClientRect(), a = art.getBoundingClientRect(); return h.left + h.width / 2 - (a.left + a.width / 2); };
          const dy = () => { const h = hero.getBoundingClientRect(), a = art.getBoundingClientRect(); return h.height / 2 - (a.top - h.top + a.height / 2); };
          const s0 = () => gsap.utils.clamp(0.9, 2.6, (hero.offsetHeight * (phone ? 0.48 : 0.6)) / art.offsetHeight);
          const MOVE_AT = 9.2;

          // No hand photo yet (or it failed to load)? The lid simply drops on by itself.
          const hand = document.querySelector<HTMLImageElement>(".jar-hand");
          const noHand = () => hand?.classList.add("is-missing");
          if (hand && hand.complete && !hand.naturalWidth) noHand();
          hand?.addEventListener("error", noHand, { once: true });

          gsap.set(".pour", { autoAlpha: 1 });
          const factEls = gsap.utils.toArray<HTMLElement>(".hero-facts dt");
          const factEnds = factEls.map((dt) => Number(dt.textContent) || 0);
          const facts = { v: 1 };
          const stepEls = gsap.utils.toArray<HTMLElement>(".hero-steps li");
          let stepOn = 0;
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            // light up the step the jar is on: pouring → filling → sealing
            onUpdate: () => {
              const t = tl.time(), i = t < 1.6 ? 0 : t < 6.9 ? 1 : 2;
              if (i !== stepOn) { stepOn = i; stepEls.forEach((li, j) => li.classList.toggle("is-on", j === i)); }
            },
            scrollTrigger: {
              trigger: hero, start: "top top", end: phone ? "+=210%" : "+=290%",
              pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
              // Before the jar has moved, re-centre it for the new viewport.
              onRefresh: () => { if (tl.time() < MOVE_AT) gsap.set(".jar-wrap", { x: dx(), y: dy(), scale: s0() }); },
              // Past the end: lock in the finished hero and drop the pin, so scrolling back up
              // shows the text and full jar instead of emptying the jar again.
              onLeave: () => finishHero(true),
            },
          });
          // Lock in the finished hero and drop its pin. When the visitor scrolled past it, keep them at the
          // same spot in the content (`keepPlace`); a menu jump does this *before* scrolling instead.
          const finishHero = (keepPlace: boolean) => {
            const st = tl.scrollTrigger;
            if (heroDone || !st) return;
            heroDone = true;
            const pinned = st.end - st.start;
            const y = st.scroll();
            st.kill(true, true);      // remove the pin spacer (resets the timeline)…
            tl.progress(1).kill();    // …then put the finished state back and retire it
            if (keepPlace) {
              const to = Math.max(0, y - pinned);
              if (lenisRef.current) lenisRef.current.scrollTo(to, { immediate: true, force: true });
              else window.scrollTo(0, to);
            }
            ScrollTrigger.refresh();
          };
          finishHeroRef.current = () => finishHero(false);
          cleanups.push(() => { finishHeroRef.current = null; });

          tl
            .fromTo(".scroll-cue", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.6 }, 0)
            .fromTo(".hero-te", { xPercent: 0 }, { xPercent: 8, duration: 11.4 }, 0)
            // 1 — the pour begins
            .fromTo(".pour-fall", { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 0.9, ease: "power2.in" }, 0.2)
            .fromTo(".jar-surface", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.0)
            // 2 — the jar fills: the level rises, the photo inside counter-moves so it stays put
            .fromTo(fill, { y: 0, yPercent: EMPTY }, { y: 0, yPercent: FULL, duration: 5.6, ease: "power1.inOut" }, 1.0)
            .fromTo(".jar-full", { y: 0, yPercent: -EMPTY }, { y: 0, yPercent: -FULL, duration: 5.6, ease: "power1.inOut" }, 1.0)
            .fromTo(".jar-glow", { scale: 0.55, opacity: 0.35 }, { scale: 1.08, opacity: 1, duration: 5.6, ease: "power1.inOut" }, 1.0)
            // 3 — the stream's tail drops in, a last drop follows
            .fromTo(".pour-body", { scaleY: 1, transformOrigin: "50% 100%" }, { scaleY: 0, duration: 0.9, ease: "power2.in" }, 6.4)
            .fromTo(".jar-surface", { opacity: 1 }, { opacity: 0, duration: 0.5, immediateRender: false }, 6.9)
            .fromTo(".pour-drop", { yPercent: -600, opacity: 1 }, { yPercent: 300, opacity: 1, duration: 0.5, ease: "power2.in", immediateRender: false }, 6.9)
            .to(".pour-drop", { opacity: 0, duration: 0.08 }, 7.4)
            // 4 — the lid screws on
            // 4 — a hand lowers the lid on, gives it a twist, lets go and lifts away
            .fromTo(".lid-rig", { y: 0, yPercent: -55, rotation: -5, opacity: 0, transformOrigin: "50% 8%" }, { y: 0, yPercent: 0, rotation: 0, opacity: 1, duration: 1.1, ease: "power2.out" }, 6.9)
            .fromTo(".jar-hand", { rotation: 0, transformOrigin: "50% 100%" }, { rotation: -7, duration: 0.35, ease: "sine.inOut" }, 8.0)
            .to(".jar-hand", { rotation: 4, duration: 0.35, ease: "sine.inOut" }, 8.35)
            .fromTo(".jar-lid", { rotation: 0, transformOrigin: "50% 8%" }, { rotation: -1.5, duration: 0.35, ease: "sine.inOut" }, 8.0)
            .to(".jar-lid", { rotation: 0, duration: 0.35, ease: "sine.inOut" }, 8.35)
            .fromTo(".jar-hand", { y: 0, yPercent: 0, opacity: 1 }, { y: 0, yPercent: -90, opacity: 0, duration: 0.8, ease: "power2.in" }, 8.75)
            .fromTo(".jar-sheen i", { xPercent: 0 }, { xPercent: 200, duration: 1, ease: "power2.inOut" }, 8.6)
            .fromTo(".hero-steps", { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: -40, duration: 0.7, ease: "power2.in" }, MOVE_AT - 0.3)
            .fromTo(".hero-steps", { "--sp": 0 }, { "--sp": 1, duration: 7.6 }, 0.2)
            // 5 — the jar steps aside, the story comes in from the left
            .fromTo(".jar-wrap", { x: dx, y: dy, scale: s0 }, { x: 0, y: 0, scale: 1, duration: 1.8, ease: "power3.inOut" }, MOVE_AT)
            .fromTo(".jar-wrap", { rotation: 0 }, { rotation: 5, duration: 0.9, ease: "power2.out" }, MOVE_AT)
            .to(".jar-wrap", { rotation: 0, duration: 0.9, ease: "power2.inOut" }, MOVE_AT + 0.9)
            .fromTo(".hero-copy .line-in", { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.14, ease: "power3.out" }, 9.8)
            .fromTo(".hero-copy .fade-up, .hero-facts", { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: "power2.out" }, 9.8)
            // the stats count up as they arrive (03 kinds, 07 sizes, 00 preservatives)
            .fromTo(facts, { v: 0 }, { v: 1, duration: 1.2, ease: "power2.out", onUpdate: () => factEls.forEach((dt, i) => { dt.textContent = String(Math.round(factEnds[i] * facts.v)).padStart(2, "0"); }) }, 9.9)
            // 6 — the buffalo jar slides out from behind and takes its place beside the cow jar
            .fromTo(".jar-buddy", { x: 0, xPercent: 62, autoAlpha: 0 }, { x: 0, xPercent: 0, autoAlpha: 1, duration: 1.3, ease: "power3.out" }, 10.0)
            .fromTo(".hero-stamp", { scale: 0.4, rotation: -120, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 1.1, ease: "back.out(1.6)" }, 10.4)
            .to({}, { duration: 0.6 });
        }

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
              const img = panel.querySelector(".promise-art img");
              // The illustration drifts gently across its panel and settles from a slight tilt.
              if (img) gsap.fromTo(img, { xPercent: -6, rotation: -3, scale: 0.92 }, { xPercent: 6, rotation: 2, scale: 1, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left right", end: "right left", scrub: true } });
              gsap.from(panel.querySelectorAll(".promise-no, .promise h3, .promise p"), { y: 60, opacity: 0, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left 75%", end: "left 35%", scrub: true } });
            });
          }
        } else {
          /* Phones: each badge swings up out of its gold ring as you scroll, the number and copy rise after it. */
          gsap.utils.toArray<HTMLElement>(".promise").forEach((panel) => {
            const art = panel.querySelector(".promise-art");
            gsap.fromTo(panel.querySelector(".promise-art img"), { scale: 0.62, rotation: -10, yPercent: 18, opacity: 0 }, {
              scale: 1, rotation: 0, yPercent: 0, opacity: 1, ease: "power2.out",
              scrollTrigger: { trigger: panel, start: "top 92%", end: "top 40%", scrub: 0.8 },
            });
            if (art) gsap.fromTo(art, { "--ring": 0.4 }, { "--ring": 1, ease: "none", scrollTrigger: { trigger: panel, start: "top 92%", end: "top 30%", scrub: true } });
            gsap.from(panel.querySelectorAll(".promise-no, .promise h3, .promise p"), { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: panel, start: "top 55%" } });
          });

          /* Phones: a gold thread down the left of the making steps fills as you read. */
          const steps = document.querySelector<HTMLElement>(".ritual-steps");
          if (steps) ScrollTrigger.create({ trigger: steps, start: "top 70%", end: "bottom 70%", onUpdate: (s) => steps.style.setProperty("--p", s.progress.toFixed(3)) });

          /* Phones: product cards pop up in pairs, jars bouncing into place. */
          gsap.utils.toArray<HTMLElement>(".card-jar img").forEach((img) => {
            gsap.from(img, { yPercent: 40, scale: 0.7, duration: 1.1, ease: "back.out(2)", scrollTrigger: { trigger: img, start: "top 95%" } });
          });
        }


        /* Ritual: the ghee line fills as you read; each step's photo opens like a temple door. */
        const ritualSteps = gsap.utils.toArray<HTMLElement>(".ritual-step");
        const ritualIndex = gsap.utils.toArray<HTMLElement>(".ritual-index li");
        if (ritualSteps.length) {
          gsap.fromTo(".ritual-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".ritual-steps", start: "top 60%", end: "bottom 60%", scrub: true } });
          gsap.from(".ritual-side > *:not(h2)", { y: 30, opacity: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".ritual", start: "top 75%" } });
          ritualSteps.forEach((step, i) => {
            const frame = step.querySelector(".ritual-photo");
            gsap.timeline({ scrollTrigger: { trigger: step, start: "top 82%" } })
              .fromTo(frame, { clipPath: "inset(100% 0% 0% 0% round 999px 999px 4px 4px)" }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 4px 4px)", duration: 1.4, ease: "expo.inOut" })
              .from(step.querySelectorAll(".ritual-photo img"), { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0.1)
              .from(step.querySelectorAll(".ritual-no, .ritual-te, h3, p"), { y: 36, opacity: 0, duration: 1.1, stagger: 0.08, ease: "expo.out" }, 0.3);
            gsap.fromTo(step.querySelector(".ritual-te"), { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: step, start: "top bottom", end: "bottom top", scrub: true } });
            ScrollTrigger.create({
              trigger: step, start: "top 60%", end: "bottom 60%",
              onToggle: (self) => { if (self.isActive) ritualIndex.forEach((li, j) => li.classList.toggle("is-on", j === i)); },
            });
          });
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
          .fromTo(".origin-frame", { clipPath: desktop ? "inset(16% 34% 0% 34% round 300px 300px 0px 0px)" : "inset(30% 18% 0% 18% round 200px 200px 0px 0px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", ease: "power2.inOut" }, 0)
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

        /* Hero (desktop): a warm spotlight follows the cursor and the jars lean gently toward it. */
        const heroEl = document.querySelector<HTMLElement>(".hero");
        if (heroEl && desktop && window.matchMedia("(hover: hover)").matches) {
          gsap.set(heroEl, { "--lx": 50, "--ly": 30 });
          const lx = gsap.quickTo(heroEl, "--lx", { duration: 1.2, ease: "power3.out" });
          const ly = gsap.quickTo(heroEl, "--ly", { duration: 1.2, ease: "power3.out" });
          const jx = gsap.quickTo(".jar", "x", { duration: 1, ease: "power3.out" });
          const jr = gsap.quickTo(".jar", "rotationY", { duration: 1, ease: "power3.out" });
          const bx = gsap.quickTo(".jar-buddy img", "x", { duration: 1.2, ease: "power3.out" });
          gsap.set(".jar", { transformPerspective: 900 });
          const move = (e: PointerEvent) => {
            const r = heroEl.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
            lx(nx * 100); ly(ny * 100);
            jx((nx - 0.5) * 14); jr((nx - 0.5) * 10); bx((nx - 0.5) * 22);
          };
          const leave = () => { lx(50); ly(30); jx(0); jr(0); bx(0); };
          heroEl.addEventListener("pointermove", move);
          heroEl.addEventListener("pointerleave", leave);
          cleanups.push(() => { heroEl.removeEventListener("pointermove", move); heroEl.removeEventListener("pointerleave", leave); });
        }

        /* Footer wordmark: the 3D letters lean toward the cursor. */
        const word = document.querySelector<HTMLElement>(".footer-word");
        if (word && window.matchMedia("(hover: hover)").matches) {
          gsap.set(word, { transformPerspective: 1200 });
          const rx = gsap.quickTo(word, "rotationX", { duration: 0.8, ease: "power3.out" });
          const ry = gsap.quickTo(word, "rotationY", { duration: 0.8, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = word.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 14);
            rx((0.5 - (e.clientY - r.top) / r.height) * 18);
          };
          const leave = () => { rx(0); ry(0); };
          word.addEventListener("pointermove", move);
          word.addEventListener("pointerleave", leave);
          cleanups.push(() => { word.removeEventListener("pointermove", move); word.removeEventListener("pointerleave", leave); });
        }

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

  /* Back-to-top button: appears after the first screen; its gold ring fills with page progress. */
  const toTopRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const btn = toTopRef.current;
      if (!btn) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const hero = document.querySelector<HTMLElement>(".hero");
      const heroBox = hero?.parentElement?.classList.contains("pin-spacer") ? hero.parentElement : hero;
      const pastHero = heroBox ? heroBox.getBoundingClientRect().bottom < window.innerHeight * 0.5 : y > window.innerHeight;
      btn.classList.toggle("is-shown", pastHero);
      btn.style.setProperty("--p", String(max > 0 ? Math.min(1, y / max) : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
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
    // Jumping past the pinned hero: finish it first, so the page doesn't shorten mid-jump.
    if (id !== "home") finishHeroRef.current?.();
    if (lenisRef.current) {
      lenisRef.current.start(); // the menu pauses scrolling; resume before jumping
      const lenis = lenisRef.current;
      // Layout can settle during the glide (pins refresh, the menu releases the page); land exactly on the section.
      lenis.scrollTo(el, { offset: 0, duration: 1.6, force: true, onComplete: () => {
        if (Math.abs(el.getBoundingClientRect().top) > 2) lenis.scrollTo(el, { offset: 0, duration: 0.5, force: true });
      } });
    } else el.scrollIntoView();
  };

  const nav = [["our-ghee", "Our ghee"], ["products", "The range"], ["about-us", "Origin"], ["promise", "Our promise"], ["contact", "Contact"]] as const;
  const mobileNav = [["our-ghee", "Our ghee"], ["process", "How it’s made"], ["products", "The range"], ["reviews", "Reviews"], ["about-us", "Origin"], ["contact", "Contact"]] as const;

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
          {mobileNav.filter(([id]) => id !== "reviews" || shownReviews.length > 0).map(([id, label], i) => (
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
          <div className="jar-glow" aria-hidden="true" />
          <div className="hero-dust" aria-hidden="true">
            {DUST.map(([l, t, size, delay, dur], i) => (
              <i key={i} style={{ left: `${l}%`, top: `${t}%`, width: size, height: size, animationDelay: `-${delay}s`, animationDuration: `${dur}s` }} />
            ))}
          </div>
          <div className="hero-frame" aria-hidden="true"><i /><i /><i /><i /></div>

          {/* While the jar fills: where you are in the making (fills with the scroll, gone once the story arrives). */}
          <ol className="hero-steps" aria-hidden="true">
            <span className="hero-steps-rail"><i className="hero-steps-fill" /></span>
            <li className="is-on"><b>01</b>Poured warm</li>
            <li><b>02</b>Filled to the brim</li>
            <li><b>03</b>Sealed with care</li>
          </ol>

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
            <div className="jar-buddy">
              <img src={HERO_JAR_BUFFALO} alt="A glass jar of Lotus buffalo ghee" width={1122} height={1402} />
              <span className="plinth" aria-hidden="true" />
            </div>
            <div className="jar-wrap">
              <GheeJar />
              <span className="plinth" aria-hidden="true" />
            </div>
            <div className="hero-stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs><path id="stamp-ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
                <text><textPath href="#stamp-ring">PURE GHEE · MADE WITH CARE · FOR YOUR FAMILY · </textPath></text>
              </svg>
              <img src="/logo.png" alt="" />
            </div>
          </figure>

          <dl className="hero-facts">
            <div><dt>03</dt><dd>Kinds of ghee</dd></div>
            <div><dt>07</dt><dd>Pack sizes</dd></div>
            <div><dt>00</dt><dd>Preservatives</dd></div>
          </dl>
          <span className="scroll-cue" aria-hidden="true"><i />Scroll to pour</span>
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
                <div className="promise-art"><img src={p.image} alt={p.alt} width={1536} height={1024} loading="lazy" /></div>
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

        {/* ——— The ritual: how we make it ——— */}
        <section className="ritual" id="process" aria-labelledby="ritual-title">
          <div className="ritual-side">
            <p className="label">(How we make it)</p>
            <h2 id="ritual-title" data-lines><Line>Five slow steps</Line><Line>to the taste</Line><Line>of <em>home.</em></Line></h2>
            <p className="ritual-lede">No shortcuts, no factory haste. Lotus ghee is made the way it has been made in Indian kitchens for generations — and you can taste every hour of it.</p>
            <div className="ritual-track" aria-hidden="true">
              <div className="ritual-meter"><span className="ritual-fill" /></div>
              <ol className="ritual-index">
                {ritual.map((r, i) => <li key={r.no} className={i === 0 ? "is-on" : ""}><b>{r.no}</b>{r.title}</li>)}
              </ol>
            </div>
          </div>

          <ol className="ritual-steps">
            {ritual.map((r) => (
              <li className="ritual-step" key={r.no}>
                <figure className="ritual-photo"><img src={r.image} alt={r.alt} width={1536} height={1024} loading="lazy" style={{ objectPosition: r.focus }} /></figure>
                <div className="ritual-copy">
                  <span className="ritual-te" lang="te" aria-hidden="true">{r.te}</span>
                  <span className="ritual-no">Step {r.no}</span>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </li>
            ))}
            <li className="ritual-cta">
              <p>Taste the difference slow-made ghee makes.</p>
              <a className="btn btn-gold" data-magnetic href={wa("Hi Lotus Ghee, I’d like to order your traditionally made ghee.")} target="_blank" rel="noopener noreferrer"><WaIcon /><span>Order a jar on WhatsApp</span></a>
            </li>
          </ol>
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

        {/* ——— Reviews ——— */}
        {shownReviews.length > 0 && (
          <section className="reviews" id="reviews" aria-labelledby="reviews-title">
            <div className="reviews-head">
              <p className="label" data-rise>(Kind words)</p>
              <h2 id="reviews-title" data-lines><Line>Loved in kitchens</Line><Line>across <em>the land.</em></Line></h2>
              <p className="reviews-sub" data-rise>What families and cooks say after their first jar of Lotus.</p>
            </div>
            {/* Two slow rows drifting in opposite directions; hover or focus pauses them. */}
            <div className="reviews-rows">
              {[0, 1].map((row) => {
                const list = shownReviews.filter((_, i) => i % 2 === row);
                const items = list.length ? list : shownReviews;
                return (
                  <div className={`reviews-row ${row ? "is-reverse" : ""}`} key={row}>
                    <div className="reviews-track">
                      {[0, 1].map((copy) => (
                        <div className="reviews-set" key={copy} aria-hidden={copy === 1}>
                          {items.map((r, i) => <ReviewCard r={r} key={i} />)}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Phones: one row you swipe through, card by card. */}
            <div className="reviews-swipe" aria-label="Customer reviews, swipe to see more" tabIndex={0}
              onScroll={(e) => {
                const el = e.currentTarget, card = el.firstElementChild as HTMLElement | null;
                if (!card) return;
                const i = Math.round(el.scrollLeft / (card.offsetWidth + 14));
                el.parentElement?.querySelectorAll(".reviews-dots i").forEach((d, j) => d.classList.toggle("is-on", j === i));
              }}>
              {shownReviews.map((r, i) => <ReviewCard r={r} key={i} />)}
            </div>
            <div className="reviews-dots" aria-hidden="true">{shownReviews.map((_, i) => <i key={i} className={i === 0 ? "is-on" : ""} />)}</div>
            <div className="reviews-foot" data-rise>
              <p>Tried Lotus ghee? We’d love to hear from you.</p>
              <a className="link" href={wa("Hi Lotus Ghee, I’d like to share a review of your ghee.")} target="_blank" rel="noopener noreferrer"><WaIcon /> Share your review on WhatsApp</a>
            </div>
          </section>
        )}

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
          <div className="trust-photo"><img src="/commitment.webp" alt="Golden ghee poured from a brass spoon into a hammered brass pot, a cow resting in the garden behind" width={1086} height={1448} loading="lazy" /></div>
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
          <div><p className="label">Visit</p>{nav.slice(0, 4).map(([id, label]) => <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>)}</div>
          <div><p className="label">Talk to us</p><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">+91 99592 16999</a><a href="mailto:hello@lotusghee.com">hello@lotusghee.com</a></div>
          <div><p className="label">Our ghee</p><span>Cow Ghee</span><span>Buffalo Ghee</span><span>A2 Cow Ghee</span></div>
        </div>
        <div className="footer-mark">
          {/* The Lotus emblem glows behind the 3D wordmark. */}
          <span className="footer-logo" aria-hidden="true"><img src="/logo.png" alt="" width={1736} height={1204} loading="lazy" /></span>
        <p className="footer-word" aria-label="Lotus Ghee">
          {"LOTUS GHEE".split("").map((ch, i) => <span className="ch-mask" key={i} aria-hidden="true"><span className="ch" data-ch={ch === " " ? "" : ch} style={{ "--i": i } as React.CSSProperties}>{ch === " " ? " " : ch}</span></span>)}
        </p>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} Lotus Ghee</span>
          <span lang="te">స్వచ్ఛమైన నెయ్యి</span>
          <a href="#home" onClick={(e) => { e.preventDefault(); go("home"); }}>Back to top ↑</a>
        </div>
      </footer>

      <button ref={toTopRef} type="button" className="to-top" aria-label="Back to top" onClick={() => go("home")}>
        <svg className="to-top-ring" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22" pathLength={1} /></svg>
        <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
      </button>
      <a className="wa-float" href={wa("Hi Lotus Ghee, I’m interested in your products. Could you please share more details?")} target="_blank" rel="noopener noreferrer" aria-label="Chat with Lotus Ghee on WhatsApp"><WaIcon /></a>
    </div>
  );
}
