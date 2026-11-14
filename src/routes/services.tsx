import { createFileRoute, Link } from "@tanstack/react-router";

import { featuredServices } from "@/components/site/OurServices";
import { PageHero } from "@/components/site/sections";
import { commonAr, pagesAr, servicesAr } from "@/content/i18n";
import { services } from "@/content/site";
import { useNav } from "@/context/NavContext";
import { buildBreadcrumbSchema, buildHead, SITE_URL } from "@/lib/seo";

const metaBySlug = new Map(featuredServices.map((s) => [s.slug, s]));

export const Route = createFileRoute("/services")({
  head: () => ({
    ...buildHead({
      title: "Real Estate Advisory & Property Services Dubai | Parkwood Properties",
      description:
        "Comprehensive Dubai real estate services: luxury property acquisition, sales marketing, residential leasing, independent mortgage advisory, and Emaar handover snagging.",
      path: "/services",
      schemas: [
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
      ],
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Real Estate Advisory",
          provider: {
            "@type": "RealEstateAgent",
            name: "Parkwood Properties Dubai",
            url: SITE_URL,
          },
          areaServed: {
            "@type": "City",
            name: "Dubai",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Dubai Real Estate Services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${s.title} Real Estate Service Dubai`,
                description: s.description,
              },
            })),
          },
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { lang } = useNav();
  const isAr = lang === "ar";
  const p = pagesAr.services;

  return (
    <main className="bg-[#FBFAF7] pt-[72px] text-[#452C1D]">
      <PageHero
        kicker={isAr ? p.heroKicker : "Services"}
        title={isAr ? p.heroTitle : "Five ways we work with you"}
        body={
          isAr
            ? p.heroBody
            : "From first viewing to keys in hand — buying, selling, renting, financing and handover, all handled in-house."
        }
        image="/assets/hero-poster.jpg"
        imageAlt={isAr ? p.heroImageAlt : "Downtown Dubai skyline at golden hour"}
      />

      {/* ── Core Services Editorial Showcase ── */}
      <section
        aria-labelledby="services-overview-heading"
        className="border-t border-[#452C1D]/10 bg-[#FBFAF7] py-16 sm:py-24"
        style={{ backgroundColor: "var(--color-cream, #FBFAF7)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2
            id="services-overview-heading"
            className="font-serif uppercase leading-tight tracking-[0.1em] text-[#452C1D]"
            style={{
              fontSize: "clamp(1.45rem, 2.5vw, 2rem)",
              color: "var(--color-brown, #452C1D)",
            }}
          >
            {isAr ? p.overviewHeading : "OUR SERVICES"}
          </h2>

          <div className="mt-10 space-y-16 border-t border-[#452C1D]/15 pt-12 md:space-y-24">
            {services.map((service, i) => {
              const meta = metaBySlug.get(service.slug);
              const ar = isAr ? servicesAr[service.slug] : undefined;

              const title = ar?.title ?? service.title;
              const badge = ar?.label ?? meta?.label ?? (isAr ? "استشارات" : "ADVISORY");
              const descriptor = ar?.descriptor ?? meta?.descriptor;
              const description = ar?.description ?? service.description;
              const stats = ar?.stats ?? meta?.stats;
              const ctaLabel = ar?.ctaLabel ?? service.ctaLabel;

              return (
                <article
                  key={service.slug}
                  className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
                >
                  {/* 4:3 Square-Corner Media with Top Gradient & Cream Label */}
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden bg-[#e8e4db] ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.imageAlt ?? title}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="block h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-[35%]"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, transparent 100%)",
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
                      {badge}
                    </span>
                  </div>

                  {/* Editorial Details Column */}
                  <div className="flex flex-col justify-center">
                    <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#452C1D]/60">
                      {String(i + 1).padStart(2, "0")} · {badge}
                    </p>

                    <h3
                      className="mt-3 font-serif uppercase leading-tight tracking-[0.08em] text-[#452C1D]"
                      style={{
                        fontSize: "clamp(1.3rem, 2vw, 1.75rem)",
                        color: "var(--color-brown, #452C1D)",
                      }}
                    >
                      {title}
                    </h3>

                    {descriptor ? (
                      <p className="mt-2 font-sans text-xs uppercase tracking-[0.12em] text-[#452C1D]/75">
                        {descriptor}
                      </p>
                    ) : null}

                    <p className="mt-5 font-sans text-[13px] leading-[1.75] text-[#452C1D]/85">
                      {description}
                    </p>

                    {stats ? (
                      <p className="mt-5 border-t border-[#452C1D]/15 pt-4 font-sans text-[11px] uppercase tracking-[0.12em] text-[#452C1D]/65">
                        {stats}
                      </p>
                    ) : null}

                    {ctaLabel && service.ctaTo ? (
                      <div className="mt-8">
                        <Link
                          to={service.ctaTo}
                          style={{
                            borderColor: "var(--color-brown, #452C1D)",
                            color: "var(--color-brown, #452C1D)",
                            textDecoration: "none",
                          }}
                          className="inline-flex items-center justify-center border border-[#452C1D] px-7 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors duration-200 hover:bg-[#452C1D] hover:text-[#FBFAF7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
                        >
                          {ctaLabel}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom Editorial CTA Band ── */}
      <section
        aria-labelledby="services-closing-heading"
        className="bg-paper-texture border-t border-[#452C1D]/12 px-6 py-20 text-center sm:py-24"
      >
        <div className="mx-auto max-w-[780px]">
          <h2
            id="services-closing-heading"
            className="font-serif uppercase leading-[1.12] tracking-[0.06em] text-[#452C1D]"
            style={{
              fontSize: "clamp(1.45rem, 2.5vw, 2.05rem)",
              textWrap: "balance",
            }}
          >
            {isAr ? p.closingHeading : "TAILORED ADVICE FOR EVERY STAGE"}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-sans text-sm leading-[1.7] text-[#452C1D]/85 sm:text-[13px]">
            {isAr
              ? p.closingBody
              : "Whether you are acquiring an off-plan residence, preparing a villa for sale, or coordinating a handover in Dubai, speak directly with our advisory team."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/request-appraisal"
              style={{
                borderColor: "var(--color-brown, #452C1D)",
                color: "var(--color-brown, #452C1D)",
                textDecoration: "none",
              }}
              className="inline-flex items-center justify-center border border-[#452C1D] px-8 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors duration-200 hover:bg-[#452C1D] hover:text-[#FBFAF7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
            >
              {isAr ? commonAr.requestAppraisal : "Request an appraisal"}
            </Link>
            <Link
              to="/contact"
              style={{
                borderColor: "var(--color-brown, #452C1D)",
                color: "var(--color-brown, #452C1D)",
                textDecoration: "none",
              }}
              className="inline-flex items-center justify-center border border-[#452C1D] px-8 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors duration-200 hover:bg-[#452C1D] hover:text-[#FBFAF7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
            >
              {isAr ? commonAr.talkToUs : "Talk to us"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
