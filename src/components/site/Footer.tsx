import { Link, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin } from "lucide-react";

import { useNav } from "@/context/NavContext";
import { company, socials, type SocialIcon } from "@/content/site";

const socialIcons: Record<SocialIcon, typeof Linkedin> = {
  linkedin: Linkedin,
  facebook: Facebook,
  instagram: Instagram,
};

const footerI18n = {
  en: {
    brandName: company.name,
    contactHeading: "PARKWOOD PROPERTIES",
    locationHeading: "LOCATION",
    locationLine: "Dubai, United Arab Emirates",
    tagline: company.tagline,
    home: "Home",
    about: "About Us",
    services: "Services",
    communities: "Communities",
    appraisal: "Request Appraisal",
    contact: "Contact Us",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    disclaimer:
      "Parkwood Properties is a residential real estate consultancy in Dubai, United Arab Emirates. All material presented herein is provided for general informational purposes only. Property availability, prices, specifications, and descriptions may change without notice and should be independently verified prior to entering into any transaction.",
  },
  ar: {
    brandName: "بارك وود للعقارات",
    contactHeading: "بارك وود للعقارات",
    locationHeading: "الموقع",
    locationLine: "دبي، الإمارات العربية المتحدة",
    tagline: "مبنية على الثقة - مدعومة بالخبرة",
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    communities: "المجمعات السكنية",
    appraisal: "طلب تقييم عقاري",
    contact: "اتصل بنا",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    disclaimer:
      "بارك وود للعقارات هي شركة استشارات عقارية سكنية في دبي، الإمارات العربية المتحدة. جميع المواد المعروضة هنا مقدمة لأغراض المعلومات العامة فقط. قد تتغير توفر العقارات والأسعار والمواصفات والأوصاف دون إشعار مسبق ويجب التحقق منها بشكل مستقل قبل الدخول في أي معاملة.",
  },
};

export function Footer() {
  const { lang } = useNav();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const t = footerI18n[lang];

  const footerNav = [
    { label: t.home, to: "/" as const },
    { label: t.about, to: "/about" as const },
    { label: t.services, to: "/services" as const },
    { label: t.communities, to: "/communities" as const },
    { label: t.appraisal, to: "/request-appraisal" as const },
    { label: t.contact, to: "/contact" as const },
  ];

  const handleNavClick = (to: string) => {
    if (pathname === to) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="border-t border-[#FBFAF7]/15 bg-[#452C1D] px-6 py-14 text-[#FBFAF7] sm:px-8 md:px-12 md:py-16"
      style={{
        backgroundColor: "var(--color-brown, #452C1D)",
        color: "var(--color-cream, #FBFAF7)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Row 1: Brand Lockup */}
        <Link
          to="/"
          onClick={() => handleNavClick("/")}
          className="inline-flex items-center gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FBFAF7]"
        >
          <img
            src={company.logo}
            alt={company.name}
            loading="lazy"
            width={816}
            height={816}
            className="h-11 w-auto shrink-0 object-contain brightness-0 invert sm:h-12"
          />
          <span aria-hidden="true" className="h-8 w-px bg-[#FBFAF7]/25" />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base uppercase tracking-[0.2em] text-[#FBFAF7] sm:text-lg">
              {t.brandName}
            </span>
            <span className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#FBFAF7]/75">
              {t.tagline}
            </span>
          </span>
        </Link>

        {/* Row 2: Contact & Location Info Columns */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,320px)_minmax(0,320px)_1fr]">
          <div>
            <h3 className="font-serif text-[12px] uppercase tracking-[0.14em] text-[#FBFAF7] sm:text-[13px]">
              {t.contactHeading}
            </h3>
            <div className="mt-3 space-y-1.5 font-sans text-sm text-[#FBFAF7]/85">
              <p>
                <a
                  href={`tel:${company.phone}`}
                  dir="ltr"
                  className="inline-block underline decoration-[#FBFAF7]/45 underline-offset-4 transition-opacity hover:text-[#FBFAF7] hover:opacity-75"
                >
                  {company.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-block underline decoration-[#FBFAF7]/45 underline-offset-4 transition-opacity hover:text-[#FBFAF7] hover:opacity-75"
                >
                  {company.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-[12px] uppercase tracking-[0.14em] text-[#FBFAF7] sm:text-[13px]">
              {t.locationHeading}
            </h3>
            <div className="mt-3 space-y-1.5 font-sans text-sm text-[#FBFAF7]/85">
              <p>{t.locationLine}</p>
              <p>
                <a
                  href={company.websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block underline decoration-[#FBFAF7]/45 underline-offset-4 transition-opacity hover:text-[#FBFAF7] hover:opacity-75"
                >
                  {company.website}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Row 3: Navigation Links & Circular Social Icons */}
        <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {footerNav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => handleNavClick(item.to)}
                    className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#FBFAF7] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FBFAF7]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-2.5" aria-label="Social Media">
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-[#FBFAF7]/55 text-[#FBFAF7] transition-colors duration-200 hover:border-[#FBFAF7] hover:bg-[#FBFAF7] hover:text-[#452C1D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FBFAF7]"
                  >
                    <Icon className="size-3.5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Row 4: Disclaimer & Legal Links */}
        <div className="mt-10 space-y-4 border-t border-[#FBFAF7]/15 pt-6">
          <p className="max-w-[1050px] font-sans text-[11px] leading-[1.7] text-[#FBFAF7]/75">
            {t.disclaimer}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 font-sans text-[11px] uppercase tracking-[0.12em] text-[#FBFAF7]/80">
            <p>
              © {new Date().getFullYear()} {t.brandName}
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  onClick={() => handleNavClick("/privacy-policy")}
                  className="transition-opacity hover:opacity-70"
                >
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  onClick={() => handleNavClick("/terms-and-conditions")}
                  className="transition-opacity hover:opacity-70"
                >
                  {t.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
