import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

import { WhatsAppIcon } from "@/components/site/WhatsAppButton";
import { communitiesAr, companyAr, servicesAr } from "@/content/i18n";
import { useNav } from "@/context/NavContext";
import { company, communities as communityList, services as serviceList } from "@/content/site";

const i18n = {
  en: {
    brandName: company.name,
    tagline: company.tagline,
    services: "Services",
    communities: "Communities",
    appraisal: "Request Appraisal",
    closeMenu: "CLOSE MENU",
    home: "Home",
    about: "About Us",
    contact: "Contact Us",
    whatsappUs: "WhatsApp Us",
    callUs: "Call Us",
    viewAllServices: "View All Services",
    viewAllCommunities: "View All Communities",
    language: "Language",
    openMenu: "Open navigation menu",
  },
  ar: {
    brandName: companyAr.name,
    tagline: companyAr.tagline,
    services: "خدماتنا",
    communities: "المجمعات السكنية",
    appraisal: "طلب تقييم عقاري",
    closeMenu: "إغلاق القائمة",
    home: "الرئيسية",
    about: "من نحن",
    contact: "اتصل بنا",
    whatsappUs: "تواصل عبر واتساب",
    callUs: "اتصل بنا",
    viewAllServices: "عرض جميع الخدمات",
    viewAllCommunities: "عرض جميع المجمعات",
    language: "اللغة",
    openMenu: "فتح قائمة التنقل",
  },
};

export function Header() {
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";
  const {
    isMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
    lang,
    toggleLang,
    isScrolled,
    menuButtonRef,
  } = useNav();

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Accordion open states in hamburger menu
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [communitiesExpanded, setCommunitiesExpanded] = useState(false);

  // When not on home page, header is always in the scrolled/solid state
  const isSolid = !isHome || isScrolled;

  const t = i18n[lang];

  // Focus management & Escape key handling
  useEffect(() => {
    if (!isMenuOpen) return;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        menuButtonRef.current?.focus();
        return;
      }

      // Focus trap within the side panel
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, closeMenu, menuButtonRef]);

  const handleClose = useCallback(() => {
    closeMenu();
    menuButtonRef.current?.focus();
  }, [closeMenu, menuButtonRef]);

  return (
    <>
      {/* 
        Transparent-to-dark gradient behind the header zone only.
        Only visible on the homepage when at scrollY <= 40.
      */}
      {isHome && (
        <div
          aria-hidden="true"
          className={`pointer-events-none fixed inset-x-0 top-0 z-30 h-[160px] transition-opacity duration-300 ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.45) 0%, transparent 100%)",
          }}
        />
      )}

      {/* Main Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,height,border-color,box-shadow,color] duration-300 ease-out motion-reduce:transition-none ${
          isSolid
            ? "is-scrolled h-[72px] bg-paper-texture text-[#452C1D] border-b border-[#452C1D]/10 shadow-[0_2px_12px_rgba(69,44,29,0.04)]"
            : "h-[90px] bg-transparent text-[#FBFAF7] border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="mx-auto flex h-full max-w-[1720px] items-center justify-between px-6 sm:px-8 md:px-12"
        >
          {/* Inline-start: Logo + Brand wordmark + Tagline */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label={lang === "ar" ? `${companyAr.name} الرئيسية` : `${company.name} home`}
            className="group flex min-w-0 shrink-0 items-center gap-3 sm:gap-3.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
          >
            <img
              src={company.logo}
              alt={t.brandName}
              width={816}
              height={816}
              className={`w-auto shrink-0 object-contain transition-all duration-300 motion-reduce:transition-none ${
                isSolid
                  ? "h-8 sm:h-9 md:h-10 filter-none"
                  : "h-9 sm:h-10 md:h-12 brightness-0 invert"
              }`}
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span
                className={`truncate text-[0.8rem] tracking-[0.18em] uppercase sm:text-[0.95rem] md:text-[1.05rem] font-serif transition-colors duration-300 ${
                  isSolid ? "text-[#452C1D]" : "text-[#FBFAF7]"
                }`}
              >
                {t.brandName}
              </span>
              <span
                className={`truncate font-sans text-[0.45rem] tracking-[0.14em] uppercase sm:text-[0.55rem] md:text-[0.6rem] transition-colors duration-300 ${
                  isSolid ? "text-[#452C1D]/75" : "text-[#FBFAF7]/85"
                }`}
              >
                {t.tagline}
              </span>
            </span>
          </Link>

          {/* Inline-end: Desktop Links + Circular Two-Line Menu Button */}
          <div
            className={`flex items-center gap-6 lg:gap-8 transition-opacity duration-200 ${
              isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            {/* Desktop text links: About Us, Services, Communities, Request Appraisal (Hidden <900px) */}
            <ul className="hidden items-center gap-7 lg:gap-9 min-[900px]:flex">
              <li>
                <Link
                  to="/about"
                  className={`font-sans text-[0.72rem] tracking-[0.16em] uppercase font-medium transition-all duration-200 hover:opacity-65 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current ${
                    isSolid ? "text-[#452C1D]" : "text-[#FBFAF7]"
                  }`}
                >
                  {t.about}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className={`font-sans text-[0.72rem] tracking-[0.16em] uppercase font-medium transition-all duration-200 hover:opacity-65 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current ${
                    isSolid ? "text-[#452C1D]" : "text-[#FBFAF7]"
                  }`}
                >
                  {t.services}
                </Link>
              </li>
              <li>
                <Link
                  to="/communities"
                  className={`font-sans text-[0.72rem] tracking-[0.16em] uppercase font-medium transition-all duration-200 hover:opacity-65 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current ${
                    isSolid ? "text-[#452C1D]" : "text-[#FBFAF7]"
                  }`}
                >
                  {t.communities}
                </Link>
              </li>
              <li>
                <Link
                  to="/request-appraisal"
                  className={`font-sans text-[0.72rem] tracking-[0.16em] uppercase font-medium transition-all duration-200 hover:opacity-65 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current ${
                    isSolid ? "text-[#452C1D]" : "text-[#FBFAF7]"
                  }`}
                >
                  {t.appraisal}
                </Link>
              </li>
            </ul>

            {/* Circular Hamburger Menu Button (40px) */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="side-menu-panel"
              aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:scale-105 active:scale-95 ${
                isSolid
                  ? "bg-[#452C1D] text-[#FBFAF7] hover:bg-[#382317] focus-visible:ring-[#452C1D]"
                  : "bg-[#FBFAF7] text-[#452C1D] hover:bg-white focus-visible:ring-[#FBFAF7]"
              }`}
            >
              {/* Icon of TWO short horizontal lines (=) matching Malibu reference */}
              <span
                className="flex flex-col items-center justify-center gap-[5px]"
                aria-hidden="true"
              >
                <span
                  className={`block h-[2px] w-4 rounded-full transition-colors duration-300 ${
                    isSolid ? "bg-[#FBFAF7]" : "bg-[#452C1D]"
                  }`}
                />
                <span
                  className={`block h-[2px] w-4 rounded-full transition-colors duration-300 ${
                    isSolid ? "bg-[#FBFAF7]" : "bg-[#452C1D]"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* 
        Scrim overlay behind side panel covering the rest of the page.
        Clicking closes the panel.
      */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className={`fixed inset-0 z-[115] bg-black/25 backdrop-blur-[1px] transition-opacity duration-400 motion-reduce:transition-none ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* 
        Slide-in Side Panel (Specification D)
        Slides from inline-end (right in LTR, left in RTL).
        Width: 34% on desktop (min 380px, max 520px), 100% on mobile.
        Background: textured cream (feTurbulence inline SVG).
      */}
      <aside
        ref={panelRef}
        id="side-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label={lang === "ar" ? "قائمة التنقل" : "Navigation Menu"}
        tabIndex={-1}
        className={`fixed top-0 bottom-0 end-0 right-0 rtl:right-auto rtl:left-0 z-[120] flex h-full flex-col bg-paper-texture text-[#452C1D] shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none overflow-y-auto custom-scrollbar ${
          lang === "ar"
            ? isMenuOpen
              ? "translate-x-0"
              : "-translate-x-full pointer-events-none"
            : isMenuOpen
              ? "translate-x-0"
              : "translate-x-full pointer-events-none"
        } w-full min-[900px]:w-[34%] min-[900px]:min-w-[380px] min-[900px]:max-w-[520px]`}
        style={{
          width: "var(--panel-w)",
          right: lang === "ar" ? "auto" : 0,
          left: lang === "ar" ? 0 : "auto",
          boxShadow:
            lang === "ar"
              ? "8px 0 32px rgba(69, 44, 29, 0.15)"
              : "-8px 0 32px rgba(69, 44, 29, 0.15)",
        }}
      >
        {/* Top row: CLOSE MENU + X icon, ~60px from top */}
        <div className="flex items-center justify-end px-8 pt-10 pb-6 sm:px-12 sm:pt-14">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label={t.closeMenu}
            className="group inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.2em] uppercase font-medium text-[#452C1D] transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
          >
            <span>{t.closeMenu}</span>
            <X className="size-4 transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>

        {/* Menu list */}
        <nav aria-label="Side menu links" className="flex-1">
          <ul className="flex flex-col">
            {/* HOME */}
            <li className="border-b border-[#452C1D]/15">
              <Link
                to="/"
                onClick={handleClose}
                className="flex items-center px-8 py-3.5 sm:py-4 md:px-12 font-serif text-[16px] tracking-[0.15em] uppercase text-[#452C1D] transition-colors hover:bg-[#452C1D]/5"
              >
                {t.home}
              </Link>
            </li>

            {/* ABOUT US */}
            <li className="border-b border-[#452C1D]/15">
              <Link
                to="/about"
                onClick={handleClose}
                className="flex items-center px-8 py-3.5 sm:py-4 md:px-12 font-serif text-[16px] tracking-[0.15em] uppercase text-[#452C1D] transition-colors hover:bg-[#452C1D]/5"
              >
                {t.about}
              </Link>
            </li>

            {/* SERVICES with Accordion */}
            <li className="border-b border-[#452C1D]/15">
              <div className="flex items-center justify-between px-8 py-3.5 sm:py-4 md:px-12">
                <Link
                  to="/services"
                  onClick={handleClose}
                  className="font-serif text-[16px] tracking-[0.15em] uppercase text-[#452C1D] transition-colors hover:opacity-70"
                >
                  {t.services}
                </Link>
                <button
                  type="button"
                  aria-expanded={servicesExpanded}
                  aria-label={
                    lang === "ar" ? "تبديل قائمة الخدمات الفرعية" : "Toggle services submenu"
                  }
                  onClick={() => setServicesExpanded((v) => !v)}
                  className="p-1 text-[#452C1D] transition-transform duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
                >
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${
                      servicesExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Accordion content with CSS grid-rows */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                  servicesExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden bg-[#452C1D]/[0.03]">
                  <ul className="py-2">
                    <li key="services-all">
                      <Link
                        to="/services"
                        onClick={handleClose}
                        className="block px-12 py-2 font-sans text-xs tracking-[0.14em] uppercase text-[#452C1D]/80 hover:text-[#452C1D] hover:bg-[#452C1D]/5"
                      >
                        <span className="inline-block rtl:rotate-180">→</span> {t.viewAllServices}
                      </Link>
                    </li>
                    {serviceList.map((service) => (
                      <li key={service.slug}>
                        <Link
                          to="/services"
                          onClick={handleClose}
                          className="block px-12 py-2 font-serif text-[13px] tracking-wide text-[#452C1D]/80 hover:text-[#452C1D] hover:bg-[#452C1D]/5"
                        >
                          {lang === "ar"
                            ? (servicesAr[service.slug]?.title ?? service.title)
                            : service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            {/* COMMUNITIES with Accordion */}
            <li className="border-b border-[#452C1D]/15">
              <div className="flex items-center justify-between px-8 py-3.5 sm:py-4 md:px-12">
                <Link
                  to="/communities"
                  onClick={handleClose}
                  className="font-serif text-[16px] tracking-[0.15em] uppercase text-[#452C1D] transition-colors hover:opacity-70"
                >
                  {t.communities}
                </Link>
                <button
                  type="button"
                  aria-expanded={communitiesExpanded}
                  aria-label={
                    lang === "ar" ? "تبديل قائمة المجمعات الفرعية" : "Toggle communities submenu"
                  }
                  onClick={() => setCommunitiesExpanded((v) => !v)}
                  className="p-1 text-[#452C1D] transition-transform duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
                >
                  <ChevronDown
                    className={`size-4 transition-transform duration-300 ${
                      communitiesExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Accordion content with CSS grid-rows */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                  communitiesExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden bg-[#452C1D]/[0.03]">
                  <ul className="py-2">
                    <li key="communities-all">
                      <Link
                        to="/communities"
                        onClick={handleClose}
                        className="block px-12 py-2 font-sans text-xs tracking-[0.14em] uppercase text-[#452C1D]/80 hover:text-[#452C1D] hover:bg-[#452C1D]/5"
                      >
                        <span className="inline-block rtl:rotate-180">→</span>{" "}
                        {t.viewAllCommunities}
                      </Link>
                    </li>
                    {communityList.map((c) => (
                      <li key={c.slug}>
                        <Link
                          to="/communities/$slug"
                          params={{ slug: c.slug }}
                          onClick={handleClose}
                          className="block px-12 py-2 font-serif text-[13px] tracking-wide text-[#452C1D]/80 hover:text-[#452C1D] hover:bg-[#452C1D]/5"
                        >
                          {lang === "ar" ? (communitiesAr[c.slug]?.name ?? c.name) : c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            {/* REQUEST APPRAISAL */}
            <li className="border-b border-[#452C1D]/15">
              <Link
                to="/request-appraisal"
                onClick={handleClose}
                className="flex items-center px-8 py-3.5 sm:py-4 md:px-12 font-serif text-[16px] tracking-[0.15em] uppercase text-[#452C1D] transition-colors hover:bg-[#452C1D]/5"
              >
                {t.appraisal}
              </Link>
            </li>

            {/* CONTACT US */}
            <li className="border-b border-[#452C1D]/15">
              <Link
                to="/contact"
                onClick={handleClose}
                className="flex items-center px-8 py-3.5 sm:py-4 md:px-12 font-serif text-[16px] tracking-[0.15em] uppercase text-[#452C1D] transition-colors hover:bg-[#452C1D]/5"
              >
                {t.contact}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Bottom of the panel: Language switcher + WhatsApp + Phone */}
        <div className="mt-auto px-8 pt-8 pb-10 sm:px-12 border-t border-[#452C1D]/15 space-y-4">
          {/* Language Switcher */}
          <div className="flex items-center justify-between">
            <span className="font-sans text-[0.7rem] tracking-[0.18em] uppercase text-[#452C1D]/60 font-medium">
              {t.language}
            </span>
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#452C1D]/20 px-3 py-1 font-sans text-xs tracking-wider text-[#452C1D] hover:bg-[#452C1D]/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
            >
              <span className={lang === "en" ? "font-bold text-[#452C1D]" : "text-[#452C1D]/60"}>
                EN
              </span>
              <span className="text-[#452C1D]/30">|</span>
              <span className={lang === "ar" ? "font-bold text-[#452C1D]" : "text-[#452C1D]/60"}>
                عربي
              </span>
            </button>
          </div>

          {/* Quick links: WhatsApp Us & Tel */}
          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href="https://wa.me/971522769564?text=Hi%20Parkwood%2C%20I%27d%20like%20a%20property%20appraisal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.14em] uppercase text-[#452C1D] hover:opacity-70 transition-opacity"
            >
              <WhatsAppIcon className="size-4 shrink-0 fill-[#25D366]" />
              <span>{t.whatsappUs}</span>
            </a>
            <a
              href={`tel:${company.phone}`}
              className="inline-flex items-center gap-2.5 font-sans text-xs tracking-[0.14em] uppercase text-[#452C1D] hover:opacity-70 transition-opacity"
            >
              <Phone className="size-3.5 shrink-0 text-[#452C1D]" />
              <span dir="ltr">{company.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
