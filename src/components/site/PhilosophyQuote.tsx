import { useEffect, useRef, useState } from "react";
import { useNav } from "@/context/NavContext";
import { featuredHero } from "@/content/site";

interface PhilosophyContent {
  eyebrow: string;
  quote: string[];
  attribution: string;
  body: string;
}

const philosophyI18n: Record<"en" | "ar", PhilosophyContent> = {
  en: {
    eyebrow: "OUR PHILOSOPHY",
    quote: ["WE SHAPE OUR BUILDINGS,", "AND AFTERWARDS OUR BUILDINGS SHAPE US."],
    attribution: "— WINSTON CHURCHILL",
    body: "A residence is never merely square footage — it is the architectural setting that shapes your daily rituals, perspective, and well-being. We advise with an enduring respect for craftsmanship, spatial harmony, and considered living.",
  },
  ar: {
    eyebrow: "فلسفتنا المعمارية",
    quote: ["نحن نشكل مبانينا،", "وبعد ذلك مبانينا تشكلنا."],
    attribution: "— ونستون تشرشل",
    body: "المنزل ليس مجرد مساحة — بل هو البيئة المعمارية التي تصوغ تفاصيل حياتك اليومية وسكينتك. نقدم استشاراتنا بتقدير عميق للحرفية والتناغم المكاني وجودة الحياة.",
  },
};

export function PhilosophyQuote() {
  const { lang } = useNav();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const content = philosophyI18n[lang] || philosophyI18n.en;

  return (
    <section
      ref={sectionRef}
      aria-label="Parkwood Properties Architectural Philosophy"
      className="relative flex min-h-[460px] w-full items-center overflow-hidden bg-[#1a120c] text-[#FBFAF7] md:min-h-[520px]"
    >
      {/* Full-Bleed Architectural Sunset Villa Backdrop */}
      <img
        src={featuredHero.image}
        alt={featuredHero.imageAlt}
        width={1600}
        height={1104}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Warm Editorial Scrim matching VideoHero & AboutSlider legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            lang === "ar"
              ? "linear-gradient(265deg, rgba(22, 13, 8, 0.82) 0%, rgba(22, 13, 8, 0.58) 55%, rgba(22, 13, 8, 0.34) 100%)"
              : "linear-gradient(95deg, rgba(22, 13, 8, 0.82) 0%, rgba(22, 13, 8, 0.58) 55%, rgba(22, 13, 8, 0.34) 100%)",
        }}
      />

      {/* Content Aligned to 1200px Page Container */}
      <figure className="relative z-10 mx-auto m-0 w-full max-w-[1200px] px-6 py-16 sm:py-20 md:py-24">
        <div className="max-w-[680px]">
          {/* Eyebrow */}
          <p
            className={`font-serif text-xs uppercase tracking-[0.22em] text-[#FBFAF7]/85 transition-all duration-700 ease-out motion-reduce:transition-none ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)" }}
          >
            {content.eyebrow}
          </p>

          {/* Quote */}
          <blockquote
            className={`mt-4 font-serif uppercase leading-[1.2] tracking-[0.06em] text-[#FBFAF7] transition-all duration-700 delay-100 ease-out motion-reduce:transition-none ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{
              fontSize: "clamp(1.3rem, 2.3vw, 1.85rem)",
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.45)",
            }}
          >
            {content.quote.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </blockquote>

          {/* Attribution */}
          <figcaption
            className={`mt-4 font-sans text-xs uppercase tracking-[0.18em] text-[#FBFAF7]/80 transition-all duration-700 delay-200 ease-out motion-reduce:transition-none ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ textShadow: "0 1px 10px rgba(0, 0, 0, 0.4)" }}
          >
            {content.attribution}
          </figcaption>

          {/* Subtle Divider & Architectural Context */}
          <div
            className={`mt-6 border-t border-[#FBFAF7]/25 pt-5 transition-all duration-700 delay-300 ease-out motion-reduce:transition-none ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p
              className="max-w-[580px] font-sans text-sm leading-[1.7] text-[#FBFAF7]/90 sm:text-[13px]"
              style={{ textShadow: "0 1px 12px rgba(0, 0, 0, 0.45)" }}
            >
              {content.body}
            </p>
          </div>
        </div>
      </figure>
    </section>
  );
}

// Backwards-compatible alias for any prior references
export const QuoteSection = PhilosophyQuote;
