import { createFileRoute, Link } from "@tanstack/react-router";

import { CommunityCard } from "@/components/site/CommunityCard";
import { PageHero } from "@/components/site/sections";
import { commonAr, pagesAr } from "@/content/i18n";
import { communities } from "@/content/site";
import { useNav } from "@/context/NavContext";
import { buildBreadcrumbSchema, buildHead, SITE_URL, absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/communities")({
  head: () =>
    buildHead({
      title: "Dubai Masterplanned Communities & Luxury Real Estate | Parkwood Properties",
      description:
        "Explore premier Dubai residential masterplans: Downtown Dubai, Dubai Hills Estate, The Oasis, Dubai Creek Harbour, Arabian Ranches III, and Emaar Beachfront.",
      path: "/communities",
      schemas: [
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Communities", path: "/communities" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Dubai Masterplanned Communities & Luxury Real Estate",
          url: `${SITE_URL}/communities`,
          description:
            "Explore premier Dubai residential masterplans: Downtown Dubai, Dubai Hills Estate, The Oasis, Dubai Creek Harbour, Arabian Ranches III, and Emaar Beachfront.",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: communities.map((c, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: c.name,
              url: absoluteUrl(`/communities/${c.slug}`),
            })),
          },
        },
      ],
    }),
  component: CommunitiesPage,
});

function CommunitiesPage() {
  const { lang } = useNav();
  const isAr = lang === "ar";
  const p = pagesAr.communities;

  return (
    <main className="bg-[#FBFAF7] pt-[72px] text-[#452C1D]">
      <PageHero
        title={isAr ? p.heroTitle : "Discover Dubai, community by community"}
        body={
          isAr
            ? p.heroBody
            : "From established neighbourhoods to exclusive new developments, explore the communities that define Dubai's premium lifestyle. We know what makes each location distinctive — from its architecture and surroundings to its lifestyle and investment potential."
        }
        image="/dubai creek.avif"
        imageAlt={isAr ? p.heroImageAlt : "Dubai Creek Harbour waterfront promenade and skyline"}
      />

      <section
        aria-labelledby="all-communities-heading"
        className="border-t border-[#452C1D]/10 bg-[#FBFAF7] py-16 sm:py-24"
        style={{ backgroundColor: "var(--color-cream, #FBFAF7)" }}
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <h2
            id="all-communities-heading"
            className="font-serif uppercase leading-tight tracking-[0.1em] text-[#452C1D]"
            style={{
              fontSize: "clamp(1.45rem, 2.5vw, 2rem)",
              color: "var(--color-brown, #452C1D)",
            }}
          >
            {isAr ? p.heading : "DUBAI COMMUNITIES"}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-12 border-t border-[#452C1D]/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {communities.map((community, idx) => (
              <CommunityCard key={community.slug} community={community} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom Editorial CTA Band ── */}
      <section
        aria-labelledby="communities-closing-heading"
        className="bg-paper-texture border-t border-[#452C1D]/12 px-6 py-20 text-center sm:py-24"
      >
        <div className="mx-auto max-w-[780px]">
          <h2
            id="communities-closing-heading"
            className="font-serif uppercase leading-[1.12] tracking-[0.06em] text-[#452C1D]"
            style={{
              fontSize: "clamp(1.45rem, 2.5vw, 2.05rem)",
              textWrap: "balance",
            }}
          >
            {isAr ? p.closingHeading : "LOOKING FOR A SPECIFIC ADDRESS?"}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-sans text-sm leading-[1.7] text-[#452C1D]/85 sm:text-[13px]">
            {isAr
              ? p.closingBody
              : "Share your preferred community, layout, or investment brief and we will walk you through current secondary market availability and upcoming releases."}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
          </div>
        </div>
      </section>
    </main>
  );
}
