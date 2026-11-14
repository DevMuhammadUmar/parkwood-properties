import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloatingButton } from "@/components/site/WhatsAppButton";
import { NavProvider } from "@/context/NavContext";
import { buildRealEstateAgentSchema } from "@/lib/seo";

import { commonAr } from "@/content/i18n";

function isRtlDoc() {
  return typeof document !== "undefined" && document.documentElement.lang === "ar";
}

function NotFoundComponent() {
  const isAr = isRtlDoc();
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] px-4 text-[#452C1D]">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-[61px] font-normal text-[#452C1D]">404</h1>
        <h2 className="mt-4 font-serif text-[19px] uppercase tracking-[0.06em] text-[#452C1D]">
          {isAr ? commonAr.notFoundTitle : "Page not found"}
        </h2>
        <p className="mt-2 font-sans text-sm text-[#452C1D]/80">
          {isAr
            ? commonAr.notFoundBody
            : "The page you're looking for doesn't exist or has been moved."}
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-[#452C1D] px-6 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors hover:bg-[#452C1D] hover:text-[#FBFAF7]"
          >
            {isAr ? commonAr.goHome : "Go home"}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const isAr = isRtlDoc();
  useEffect(() => {
    reportError(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7] px-4 text-[#452C1D]">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-[19px] uppercase tracking-[0.06em] text-[#452C1D]">
          {isAr ? commonAr.errorTitle : "This page didn't load"}
        </h1>
        <p className="mt-2 font-sans text-sm text-[#452C1D]/80">
          {isAr
            ? commonAr.errorBody
            : "Something went wrong on our end. You can try refreshing or head back home."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center border border-[#452C1D] px-6 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors hover:bg-[#452C1D] hover:text-[#FBFAF7]"
          >
            {isAr ? commonAr.tryAgain : "Try again"}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-[#452C1D]/45 px-6 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#452C1D] transition-colors hover:border-[#452C1D]"
          >
            {isAr ? commonAr.goHome : "Go home"}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Parkwood Properties Dubai" },
      {
        name: "description",
        content:
          "Parkwood Properties Dubai: premier real estate advisory for buying, selling, leasing, mortgages, and handovers across Dubai's leading masterplanned communities.",
      },
      { name: "author", content: "Parkwood Properties Dubai" },
      { property: "og:site_name", content: "Parkwood Properties Dubai" },
      { property: "og:title", content: "Parkwood Properties Dubai" },
      {
        property: "og:description",
        content:
          "Buy, sell, rent, finance and hand over homes across Dubai's leading masterplanned communities.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://parkwoodproperties.ae" },
      { property: "og:image", content: "https://parkwoodproperties.ae/social.jpg" },
      { property: "og:locale", content: "en_AE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Parkwood Properties Dubai" },
      {
        name: "twitter:description",
        content:
          "Buy, sell, rent, finance and hand over homes across Dubai's leading masterplanned communities.",
      },
      { name: "twitter:image", content: "https://parkwoodproperties.ae/social.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preload",
        as: "image",
        href: "/assets/hero-poster.jpg",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://parkwoodproperties.ae/#website",
          name: "Parkwood Properties Dubai",
          alternateName: "Parkwood Properties",
          url: "https://parkwoodproperties.ae",
          description:
            "Dubai luxury homes and off-plan real estate advisory specializing in Emaar masterplanned communities.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(buildRealEstateAgentSchema()),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <NavProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <div id="main-content" className="flex-1">
            <Outlet />
          </div>
          <Footer />
          <WhatsAppFloatingButton />
        </div>
      </NavProvider>
    </QueryClientProvider>
  );
}
