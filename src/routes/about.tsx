import { createFileRoute, Link } from "@tanstack/react-router";

import { PhilosophyQuote } from "@/components/site/PhilosophyQuote";
import { aboutAr } from "@/content/i18n";
import { about, company } from "@/content/site";
import { useNav } from "@/context/NavContext";
import { buildBreadcrumbSchema, buildHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...buildHead({
      title: "About Us | Dubai Real Estate Consultancy | Parkwood Properties",
      description:
        "Learn about Parkwood Properties, a Dubai real estate consultancy specializing in secondary market residential property across Emaar's masterplanned communities.",
      path: "/about",
      schemas: [
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]),
      ],
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": "https://parkwoodproperties.ae/about#webpage",
          name: "About Us | Parkwood Properties Dubai",
          url: `${SITE_URL}/about`,
          description:
            "Learn about Parkwood Properties, a Dubai real estate consultancy specializing in secondary market residential property across Emaar's masterplanned communities.",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://parkwoodproperties.ae/#website",
            name: "Parkwood Properties Dubai",
            url: SITE_URL,
          },
          mainEntity: {
            "@type": "RealEstateAgent",
            "@id": "https://parkwoodproperties.ae/#organization",
            name: "Parkwood Properties Dubai",
            url: SITE_URL,
            email: company.email,
            areaServed: "Dubai, United Arab Emirates",
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang } = useNav();
  const isAr = lang === "ar";

  const hero = isAr ? aboutAr.hero : about.hero;
  const intro = isAr ? aboutAr.intro : about.intro;
  const story = isAr ? aboutAr.story : about.story;
  const values = isAr ? aboutAr.values : about.values;
  const closing = isAr ? aboutAr.closing : about.closing;
  const howWeWorkTitle = isAr ? aboutAr.howWeWorkTitle : "How we work";
  const storyBadge = isAr ? aboutAr.story.badge : "DUBAI · SECONDARY & DEVELOPMENT";

  return (
    <main className="bg-[#FBFAF7] pt-[72px] text-[#452C1D]">
      {/* ── Full-Bleed Architectural Hero ── */}
      <section
        aria-label={hero.kicker}
        className="relative flex min-h-[460px] w-full items-center overflow-hidden bg-[#1a120c] md:min-h-[540px]"
      >
        <img
          src={about.hero.image}
          alt={hero.imageAlt}
          width={1600}
          height={900}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Measured Dark Contrast Scrim */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: isAr
              ? "linear-gradient(265deg, rgba(20, 12, 8, 0.78) 0%, rgba(20, 12, 8, 0.50) 55%, rgba(20, 12, 8, 0.28) 100%)"
              : "linear-gradient(95deg, rgba(20, 12, 8, 0.78) 0%, rgba(20, 12, 8, 0.50) 55%, rgba(20, 12, 8, 0.28) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-20 md:py-24">
          <p
            className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-[#FBFAF7]/85"
            style={{ textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)" }}
          >
            {hero.kicker}
          </p>
          <h1
            className="mt-4 max-w-[780px] font-serif font-light uppercase leading-[1.08] tracking-[0.06em] text-[#FBFAF7]"
            style={{
              fontSize: "clamp(1.65rem, 3vw, 2.5rem)",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)",
              textWrap: "balance",
            }}
          >
            {hero.title}
          </h1>
          <p
            className="mt-5 max-w-[560px] font-sans text-sm leading-[1.7] text-[#FBFAF7]/90 sm:text-[13px]"
            style={{ textShadow: "0 1px 12px rgba(0, 0, 0, 0.45)" }}
          >
            {hero.body}
          </p>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section
        aria-labelledby="who-we-are-heading"
        className="border-t border-[#452C1D]/10 bg-[#FBFAF7] py-16 sm:py-24"
        style={{ backgroundColor: "var(--color-cream, #FBFAF7)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2
            id="who-we-are-heading"
            className="font-serif uppercase leading-tight tracking-[0.1em] text-[#452C1D]"
            style={{
              fontSize: "clamp(1.45rem, 2.5vw, 2rem)",
              color: "var(--color-brown, #452C1D)",
            }}
          >
            {intro.title}
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
            {intro.body.map((p, i) => (
              <div key={i} className="border-t border-[#452C1D]/20 pt-6">
                <span className="mb-3 block font-sans text-[11px] uppercase tracking-[0.18em] text-[#452C1D]/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-sans text-[13px] leading-[1.75] text-[#452C1D]/85">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architectural Philosophy: Winston Churchill Quote + Dubai Villa ── */}
      <PhilosophyQuote />

      {/* ── Our Story ── */}
      <section
        aria-labelledby="our-story-heading"
        className="border-t border-[#452C1D]/10 bg-[#FBFAF7] py-16 sm:py-24"
        style={{ backgroundColor: "var(--color-cream, #FBFAF7)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2
            id="our-story-heading"
            className="font-serif uppercase leading-tight tracking-[0.1em] text-[#452C1D]"
            style={{
              fontSize: "clamp(1.45rem, 2.5vw, 2rem)",
              color: "var(--color-brown, #452C1D)",
            }}
          >
            {story.title}
          </h2>

          <div className="mt-8 grid items-start gap-10 border-t border-[#452C1D]/15 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8e4db]">
              <img
                src={about.story.image}
                alt={about.story.imageAlt}
                loading="lazy"
                width={1200}
                height={900}
                className="block h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[32%]"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.32) 0%, transparent 100%)",
                }}
              />
              <span
                style={{
                  top: "14px",
                  insetInlineEnd: "16px",
                  color: "var(--color-cream, #FBFAF7)",
                  letterSpacing: "0.15em",
                  fontSize: "11px",
                  textShadow: "0 1px 8px rgba(0, 0, 0, 0.5)",
                }}
                className="pointer-events-none absolute top-3.5 end-4 z-10 font-sans font-medium uppercase leading-none select-none"
              >
                {storyBadge}
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <p
                className="font-serif text-xl leading-[1.45] text-[#452C1D] sm:text-2xl"
                style={{ color: "var(--color-brown, #452C1D)" }}
              >
                {story.body[0]}
              </p>
              <div className="mt-6 space-y-5 border-t border-[#452C1D]/15 pt-6">
                {story.body.slice(1).map((p, i) => (
                  <p key={i} className="font-sans text-[13px] leading-[1.75] text-[#452C1D]/85">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Work ── */}
      <section
        aria-labelledby="how-we-work-heading"
        className="border-t border-[#452C1D]/10 bg-[#FBFAF7] py-16 sm:py-24"
        style={{ backgroundColor: "var(--color-cream, #FBFAF7)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2
            id="how-we-work-heading"
            className="font-serif uppercase leading-tight tracking-[0.1em] text-[#452C1D]"
            style={{
              fontSize: "clamp(1.45rem, 2.5vw, 2rem)",
              color: "var(--color-brown, #452C1D)",
            }}
          >
            {howWeWorkTitle}
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
            {values.map((v, i) => (
              <div key={v.title} className="border-t border-[#452C1D]/20 pt-6">
                <span className="block font-sans text-[11px] uppercase tracking-[0.18em] text-[#452C1D]/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-3 font-serif uppercase leading-snug tracking-[0.08em] text-[#452C1D]"
                  style={{ fontSize: "calc(clamp(1.15rem, 1.8vw, 1.45rem) - 2px)" }}
                >
                  {v.title}
                </h3>
                <p className="mt-3 font-sans text-[12.5px] leading-[1.7] text-[#452C1D]/80">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section
        aria-labelledby="about-closing-heading"
        className="bg-paper-texture border-t border-[#452C1D]/10 px-6 py-20 text-center sm:py-24"
      >
        <div className="mx-auto max-w-[780px]">
          <h2
            id="about-closing-heading"
            className="font-serif uppercase leading-[1.12] tracking-[0.06em] text-[#452C1D]"
            style={{
              fontSize: "clamp(1.45rem, 2.5vw, 2.05rem)",
              textWrap: "balance",
            }}
          >
            {closing.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-sans text-sm leading-[1.7] text-[#452C1D]/85 sm:text-[13px]">
            {closing.body}
          </p>
          <div className="mt-8">
            <Link
              to={about.closing.ctaTo}
              style={{
                borderColor: "var(--color-brown, #452C1D)",
                color: "var(--color-brown, #452C1D)",
                textDecoration: "none",
              }}
              className="inline-flex items-center justify-center border border-[#452C1D] px-8 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors duration-200 hover:bg-[#452C1D] hover:text-[#FBFAF7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
            >
              {closing.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
