import { createFileRoute } from "@tanstack/react-router";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { z } from "zod";

import {
  FormSuccess,
  NetlifyFormMeta,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/site/form-fields";
import { PageHero } from "@/components/site/sections";
import {
  emailSchema,
  longTextSchema,
  nameSchema,
  phoneSchema,
  requiredSchema,
  useValidatedForm,
} from "@/components/site/use-validated-form";
import { WhatsAppIcon } from "@/components/site/WhatsAppButton";
import { commonAr, pagesAr } from "@/content/i18n";
import { company, inquiryTypes } from "@/content/site";
import { useNav } from "@/context/NavContext";
import { buildBreadcrumbSchema, buildHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildHead({
      title: "Contact Real Estate Advisors in Dubai | Parkwood Properties",
      description:
        "Connect with Parkwood Properties in Dubai for luxury residential purchases, off-plan investment guidance, or appraisals. Our team responds within one working day.",
      path: "/contact",
      schemas: [
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Parkwood Properties Dubai",
          url: `${SITE_URL}/contact`,
          description:
            "Connect with Parkwood Properties in Dubai for luxury residential purchases, off-plan investment guidance, or appraisals.",
          mainEntity: {
            "@type": ["RealEstateAgent", "LocalBusiness"],
            "@id": `${SITE_URL}/#organization`,
            name: company.name,
            url: SITE_URL,
            telephone: company.phone,
            email: company.email,
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: company.phone,
                contactType: "customer service",
                areaServed: "AE",
              },
              {
                "@type": "ContactPoint",
                telephone: company.whatsappNumber,
                contactType: "WhatsApp Inquiries",
                url: company.whatsappHref,
                areaServed: ["AE", "Worldwide"],
              },
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Dubai",
              addressCountry: "AE",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 25.2048,
              longitude: 55.2708,
            },
          },
        },
      ],
    }),
  component: ContactPage,
});

const schema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  inquiryType: requiredSchema("Inquiry type"),
  message: longTextSchema.min(1, "Please add a message"),
});

function ContactPage() {
  const { lang } = useNav();
  const isAr = lang === "ar";
  const p = pagesAr.contact;

  const form = useValidatedForm(
    { fullName: "", email: "", phone: "", inquiryType: "", message: "" },
    schema,
    "contact",
  );

  const resolvedInquiryTypes = isAr ? p.inquiryTypes : inquiryTypes;

  return (
    <main className="bg-[#FBFAF7] pt-[72px] text-[#452C1D]">
      <PageHero
        kicker={isAr ? p.heroKicker : "Contact Us"}
        title={isAr ? p.heroTitle : "Start a conversation"}
        body={
          isAr
            ? p.heroBody
            : "Whether it's a property, a role with us, or something you'd like to tell us — we read everything and reply within one working day."
        }
      />

      <section className="bg-[#FBFAF7] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-6 lg:grid-cols-[1.45fr_0.85fr] lg:gap-16">
          {/* Left: Contact Form */}
          <div>
            {form.done ? (
              <FormSuccess
                title={isAr ? p.form.successTitle : "Message sent"}
                body={
                  isAr
                    ? p.form.successBody
                    : "Thank you for getting in touch — we'll reply within one working day."
                }
              />
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={form.submit}
                className="space-y-8"
                noValidate
              >
                <NetlifyFormMeta formName="contact" />
                <div className="grid gap-6 md:grid-cols-2">
                  <TextField
                    label={isAr ? p.form.fullName : "Full name"}
                    name="fullName"
                    value={form.values.fullName}
                    onChange={form.set("fullName")}
                    error={form.errors.fullName}
                  />
                  <TextField
                    label={isAr ? p.form.email : "Email"}
                    name="email"
                    type="email"
                    value={form.values.email}
                    onChange={form.set("email")}
                    error={form.errors.email}
                  />
                  <TextField
                    label={isAr ? p.form.phone : "Phone number"}
                    name="phone"
                    type="tel"
                    value={form.values.phone}
                    onChange={form.set("phone")}
                    error={form.errors.phone}
                  />
                  <SelectField
                    label={isAr ? p.form.inquiryType : "Inquiry type"}
                    name="inquiryType"
                    value={form.values.inquiryType}
                    onChange={form.set("inquiryType")}
                    options={resolvedInquiryTypes}
                    error={form.errors.inquiryType}
                  />
                </div>

                <TextAreaField
                  label={isAr ? p.form.message : "Message"}
                  name="message"
                  rows={5}
                  value={form.values.message}
                  onChange={form.set("message")}
                  error={form.errors.message}
                />

                {form.submitError ? (
                  <p role="alert" className="font-sans text-xs text-destructive">
                    {form.submitError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={form.pending}
                  className="inline-flex h-12 w-full items-center justify-center rounded-none border border-[#452C1D] bg-transparent px-8 font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#452C1D] transition-colors duration-200 hover:bg-[#452C1D] hover:text-[#FBFAF7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D] disabled:opacity-50 sm:w-auto"
                >
                  {form.pending
                    ? isAr
                      ? commonAr.sending
                      : "Sending…"
                    : isAr
                      ? p.form.submit
                      : "Send message"}
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Contact Channels */}
          <aside className="space-y-7 border-t border-[#452C1D]/20 pt-8 lg:border-t-0 lg:border-s lg:border-[#452C1D]/15 lg:ps-12 lg:pt-0">
            <div>
              <h2 className="font-serif text-[12px] uppercase tracking-[0.14em] text-[#452C1D]">
                {isAr ? p.officePhone : "Office Phone"}
              </h2>
              <p className="mt-2.5 font-sans text-sm text-[#452C1D]/85">
                <a
                  href={`tel:${company.phone}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2.5 underline decoration-[#452C1D]/40 underline-offset-4 transition-opacity hover:opacity-65"
                >
                  <Phone className="size-3.5 shrink-0 text-[#452C1D]/70" />
                  <span>{company.phoneDisplay}</span>
                </a>
              </p>
            </div>

            <div className="border-t border-[#452C1D]/12 pt-6">
              <h2 className="font-serif text-[12px] uppercase tracking-[0.14em] text-[#452C1D]">
                {isAr ? p.whatsapp : "WhatsApp"}
              </h2>
              <p className="mt-2.5 font-sans text-sm text-[#452C1D]/85">
                <a
                  href={company.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="inline-flex items-center gap-2.5 underline decoration-[#452C1D]/40 underline-offset-4 transition-opacity hover:opacity-65"
                >
                  <WhatsAppIcon className="size-4 shrink-0 text-[#25D366]" />
                  <span>{company.whatsappDisplay}</span>
                </a>
              </p>
            </div>

            <div className="border-t border-[#452C1D]/12 pt-6">
              <h2 className="font-serif text-[12px] uppercase tracking-[0.14em] text-[#452C1D]">
                {isAr ? p.emailLabel : "Email"}
              </h2>
              <p className="mt-2.5 font-sans text-sm text-[#452C1D]/85">
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2.5 underline decoration-[#452C1D]/40 underline-offset-4 transition-opacity hover:opacity-65"
                >
                  <Mail className="size-3.5 shrink-0 text-[#452C1D]/70" />
                  <span>{company.email}</span>
                </a>
              </p>
            </div>

            <div className="border-t border-[#452C1D]/12 pt-6">
              <h2 className="font-serif text-[12px] uppercase tracking-[0.14em] text-[#452C1D]">
                {isAr ? p.website : "Website"}
              </h2>
              <p className="mt-2.5 font-sans text-sm text-[#452C1D]/85">
                <a
                  href={company.websiteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 underline decoration-[#452C1D]/40 underline-offset-4 transition-opacity hover:opacity-65"
                >
                  <Globe className="size-3.5 shrink-0 text-[#452C1D]/70" />
                  <span>{company.website}</span>
                </a>
              </p>
            </div>

            <div className="border-t border-[#452C1D]/12 pt-6">
              <h2 className="font-serif text-[12px] uppercase tracking-[0.14em] text-[#452C1D]">
                {isAr ? p.locationHeading : "Location"}
              </h2>
              <p className="mt-2.5 inline-flex items-center gap-2.5 font-sans text-sm text-[#452C1D]/85">
                <MapPin className="size-3.5 shrink-0 text-[#452C1D]/70" />
                <span>{isAr ? p.locationValue : "Dubai, United Arab Emirates"}</span>
              </p>
            </div>

            <div className="border-t border-[#452C1D]/12 pt-6">
              <h2 className="font-serif text-[12px] uppercase tracking-[0.14em] text-[#452C1D]">
                {isAr ? p.advisoryHoursHeading : "Advisory Hours"}
              </h2>
              <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-[#452C1D]/80">
                {isAr ? p.advisoryHoursValue : "Monday – Sunday, 9:00 AM – 7:00 PM GST (Dubai)"}
              </p>
            </div>

            <div className="border-t border-[#452C1D]/12 pt-6">
              <h2 className="font-serif text-[12px] uppercase tracking-[0.14em] text-[#452C1D]">
                {isAr ? p.advisoryNoteHeading : "How We Help"}
              </h2>
              <p className="mt-2.5 font-sans text-[13px] leading-[1.7] text-[#452C1D]/80">
                {isAr
                  ? p.advisoryNoteBody
                  : "Our Dubai property advisors handle secondary market acquisitions, sales marketing, residential leasing, mortgage coordination, and Emaar handover snagging across Downtown Dubai, Dubai Hills Estate, Dubai Creek Harbour, Emaar Beachfront, Palm Jumeirah, and Dubai Marina."}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
