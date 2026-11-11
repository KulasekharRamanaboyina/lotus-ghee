"use client";

import { useEffect } from "react";

const benefits = [
  { icon: "leaf", title: <>100% Pure <span>&amp; Natural</span></>, tone: "green" },
  { icon: "steam", title: <>Rich Aroma <span>&amp; Authentic Taste</span></>, tone: "gold" },
  { icon: "heart", title: <>Nutrient <span>Rich</span></>, tone: "pink" },
  { icon: "flask", title: <>No Preservatives <span>or Additives</span></>, tone: "gold" },
];

const products = [
  { name: "Cow Ghee", text: "Traditional, aromatic and rich in nutrition.", tone: "rose", image: "/cow-ghee-ultrahd.webp" },
  { name: "Buffalo Ghee", text: "Thicker, creamier and full of flavour.", tone: "sage", image: "/buffalo-ghee-ultrahd.webp" },
  { name: "A2 Cow Ghee", text: "From indigenous cows, crafted for everyday wellness.", tone: "butter", image: "/a2-ghee-ultrahd.webp" },
];

const ambientParticles = [
  ["5%", "18%", "5px", "6.8s", "0s"], ["93%", "13%", "4px", "7.6s", "1.2s"],
  ["9%", "42%", "3px", "5.9s", "2.4s"], ["88%", "36%", "6px", "8.2s", ".7s"],
  ["3%", "69%", "4px", "7.1s", "1.8s"], ["96%", "57%", "3px", "6.3s", "3.1s"],
  ["14%", "87%", "5px", "8.5s", "2.8s"], ["82%", "81%", "4px", "6.6s", "1.4s"],
  ["46%", "8%", "3px", "7.8s", "3.5s"], ["72%", "27%", "5px", "6.1s", ".4s"],
  ["28%", "59%", "3px", "9s", "2.1s"], ["61%", "92%", "4px", "7.3s", "3.8s"],
  ["22%", "7%", "3px", "7.4s", "2.7s"], ["39%", "16%", "2px", "6.2s", "1.5s"],
  ["67%", "12%", "3px", "8.1s", "4.2s"], ["84%", "22%", "2px", "7.2s", "2.3s"],
  ["16%", "31%", "2px", "8.8s", ".9s"], ["55%", "34%", "3px", "6.7s", "3.4s"],
  ["76%", "43%", "2px", "9.1s", "1.1s"], ["31%", "49%", "3px", "7.9s", "4.5s"],
  ["12%", "55%", "2px", "6.4s", "3.7s"], ["49%", "63%", "2px", "8.6s", ".6s"],
  ["69%", "68%", "3px", "7.5s", "2.9s"], ["91%", "73%", "2px", "6.9s", "4.1s"],
  ["24%", "76%", "3px", "8.3s", "1.7s"], ["42%", "84%", "2px", "6.5s", "3.2s"],
  ["58%", "96%", "3px", "9.3s", "1.3s"], ["78%", "91%", "2px", "7.7s", ".8s"],
  ["7%", "94%", "2px", "8.9s", "2s"], ["97%", "45%", "2px", "6.6s", "3.6s"],
  ["35%", "25%", "2px", "7.1s", "4.7s"], ["64%", "51%", "2px", "8.4s", "1.9s"],
];

const cowGheeSizes = [
  { size: "15 ml", image: "/cow/cow-ghee-15ml-cutout-aligned.webp", packHeight: "58%" },
  { size: "50 ml", image: "/cow/cow-ghee-small-cutout-aligned.webp", packHeight: "76%" },
  { size: "100 ml", image: "/cow/cow-ghee-medium-aligned.webp", packHeight: "82%" },
  { size: "200 ml", image: "/cow/cow-ghee-curved-cutout-aligned.webp", packHeight: "86%" },
  { size: "500 ml", image: "/cow/cow-ghee-curved-cutout-aligned.webp", packHeight: "92%" },
  { size: "1 ltr", image: "/cow/cow-ghee-curved-cutout-aligned.webp", packHeight: "100%" },
  { size: "15 ltr", image: "/cow/cow-ghee-tin-aligned.webp", packHeight: "100%" },
];

const buffaloGheeSizes = [
  { size: "15 ml", image: "/buffalo/buffalo-ghee-15ml-cutout-aligned.webp", packHeight: "58%" },
  { size: "50 ml", image: "/buffalo/buffalo-ghee-small-cutout-aligned.webp", packHeight: "76%" },
  { size: "100 ml", image: "/buffalo/buffalo-ghee-cutout-aligned.webp", packHeight: "82%" },
  { size: "200 ml", image: "/buffalo/buffalo-ghee-curved-cutout-aligned.webp", packHeight: "86%" },
  { size: "500 ml", image: "/buffalo/buffalo-ghee-curved-cutout-aligned.webp", packHeight: "92%" },
  { size: "1 ltr", image: "/buffalo/buffalo-ghee-curved-cutout-aligned.webp", packHeight: "100%" },
  { size: "15 ltr", image: "/buffalo/buffalo-ghee-tin-aligned.webp", packHeight: "100%" },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    leaf: <><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c3-6 7-9 13-13"/></>,
    steam: <><path d="M7 19c-2-2 2-3 0-5s2-3 0-5"/><path d="M12 19c-2-2 2-3 0-5s2-3 0-5"/><path d="M17 19c-2-2 2-3 0-5s2-3 0-5"/><path d="M4 21h16"/></>,
    heart: <path d="M20.8 8.6c0 5.1-8.8 11-8.8 11s-8.8-5.9-8.8-11a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z"/>,
    flask: <><path d="M9 3h6M10 3v6L5 18a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3L14 9V3"/><path d="M8 15h8M4 4l16 16"/></>,
    medal: <><circle cx="12" cy="8" r="6"/><path d="m8 13-1 8 5-3 5 3-1-8"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function CowScene() {
  return <img className="cow-photo" src="/cow-pasture.webp" alt="A healthy cow and calf grazing in a green pasture" />;
}

function GheeBowlMark() {
  return <svg className="pack-ghee-mark" viewBox="0 0 160 120" fill="none" aria-hidden="true">
    <path d="M31 54h98c-4 30-21 49-49 49S35 84 31 54Z" />
    <path d="M29 53c0-7 22-13 51-13s51 6 51 13-22 13-51 13-51-6-51-13Z" />
    <path d="M45 73c11 5 22 7 35 7s24-2 35-7M60 104v5h40v-5" />
    <path d="M79 22c-8 9-10 14-10 19a11 11 0 0 0 22 0c0-5-3-10-12-19Z" />
    <path d="m113 31 2 5m-2 0 2-5" />
  </svg>;
}

export default function Home() {
  const moveProductShelf = (button: HTMLButtonElement, direction: -1 | 1) => {
    const section = button.closest<HTMLElement>("[data-horizontal-section]");
    const viewport = section?.querySelector<HTMLElement>(".product-scroll-viewport");
    const track = section?.querySelector<HTMLElement>("[data-horizontal-track]");
    if (!section || !viewport || !track) return;
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (!section.classList.contains("is-scroll-enhanced")) {
      viewport.scrollBy({ left: direction * viewport.clientWidth * 0.82, behavior });
      return;
    }
    const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
    if (!travel) return;
    const progress = section.classList.contains("is-scroll-enhanced")
      ? Number(section.querySelector<HTMLElement>("[data-horizontal-track]")?.getAnimations()[0]?.currentTime ?? 0) / 1000
      : viewport.scrollLeft / travel;
    const nextProgress = Math.max(0, Math.min(1, progress + direction * viewport.clientWidth * 0.82 / travel));
    const stickyTop = window.matchMedia("(max-width: 1000px)").matches ? 12 : 76;
    window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - stickyTop + nextProgress * travel, behavior });
  };

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-panel]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        panels.forEach((panel) => {
          if (reducedMotion.matches) {
            panel.style.removeProperty("transform");
            panel.style.removeProperty("opacity");
            return;
          }
          const rect = panel.getBoundingClientRect();
          const range = Math.max(280, Math.min(window.innerHeight * 0.9, rect.height));
          const progress = Math.max(0, Math.min(1, -rect.top / range));
          panel.style.transform = `scale(${1 - progress * 0.3})`;
          panel.style.opacity = String(1 - progress * 0.5);
        });
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      reducedMotion.removeEventListener("change", update);
      if (frame) window.cancelAnimationFrame(frame);
      panels.forEach((panel) => {
        panel.style.removeProperty("transform");
        panel.style.removeProperty("opacity");
      });
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-horizontal-section]"));
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const rails = sections.map((section) => {
      const stage = section.querySelector<HTMLElement>(".product-scroll-stage");
      const viewport = section.querySelector<HTMLElement>(".product-scroll-viewport");
      const track = section.querySelector<HTMLElement>("[data-horizontal-track]");
      return { section, stage, viewport, track, travel: 0, animation: null as Animation | null };
    }).filter((rail) => rail.stage && rail.viewport && rail.track);

    const measure = () => {
      rails.forEach((rail) => {
        if (!rail.stage || !rail.viewport || !rail.track) return;
        rail.animation?.cancel();
        rail.animation = null;
        rail.travel = 0;
        if (rail.stage) {
          rail.stage.style.removeProperty("transform");
          rail.stage.style.removeProperty("opacity");
        }
        rail.section.classList.remove("is-scroll-enhanced");
        rail.section.style.removeProperty("--horizontal-section-height");
        rail.track.style.transform = "";
        if (!media.matches) return;

        rail.travel = Math.max(0, rail.track.scrollWidth - rail.viewport.clientWidth);
        if (rail.travel < 80) return;
        rail.section.style.setProperty("--horizontal-section-height", `${rail.stage.offsetHeight + rail.travel}px`);
        rail.section.classList.add("is-scroll-enhanced");
        rail.animation = rail.track.animate(
          [{ transform: "translateX(0px)" }, { transform: `translateX(-${rail.travel}px)` }],
          { duration: 1000, fill: "both", easing: "linear" },
        );
        rail.animation.pause();
      });
      update();
    };

    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        rails.forEach((rail) => {
          if (!rail.viewport || !rail.track) return;
          let progress = 0;
          if (rail.animation && rail.travel) {
            const stickyTop = window.matchMedia("(max-width: 1000px)").matches ? 12 : 76;
            progress = Math.max(0, Math.min(1, (stickyTop - rail.section.getBoundingClientRect().top) / rail.travel));
            rail.animation.currentTime = progress * 1000;
          } else {
            const horizontalTravel = rail.track.scrollWidth - rail.viewport.clientWidth;
            if (horizontalTravel > 0) progress = rail.viewport.scrollLeft / horizontalTravel;
          }
          const currentPack = rail.section.querySelector<HTMLElement>("[data-scroll-current]");
          const packCount = Number(rail.section.dataset.scrollTotal) || 0;
          if (currentPack && packCount) {
            const packLabel = String(Math.min(packCount, Math.floor(progress * (packCount - 1)) + 1)).padStart(2, "0");
            if (currentPack.textContent !== packLabel) currentPack.textContent = packLabel;
          }
        });
      });
    };

    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    rails.forEach((rail) => rail.viewport?.addEventListener("scroll", update, { passive: true }));
    const touchStates = rails.map((rail) => {
      let previousX = 0;
      let startX = 0;
      let startY = 0;
      let horizontal = false;
      const start = (event: TouchEvent) => {
        if (!rail.section.classList.contains("is-scroll-enhanced") || event.touches.length !== 1 || (event.target as HTMLElement).closest("a,button")) return;
        previousX = startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        horizontal = false;
      };
      const move = (event: TouchEvent) => {
        if (event.touches.length !== 1 || !rail.section.classList.contains("is-scroll-enhanced")) return;
        const touch = event.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        if (!horizontal && Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15) horizontal = true;
        if (!horizontal) return;
        event.preventDefault();
        window.scrollBy({ top: previousX - touch.clientX, behavior: "auto" });
        previousX = touch.clientX;
      };
      const end = () => { horizontal = false; };
      rail.viewport?.addEventListener("touchstart", start, { passive: true });
      rail.viewport?.addEventListener("touchmove", move, { passive: false });
      rail.viewport?.addEventListener("touchend", end, { passive: true });
      rail.viewport?.addEventListener("touchcancel", end, { passive: true });
      return { viewport: rail.viewport, start, move, end };
    });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
      rails.forEach((rail) => rail.viewport?.removeEventListener("scroll", update));
      touchStates.forEach(({ viewport, start, move, end }) => {
        viewport?.removeEventListener("touchstart", start);
        viewport?.removeEventListener("touchmove", move);
        viewport?.removeEventListener("touchend", end);
        viewport?.removeEventListener("touchcancel", end);
      });
      if (frame) window.cancelAnimationFrame(frame);
      rails.forEach((rail) => rail.animation?.cancel());
    };
  }, []);

  return <main>
    <div className="home-particles" aria-hidden="true">{ambientParticles.map(([x, y, size, duration, delay], index) => <span key={index} style={{ "--particle-x": x, "--particle-y": y, "--particle-size": size, "--particle-duration": duration, "--particle-delay": delay } as React.CSSProperties} />)}</div>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Lotus Ghee home">
        <img src="/logo.png" alt="" /><span><strong>LOTUS</strong><b>GHEE</b></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a className="active" href="#home">Home</a><a href="#our-ghee">Our Ghee</a><a href="#products">Products</a><a href="#about-us">About Us</a><a href="#contact">Contact</a>
      </nav>
      <a className="mobile-cta" href="#products">Explore <Icon name="arrow" /></a>
    </header>

    <section className="hero" id="home" data-scroll-panel>
      <div className="hero-copy">
        <p className="eyebrow">Pure <i /> Aromatic <i /> Nutritious</p>
        <h1>The goodness<br />of <em>pure ghee.</em></h1>
        <p className="hero-description">Traditional purity, rich aroma, and wholesome nutrition — Lotus Ghee brings the authentic taste of tradition to your everyday meals.</p>
        <div className="hero-actions"><a className="button button-primary" href="#products">Explore our ghee <Icon name="arrow" /></a><a className="hero-story-link" href="#about-us">Discover our story <Icon name="arrow" /></a></div>
        <div className="hero-note"><span className="note-mark">✦</span><span>Made with care.<br /><strong>Made for your family.</strong></span></div>
      </div>
      <div className="hero-art"><img className="hero-photo" src="/hero-lotus-ghee.webp" alt="Lotus Ghee jar with ghee, spoon, brass bowl, lotus flower, and full natural background" /><div className="hero-photo-badge"><i aria-hidden="true" />Pure &amp; traditional</div></div>
    </section>

    <section className="benefit-strip" id="our-ghee" aria-label="Why Lotus Ghee" data-scroll-panel>
      {benefits.map((item) => <div className="benefit" key={item.icon}><span className={`benefit-icon ${item.tone}`}><Icon name={item.icon} /></span><p>{item.title}</p></div>)}
    </section>

    <section className="products-section" id="products">
      <div className="section-heading" data-reveal><p className="eyebrow pink">Our products</p><h2>Find your kind of <em>goodness.</em></h2><p>Explore every pack, made for every kitchen and every day.</p></div>
      <div className="ghee-categories">
        {([
          { name: "Cow Ghee" as const, eyebrow: "Traditional & aromatic", text: "Traditional, aromatic and rich in nutrition.", tone: "cow-ghee", sizes: cowGheeSizes },
          { name: "Buffalo Ghee" as const, eyebrow: "Rich & creamy", text: "Thicker, creamier and full of flavour.", tone: "buffalo", sizes: buffaloGheeSizes },
        ]).map((category, categoryIndex) => <section className={`ghee-category ${category.tone}`} key={category.name} aria-labelledby={`${category.tone}-ghee-title`} data-horizontal-section data-scroll-total={category.sizes.length}>
          <div className="product-scroll-stage">
            <div className="ghee-category-heading">
              <div className="category-title-lockup"><span className="category-index">0{categoryIndex + 1}</span><div data-reveal style={{ "--pack-index": categoryIndex } as React.CSSProperties}><p className="eyebrow">{category.eyebrow}</p><h3 id={`${category.tone}-ghee-title`}>{category.name}</h3><p>{category.text}</p></div></div>
              <div className="product-shelf-controls"><span className="category-count">{category.sizes.length} pack sizes</span><div className="product-shelf-position" aria-live="polite"><span data-scroll-current>01</span><i>/</i>{String(category.sizes.length).padStart(2, "0")}</div><button type="button" className="product-shelf-arrow previous" onClick={(event) => moveProductShelf(event.currentTarget, -1)} aria-label={`Previous ${category.name} packs`}><Icon name="arrow" /></button><button type="button" className="product-shelf-arrow" onClick={(event) => moveProductShelf(event.currentTarget, 1)} aria-label={`Next ${category.name} packs`}><Icon name="arrow" /></button></div>
            </div>
            <div className="product-scroll-viewport"><div className="pack-grid" data-horizontal-track>{category.sizes.map(({ size, image, packHeight }) => <article className="pack-card" key={size}>
            <span className="pack-number">{size}</span>
            <div className="pack-image"><img src={image} alt={`${size} Lotus ${category.name}`} style={{ "--pack-height": packHeight } as React.CSSProperties} loading="lazy" /><span className="pack-shine" aria-hidden="true" /></div>
            <div className="pack-label"><strong>{category.name}</strong><a className="pack-enquiry-link" href={`https://wa.me/919959216999?text=${encodeURIComponent(`Hi Lotus Ghee, I’m interested in ${category.name} (${size}). Please share the price and availability.`)}`} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp<GheeBowlMark /></a></div>
            </article>)}</div></div>
          </div>
        </section>)}
      </div>
      <article className="a2-feature" data-reveal><img src="/a2-ghee-ultrahd.webp" alt="Lotus A2 Cow Ghee" loading="lazy" /><div><p className="eyebrow pink">Also available</p><h3>A2 Cow Ghee</h3><p>From indigenous cows, crafted for everyday wellness.</p></div><a href={`https://wa.me/919959216999?text=${encodeURIComponent("Hi Lotus Ghee, I’m interested in A2 Cow Ghee. Please share the price and availability.")}`} target="_blank" rel="noopener noreferrer" className="round-arrow" aria-label="Enquire about A2 Cow Ghee on WhatsApp"><Icon name="arrow" /></a></article>
    </section>

    <section className="origin-section" id="about-us" data-scroll-panel>
      <div className="origin-art"><img className="origin-photo" src="/natural-origin-cows.webp" alt="A cow and calf standing together in a green pasture" /><div className="origin-stamp"><img src="/logo.png" alt="" /><span>GOODNESS<br />FROM THE<br />GROUND UP</span></div></div>
      <div className="origin-copy"><p className="eyebrow green">Natural origin</p><h2>From healthy cows<br />to your <em>home.</em></h2><p>We believe the best ghee begins with care. From well-cared-for cows to a time-honoured process, every jar brings natural richness and consistent quality to your table.</p><a href="#commitment" className="text-link">Our promise to you <Icon name="arrow" /></a></div>
    </section>

    <section className="commitment-section" id="commitment" data-scroll-panel>
      <div className="commitment-copy"><p className="eyebrow pink">Our commitment</p><h2>Purity you can <em>trust.</em></h2><p>Good food starts with good choices. We keep our process simple and our promise clear.</p></div>
      <div className="commitment-list">
        <div><span className="commit-icon"><Icon name="leaf" /></span><p>Quality<br /><strong>sourcing</strong></p></div>
        <div><span className="commit-icon"><Icon name="medal" /></span><p>Traditional<br /><strong>process</strong></p></div>
        <div><span className="commit-icon"><Icon name="shield" /></span><p>Consistent<br /><strong>purity</strong></p></div>
      </div>
      <img className="serving-photo" src="/serving-dish.webp" alt="A traditional dish finished with a spoonful of golden ghee" />
    </section>

    <footer className="site-footer" id="contact"><a className="brand footer-brand" href="#home"><img src="/logo.png" alt="" /><span><strong>LOTUS</strong><b>GHEE</b></span></a><p>Pure goodness, made for sharing.</p><a href="mailto:hello@lotusghee.com">Get in touch <Icon name="arrow" /></a><small>© {new Date().getFullYear()} Lotus Ghee</small></footer>
    <a className="whatsapp-float" href="https://wa.me/919959216999?text=Hi%20Lotus%20Ghee%2C%20I%E2%80%99m%20interested%20in%20your%20products.%20Could%20you%20please%20share%20more%20details%3F" target="_blank" rel="noopener noreferrer" aria-label="Chat with Lotus Ghee on WhatsApp">
      <span className="whatsapp-tooltip">Chat with us</span>
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 3.2A12.5 12.5 0 0 0 5.3 22.2L3.7 28l6-1.6A12.5 12.5 0 1 0 16 3.2Z"/><path d="M12.4 10.1c-.3-.7-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.6s-1.5 1.5-1.5 3.6 1.5 4.1 1.7 4.4c.2.3 2.9 4.6 7.1 6.2 3.5 1.4 4.2 1.1 5 .9.8-.1 2.5-1 2.8-2 .4-1 .4-1.8.2-2-.1-.2-.4-.3-.9-.6l-2.6-1.2c-.3-.1-.6-.2-.9.2l-1.2 1.5c-.2.3-.5.3-.9.1a10.2 10.2 0 0 1-3-1.9 11.1 11.1 0 0 1-2.1-2.6c-.2-.4 0-.6.2-.8l.7-.8c.2-.3.3-.5.4-.7.1-.3 0-.6 0-.8l-1.2-2.8Z"/></svg>
    </a>
  </main>;
}
