import { Link } from "@tanstack/react-router";

import { featuredCommunities } from "@/components/site/ExploreCommunities";
import { communitiesAr } from "@/content/i18n";
import type { Community } from "@/content/site";
import { useNav } from "@/context/NavContext";

const metaBySlug = new Map(featuredCommunities.map((c) => [c.slug, c]));

/**
 * Community Grid Card matching the ExploreCommunities landing page card design:
 * - Square-corner 4:3 photograph with subtle top gradient and top-inline-end cream label
 * - Uppercase serif title with sliding bottom underline on hover
 * - Uppercase sans descriptor + pipe-separated highlight stats
 */
export function CommunityCard({ community, index = 0 }: { community: Community; index?: number }) {
  const { lang } = useNav();

  const meta = metaBySlug.get(community.slug);
  const ar = lang === "ar" ? communitiesAr[community.slug] : undefined;

  const displayName = ar?.name ?? community.name;
  const badgeLabel = ar?.label ?? meta?.label ?? community.tag ?? "MASTERPLAN";
  const descriptor = ar?.descriptor ?? meta?.descriptor ?? community.description;
  const stats =
    ar?.stats ??
    meta?.stats ??
    (lang === "ar" ? "مخطط رئيسي من إعمار | تملك حر" : "EMAAR MASTERPLAN | FREEHOLD");

  return (
    <div
      data-card-index={index}
      className="opacity-100 translate-y-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none"
    >
      <article>
        <Link
          to="/communities/$slug"
          params={{ slug: community.slug }}
          style={{
            color: "var(--color-brown, #452C1D)",
            textDecoration: "none",
          }}
          className="community-card-link group block rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#452C1D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FBFAF7]"
        >
          {/* 4:3 Square-Corner Media Container */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none bg-[#e8e4db]">
            <img
              src={meta?.image ?? community.image}
              alt={meta?.imageAlt ?? `${displayName} community in Dubai`}
              loading="lazy"
              width={800}
              height={600}
              className="block h-full w-full rounded-none object-cover transition-transform duration-600 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
            />

            {/* Subtle top-to-transparent gradient */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[35%]"
              style={{
                background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, transparent 100%)",
              }}
            />

            {/* Top-inline-end cream label */}
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
              {badgeLabel}
            </span>
          </div>

          {/* Card Details */}
          <div className="pt-4 text-start">
            <div className="relative inline-block max-w-full">
              <h3
                className="truncate font-serif uppercase"
                style={{
                  color: "var(--color-brown, #452C1D)",
                  fontSize: "calc(clamp(1.1rem, 1.6vw, 1.4rem) - 2px)",
                  lineHeight: 1.2,
                  letterSpacing: "0.12em",
                  whiteSpace: "nowrap",
                }}
              >
                {displayName}
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

            <p
              className="mt-2 line-clamp-2 font-sans uppercase leading-normal"
              style={{
                color: "rgba(69, 44, 29, 0.85)",
                fontSize: "12px",
                letterSpacing: "0.1em",
              }}
            >
              {descriptor}
            </p>

            <p
              className="mt-2.5 font-sans uppercase leading-normal"
              style={{
                color: "rgba(69, 44, 29, 0.65)",
                fontSize: "11px",
                letterSpacing: "0.1em",
              }}
            >
              {stats}
            </p>
          </div>
        </Link>
      </article>
    </div>
  );
}
