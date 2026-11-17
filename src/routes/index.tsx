import { createFileRoute } from "@tanstack/react-router";

import { VideoHero } from "@/components/site/HeroSection";
import { ExploreCommunities } from "@/components/site/ExploreCommunities";
import { AboutSlider } from "@/components/site/AboutSlider";
import { OurServices } from "@/components/site/OurServices";
import { StayInTouch } from "@/components/site/StayInTouch";
import { buildFAQSchema, buildHead, absoluteUrl } from "@/lib/seo";

const homeFaqs = [
  {
    question: "Can foreign investors and non-residents purchase freehold property in Dubai?",
    answer:
      "Yes, foreign nationals and international buyers can purchase freehold properties with 100% foreign ownership in designated areas across Dubai, including Downtown Dubai, Dubai Hills Estate, The Oasis, and Dubai Creek Harbour.",
  },
  {
    question: "What are the benefits of investing in off-plan property in Dubai?",
    answer:
      "Off-plan properties in Dubai typically feature attractive pre-launch pricing, flexible developer payment schedules, high capital appreciation during construction, and strong rental yields upon completion.",
  },
  {
    question: "Does property purchase in Dubai qualify for the 10-Year UAE Golden Visa?",
    answer:
      "Yes, purchasing residential or off-plan real estate valued at AED 2,000,000 or more in Dubai enables investors and their families to apply for the renewable 10-Year UAE Golden Visa.",
  },
  {
    question: "How does Parkwood Properties assist with secondary market buying and handover?",
    answer:
      "Parkwood Properties provides independent market pricing analysis, verified shortlisting, negotiation, and end-to-end handover management including snagging inspections and key handover with Emaar policies.",
  },
];

export const Route = createFileRoute("/")({
  head: () =>
    buildHead({
      title: "Dubai Luxury Homes & Off-Plan Investments | Parkwood Properties Dubai",
      description:
        "Discover luxury villas, penthouses, and off-plan property investments across Dubai's top masterplanned communities with Parkwood Properties Dubai.",
      path: "/",
      image: absoluteUrl("/social.jpg"),
      schemas: [buildFAQSchema(homeFaqs)],
    }),
  component: Index,
});

function Index() {
  return (
    <main>
      <h1 className="sr-only">
        Dubai Luxury Homes & Off-Plan Property Investments | Parkwood Properties Dubai
      </h1>
      {/* A. Full-bleed video hero with centered Dubai Life title */}
      <VideoHero />

      {/* Explore Our Communities */}
      <ExploreCommunities />

      {/* About Slider: Why Parkwood parallax text carousel */}
      <AboutSlider />

      {/* Our Services: Communities-style carousel */}
      <OurServices />

      {/* Stay In Touch: Editorial lead capture section */}
      <StayInTouch />
    </main>
  );
}
