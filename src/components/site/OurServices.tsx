import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { servicesAr } from "@/content/i18n";
import { useNav } from "@/context/NavContext";

export interface FeaturedService {
  slug: string;
  title: string;
  label: string;
  descriptor: string;
  stats: string;
  image: string;
  imageAlt: string;
  to: string;
}

export const featuredServices: FeaturedService[] = [
  {
    slug: "buy",
    title: "BUY",
    label: "ACQUISITIONS",
    descriptor: "SHORTLISTING, PRIVATE VIEWINGS & TRANSACTION ADVICE",
    stats: "OFF-PLAN RELEASES | SECONDARY HOMES | NEGOTIATION",
    image: "/buy.jpeg",
    imageAlt: "Luxury Dubai residential property for sale and acquisition",
    to: "/services",
  },
  {
    slug: "sell",
    title: "SELL",
    label: "SALES & MARKETING",
    descriptor: "IN-HOUSE PHOTOGRAPHY, VALUATION & TARGETED PLACEMENT",
    stats: "ACCURATE APPRAISALS | DESIGN-MINDED MARKETING | QUALIFIED BUYERS",
    image: "/sell.jpeg",
    imageAlt: "Contemporary Dubai villa prepared for sale",
    to: "/request-appraisal",
  },
  {
    slug: "rent",
    title: "RENT",
    label: "LEASING",
    descriptor: "APARTMENT, TOWNHOUSE & VILLA LETTINGS MANAGEMENT",
    stats: "TENANT VETTING | CONTRACT ADMINISTRATION | PORTFOLIO CARE",
    image: "/rent.jpeg",
    imageAlt: "Modern Dubai apartment available for lease",
    to: "/services",
  },
  {
    slug: "mortgage",
    title: "MORTGAGE",
    label: "FINANCING",
    descriptor: "INDEPENDENT LENDER COMPARISON & PRE-APPROVAL ADVISORY",
    stats: "PRE-APPROVAL | LENDER COMPARISON | PURCHASE COORDINATION",
    image: "/mortgage.jpeg",
    imageAlt: "Architectural home in Dubai residential community",
    to: "/services",
  },
  {
    slug: "property-handover",
    title: "PROPERTY HANDOVER",
    label: "HANDOVER & SNAGGING",
    descriptor: "EMAAR POLICIES, TECHNICAL SNAGGING & KEY COLLECTION",
    stats: "COMPREHENSIVE INSPECTION | DEFECT SNAGGING | KEY HANDOVER",
    image: "/property-handover.jpeg",
    imageAlt: "Completed luxury home ready for property handover in Dubai",
    to: "/services",
  },
];

const sectionI18n = {
  en: {
    heading: "OUR SERVICES",
    viewAll: "VIEW ALL",
    prevLabel: "Previous services",
    nextLabel: "Next services",
    trackLabel: "Services",
  },
  ar: {
    heading: "خدماتنا",
    viewAll: "عرض الكل",
    prevLabel: "الخدمات السابقة",
    nextLabel: "الخدمات التالية",
    trackLabel: "الخدمات",
  },
};

export function OurServices() {
  const { lang } = useNav();
  const t = sectionI18n[lang];

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const [hasEntered, setHasEntered] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Carousel scroll metrics: whether track can scroll backwards/forwards
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  // Default canScrollNext to true if more than 3 services exist
  const [canScrollNext, setCanScrollNext] = useState(featuredServices.length > 3);

  // Respect reduced-motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);
  }, []);

  // Compute disabled state from the track's actual overflow
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollWidth = track.scrollWidth;
    const clientWidth = track.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    const isOverflowing = maxScroll > 4;

    if (!isOverflowing) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    const scrollLeft = track.scrollLeft;
    const absScroll = Math.abs(scrollLeft);

    setCanScrollPrev(absScroll > 4);
    setCanScrollNext(absScroll < maxScroll - 4);
  }, []);

  // Throttled scroll listener using requestAnimationFrame
  const handleTrackScroll = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      updateScrollState();
      rafIdRef.current = null;
    });
  }, [updateScrollState]);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", handleTrackScroll, { passive: true });
    window.addEventListener("resize", handleTrackScroll);

    // Initial sync checks for layout settlement
    const timer1 = setTimeout(updateScrollState, 100);
    const timer2 = setTimeout(updateScrollState, 350);

    return () => {
      track.removeEventListener("scroll", handleTrackScroll);
      window.removeEventListener("resize", handleTrackScroll);
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [updateScrollState, handleTrackScroll]);

  // Click handler scrolls track by one card width + 12px gap
  const handleArrowClick = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-card]");
    const cardWidth = card ? card.getBoundingClientRect().width : track.clientWidth / 3;
    const step = cardWidth + 12;
    const isRtl = document.documentElement.dir === "rtl";

    const delta = (direction === "next" ? step : -step) * (isRtl ? -1 : 1);
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="our-services-heading"
      className="bg-[#FBFAF7] py-16 sm:py-24 text-[#452C1D] transition-colors border-t border-[#452C1D]/10"
      style={{ backgroundColor: "var(--color-cream, #FBFAF7)" }}
    >
      {/* 
        Single 1200px container for heading, cards, and controls row 
        Sharing exact left and right edges.
      */}
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Heading: Inline-start aligned, existing serif, uppercase, letter-spacing ~0.1em */}
        <h2
          id="our-services-heading"
          className="mb-8 font-serif uppercase tracking-[0.1em] text-[#452C1D] text-start leading-tight"
          style={{
            fontSize: "clamp(1.45rem, 2.5vw, 2rem)",
            color: "var(--color-brown, #452C1D)",
          }}
        >
          {t.heading}
        </h2>

        {/* 
          Carousel Track:
          - display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none;
          - Desktop (>=900px): 3 cards per view, each flex: 0 0 calc((100% - 24px) / 3) filling container edge to edge.
          - Mobile (<900px): each card flex: 0 0 85% so next card peeks in.
        */}
        <div
          ref={trackRef}
          role="region"
          aria-label={t.trackLabel}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
          }}
        >
          {featuredServices.map((service, idx) => {
            const ar = lang === "ar" ? servicesAr[service.slug] : undefined;
            const displayTitle = ar?.title ?? service.title;
            const displayLabel = ar?.label ?? service.label;
            const displayDescriptor = ar?.descriptor ?? service.descriptor;
            const displayStats = ar?.stats ?? service.stats;

            return (
              <Link
                key={service.slug}
                to={service.to}
                data-card
                style={{
                  transitionDelay: isReducedMotion ? "0ms" : `${idx * 80}ms`,
                  color: "var(--color-brown, #452C1D)",
                  textDecoration: "none",
                }}
                className={`service-card-link group block shrink-0 snap-start rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452C1D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FBFAF7] transition-all duration-600 ease-out flex-[0_0_85%] w-[85%] min-[900px]:flex-[0_0_calc((100%-24px)/3)] min-[900px]:w-[calc((100%-24px)/3)] max-w-none ${
                  hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {/* Image Container with square corners and aspect-ratio 4/3 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-[#e8e4db]">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="block h-full w-full object-cover rounded-none transition-transform duration-600 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />

                  {/* Subtle top-to-transparent gradient (~35% height) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[35%]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, transparent 100%)",
                    }}
                  />

                  {/* Top-inline-end label over image, ~11px uppercase cream */}
                  <span
                    style={{
                      top: "14px",
                      insetInlineEnd: "16px",
                      color: "var(--color-cream, #FBFAF7)",
                      letterSpacing: "0.15em",
                      fontSize: "11px",
                      textShadow: "0 1px 8px rgba(0, 0, 0, 0.5)",
                    }}
                    className="pointer-events-none absolute top-3.5 end-4 z-10 font-sans font-medium uppercase select-none leading-none"
                  >
                    {displayLabel}
                  </span>
                </div>

                {/* Card Details with specified vertical spacing and colors */}
                <div className="pt-4 text-start">
                  {/* 1. Service Title: serif uppercase, ~0.12em letter spacing, clamp(1.1rem, 1.6vw, 1.4rem), line-height 1.2, fits ONE line */}
                  <div className="relative inline-block max-w-full">
                    <h3
                      className="font-serif uppercase truncate"
                      style={{
                        color: "var(--color-brown, #452C1D)",
                        fontSize: "calc(clamp(1.1rem, 1.6vw, 1.4rem) - 2px)",
                        lineHeight: 1.2,
                        letterSpacing: "0.12em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {displayTitle}
                    </h3>
                    <span
                      aria-hidden="true"
                      style={{
                        insetInlineStart: 0,
                        backgroundColor: "var(--color-brown, #452C1D)",
                      }}
                      className="absolute bottom-0 start-0 h-[1px] w-0 transition-[width] duration-300 ease-out group-hover:w-full group-focus-visible:w-full motion-reduce:transition-none"
                    />
                  </div>

                  {/* 2. Descriptor: existing sans uppercase, ~12px, letter spacing ~0.1em, 2 lines max */}
                  <p
                    className="mt-2 font-sans uppercase line-clamp-2 leading-normal"
                    style={{
                      color: "rgba(69, 44, 29, 0.85)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {displayDescriptor}
                  </p>

                  {/* 3. Deliverables line: ~11px uppercase, letter spacing ~0.1em, " | " separators */}
                  <p
                    className="mt-2.5 font-sans uppercase leading-normal"
                    style={{
                      color: "rgba(69, 44, 29, 0.65)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {displayStats}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 
          Controls Row:
          - display: flex; justify-content: space-between; align-items: center; margin-top: 28px;
          - Inline-start: two 32px circular buttons, 1px brown border, transparent bg, 12px gap, 1.5px stroke chevrons. ALWAYS VISIBLE.
          - Inline-end: outlined "VIEW ALL" button linking to /services, padding 12px 28px.
        */}
        <div className="mt-7 flex items-center justify-between gap-4">
          {/* Circular arrow buttons: ALWAYS visible on desktop and mobile */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleArrowClick("prev")}
              disabled={!canScrollPrev}
              aria-label={t.prevLabel}
              aria-disabled={!canScrollPrev}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#452C1D] text-[#452C1D] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D] ${
                canScrollPrev
                  ? "hover:bg-[#452C1D] hover:text-[#FBFAF7] cursor-pointer opacity-100"
                  : "opacity-35 cursor-not-allowed"
              }`}
            >
              {/* Inline SVG chevron with 1.5px stroke */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rtl:rotate-180"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleArrowClick("next")}
              disabled={!canScrollNext}
              aria-label={t.nextLabel}
              aria-disabled={!canScrollNext}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#452C1D] text-[#452C1D] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D] ${
                canScrollNext
                  ? "hover:bg-[#452C1D] hover:text-[#FBFAF7] cursor-pointer opacity-100"
                  : "opacity-35 cursor-not-allowed"
              }`}
            >
              {/* Inline SVG chevron with 1.5px stroke */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rtl:rotate-180"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Inline-end: Outlined "VIEW ALL" button */}
          <div>
            <Link
              to="/services"
              style={{
                borderColor: "var(--color-brown, #452C1D)",
                color: "var(--color-brown, #452C1D)",
                textDecoration: "none",
              }}
              className="inline-flex items-center justify-center border border-[#452C1D] px-7 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors duration-220 hover:bg-[#452C1D] hover:text-[#FBFAF7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
            >
              {t.viewAll}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
