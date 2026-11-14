import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { aboutSlidesAr, commonAr } from "@/content/i18n";
import { useNav } from "@/context/NavContext";

export interface AboutSlide {
  id: number;
  eyebrow: string;
  body: string;
}

export const aboutSlides: AboutSlide[] = [
  {
    id: 1,
    eyebrow: "WHY PARKWOOD",
    body: "Parkwood Properties is a Dubai property consultancy specializing in the secondary market, with a focus on Emaar's master planned communities.",
  },
  {
    id: 2,
    eyebrow: "WHY PARKWOOD",
    body: "Parkwood began with a simple belief: a property is more than a listing on a portal. Behind every address is a place, a decision, and a chapter in someone's life.",
  },
  {
    id: 3,
    eyebrow: "WHY PARKWOOD",
    body: "We begin with the property itself, then place it in the context of the wider market. From the first conversation through viewings, negotiation, documentation and handover, we stay involved and keep the process moving with clarity.",
  },
];

export function AboutSlider() {
  const { lang } = useNav();
  const slides = lang === "ar" ? aboutSlidesAr : aboutSlides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const totalSlides = slides.length;

  // Reduced motion preference check
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  const isPlaying = !isReducedMotion && !isManuallyPaused && !isHovered && !isFocused;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide((index + totalSlides) % totalSlides);
    },
    [totalSlides],
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const togglePlayPause = () => {
    setIsManuallyPaused((prev) => !prev);
  };

  // Auto-advance timer (6s interval)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPlaying, totalSlides]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  // Touch gesture listeners with passive behavior
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    // Trigger horizontal swipe only if horizontal movement dominates vertical scroll
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      const isRtl = document.documentElement.dir === "rtl";
      if (deltaX < 0) {
        if (isRtl) prevSlide();
        else nextSlide();
      } else {
        if (isRtl) nextSlide();
        else prevSlide();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={lang === "ar" ? "عن بارك وود" : "About Parkwood"}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="about-parallax w-full select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-inset"
    >
      {/* 
        Fixed Parallax Background Window:
        Uses position: fixed + clip-path: inset(0) on desktop.
        Switches to position: absolute on mobile (<768px) and when prefers-reduced-motion is true.
      */}
      <div className="about-parallax__bg" aria-hidden="true">
        <picture className="block h-full w-full pointer-events-none">
          <source srcSet="/images/dubai-palm-skyline.webp" type="image/webp" />
          <img
            src="/images/dubai-palm-skyline-1920.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={1920}
            height={1439}
            className="h-full w-full object-cover object-[center_60%]"
          />
        </picture>
      </div>

      {/* Uniform tinted overlay for WCAG AA text contrast */}
      <div className="about-parallax__overlay" aria-hidden="true" />

      {/* Screen reader live region for slide announcements */}
      <div className="sr-only" aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">
        {`${lang === "ar" ? "شريحة" : "Slide"} ${currentSlide + 1} / ${totalSlides}: ${slides[currentSlide]?.body ?? ""}`}
      </div>

      {/* 
        Content Container:
        Positioned relative, z-10 above overlay.
        Minimum height 460px (420px mobile).
      */}
      <div className="relative z-10 mx-auto flex min-h-[420px] md:min-h-[480px] w-full max-w-[1400px] flex-col justify-between px-6 py-12 sm:px-8 md:px-12 md:py-16">
        {/* Middle Row: Left-third decorative logo + right-of-center slide text, vertically aligned */}
        <div className="my-auto w-full md:grid md:grid-cols-[36%_minmax(0,520px)] md:items-center">
          {/* Left third decorative logo mark (desktop only, white at ~28% opacity) */}
          <div
            aria-hidden="true"
            className="hidden md:flex items-center justify-start ps-2 lg:ps-6 pointer-events-none select-none"
          >
            <img
              src="/logo.svg"
              alt=""
              width={130}
              height={85}
              className="w-[120px] lg:w-[135px] h-auto object-contain"
              style={{
                filter: "brightness(0) invert(1)",
                opacity: 0.28,
              }}
            />
          </div>

          {/* Content Block: Offset at 36% column, max-width 520px */}
          <div className="w-full min-w-0 text-start">
            {/* CSS Grid stack cell (col-start-1 row-start-1) to preserve equal height */}
            <div className="grid grid-cols-1 grid-rows-1">
              {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                  <div
                    key={slide.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} / ${totalSlides}`}
                    aria-hidden={!isActive}
                    className={`col-start-1 row-start-1 flex flex-col justify-center transition-opacity duration-500 ease-out ${
                      isActive
                        ? "opacity-100 z-10 visible pointer-events-auto"
                        : "opacity-0 z-0 invisible pointer-events-none"
                    }`}
                  >
                    {/* 1. Eyebrow */}
                    <p
                      className="font-serif uppercase tracking-[0.2em] text-xs sm:text-[11px] text-white/90 mb-3"
                      style={{ textShadow: "0 1px 12px rgba(0, 0, 0, 0.45)" }}
                    >
                      {slide.eyebrow}
                    </p>

                    {/* 2. Body Text */}
                    <p
                      className="font-sans text-[13px] sm:text-[14px] leading-[1.6] text-white"
                      style={{ textShadow: "0 1px 12px rgba(0, 0, 0, 0.45)" }}
                    >
                      {slide.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 
          Bottom Row:
          Mobile: Counter & CTA button in space-between row.
          Desktop: Bottom-left counter & carousel controls, bottom-right outlined CTA.
        */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 md:border-0 md:pt-0">
          {/* Left: Slide counter + Accessible Navigation Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Slide Counter (current bold) */}
            <div
              className="flex items-center gap-1 font-sans text-xs tracking-[0.16em] uppercase select-none"
              style={{ textShadow: "0 1px 8px rgba(0, 0, 0, 0.4)" }}
            >
              <span className="font-bold text-white text-sm">
                {String(currentSlide + 1).padStart(2, "0")}
              </span>
              <span className="text-white/60">/</span>
              <span className="text-white/70">{String(totalSlides).padStart(2, "0")}</span>
            </div>

            {/* Clickable segment indicators */}
            <div className="hidden sm:flex items-center gap-1.5 ms-2">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  aria-label={
                    lang === "ar" ? `الانتقال إلى الشريحة ${idx + 1}` : `Go to slide ${idx + 1}`
                  }
                  className={`h-1.5 transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                    idx === currentSlide
                      ? "w-6 bg-white"
                      : "w-2 bg-white/35 hover:bg-white/60 cursor-pointer"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next & Pause Buttons (44x44px touch targets) */}
            <div className="flex items-center gap-1 ms-1">
              <button
                type="button"
                onClick={prevSlide}
                aria-label={lang === "ar" ? "الشريحة السابقة" : "Previous slide"}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
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
                onClick={nextSlide}
                aria-label={lang === "ar" ? "الشريحة التالية" : "Next slide"}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rtl:rotate-180"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Pause / Play Control */}
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={
                  isManuallyPaused
                    ? lang === "ar"
                      ? "تشغيل التبديل التلقائي للشرائح"
                      : "Start carousel auto-rotation"
                    : lang === "ar"
                      ? "إيقاف التبديل التلقائي للشرائح"
                      : "Pause carousel auto-rotation"
                }
                title={
                  isManuallyPaused
                    ? lang === "ar"
                      ? "تشغيل"
                      : "Play"
                    : lang === "ar"
                      ? "إيقاف مؤقت"
                      : "Pause"
                }
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                {isManuallyPaused ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Right: Outlined CTA Button linking to /about */}
          <div>
            <Link
              to="/about"
              className="inline-flex min-h-[44px] items-center justify-center border border-white/90 bg-transparent px-6 py-2.5 font-sans text-xs uppercase tracking-[0.16em] text-white transition-colors duration-220 hover:bg-white hover:text-[#452C1D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#081423]"
            >
              {lang === "ar" ? commonAr.learnMore : "LEARN MORE"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
