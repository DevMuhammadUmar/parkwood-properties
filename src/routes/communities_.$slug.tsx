import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  HeartPulse,
  LandPlot,
  Plane,
  ShoppingBag,
  Sparkles,
  Trees,
  Waves,
} from "lucide-react";
import type { ComponentType } from "react";

import type { CommunityStat } from "@/content/communities";
import { getCommunityDetail } from "@/content/communities";
import { commonAr, communitiesAr, communityDetailsAr, pagesAr } from "@/content/i18n";
import { communities } from "@/content/site";
import { useNav } from "@/context/NavContext";
import { absoluteUrl, buildHead, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

const icons: Record<string, ComponentType<{ className?: string }>> = {
  area: LandPlot,
  park: Trees,
  school: GraduationCap,
  retail: ShoppingBag,
  clinic: HeartPulse,
  pool: Waves,
  plane: Plane,
  building: Building2,
};

export const Route = createFileRoute("/communities_/$slug")({
  loader: ({ params }) => {
    const community = getCommunityDetail(params.slug);
    if (!community) throw notFound();
    return { community };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: SITE_NAME }, { name: "robots", content: "noindex" }],
      };
    }
    const { community } = loaderData;
    const rawParagraph = community.overview.paragraphs[0] ?? "";
    const description =
      rawParagraph.length > 155
        ? `${rawParagraph
            .slice(0, 152)
            .trim()
            .replace(/[.,;!?]$/, "")}…`
        : rawParagraph ||
          `${community.name} — premier Dubai masterplanned community guide by Parkwood Properties.`;
    const title = `${community.name} Luxury Properties & Community Guide | Parkwood Properties Dubai`;
    const communityUrl = absoluteUrl(`/communities/${community.slug}`);
    const schemaImage = community.heroImage ? absoluteUrl(community.heroImage) : DEFAULT_OG_IMAGE;
    const ogImage =
      community.heroImage && !community.heroImage.toLowerCase().endsWith(".avif")
        ? absoluteUrl(community.heroImage)
        : DEFAULT_OG_IMAGE;
    return buildHead({
      title,
      description,
      path: `/communities/${community.slug}`,
      image: ogImage,
      type: "article",
      schemas: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Communities",
              item: absoluteUrl("/communities"),
            },
            {
              "@type": "ListItem",
              position: 3,
              name: community.name,
              item: communityUrl,
            },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "Place",
          name: `${community.name}, Dubai`,
          description,
          url: communityUrl,
          image: schemaImage,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dubai",
            addressRegion: "Dubai",
            addressCountry: "AE",
          },
        },
      ],
    });
  },
  notFoundComponent: CommunityNotFound,
  component: CommunityDetailPage,
});

function CommunityNotFound() {
  const { lang } = useNav();
  const isAr = lang === "ar";
  const p = pagesAr.communityDetail;

  return (
    <main className="bg-[#FBFAF7] px-6 pt-[130px] pb-24 text-[#452C1D]">
      <div className="mx-auto max-w-[780px] space-y-6 text-center">
        <h1 className="font-serif text-[24px] uppercase tracking-[0.08em] text-[#452C1D] sm:text-[29px]">
          {isAr ? p.notFoundTitle : "Community not found"}
        </h1>
        <p className="font-sans text-[13px] leading-relaxed text-[#452C1D]/80">
          {isAr
            ? p.notFoundBody
            : "We could not find that community. Browse our complete directory of Dubai masterplanned districts instead."}
        </p>
        <div className="pt-2">
          <Link
            to="/communities"
            style={{
              borderColor: "var(--color-brown, #452C1D)",
              color: "var(--color-brown, #452C1D)",
              textDecoration: "none",
            }}
            className="inline-flex items-center justify-center border border-[#452C1D] px-8 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors duration-200 hover:bg-[#452C1D] hover:text-[#FBFAF7]"
          >
            {isAr ? commonAr.allCommunities : "All communities"}
          </Link>
        </div>
      </div>
    </main>
  );
}

function CommunityDetailPage() {
  const { community } = Route.useLoaderData();
  const { lang } = useNav();
  const isAr = lang === "ar";
  const ar = isAr ? communityDetailsAr[community.slug] : undefined;
  const p = pagesAr.communityDetail;

  const displayName = ar?.name ?? community.name;
  const overview = ar?.overview ?? community.overview;
  const amenities = ar?.amenities ?? community.amenities;

  const currentIdx = communities.findIndex((c) => c.slug === community.slug);
  const relatedCommunities =
    currentIdx === -1
      ? communities.slice(0, 3)
      : [1, 2, 3].map((offset) => communities[(currentIdx + offset) % communities.length]);

  return (
    <main className="bg-[#FBFAF7] pt-[72px] text-[#452C1D]">
      {/* ── Full-Bleed Community Hero ── */}
      {community.heroImage ? (
        <section
          aria-label={displayName}
          className="relative flex min-h-[420px] w-full items-end overflow-hidden bg-[#1a120c] md:min-h-[500px]"
        >
          <img
            src={community.heroImage}
            alt={`${displayName} masterplanned community in Dubai`}
            width={1600}
            height={900}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(20, 12, 8, 0.82) 0%, rgba(20, 12, 8, 0.45) 55%, rgba(20, 12, 8, 0.25) 100%)",
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-12 sm:py-16 md:py-20">
            <Link
              to="/communities"
              className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#FBFAF7]/85 transition-opacity hover:opacity-70"
            >
              <ArrowLeft className="size-3.5 rtl:rotate-180" aria-hidden="true" />
              {isAr ? commonAr.backToCommunities : "Back to communities"}
            </Link>

            <h1
              className="mt-5 font-serif font-light uppercase leading-[1.06] tracking-[0.06em] text-[#FBFAF7]"
              style={{
                fontSize: "clamp(1.75rem, 3.2vw, 2.65rem)",
                textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)",
              }}
            >
              {displayName}
            </h1>
            {community.heroCaption ? (
              <p className="mt-3 max-w-[640px] font-sans text-sm text-[#FBFAF7]/85">
                {community.heroCaption}
              </p>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="bg-paper-texture border-b border-[#452C1D]/12 px-6 py-14 sm:py-18">
          <div className="mx-auto max-w-[1200px]">
            <Link
              to="/communities"
              className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#452C1D]/75 transition-opacity hover:opacity-65"
            >
              <ArrowLeft className="size-3.5 rtl:rotate-180" aria-hidden="true" />
              {isAr ? commonAr.backToCommunities : "Back to communities"}
            </Link>
            <h1
              className="mt-5 font-serif uppercase leading-[1.08] tracking-[0.06em] text-[#452C1D]"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)" }}
            >
              {displayName}
            </h1>
          </div>
        </section>
      )}

      {/* ── Overview Section ── */}
      <section className="bg-[#FBFAF7] py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
            <div>
              <h2
                className="font-serif uppercase leading-tight tracking-[0.08em] text-[#452C1D]"
                style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.8rem)" }}
              >
                {isAr ? p.overviewKicker : "COMMUNITY OVERVIEW"}
              </h2>
            </div>

            <div className="space-y-5">
              {overview.paragraphs.map((para: string) => (
                <p key={para} className="font-sans text-[13px] leading-[1.75] text-[#452C1D]/85">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Extended Narrative / Lifestyle ── */}
      {overview.restParagraphs?.length || overview.restHeading ? (
        <section className="border-t border-[#452C1D]/10 bg-[#FBFAF7] py-16 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
              <div>
                {overview.restHeading ? (
                  <h2
                    className="font-serif uppercase leading-tight tracking-[0.08em] text-[#452C1D]"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.65rem)" }}
                  >
                    {overview.restHeading}
                  </h2>
                ) : (
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#452C1D]/60">
                    {isAr ? p.livingHeading : "LIVING & SETTING"}
                  </span>
                )}
              </div>
              <div className="space-y-5">
                {overview.restParagraphs?.map((para: string) => (
                  <p key={para} className="font-sans text-[13px] leading-[1.75] text-[#452C1D]/85">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ── At a Glance Stats Grid ── */}
      {amenities ? (
        <section className="bg-paper-texture border-t border-[#452C1D]/12 py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#452C1D]/65">
              {amenities.heading}
            </p>
            <p className="mt-4 max-w-[680px] font-serif text-xl leading-[1.45] text-[#452C1D] sm:text-2xl">
              {amenities.intro}
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-px border border-[#452C1D]/15 bg-[#452C1D]/15 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
              {amenities.stats.map((stat: CommunityStat) => {
                const Icon = icons[stat.icon] ?? Sparkles;
                return (
                  <div
                    key={`${stat.label}-${stat.value}`}
                    className={`flex flex-col gap-3 p-6 ${
                      stat.highlighted
                        ? "bg-[#452C1D] text-[#FBFAF7]"
                        : "bg-[#FBFAF7] text-[#452C1D]"
                    }`}
                  >
                    <Icon
                      className={`size-5 ${
                        stat.highlighted ? "text-[#FBFAF7]/85" : "text-[#452C1D]/70"
                      }`}
                      aria-hidden="true"
                    />
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-serif text-xl tracking-[0.02em] sm:text-2xl">
                      {stat.value}
                    </dd>
                    <p
                      className={`font-sans text-xs leading-relaxed ${
                        stat.highlighted ? "text-[#FBFAF7]/80" : "text-[#452C1D]/70"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>
      ) : null}

      {/* ── Related Communities Cross-Links ── */}
      <section className="border-t border-[#452C1D]/12 bg-[#FBFAF7] py-14 sm:py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="font-serif text-[14px] uppercase tracking-[0.14em] text-[#452C1D]">
            {isAr ? p.moreCommunitiesHeading : "EXPLORE MORE DUBAI COMMUNITIES"}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {relatedCommunities.map((rel) => {
              const relAr = isAr ? communitiesAr[rel.slug] : undefined;
              return (
                <Link
                  key={rel.slug}
                  to="/communities/$slug"
                  params={{ slug: rel.slug }}
                  style={{ textDecoration: "none", color: "var(--color-brown, #452C1D)" }}
                  className="group block border border-[#452C1D]/15 bg-[#FBFAF7] p-5 transition-colors hover:border-[#452C1D]/45"
                >
                  <p className="font-serif text-[15px] uppercase tracking-[0.08em] text-[#452C1D] group-hover:opacity-75">
                    {relAr?.name ?? rel.name}
                  </p>
                  <p className="mt-2 line-clamp-2 font-sans text-xs leading-relaxed text-[#452C1D]/75">
                    {relAr?.description ?? rel.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom Interest CTA ── */}
      <section className="border-t border-[#452C1D]/12 bg-[#FBFAF7] py-16 sm:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-6">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#452C1D]/60">
              {isAr ? p.advisoryKicker : "ADVISORY INQUIRY"}
            </p>
            <p
              className="mt-2 font-serif uppercase tracking-[0.06em] text-[#452C1D]"
              style={{ fontSize: "clamp(1.25rem, 2vw, 1.65rem)" }}
            >
              {isAr ? p.interestedIn(displayName) : `Interested in ${displayName}?`}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              to="/contact"
              style={{
                borderColor: "var(--color-brown, #452C1D)",
                color: "var(--color-brown, #452C1D)",
                textDecoration: "none",
              }}
              className="inline-flex items-center justify-center border border-[#452C1D] px-7 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors duration-200 hover:bg-[#452C1D] hover:text-[#FBFAF7]"
            >
              {isAr ? commonAr.talkToUs : "Talk to us"}
            </Link>
            <Link
              to="/communities"
              style={{
                borderColor: "var(--color-brown, #452C1D)",
                color: "var(--color-brown, #452C1D)",
                textDecoration: "none",
              }}
              className="inline-flex items-center justify-center border border-[#452C1D] px-7 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors duration-200 hover:bg-[#452C1D] hover:text-[#FBFAF7]"
            >
              {isAr ? commonAr.allCommunities : "All communities"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
