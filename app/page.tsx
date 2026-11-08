"use client";

import { useEffect, useRef, useState } from "react";

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

type GheeType = "Cow Ghee" | "Buffalo Ghee";

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

export default function Home() {
  const [activeGhee, setActiveGhee] = useState<GheeType | null>(null);
  const [selectedGheeSize, setSelectedGheeSize] = useState("500 ml");
  const sizeRailRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const cowGheeTriggerRef = useRef<HTMLButtonElement>(null);
  const buffaloGheeTriggerRef = useRef<HTMLButtonElement>(null);
  const availableGheeSizes = activeGhee === "Buffalo Ghee" ? buffaloGheeSizes : cowGheeSizes;
  const selectedSizeIndex = availableGheeSizes.findIndex(({ size }) => size === selectedGheeSize);
  const selectedGheePack = availableGheeSizes[selectedSizeIndex] ?? availableGheeSizes[0];

  const centerSizeCard = (card: HTMLElement) => {
    const rail = sizeRailRef.current;
    if (!rail) return;
    const cardLeft = card.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft;
    rail.scrollTo({ left: cardLeft - (rail.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  };

  useEffect(() => {
    if (!activeGhee) return;
    const previousOverflow = document.body.style.overflow;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveGhee(null);
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !modalRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !modalRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      (activeGhee === "Buffalo Ghee" ? buffaloGheeTriggerRef : cowGheeTriggerRef).current?.focus();
    };
  }, [activeGhee]);

  useEffect(() => {
    if (!activeGhee) return;
    const frame = window.requestAnimationFrame(() => {
      const selectedCard = sizeRailRef.current?.querySelector<HTMLElement>(".ghee-size.selected");
      if (selectedCard) centerSizeCard(selectedCard);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeGhee, selectedGheeSize]);

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

    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Pure <i /> Aromatic <i /> Nutritious</p>
        <h1>The goodness<br />of <em>pure ghee.</em></h1>
        <p className="hero-description">Traditional purity, rich aroma, and wholesome nutrition — Lotus Ghee brings the authentic taste of tradition to your everyday meals.</p>
        <div className="hero-actions"><a className="button button-primary" href="#products">Explore our ghee <Icon name="arrow" /></a><a className="hero-story-link" href="#about-us">Discover our story <Icon name="arrow" /></a></div>
        <div className="hero-note"><span className="note-mark">✦</span><span>Made with care.<br /><strong>Made for your family.</strong></span></div>
      </div>
      <div className="hero-art"><img className="hero-photo" src="/hero-lotus-ghee.webp" alt="Lotus Ghee jar with ghee, spoon, brass bowl, lotus flower, and full natural background" /><div className="hero-photo-badge"><i aria-hidden="true" />Pure &amp; traditional</div></div>
    </section>

    <section className="benefit-strip" id="our-ghee" aria-label="Why Lotus Ghee">
      {benefits.map((item) => <div className="benefit" key={item.icon}><span className={`benefit-icon ${item.tone}`}><Icon name={item.icon} /></span><p>{item.title}</p></div>)}
    </section>

    <section className="products-section" id="products">
      <div className="section-heading"><p className="eyebrow pink">Our products</p><h2>Find your kind of <em>goodness.</em></h2><p>Made for every kitchen, every recipe, every day.</p></div>
      <div className="product-grid">
        {products.map((product, i) => <article className={`product-card ${product.tone}`} key={product.name}>
          <div className="product-picture"><img className="product-image" src={product.image} alt={product.name} /><span className="product-index">0{i + 1}</span></div>
          <div className="product-info"><div><h3>{product.name}</h3><p>{product.text}</p></div>{product.name === "Cow Ghee" || product.name === "Buffalo Ghee" ? <button ref={product.name === "Cow Ghee" ? cowGheeTriggerRef : buffaloGheeTriggerRef} type="button" onClick={() => { setSelectedGheeSize("500 ml"); setActiveGhee(product.name as GheeType); }} className="round-arrow" aria-label={`View ${product.name} quantities`}><Icon name="arrow" /></button> : <a href="#contact" className="round-arrow" aria-label={`Ask us about ${product.name}`}><Icon name="arrow" /></a>}</div>
        </article>)}
      </div>
    </section>

    {activeGhee && <div className="ghee-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveGhee(null); }}>
      <section ref={modalRef} className={`ghee-modal${activeGhee === "Buffalo Ghee" ? " buffalo-ghee-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="ghee-product-title" aria-describedby="ghee-product-description">
        <button ref={closeButtonRef} type="button" className="ghee-modal-close" onClick={() => setActiveGhee(null)} aria-label={`Close ${activeGhee} quantities`}>×</button>
        <div className="ghee-modal-content">
          <div className="ghee-modal-heading">
            <div><p className="eyebrow pink">Our available sizes</p><h2 id="ghee-product-title">{activeGhee}</h2><p id="ghee-product-description">{activeGhee === "Buffalo Ghee" ? "Thicker, creamier and full of flavour. Pick a pack for your kitchen." : "Traditional, aromatic and rich in nutrition. Pick a pack for your kitchen."}</p></div>
            <span className="ghee-quality-pill"><span />{activeGhee === "Buffalo Ghee" ? "Rich & creamy" : "Pure & traditional"}</span>
          </div>
          <div className="ghee-modal-showcase">
            <div className="ghee-selected-preview" aria-live="polite">
              <span className="ghee-preview-caption">Your selected pack</span>
              <img key={`${activeGhee}-${selectedGheeSize}`} src={selectedGheePack.image} alt={`${selectedGheeSize} Lotus ${activeGhee} pack`} style={{ "--pack-height": selectedGheePack.packHeight } as React.CSSProperties} />
              <span className="ghee-preview-size">{selectedGheeSize}</span>
            </div>
            <div className="ghee-size-carousel">
              <div className="ghee-carousel-heading"><span>Choose your pack</span><span>{String(selectedSizeIndex + 1).padStart(2, "0")} <i>/</i> {String(availableGheeSizes.length).padStart(2, "0")}</span></div>
              <div className="ghee-size-grid" ref={sizeRailRef} aria-label={`${activeGhee} sizes`} tabIndex={0}>{availableGheeSizes.map(({ size, image, packHeight }, index) => <button type="button" key={size} style={{ "--tile-index": index, "--pack-height": packHeight } as React.CSSProperties} onClick={(event) => { setSelectedGheeSize(size); centerSizeCard(event.currentTarget); }} aria-pressed={selectedGheeSize === size} className={`ghee-size${selectedGheeSize === size ? " selected" : ""}`}><span className="ghee-card-selected-mark" aria-hidden="true">✓</span><span className="ghee-size-image"><img src={image} alt={`${size} Lotus ${activeGhee} pack`} /></span><span className="ghee-size-label">{size}<span className="ghee-size-check">{selectedGheeSize === size ? "Selected" : "Select"}</span></span></button>)}</div>
              <div className="ghee-carousel-progress" role="progressbar" aria-label="Selected pack position" aria-valuemin={1} aria-valuemax={availableGheeSizes.length} aria-valuenow={selectedSizeIndex + 1}><span style={{ width: `${((selectedSizeIndex + 1) / availableGheeSizes.length) * 100}%` }} /></div>
              <div className="ghee-carousel-controls"><span>Swipe to explore all {availableGheeSizes.length} pack sizes</span></div>
            </div>
          </div>
          <div className="ghee-modal-footer"><div className="ghee-selection-summary"><span className="ghee-selection-icon"><Icon name="leaf" /></span><span><small>Your selection</small><strong>{selectedGheeSize} <i>·</i> {activeGhee}</strong></span></div><a className="ghee-enquire-button" href={`https://wa.me/919959216999?text=${encodeURIComponent(`Hi Lotus Ghee, I’m interested in ${activeGhee} (${selectedGheeSize}). Please share the price and availability.`)}`} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a></div>
        </div>
      </section>
    </div>}

    <section className="origin-section" id="about-us">
      <div className="origin-art"><img className="origin-photo" src="/natural-origin-cows.webp" alt="A cow and calf standing together in a green pasture" /><div className="origin-stamp"><img src="/logo.png" alt="" /><span>GOODNESS<br />FROM THE<br />GROUND UP</span></div></div>
      <div className="origin-copy"><p className="eyebrow green">Natural origin</p><h2>From healthy cows<br />to your <em>home.</em></h2><p>We believe the best ghee begins with care. From well-cared-for cows to a time-honoured process, every jar brings natural richness and consistent quality to your table.</p><a href="#commitment" className="text-link">Our promise to you <Icon name="arrow" /></a></div>
    </section>

    <section className="commitment-section" id="commitment">
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
