import { createFileRoute } from "@tanstack/react-router";

import { PageHero, SectionBlock } from "@/components/site/sections";
import { pagesAr } from "@/content/i18n";
import { useNav } from "@/context/NavContext";
import { buildBreadcrumbSchema, buildHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    buildHead({
      title: "Privacy Policy | Parkwood Properties Dubai",
      description:
        "Read the Parkwood Properties Privacy Policy to understand how we collect, handle, and safeguard your personal data across our Dubai real estate website and services.",
      path: "/privacy-policy",
      schemas: [
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]),
      ],
    }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  const { lang } = useNav();
  const isAr = lang === "ar";
  const p = pagesAr.privacy;

  return (
    <main className="bg-[#FBFAF7] pt-[72px] text-[#452C1D]">
      <PageHero kicker={isAr ? p.kicker : "Legal"} title={isAr ? p.title : "Privacy Policy"} />
      <SectionBlock>
        {isAr ? (
          <div className="max-w-[780px] space-y-6 font-sans text-[13px] leading-[1.75] text-[#452C1D]/85">
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#452C1D]/65">
              {p.subtitle}
            </p>
            <p>{p.intro}</p>
            {p.sections.map((section) => (
              <div key={section.heading} className="space-y-3">
                <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
                  {section.heading}
                </h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-[780px] space-y-6 font-sans text-[13px] leading-[1.75] text-[#452C1D]/85">
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#452C1D]/65">
              PARKWOOD PROPERTIES — Dubai, United Arab Emirates
            </p>
            <p>
              Parkwood Properties (“Parkwood Properties”, “we”, “us” or “our”) respects your privacy
              and is committed to protecting the personal information you provide when you visit our
              website, contact us, or use our real estate services. This Privacy Policy explains, in
              simple terms, how we collect, use and protect your information.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              1. Information We Collect
            </h2>
            <p>
              Depending on how you interact with us, we may collect information such as your name,
              email address, telephone number, property address, property details, buying or renting
              preferences, budget and other information you provide in connection with a property
              enquiry or transaction. We may also collect basic information about how you use our
              website, such as pages visited and general usage information, to help us improve our
              website and services.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              2. How We Use Your Information
            </h2>
            <p>
              We may use your information to: respond to your enquiries and provide real estate
              services; assist with the sale, purchase, rental or other property-related services
              you request; communicate with you about properties, valuations, appointments and
              transactions; send property alerts, newsletters or marketing communications where
              permitted; improve our website, services and customer experience; maintain appropriate
              business, transaction and security records; and comply with applicable legal and
              regulatory requirements.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              3. Marketing Communications
            </h2>
            <p>
              If you choose to receive marketing communications from us, we may contact you by
              email, telephone or other permitted communication channels about properties, services
              and relevant updates. You can unsubscribe from marketing emails at any time using the
              unsubscribe option provided in the message, or by contacting us at
              admin@parkwoodproperties.ae.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              4. Sharing Your Information
            </h2>
            <p>
              We do not sell your personal information. Where reasonably necessary to provide our
              services or meet legal requirements, we may share relevant information with trusted
              service providers, property-related professionals, portals or platforms, professional
              advisers, and government or regulatory authorities. We only seek to share information
              that is reasonably necessary for the relevant purpose.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              5. Property Listings and Public Information
            </h2>
            <p>
              Where you instruct us to market a property, information and images you provide for a
              listing may be published on our website, property portals and other marketing channels
              used to promote the property. We will use such information for the agreed marketing
              purpose.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              6. Cookies
            </h2>
            <p>
              Our website may use cookies and similar technologies to keep the website functioning,
              remember preferences and understand how visitors use our website. Some cookies may be
              provided by third-party services such as analytics or advertising providers. You can
              manage or disable cookies through your browser settings, although some website
              features may not function properly.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              7. Protecting and Retaining Your Information
            </h2>
            <p>
              We take reasonable measures to protect personal information from unauthorized access,
              misuse or disclosure. We keep information only for as long as reasonably necessary for
              the purpose for which it was collected, including where required for legal,
              regulatory, business or transaction-related purposes.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              8. Your Rights
            </h2>
            <p>
              Subject to applicable law, you may ask us about the personal information we hold about
              you and may request that inaccurate information be corrected or that your information
              no longer be used for certain purposes, including marketing. We may need to verify
              your identity before processing such requests.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              9. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              services, website or applicable requirements. The latest version will be made
              available on our website.
            </p>
            <h2 className="pt-2 font-serif text-[15.5px] uppercase tracking-[0.06em] text-[#452C1D] sm:text-[19px]">
              10. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, want to update your communication
              preferences, or wish to make a privacy-related request, please contact us: Parkwood
              Properties, Dubai, United Arab Emirates — Email: admin@parkwoodproperties.ae
            </p>
          </div>
        )}
      </SectionBlock>
    </main>
  );
}
