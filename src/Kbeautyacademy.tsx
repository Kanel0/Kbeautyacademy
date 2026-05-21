import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Accueil", "Formations", "Boutique", "À propos", "Avis élèves", "Blog", "Contact"];

const FORMATIONS = [
  {
    tag: "BEST-SELLER",
    title: "Prothésiste Ongulaire",
    subtitle: "2 JOURS INTENSIFS",
    price: "300€",
    features: [
      "Pose de gel + chablon",
      "Renforcement",
      "French parfaite",
      "Finitions professionnelles",
    ],
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&q=80",
  },
  {
    tag: "",
    title: "Cils : Pose Cil à Cil",
    subtitle: "FORMATION DÉBUTANTE",
    price: "350€",
    features: [
      "Maîtrise de la pose cil à cil",
      "Isolation parfaite",
      "Effet naturel",
      "Entretien & Remplace",
    ],
    img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&q=80",
  },
  {
    tag: "",
    title: "Cils : Volume Russe",
    subtitle: "FORMATION AVANCÉE",
    price: "450€",
    features: [
      "Technique volume russe",
      "Éventails fait main",
      "Mapping",
      "Atelier pratique",
    ],
    img: "https://images.unsplash.com/photo-1590422749897-47036da0b0ff?w=300&q=80",
  },
  {
    tag: "",
    title: "Nail Art & Décorations",
    subtitle: "2 JOURS",
    price: "250€",
    features: [
      "Nail art tendance",
      "Strass, chrome, babyboomer",
      "Fleurs, chrome, babyboomer",
      "Atelier pratique",
    ],
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&q=80",
  },
  {
    tag: "",
    title: "Business & Branding",
    subtitle: "100% EN LIGNE",
    price: "200€",
    features: [
      "Créer son activité",
      "Stratégie réseaux",
      "Tarification & clients",
      "Personal branding",
    ],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&q=80",
  },
];

const BOUTIQUE = [
  { name: "Kit Prothésiste", sub: "Complet", price: "99,90€", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80" },
  { name: "Kit Cil à Cil", sub: "Complet", price: "69,90€", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80" },
  { name: "Lampe UV/LED", sub: "Complet", price: "49,50€", img: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=200&q=80" },
];

const INSTA = [
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&q=80",
  "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&q=80",
  "https://images.unsplash.com/photo-1590422749897-47036da0b0ff?w=300&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80",
];

const WHY = [
  "Formations 100% pratiques",
  "Format intensif & efficace",
  "Petits groupes",
  "Formateurs expérimentés",
  "Certification incluse",
  "Suivi personnalisé",
  "25 élèves max par session",
];

function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

function AnimatedCounter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref as React.Ref<HTMLSpanElement>}>{count.toLocaleString()}{suffix}</span>;
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }: { children: React.ReactNode; delay?: number; direction?: string; className?: string }) {
  const [ref, inView] = useInView();
  const translate =
    direction === "up"
      ? "translateY(40px)"
      : direction === "left"
        ? "translateX(-40px)"
        : direction === "right"
          ? "translateX(40px)"
          : "translateY(-20px)";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : translate,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ParallaxImage({ src, alt, style = {} }: { src: string; alt: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const section = ref.current.closest("section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const offset = rect.top * 0.25;
      ref.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      style={{
        ...style,
        willChange: "transform",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    />
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress((scrollTop / (scrollHeight - clientHeight)) * 100);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 3, zIndex: 999, background: "rgba(201,116,138,0.15)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #c9748a, #e8a0b0)", transition: "width 0.1s linear" }} />
    </div>
  );
}

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

export default function KBeautyAcademy() {
  const scrolled = useScrolled();

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#2a2a2a", background: "#fff", minWidth: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .sans { font-family: 'Jost', sans-serif; }
        .btn-primary {
          background: #c9748a; color: #fff; border: none; border-radius: 30px;
          padding: 12px 28px; font-family: 'Jost', sans-serif; font-size: 13px;
          font-weight: 500; letter-spacing: 0.05em; cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
        }
        .btn-primary:hover { background: #b0637a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,116,138,0.35); }
        .btn-outline {
          background: transparent; color: #c9748a; border: 1.5px solid #c9748a;
          border-radius: 30px; padding: 10px 24px; font-family: 'Jost', sans-serif;
          font-size: 13px; font-weight: 500; letter-spacing: 0.05em; cursor: pointer;
          transition: all 0.25s;
        }
        .btn-outline:hover { background: #c9748a; color: #fff; }
        .section-label { font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #c9748a; font-weight: 500; }
        .pink-text { color: #c9748a; font-style: italic; }
        .card-hover { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(201,116,138,0.18); }
        a { text-decoration: none; color: inherit; }
        .check { color: #c9748a; margin-right: 8px; }
        .img-zoom { overflow: hidden; }
        .img-zoom img { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
        .img-zoom:hover img { transform: scale(1.08); }
        .stagger-child:nth-child(1) { transition-delay: 0ms !important; }
        .stagger-child:nth-child(2) { transition-delay: 80ms !important; }
        .stagger-child:nth-child(3) { transition-delay: 160ms !important; }
        .stagger-child:nth-child(4) { transition-delay: 240ms !important; }
        .stagger-child:nth-child(5) { transition-delay: 320ms !important; }
        .nav-link { position: relative; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.03em; transition: color 0.2s; cursor: pointer; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: #c9748a; transition: width 0.3s; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .why-item { transition: transform 0.2s, background 0.2s; border-radius: 10px; padding: 8px 10px; cursor: default; }
        .why-item:hover { transform: translateX(6px); background: rgba(201,116,138,0.06); }
        .boutique-row { transition: background 0.2s, transform 0.2s; border-radius: 12px; cursor: pointer; }
        .boutique-row:hover { background: #fff; transform: scale(1.02); box-shadow: 0 6px 20px rgba(201,116,138,0.12); }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-inner { display: flex; animation: tickerScroll 18s linear infinite; white-space: nowrap; }
        .ticker-inner:hover { animation-play-state: paused; }
        .stat-float { animation: float 3s ease-in-out infinite; }
        .stat-float:nth-child(2) { animation-delay: 0.5s; }
        .stat-float:nth-child(3) { animation-delay: 1s; }
        .insta-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 10px; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 38px !important; }
          .grid-5 { grid-template-columns: 1fr 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-cta { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .insta-grid { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>

      <ScrollProgress />

      {/* TICKER PROMO */}
      <div style={{ background: "#2a2a2a", color: "#fff", overflow: "hidden", height: 36, display: "flex", alignItems: "center" }}>
        <div className="ticker-inner" style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, letterSpacing: "0.06em" }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 32, padding: "0 32px" }}>
              <span>🎉 OFFRE DE LANCEMENT - 10% sur toutes nos formations jusqu'au 31 Mai !</span>
              <span style={{ color: "#c9748a" }}>✦</span>
              <span>Découvrir l'offre</span>
            </span>
          ))}
        </div>
      </div>

      {/* NAVBAR */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "10px 5%" : "16px 5%",
        background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
        borderBottom: "0.5px solid #f0e8ea",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "0 2px 12px rgba(0,0,0,0.04)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, background: "#2a2a2a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 600, fontSize: 16, fontFamily: "serif" }}>K</span>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.15em", fontFamily: "'Jost', sans-serif", textTransform: "uppercase" }}>K Beauty</div>
          </div>
        </div>

        <div className="hide-mobile" style={{ display: "flex", gap: 28 }}>
          {NAV_LINKS.map((l, i) => (
            <a key={l} href="#" className={`nav-link${i === 0 ? " active" : ""}`} style={{ color: i === 0 ? "#c9748a" : "#2a2a2a" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c9748a"}
              onMouseLeave={e => e.currentTarget.style.color = i === 0 ? "#c9748a" : "#2a2a2a"}>
              {l}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="hide-mobile" style={{ fontFamily: "'Jost', sans-serif", fontSize: 16, color: "#2a2a2a", cursor: "pointer" }}>Q</span>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "88vh", overflow: "hidden", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 5% 60px 7%", gap: 20, background: "#fdf8f9" }}>
          <FadeIn direction="up" delay={0}>
            <span className="section-label">DEVENEZ EXPERTE</span>
          </FadeIn>
          <FadeIn direction="up" delay={120}>
            <h1 className="hero-title" style={{ fontSize: 56, lineHeight: 1.08, fontWeight: 300, letterSpacing: "-0.01em" }}>
              Prothésiste<br />
              <em className="pink-text">Ongulaire</em> & Experte<br />
              Cils
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={220}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, maxWidth: 420 }}>
              Formations professionnelles 100% pratiques, accessibles et rentables.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={300}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "'Jost', sans-serif", fontSize: 13, color: "#555" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#c9748a", fontSize: 14 }}>✦</span> Apprenez avec des experts
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#c9748a", fontSize: 14 }}>✦</span> Certification à la fin de chaque formation
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#c9748a", fontSize: 14 }}>✦</span> Accès conseils et communauté privée
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={380}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-primary">Réserver un appel</button>
              <button className="btn-outline">Découvrir</button>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={440}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4, fontFamily: "'Jost', sans-serif", fontSize: 13, color: "#666" }}>
              <div style={{ display: "flex" }}>
                {[11, 12, 13, 14].map((n, i) => (
                  <img key={n} src={`https://i.pravatar.cc/32?img=${n}`} alt="" style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid #fff", marginLeft: i === 0 ? 0 : -8 }} />
                ))}
              </div>
              <span><span style={{ color: "#e8b400" }}>★★★★★</span> <strong>4,9/5</strong> · +1500 élèves déjà formées avec succès</span>
            </div>
          </FadeIn>
        </div>

        <div style={{ position: "relative", overflow: "hidden" }}>
          <ParallaxImage
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=90"
            alt="Ongles réalisés par nos élèves"
            style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 30%", marginTop: "-7%" }}
          />
          {/* Stats flottantes */}
          <div style={{ position: "absolute", top: 32, right: 24, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { value: 2500, suffix: "+", label: "Élèves formées" },
              { value: 98, suffix: "%", label: "Taux de satisfaction" },
              { value: 100, suffix: "%", label: "De réussite" },
            ].map((s) => (
              <div key={s.label} className="stat-float" style={{ background: "rgba(255,255,255,0.96)", borderRadius: 14, padding: "10px 14px", textAlign: "center", boxShadow: "0 8px 28px rgba(201,116,138,0.18)" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#c9748a", fontFamily: "'Jost', sans-serif" }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 10, color: "#888", fontFamily: "'Jost', sans-serif", letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
          {/* Prix card */}
          <FadeIn direction="right" delay={600}>
            <div style={{ position: "absolute", bottom: 32, right: 24, background: "#fff", borderRadius: 16, padding: "16px 22px", boxShadow: "0 12px 40px rgba(0,0,0,0.14)", maxWidth: 230 }}>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9748a", marginBottom: 4 }}>FORMATION PROTHÉSISTE ONGULAIRE</div>
              <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 10, color: "#bbb", marginBottom: 6 }}>2 Jours Intensifs</div>
              <div style={{ fontSize: 30, fontWeight: 700, color: "#2a2a2a", fontFamily: "'Jost', sans-serif" }}>300€</div>
              <div style={{ marginTop: 8, color: "#c9748a", fontSize: 12, fontFamily: "'Jost', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                Réserver ma place <span style={{ transition: "transform 0.2s" }}>→</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FORMATIONS ═══ */}
      <section style={{ padding: "88px 5%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52 }}>
          <FadeIn direction="up">
            <div>
              <p className="section-label" style={{ marginBottom: 10 }}>NOS FORMATIONS PHARES</p>
              <h2 style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.2 }}>
                Des formations concrètes pour un métier <em className="pink-text">rentable</em>
              </h2>
            </div>
          </FadeIn>
          <FadeIn direction="right">
            <a href="#" style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, color: "#c9748a", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              Voir toutes nos formations →
            </a>
          </FadeIn>
        </div>

        <div className="grid-5" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }}>
          {FORMATIONS.map((f, i) => (
            <FadeIn key={i} direction="up" delay={i * 80} className="stagger-child">
              <div className="card-hover" style={{ background: "#fff", border: "0.5px solid #f0e0e4", borderRadius: 16, overflow: "hidden", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
                {f.tag && <span style={{ position: "absolute", margin: "10px 0 0 10px", display: "block", background: "#c9748a", color: "#fff", fontSize: 9, fontFamily: "'Jost', sans-serif", fontWeight: 600, letterSpacing: "0.1em", padding: "3px 10px", borderRadius: 20, zIndex: 1, width: "fit-content" }}>{f.tag}</span>}
                <div className="img-zoom" style={{ height: 160, flexShrink: 0 }}>
                  <img src={f.img} alt={f.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "14px 14px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 9, letterSpacing: "0.12em", color: "#c9748a", marginBottom: 4 }}>{f.subtitle}</p>
                  <h3 style={{ fontSize: 14, fontWeight: 400, marginBottom: 8, lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 18, fontWeight: 700, color: "#2a2a2a", marginBottom: 10 }}>{f.price}</p>
                  <ul style={{ listStyle: "none", marginBottom: 14, flex: 1 }}>
                    {f.features.map((feat, j) => (
                      <li key={j} style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#666", padding: "2px 0", display: "flex", alignItems: "center" }}>
                        <span className="check">✓</span>{feat}
                      </li>
                    ))}
                  </ul>
                  <button className="btn-outline" style={{ width: "100%", padding: "8px", fontSize: 11, marginTop: "auto" }}>Réserver ma place</button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" delay={200}>
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 44, flexWrap: "wrap" }}>
            {["Paiement en 3x sans frais", "Kit de démarrage inclus", "Support après formation", "Groupe privé d'entraide", "Accès à vie aux supports"].map(b => (
              <div key={b} style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#666", display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ color: "#c9748a", fontSize: 14 }}>✦</span>{b}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══ 3 COLONNES ═══ */}
      <section style={{ background: "#fdf0f3", padding: "88px 5%" }}>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 52, alignItems: "start" }}>

          {/* Résultats réels */}
          <FadeIn direction="left">
            <p className="section-label" style={{ marginBottom: 8 }}>RÉSULTATS RÉELS</p>
            <h2 style={{ fontSize: 28, fontWeight: 300, marginBottom: 24, lineHeight: 1.3 }}>Elles ont changé de vie grâce à nos formations</h2>
            <div className="card-hover" style={{ background: "#fff", borderRadius: 16, overflow: "hidden" }}>
              <div className="img-zoom" style={{ height: 200 }}>
                <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80" alt="Témoignage" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 18 }}>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.7, fontStyle: "italic" }}>
                  "Grâce à K Beauty Academy, j'ai ouvert mon salon en seulement 3 mois après la formation !"
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#c9748a", marginTop: 10 }}>— Anaïs M., Prothésiste Ongulaire</p>
              </div>
            </div>
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex" }}>
                {[21, 22, 23].map((n, i) => <img key={n} src={`https://i.pravatar.cc/28?img=${n}`} alt="" style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #fdf0f3", marginLeft: i === 0 ? 0 : -8 }} />)}
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#888" }}>+2500 élèves satisfaites</span>
            </div>
            <a href="#" style={{ display: "inline-block", marginTop: 14, fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#c9748a" }}>
              Voir les témoignages →
            </a>
          </FadeIn>

          {/* Boutique */}
          <FadeIn direction="up" delay={100}>
            <p className="section-label" style={{ marginBottom: 8 }}>BOUTIQUE PROFESSIONNELLE</p>
            <h2 style={{ fontSize: 28, fontWeight: 300, marginBottom: 24, lineHeight: 1.3 }}>Tout le matériel pour réussir</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BOUTIQUE.map((b, i) => (
                <div key={i} className="boutique-row" style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="img-zoom" style={{ width: 58, height: 58, borderRadius: 10, flexShrink: 0 }}>
                    <img src={b.img} alt={b.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: 13 }}>{b.name}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#bbb" }}>{b.sub}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 16, fontWeight: 700, color: "#2a2a2a", marginTop: 2 }}>{b.price}</p>
                  </div>
                  <button style={{ background: "#c9748a", border: "none", color: "#fff", width: 30, height: 30, borderRadius: "50%", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                    +
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-outline" style={{ width: "100%", marginTop: 16, padding: 11 }}>Voir toute la boutique</button>
          </FadeIn>

          {/* Pourquoi nous choisir */}
          <FadeIn direction="right" delay={200}>
            <p className="section-label" style={{ marginBottom: 8 }}>POURQUOI NOUS CHOISIR ?</p>
            <h2 style={{ fontSize: 28, fontWeight: 300, marginBottom: 24, lineHeight: 1.3 }}>Tout pour votre succès</h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              {WHY.map((w, i) => (
                <li key={i} className="why-item" style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "'Jost', sans-serif", fontSize: 13, color: "#444" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#f4d0d8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "#c9748a", fontSize: 11, fontWeight: 700 }}>✓</span>
                  </div>
                  {w}
                </li>
              ))}
            </ul>
            <button className="btn-primary" style={{ marginTop: 28, width: "100%", padding: 13 }}>Réserver un appel gratuit →</button>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="grid-cta" style={{ background: "#1e1e1e", padding: "80px 5%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", right: "48%", top: "50%", transform: "translate(50%,-50%)", width: 400, height: 400, borderRadius: "50%", background: "rgba(201,116,138,0.07)", pointerEvents: "none" }} />
        <FadeIn direction="left">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, letterSpacing: "0.15em", color: "#c9748a", textTransform: "uppercase", marginBottom: 14 }}>2 JOURS POUR CHANGER TON AVENIR</p>
          <h2 style={{ fontSize: 44, fontWeight: 300, color: "#fff", lineHeight: 1.15, marginBottom: 10 }}>
            Formation Prothésiste<br /><em style={{ color: "#c9748a" }}>Ongulaire</em>
          </h2>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 24 }}>
            <span style={{ fontSize: 52, fontWeight: 700, color: "#fff", fontFamily: "'Jost', sans-serif" }}>300€</span>
            <span style={{ fontFamily: "'Jost', sans-serif", color: "#666", fontSize: 16, textDecoration: "line-through" }}>350€</span>
            <span style={{ background: "#c9748a", color: "#fff", fontFamily: "'Jost', sans-serif", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>-50€</span>
          </div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 16 }}>
            <button className="btn-primary" style={{ padding: "14px 36px", fontSize: 14 }}>Je réserve ma place →</button>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#888", justifyContent: "center" }}>
              <span>✦ Support inclus</span>
              <span>✦ Certification</span>
            </div>
          </div>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#555" }}>Places limitées pour la prochaine session</p>
        </FadeIn>
        <FadeIn direction="right" delay={150}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&q=80",
              "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=80",
              "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=300&q=80",
              "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80",
            ].map((src, i) => (
              <div key={i} className="img-zoom" style={{ borderRadius: 12, overflow: "hidden", height: 148 }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.82 }} />
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══ INSTAGRAM ═══ */}
      <section style={{ padding: "72px 5%" }}>
        <FadeIn direction="up">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 4 }}>SUIVEZ-NOUS SUR INSTAGRAM</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: 14, color: "#c9748a" }}>@kbeauty.academy</p>
            </div>
            <a href="#" style={{ fontFamily: "'Jost', sans-serif", fontSize: 12, color: "#c9748a" }}>Voir le profil →</a>
          </div>
        </FadeIn>
        <div className="insta-grid">
          {INSTA.map((src, i) => (
            <FadeIn key={i} direction="up" delay={i * 60}>
              <div className="img-zoom" style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1", cursor: "pointer", position: "relative" }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "#141414", color: "#ccc", padding: "64px 5% 32px" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.4fr", gap: 44, marginBottom: 52, fontFamily: "'Jost', sans-serif" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, background: "#c9748a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 600, fontSize: 16, fontFamily: "serif" }}>K</span>
              </div>
              <div style={{ color: "#fff", fontWeight: 500, fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase" }}>K Beauty</div>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: "#666", maxWidth: 220 }}>La référence des formations beauté. Lancez-vous, nous vous guidons.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {["IG", "TK", "YT"].map(s => (
                <div key={s} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#888", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#c9748a"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#c9748a"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#888"; e.currentTarget.style.borderColor = "#333"; }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
          {[
            { title: "FORMATIONS", items: ["Prothésiste Ongulaire", "Cil à Cil", "Volume Russe", "Nail Art", "Voir toutes nos formations"] },
            { title: "INFORMATIONS", items: ["À propos", "Financement", "Conditions générales", "FAQ", "Contact"] },
            { title: "RESSOURCES", items: ["Avis Élèves", "Blog", "Nos CGV", "Mentions légales"] },
            { title: "REJOINS NOTRE COMMUNAUTÉ", items: [] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "#c9748a", textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>{col.title}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {col.items.map(item => (
                  <li key={item}>
                    <a href="#" style={{ fontSize: 12, color: "#666" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#c9748a"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#666"; }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              {col.title === "REJOINS NOTRE COMMUNAUTÉ" && (
                <div>
                  <p style={{ fontSize: 12, color: "#666", marginBottom: 14, lineHeight: 1.6 }}>Conseils, nouveautés & offres exclusives</p>
                  <div style={{ display: "flex" }}>
                    <input type="email" placeholder="Votre email" style={{ background: "#222", border: "1px solid #333", borderRight: "none", borderRadius: "20px 0 0 20px", padding: "9px 14px", fontSize: 12, color: "#ccc", outline: "none", flex: 1 }} />
                    <button className="btn-primary" style={{ borderRadius: "0 20px 20px 0", padding: "9px 16px", fontSize: 12 }}>→</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "0.5px solid #2a2a2a", paddingTop: 22, display: "flex", justifyContent: "space-between", fontFamily: "'Jost', sans-serif", fontSize: 11, color: "#555", flexWrap: "wrap", gap: 10 }}>
          <span>© 2024 K Beauty Academy. Tous droits réservés.</span>
          <span>Mentions légales · Politique de confidentialité · CGV</span>
        </div>
      </footer>
    </div>
  );
}
