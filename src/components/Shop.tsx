import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Zap, ShieldCheck, ChefHat, Headphones, Heart, Star, Play, ChevronLeft, ChevronRight, Check } from "lucide-react";
import hero from "@/assets/hero-feast.jpg";
import { LANG_KEY, LOGO_URL, PACKS, T, TESTIMONIALS, VIDEOS, type Lang } from "@/config/site";

const X = {
  fr: { slogan1: "Des recettes", slogan2: "délicieuses", slogan3: "à portée de clic !", sub1: "Rapides, gourmandes, simples à préparer", sub2: "et surtout", sub3: "pas chères !", side: "Le goût du fait maison à petit prix !", motto: "Cuisinez. Savourez. Recommencez !", see: "Voir la vidéo", apercu: "Découvrez un aperçu de nos recettes !", apercuSub: "Des plats savoureux, pour tous les goûts, et faciles à réaliser chez vous.", more: "Voir nos packs", trust: ["Livraison instantanée par email", "Paiement sécurisé 100% fiable", "Recettes testées et approuvées", "Support client réactif 7j/7", "Fait avec amour"], rights: "Tous droits réservés.", love: "Le plaisir de cuisiner, tout simplement." },
  en: { slogan1: "Delicious", slogan2: "recipes", slogan3: "just a click away!", sub1: "Quick, tasty, easy to make", sub2: "and above all", sub3: "affordable!", side: "Homemade taste at a small price!", motto: "Cook. Savour. Repeat!", see: "Watch the video", apercu: "Get a taste of our recipes!", apercuSub: "Tasty dishes for every taste, easy to make at home.", more: "See our packs", trust: ["Instant delivery by email", "100% secure payment", "Tested & approved recipes", "Responsive support 7/7", "Made with love"], rights: "All rights reserved.", love: "The joy of cooking, simply." },
};

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal") ?? [];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Slider({ children, label }: { children: React.ReactNode; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const go = (d: number) => { const el = track.current; if (el) el.scrollBy({ left: d * el.clientWidth * 0.85, behavior: "smooth" }); };
  const arrow = "absolute top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full bg-cocoa p-3 text-cream shadow-cover transition hover:scale-110 md:grid";
  return (
    <div className="relative">
      <button aria-label={`${label} ←`} onClick={() => go(-1)} className={`${arrow} -left-2`}><ChevronLeft className="h-6 w-6" /></button>
      <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 pt-6 md:px-10">{children}</div>
      <button aria-label={`${label} →`} onClick={() => go(1)} className={`${arrow} -right-2`}><ChevronRight className="h-6 w-6" /></button>
    </div>
  );
}

export function Shop({ lang }: { lang: Lang }) {
  const t = T[lang]; const x = X[lang];
  const ref = useReveal();
  const other: Lang = lang === "fr" ? "en" : "fr";
  const [ti, setTi] = useState(0);
  useEffect(() => { localStorage.setItem(LANG_KEY, lang); document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { const id = setInterval(() => setTi((i) => (i + 1) % TESTIMONIALS.length), 5000); return () => clearInterval(id); }, []);
  const trustIcons = [Zap, ShieldCheck, ChefHat, Headphones, Heart];
  const r = TESTIMONIALS[ti] ?? TESTIMONIALS[0]!;

  return (
    <div ref={ref} className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative wave-bottom bg-cocoa pb-20">
        <img src={hero} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="absolute inset-0 bg-hero-fade" />
        <header className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Délices Maison" width={512} height={512} className="h-20 w-20 rounded-full shadow-cover ring-4 ring-cream md:h-28 md:w-28" />
            <div className="hidden sm:block">
              <p className="font-script text-3xl text-cream text-glow md:text-4xl">Délices Maison</p>
              <p className="font-script text-sm text-sun">{x.motto}</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <a href="#packs" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground md:inline-block">{t.packsTitle}</a>
            <Link to={other === "fr" ? "/fr" : "/en"} onClick={() => localStorage.setItem(LANG_KEY, other)}
              className="rounded-full bg-cream px-4 py-2 text-sm font-extrabold text-cocoa shadow-soft transition hover:scale-105">
              {other === "fr" ? "🇫🇷 French" : "🇬🇧 English"}
            </Link>
          </nav>
        </header>
        <div className="relative mx-auto max-w-6xl px-5 pt-14 md:pt-20">
          <p className="absolute right-6 top-2 hidden max-w-[220px] rotate-[-6deg] font-script text-2xl text-cream text-glow lg:block">{x.side}</p>
          <div className="max-w-xl">
            <h1 className="font-script text-5xl leading-[1.1] text-cream text-glow md:text-7xl">
              {x.slogan1} <span className="text-sun">{x.slogan2}</span><br />{x.slogan3} <span className="inline-block animate-floaty">😋</span>
            </h1>
            <p className="mt-6 text-lg font-bold text-cream text-glow md:text-xl">{x.sub1}<br />{x.sub2} <span className="text-sun">{x.sub3}</span></p>
            <a href="#packs" className="mt-8 inline-flex items-center gap-3 rounded-full bg-sun px-8 py-4 text-lg font-extrabold text-cocoa shadow-cover transition hover:-translate-y-1 hover:scale-105">
              {t.discover} <ChevronRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section id="packs" className="scroll-mt-4 py-12">
        <h2 className="px-5 text-center font-script text-4xl text-primary md:text-5xl">{t.packsTitle}</h2>
        <p className="mt-2 px-5 text-center text-muted-foreground">{t.packsSub}</p>
        <div className="mx-auto mt-4 max-w-6xl">
          <Slider label={t.packsTitle}>
            {PACKS.map((p) => (
              <article key={p.id} className="relative flex w-[86%] shrink-0 snap-center flex-col gap-5 rounded-3xl bg-card p-5 shadow-soft ring-1 ring-border sm:w-[70%] md:w-[calc(50%-12px)] md:flex-row md:items-center">
                {p.featured && <span className="absolute -top-3 right-5 z-10 rounded-full bg-tomato px-4 py-1 text-xs font-extrabold uppercase text-cream shadow-soft">{t.popular}</span>}
                <div className="group mx-auto w-3/5 shrink-0 [perspective:1000px] md:w-[44%]">
                  <img src={p.cover[lang]} alt={p.name[lang]} width={1160} height={1355} className="w-full -rotate-2 rounded-lg shadow-cover transition duration-500 group-hover:rotate-0 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="font-script text-3xl leading-tight text-primary">{p.name[lang]}</h3>
                  <p className="mt-2 text-sm font-bold text-foreground">{p.description[lang]}</p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {p.benefits[lang].map((b) => <li key={b} className="flex items-center gap-2"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sun text-cocoa"><Check className="h-3 w-3" strokeWidth={4} /></span>{b}</li>)}
                  </ul>
                  <div className="mt-4 flex items-center gap-3">
                    {p.oldPrice && <s className="text-xl font-bold text-muted-foreground">{p.oldPrice}</s>}
                    <span className="rounded-xl bg-tomato px-4 py-1.5 text-3xl font-black text-cream shadow-soft">{p.price}</span>
                  </div>
                  <a href={p.link[lang]} target="_blank" rel="noopener noreferrer"
                    className="mt-4 block rounded-full bg-sun px-6 py-3 text-center font-extrabold text-cocoa shadow-soft transition hover:-translate-y-0.5 hover:scale-[1.02]">
                    {p.cta[lang]}
                  </a>
                </div>
              </article>
            ))}
          </Slider>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="reveal grid grid-cols-2 gap-4 rounded-3xl bg-card p-5 shadow-soft ring-1 ring-border md:grid-cols-5">
          {x.trust.map((label, i) => { const I = trustIcons[i] ?? Heart; return (
            <div key={label} className="flex items-center gap-3 text-left last:col-span-2 md:last:col-span-1">
              <I className="h-8 w-8 shrink-0 text-accent" />
              <span className="text-sm font-bold">{label}</span>
            </div>); })}
        </div>
      </section>

      {/* VIDEO + REVIEWS */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
        <div className="reveal">
          {VIDEOS.length ? (
            <div className="no-scrollbar flex snap-x gap-4 overflow-x-auto pb-2">
              {VIDEOS.map((v) => (
                <figure key={v.src} className="w-60 shrink-0 snap-center overflow-hidden rounded-3xl bg-card shadow-cover">
                  <video src={v.src} poster={v.poster} controls playsInline preload="metadata" className="aspect-[9/16] w-full object-cover" />
                  <figcaption className="p-3 text-sm font-bold">{v.title[lang]}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[2rem] shadow-cover ring-4 ring-card">
              <img src={hero} alt="" loading="lazy" className="aspect-video w-full object-cover" />
              <div className="absolute inset-0 grid place-items-center bg-cocoa/30">
                <span className="grid h-20 w-20 place-items-center rounded-full border-4 border-cream bg-cocoa/60 text-cream"><Play className="ml-1 h-9 w-9 fill-current" /></span>
              </div>
              <span className="absolute bottom-3 left-3 rounded-full bg-cocoa/80 px-4 py-1.5 text-sm font-bold text-cream">{t.videosEmpty}</span>
            </div>
          )}
          <div className="mt-6 text-center">
            <h2 className="font-script text-3xl text-primary md:text-4xl">{x.apercu}</h2>
            <p className="mt-2 text-muted-foreground">{x.apercuSub}</p>
          </div>
        </div>
        <div className="reveal">
          <h2 className="text-center font-script text-4xl text-primary">{t.testiTitle}</h2>
          <blockquote key={ti} className="mt-6 animate-in fade-in rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border">
            <div className="flex text-sun">{Array.from({ length: r.rating }).map((_, s) => <Star key={s} className="h-6 w-6 fill-current" />)}</div>
            <p className="mt-3 text-base">“{r.text[lang]}”</p>
            <footer className="mt-3 font-extrabold text-primary">— {r.name}</footer>
          </blockquote>
          <div className="mt-4 flex items-center justify-between">
            <button aria-label="←" onClick={() => setTi((ti - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="rounded-full bg-cocoa p-2 text-cream"><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex gap-2">{TESTIMONIALS.map((_, i) => <span key={i} className={`h-2.5 w-2.5 rounded-full ${i === ti ? "bg-cocoa" : "bg-sun"}`} />)}</div>
            <button aria-label="→" onClick={() => setTi((ti + 1) % TESTIMONIALS.length)} className="rounded-full bg-cocoa p-2 text-cream"><ChevronRight className="h-5 w-5" /></button>
          </div>
          <p className="mt-3 text-center text-xs italic text-muted-foreground">{t.testiNote}</p>
        </div>
      </section>

      <footer className="wave-top bg-cocoa pb-8 pt-20 text-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="Délices Maison" loading="lazy" className="h-20 w-20 rounded-full ring-4 ring-cream" />
            <div><p className="font-script text-3xl">Délices Maison</p><p className="font-script text-sm text-sun">{x.motto}</p></div>
          </div>
          <a href="#packs" className="rounded-full bg-sun px-6 py-3 font-extrabold text-cocoa">{x.more}</a>
        </div>
        <p className="mt-8 border-t border-cream/20 px-5 pt-6 text-center text-sm opacity-90">© 2026 Délices Maison. {x.rights} ❤️ {x.love}</p>
      </footer>
    </div>
  );
}
