import type { ReactNode } from "react";
import { useNav } from "@/context/NavContext";

export function PageHero({
  kicker,
  title,
  body,
  image,
  imageAlt,
}: {
  kicker: string;
  title: string;
  body?: string;
  image?: string;
  imageAlt?: string;
}) {
  const { lang } = useNav();

  if (image) {
    return (
      <section
        aria-label={kicker}
        className="relative flex min-h-[420px] w-full items-center overflow-hidden bg-[#1a120c] md:min-h-[500px]"
      >
        <img
          src={image}
          alt={imageAlt ?? ""}
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
              lang === "ar"
                ? "linear-gradient(265deg, rgba(20, 12, 8, 0.8) 0%, rgba(20, 12, 8, 0.52) 55%, rgba(20, 12, 8, 0.3) 100%)"
                : "linear-gradient(95deg, rgba(20, 12, 8, 0.8) 0%, rgba(20, 12, 8, 0.52) 55%, rgba(20, 12, 8, 0.3) 100%)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-16 sm:py-20 md:py-24">
          <p
            className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-[#FBFAF7]/85"
            style={{ textShadow: "0 1px 10px rgba(0, 0, 0, 0.45)" }}
          >
            {kicker}
          </p>
          <h1
            className="mt-4 max-w-[780px] font-serif font-light uppercase leading-[1.08] tracking-[0.06em] text-[#FBFAF7]"
            style={{
              fontSize: "clamp(1.65rem, 3vw, 2.5rem)",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)",
              textWrap: "balance",
            }}
          >
            {title}
          </h1>
          {body ? (
            <p
              className="mt-5 max-w-[580px] font-sans text-sm leading-[1.7] text-[#FBFAF7]/90 sm:text-[13px]"
              style={{ textShadow: "0 1px 12px rgba(0, 0, 0, 0.45)" }}
            >
              {body}
            </p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label={kicker}
      className="bg-paper-texture border-b border-[#452C1D]/12 px-6 py-14 text-[#452C1D] sm:py-18 md:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-[#452C1D]/70">
          {kicker}
        </p>
        <h1
          className="mt-4 max-w-[820px] font-serif uppercase leading-[1.1] tracking-[0.06em] text-[#452C1D]"
          style={{
            fontSize: "clamp(1.65rem, 3vw, 2.4rem)",
            color: "var(--color-brown, #452C1D)",
            textWrap: "balance",
          }}
        >
          {title}
        </h1>
        {body ? (
          <p className="mt-5 max-w-[640px] font-sans text-sm leading-[1.7] text-[#452C1D]/85 sm:text-[13px]">
            {body}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function SectionBlock({
  title,
  action,
  children,
  tone = "default",
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <section
      className={`border-t border-[#452C1D]/10 py-16 text-[#452C1D] sm:py-24 ${
        tone === "accent" ? "bg-paper-texture" : "bg-[#FBFAF7]"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {title || action ? (
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
            {title ? (
              <h2
                className="font-serif uppercase leading-tight tracking-[0.1em] text-[#452C1D]"
                style={{ fontSize: "clamp(1.45rem, 2.4vw, 1.95rem)" }}
              >
                {title}
              </h2>
            ) : (
              <span />
            )}
            {action}
          </div>
        ) : null}
        <div>{children}</div>
      </div>
    </section>
  );
}

export function ProseColumns({ title, body }: { title: string; body: string[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
      <h2 className="font-serif text-[19px] uppercase tracking-[0.08em] text-[#452C1D] md:text-[24px]">
        {title}
      </h2>
      <div className="space-y-4 sm:space-y-5">
        {body.map((p) => (
          <p key={p} className="font-sans text-[13px] leading-[1.75] text-[#452C1D]/85">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
