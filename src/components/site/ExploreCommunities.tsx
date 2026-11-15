import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { communitiesAr } from "@/content/i18n";
import { useNav } from "@/context/NavContext";

export interface FeaturedCommunity {
  slug: string;
  name: string;
  label: string;
  descriptor: string;
  stats: string;
  image: string;
  imageAlt: string;
}

/**
 * All communities across Dubai and Emaar masterplans for the Explore Our Communities carousel.
 */
export const featuredCommunities: FeaturedCommunity[] = [
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    label: "APARTMENTS",
    descriptor: "BURJ KHALIFA VIEWS, CITY-CENTER LIVING",
    stats: "HIGH-RISE | WALKABLE | DINING & CULTURE",
    image: "/downtown dubai.avif",
    imageAlt: "Downtown Dubai skyline and luxury residences around Burj Khalifa",
  },
  {
    slug: "the-valley",
    name: "The Valley",
    label: "TOWNHOUSES & VILLAS",
    descriptor: "QUIET COMMUNITY ALONG DUBAI–AL AIN ROAD",
    stats: "SPORTS FIELDS | POCKET PARKS | TOWN CENTRE",
    image: "/the-valley.jpg",
    imageAlt: "The Valley by Emaar townhouses and green park spaces",
  },
  {
    slug: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    label: "GOLF COMMUNITY",
    descriptor: "CHAMPIONSHIP GOLF COURSE & MATURE PARKLAND",
    stats: "18-HOLE GOLF | PARKS | BOULEVARDS",
    image: "/dubai hills state.avif",
    imageAlt: "Dubai Hills Estate luxury villas and golf greens",
  },
  {
    slug: "the-oasis-by-emaar",
    name: "The Oasis by Emaar",
    label: "WATERFRONT MANSIONS",
    descriptor: "LAGOONS, WATER CANALS & SWIMMABLE LAKES",
    stats: "LARGE PLOTS | LAKES | RESORT LIVING",
    image: "/oasis by emaar.avif",
    imageAlt: "The Oasis by Emaar luxury mansions and lagoons",
  },
  {
    slug: "dubai-creek-harbour",
    name: "Dubai Creek Harbour",
    label: "WATERFRONT",
    descriptor: "HISTORIC CREEK WITH MARINA PROMENADE",
    stats: "SKYLINE VIEWS | PROMENADE | PARKS",
    image: "/dubai creek.avif",
    imageAlt: "Dubai Creek Harbour promenade with skyline and yacht views",
  },
  {
    slug: "rashid-yachts-and-marina",
    name: "Rashid Yachts & Marina",
    label: "MARINA LIVING",
    descriptor: "BERTHS, YACHT CLUB & SEAFRONT WATERFRONT",
    stats: "MARINA ADDRESS | PENTHOUSES | YACHT CLUB",
    image: "/rashid yacht.avif",
    imageAlt: "Rashid Yachts and Marina promenade and luxury berths",
  },
  {
    slug: "arabian-ranches-iii",
    name: "Arabian Ranches III",
    label: "GATED COMMUNITY",
    descriptor: "FAMILY TOWNHOUSES & VILLAS IN GREEN SETTING",
    stats: "CENTRAL PARK | LAZY RIVER | CLUBHOUSE",
    image: "/arabian ranches.avif",
    imageAlt: "Arabian Ranches III family villas and lush green parks",
  },
  {
    slug: "emaar-south",
    name: "Emaar South",
    label: "GOLF COMMUNITY",
    descriptor: "GOLF-SIDE HOMES NEAR AL MAKTOUM AIRPORT",
    stats: "GOLF COURSE | COMMUNITY PARKS | RETAIL",
    image: "/emaar south.avif",
    imageAlt: "Emaar South residences alongside parkland and golf greens",
  },
  {
    slug: "grand-polo-club-and-resort",
    name: "Grand Polo Club & Resort",
    label: "EQUESTRIAN RESORT",
    descriptor: "LOW VILLAS, STABLES & BRIDLE PATHS",
    stats: "POLO FIELD | GREEN EXPANSE | STABLES",
    image: "/grand-polo.jpeg",
    imageAlt: "Grand Polo Club & Resort equestrian estate and low-rise villas",
  },
  {
    slug: "emaar-beachfront",
    name: "Emaar Beachfront",
    label: "WATERFRONT ISLAND",
    descriptor: "PRIVATE ISLAND ADDRESS AT DUBAI HARBOUR",
    stats: "1.5 KM SHORELINE | SEA VIEWS | DUBAI MARINA",
    image: "/beachfront.avif",
    imageAlt: "Emaar Beachfront private island towers with open sea views",
  },
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    label: "WATERFRONT",
    descriptor: "MARINA PROMENADE, SKYLINE AND SUNSET VIEWS",
    stats: "APARTMENTS | WATERFRONT | LIFESTYLE HUB",
    image: "/assets/communities/marina.jpg",
    imageAlt: "Dubai Marina waterfront promenade with luxury residences and yachts",
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    label: "VILLAS & APARTMENTS",
    descriptor: "ICONIC ISLAND LIVING ON THE GULF",
    stats: "VILLAS | BEACH ACCESS | RESORT STYLE",
    image: "/assets/communities/palm.jpg",
    imageAlt: "Palm Jumeirah iconic beachfront villas and resort style homes",
  },
];

const sectionI18n = {
  en: {
    heading: "EXPLORE COMMUNITIES",
    viewAll: "VIEW ALL",
    prevLabel: "Previous communities",
    nextLabel: "Next communities",
    trackLabel: "Communities",
  },
  ar: {
    heading: "استكشف المجمعات السكنية",
    viewAll: "عرض الكل",
    prevLabel: "المجمعات السابقة",
    nextLabel: "المجمعات التالية",
    trackLabel: "المجمعات السكنية",
  },
};

export function ExploreCommunities() {
  const { lang } = useNav();
  const t = sectionI18n[lang];

  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Carousel scroll metrics: whether track can scroll backwards/forwards
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  // Default canScrollNext to true if more than 3 cards exist
  const [canScrollNext, setCanScrollNext] = useState(featuredCommunities.length > 3);

  // Viewport entrance observer (staggered 80ms fade-in and 16px rise)
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    if (motionQuery.matches) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
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
      aria-labelledby="explore-communities-heading"
      className="bg-[#FBFAF7] py-16 sm:py-24 text-[#452C1D] transition-colors"
      style={{ backgroundColor: "var(--color-cream, #FBFAF7)" }}
    >
      {/* 
        Single 1200px container for heading, cards, and controls row 
        Sharing exact left and right edges.
      */}
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Heading: Inline-start aligned, existing serif, uppercase, letter-spacing ~0.1em */}
        <h2
          id="explore-communities-heading"
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
          {featuredCommunities.map((community, idx) => {
            const ar = lang === "ar" ? communitiesAr[community.slug] : undefined;
            const displayName = ar?.name ?? community.name;
            const displayDescriptor = ar?.descriptor ?? community.descriptor;
            const displayStats = ar?.stats ?? community.stats;

            return (
              <Link
                key={community.slug}
                to="/communities/$slug"
                params={{ slug: community.slug }}
                data-card
                style={{
                  transitionDelay: isReducedMotion ? "0ms" : `${idx * 80}ms`,
                  color: "var(--color-brown, #452C1D)",
                  textDecoration: "none",
                }}
                className={`community-card-link group block shrink-0 snap-start rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452C1D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FBFAF7] transition-all duration-600 ease-out flex-[0_0_85%] w-[85%] min-[900px]:w-[calc((100%-24px)/3)] min-[900px]:flex-[0_0_calc((100%-24px)/3)] max-w-none ${
                  hasEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {/* Image Container with square corners and aspect-ratio 4/3 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-[#e8e4db]">
                  <img
                    src={community.image}
                    alt={community.imageAlt}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="block h-full w-full object-cover rounded-none transition-transform duration-600 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                  />

                  {/* Subtle top-to-transparent gradient (~38% height) for top-right title contrast */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[38%]"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0%, transparent 100%)",
                    }}
                  />

                  {/* Top-inline-end community name over image */}
                  <h3
                    style={{
                      top: "14px",
                      insetInlineEnd: "16px",
                      color: "var(--color-cream, #FBFAF7)",
                      letterSpacing: "0.14em",
                      textShadow: "0 1px 10px rgba(0, 0, 0, 0.55)",
                    }}
                    className="pointer-events-none absolute top-3.5 end-4 z-10 max-w-[calc(100%-2rem)] truncate font-serif text-[12px] sm:text-[13px] font-medium uppercase select-none leading-none"
                  >
                    {displayName}
                  </h3>
                </div>

                {/* Card Details: descriptor & stat highlights */}
                <div className="pt-3.5 text-start">
                  <p
                    className="font-sans uppercase line-clamp-2 leading-normal transition-opacity duration-200 group-hover:opacity-75"
                    style={{
                      color: "rgba(69, 44, 29, 0.85)",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {displayDescriptor}
                  </p>

                  <p
                    className="mt-2 font-sans uppercase leading-normal"
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
          - Inline-end: outlined "VIEW ALL" button linking to /communities, padding 12px 28px.
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
              to="/communities"
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
