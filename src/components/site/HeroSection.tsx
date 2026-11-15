// import { Link, useNavigate } from "@tanstack/react-router";
// import { ArrowRight, MapPin, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// import { useId, useMemo } from "react";
// import { featuredCommunities } from "@/components/site/ExploreCommunities";
// import { communitiesAr } from "@/content/i18n";
// import { communities as siteCommunities } from "@/content/site";
import { useNav } from "@/context/NavContext";

export { PhilosophyQuote as QuoteSection } from "./PhilosophyQuote";

const heroI18n = {
  en: {
    sectionLabel: "Dubai Luxury Real Estate",
    imageAlt: "Dubai skyline day to night timelapse",
    // searchLabel: "Search Dubai communities",
    // placeholder: "Search communities in Dubai…",
    // clearLabel: "Clear search",
    // resultsHeading: (count: number) => `${count} ${count === 1 ? "COMMUNITY" : "COMMUNITIES"} FOUND`,
    // emptyTitle: "No matching communities found",
    // emptyHint: "Try Downtown Dubai, Dubai Hills Estate, The Oasis, or Palm Jumeirah.",
    // viewAll: "View all communities",
  },
  ar: {
    sectionLabel: "عقارات دبي الفاخرة",
    imageAlt: "أفق دبي في لقطة متتابعة من النهار إلى الليل",
    // searchLabel: "ابحث في مجمعات دبي السكنية",
    // placeholder: "ابحث في مجمعات دبي السكنية…",
    // clearLabel: "مسح البحث",
    // resultsHeading: (count: number) => `تم العثور على ${count} مجمع`,
    // emptyTitle: "لم يتم العثور على مجمعات مطابقة",
    // emptyHint: "جرّب وسط مدينة دبي، دبي هيلز استيت، ذا أويسيس، أو نخلة جميرا.",
    // viewAll: "عرض جميع المجمعات السكنية",
  },
};

/**
 * A. Hero (scrollY = 0)
 * - Full-bleed, full-viewport: height: 100svh; min-height: 600px;
 * - Background video (day-to-night Dubai timelapse) with loop smoothing
 * - Dual dark gradients for WCAG AA cream text contrast
 * - Capsule community search bar preserved below in comments for future use
 */
export function VideoHero() {
  const { isMenuOpen, lang, closeMenu } = useNav();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoOpacity, setVideoOpacity] = useState(1);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(true);

  const t = heroI18n[lang];

  /*
  // ── Community Search Bar State & Logic (commented for future use) ──
  const navigate = useNavigate();
  const searchBoxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listboxId = useId();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isDismissed, setIsDismissed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Debounce search query so results appear briefly after user finishes typing
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setDebouncedQuery("");
      setActiveIndex(-1);
      return;
    }

    const timer = window.setTimeout(() => {
      setDebouncedQuery(trimmed.toLowerCase());
      setActiveIndex(-1);
    }, 280);

    return () => window.clearTimeout(timer);
  }, [query]);

  // Build searchable index joining English + Arabic metadata
  const searchableCommunities = useMemo(() => {
    const descBySlug = new Map(siteCommunities.map((c) => [c.slug, c]));
    return featuredCommunities.map((fc) => {
      const siteItem = descBySlug.get(fc.slug);
      const ar = communitiesAr[fc.slug];
      const searchCorpus = [
        fc.name,
        fc.slug.replace(/-/g, " "),
        fc.label,
        fc.descriptor,
        fc.stats,
        siteItem?.description ?? "",
        siteItem?.tag ?? "",
        ar?.name ?? "",
        ar?.label ?? "",
        ar?.descriptor ?? "",
        ar?.stats ?? "",
        ar?.description ?? "",
        ar?.tag ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return {
        ...fc,
        displayName: lang === "ar" ? (ar?.name ?? fc.name) : fc.name,
        displayLabel: lang === "ar" ? (ar?.label ?? fc.label) : fc.label,
        displayDescriptor: lang === "ar" ? (ar?.descriptor ?? fc.descriptor) : fc.descriptor,
        searchCorpus,
      };
    });
  }, [lang]);

  const filteredCommunities = useMemo(() => {
    if (!debouncedQuery) return [];
    const tokens = debouncedQuery.split(/\s+/).filter(Boolean);
    return searchableCommunities.filter((item) =>
      tokens.every((token) => item.searchCorpus.includes(token)),
    );
  }, [searchableCommunities, debouncedQuery]);

  const showResults = Boolean(debouncedQuery) && query.trim().length > 0 && !isDismissed;

  // Close dropdown on click outside
  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setIsDismissed(true);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const goToCommunity = (slug: string) => {
    setIsDismissed(true);
    setActiveIndex(-1);
    void navigate({ to: "/communities/$slug", params: { slug } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const immediateTrimmed = query.trim().toLowerCase();
    if (!immediateTrimmed) return;

    const matches = immediateTrimmed
      ? searchableCommunities.filter((item) =>
          immediateTrimmed
            .split(/\s+/)
            .filter(Boolean)
            .every((token) => item.searchCorpus.includes(token)),
        )
      : [];

    const target =
      activeIndex >= 0 && filteredCommunities[activeIndex]
        ? filteredCommunities[activeIndex]
        : matches[0];

    if (target) {
      goToCommunity(target.slug);
      return;
    }

    setDebouncedQuery(immediateTrimmed);
    setIsDismissed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsDismissed(true);
      setActiveIndex(-1);
      return;
    }

    if (!showResults || filteredCommunities.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommunities.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? filteredCommunities.length - 1 : prev - 1));
    }
  };
  */

  // Performance & reduced motion check (allow mobile playback unless save-data or reduced motion)
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (e.matches) {
        setShouldLoadVideo(false);
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    const isSaveData = Boolean(nav.connection?.saveData);

    if (isSaveData || motionQuery.matches) {
      setShouldLoadVideo(false);
    } else {
      setShouldLoadVideo(true);
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Ensure muted + playsInline DOM properties and kick off autoplay reliably on iOS/Android
  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback poster underneath remains visible if device Low Power Mode blocks autoplay
      });
    }
  }, [shouldLoadVideo]);

  // Loop smoothing: fade out video ~0.5s before end, fade back in at start
  const handleTimeUpdate = () => {
    if (isReducedMotion) return;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const remaining = video.duration - video.currentTime;
    if (remaining <= 0.5) {
      setVideoOpacity(0);
    } else if (video.currentTime < 0.5 && videoOpacity === 0) {
      setVideoOpacity(1);
    }
  };

  const handleEnded = () => {
    if (isReducedMotion) return;
    setVideoOpacity(0);
    setTimeout(() => {
      setVideoOpacity(1);
    }, 200);
  };

  const handleSeeked = () => {
    setVideoOpacity(1);
  };

  const handlePlaying = () => {
    setVideoOpacity(1);
  };

  return (
    <section
      aria-label={t.sectionLabel}
      className="relative w-full h-screen min-h-[600px] h-[100svh] overflow-hidden bg-[#1a120c]"
    >
      {/* Fallback poster image underneath */}
      <img
        src="/assets/hero-poster.jpg"
        alt={t.imageAlt}
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* Background Video */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          poster="/assets/hero-poster.jpg"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onSeeked={handleSeeked}
          onPlaying={handlePlaying}
          style={{ opacity: videoOpacity }}
          className="absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
          <source src="/assets/hero.webm" type="video/webm" />
        </video>
      )}

      {/* Dual dark gradients for legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.45) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[160px]"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 100%)",
        }}
      />

      {/* Light scrim when side menu is open: clicking closes the panel */}
      {isMenuOpen && (
        <div
          aria-hidden="true"
          onClick={closeMenu}
          className="absolute inset-0 z-15 bg-black/20 cursor-pointer"
        />
      )}

      {/*
        Centered Capsule Community Search Bar (commented out for future use)
      */}
      {/*
      <div
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5 sm:px-6 transition-transform duration-400 ease-out motion-reduce:transition-none"
        style={{
          transform: isMenuOpen
            ? lang === "ar"
              ? "translateX(calc(var(--panel-w) / 2))"
              : "translateX(calc(var(--panel-w) / -2))"
            : "translateX(0)",
        }}
      >
        <div
          ref={searchBoxRef}
          className="pointer-events-auto relative w-full max-w-[560px] animate-hero-fade-in"
        >
          <form
            role="search"
            aria-label={t.searchLabel}
            onSubmit={handleSubmit}
            className="flex h-12 sm:h-13 items-center gap-3 rounded-full border border-[#FBFAF7]/45 bg-[#FBFAF7]/92 px-5 shadow-[0_14px_40px_rgba(0,0,0,0.34)] backdrop-blur-md transition-all focus-within:bg-[#FBFAF7] focus-within:ring-2 focus-within:ring-[#FBFAF7]/65"
          >
            <Search className="size-4 shrink-0 text-[#452C1D]/70" aria-hidden="true" />

            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-label={t.searchLabel}
              aria-autocomplete="list"
              aria-expanded={showResults}
              aria-controls={listboxId}
              aria-activedescendant={
                activeIndex >= 0 && filteredCommunities[activeIndex]
                  ? `hero-community-option-${filteredCommunities[activeIndex].slug}`
                  : undefined
              }
              value={query}
              placeholder={t.placeholder}
              onFocus={() => {
                if (query.trim()) setIsDismissed(false);
              }}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsDismissed(false);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 bg-transparent font-sans text-sm text-[#452C1D] placeholder:text-[#452C1D]/55 outline-none"
            />

            {query && (
              <button
                type="button"
                aria-label={t.clearLabel}
                onClick={() => {
                  setQuery("");
                  setDebouncedQuery("");
                  setIsDismissed(true);
                  setActiveIndex(-1);
                  inputRef.current?.focus();
                }}
                className="flex size-7 shrink-0 items-center justify-center rounded-full text-[#452C1D]/60 transition-colors hover:bg-[#452C1D]/10 hover:text-[#452C1D]"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            )}
          </form>

          {showResults && (
            <div
              id={listboxId}
              role="listbox"
              aria-label={t.searchLabel}
              className="custom-scrollbar absolute inset-x-0 top-full mt-2.5 max-h-[min(320px,42svh)] overflow-y-auto border border-[#452C1D]/15 bg-[#FBFAF7] text-[#452C1D] shadow-[0_18px_48px_rgba(0,0,0,0.28)]"
            >
              <div className="flex items-center justify-between border-b border-[#452C1D]/10 px-4 py-2.5">
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-[#452C1D]/60">
                  {t.resultsHeading(filteredCommunities.length)}
                </span>
                <Link
                  to="/communities"
                  onClick={() => setIsDismissed(true)}
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#452C1D]/80 underline underline-offset-4 transition-opacity hover:opacity-65"
                >
                  {t.viewAll}
                </Link>
              </div>

              {filteredCommunities.length > 0 ? (
                <ul className="divide-y divide-[#452C1D]/8">
                  {filteredCommunities.map((item, idx) => {
                    const isHighlighted = idx === activeIndex;
                    return (
                      <li key={item.slug} role="presentation">
                        <button
                          id={`hero-community-option-${item.slug}`}
                          type="button"
                          role="option"
                          aria-selected={isHighlighted}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => goToCommunity(item.slug)}
                          className={`flex w-full items-center gap-3.5 px-4 py-2.5 text-start transition-colors ${
                            isHighlighted ? "bg-[#452C1D]/8" : "hover:bg-[#452C1D]/5"
                          }`}
                        >
                          <img
                            src={item.image}
                            alt=""
                            aria-hidden="true"
                            width={64}
                            height={48}
                            className="h-10 w-14 shrink-0 bg-[#e8e4db] object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate font-serif text-[14px] uppercase tracking-[0.08em] text-[#452C1D]">
                                {item.displayName}
                              </span>
                              <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.14em] text-[#452C1D]/55">
                                {item.displayLabel}
                              </span>
                            </div>
                            <p className="mt-0.5 truncate font-sans text-[11px] uppercase tracking-[0.06em] text-[#452C1D]/70">
                              {item.displayDescriptor}
                            </p>
                          </div>
                          <ArrowRight
                            className="size-3.5 shrink-0 text-[#452C1D]/50 rtl:rotate-180"
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-5 py-6 text-center">
                  <MapPin className="mx-auto size-4 text-[#452C1D]/45" aria-hidden="true" />
                  <p className="mt-2 font-serif text-[15px] uppercase tracking-[0.06em] text-[#452C1D]">
                    {t.emptyTitle}
                  </p>
                  <p className="mt-1 font-sans text-xs text-[#452C1D]/70">{t.emptyHint}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      */}
    </section>
  );
}
