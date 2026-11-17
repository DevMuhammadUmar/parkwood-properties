import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { z } from "zod";

import {
  FormSuccess,
  NetlifyFormMeta,
  RadioField,
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
import { company, propertyTypes } from "@/content/site";
import { useNav } from "@/context/NavContext";
import { buildBreadcrumbSchema, buildHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/request-appraisal")({
  head: () =>
    buildHead({
      title: "Property Valuation & Real Estate Appraisal Dubai | Parkwood Properties",
      description:
        "Request an accurate sale or rental property appraisal in Dubai. Our advisors evaluate comparable market data to provide honest valuation guidance for your home.",
      path: "/request-appraisal",
      schemas: [
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Request Appraisal", path: "/request-appraisal" },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Property Valuation & Appraisal in Dubai",
          url: `${SITE_URL}/request-appraisal`,
          description:
            "Request an accurate sale or rental property appraisal in Dubai. Our advisors evaluate comparable market data to provide honest valuation guidance for your home.",
        },
      ],
    }),
  component: RequestAppraisalPage,
});

const schema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  location: requiredSchema("Property location"),
  propertyType: requiredSchema("Property type"),
  requestType: requiredSchema("Request type"),
  propertyDetails: longTextSchema.min(1, "Please describe the property"),
  message: longTextSchema,
});

const appraisalSteps = [
  {
    step: "01",
    title: "Comparable Market Data",
    body: "We review verified transactions, active competition, and layout premiums within your specific Emaar community or tower.",
  },
  {
    step: "02",
    title: "Realistic Valuation",
    body: "Honest sale or rental price guidance anchored in actual buyer and tenant demand — before anything goes to market.",
  },
  {
    step: "03",
    title: "Considered Positioning",
    body: "Should you decide to proceed, photography, editorial copy, and targeted buyer placement are handled entirely in-house.",
  },
];

function RequestAppraisalPage() {
  const { lang } = useNav();
  const isAr = lang === "ar";
  const p = pagesAr.appraisal;

  const form = useValidatedForm(
    {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      propertyType: "",
      requestType: "",
      propertyDetails: "",
      message: "",
    },
    schema,
    "appraisal",
  );

  const steps = isAr ? p.steps : appraisalSteps;
  const resolvedPropertyTypes = isAr ? p.propertyTypes : propertyTypes;
  const resolvedRequestTypes = isAr ? p.requestTypes : ["Sale Price", "Rental Price"];

  return (
    <main className="bg-[#FBFAF7] pt-[72px] text-[#452C1D]">
      <PageHero
        kicker={isAr ? p.heroKicker : "Request Appraisal"}
        title={isAr ? p.heroTitle : "What is your property worth?"}
        body={
          isAr
            ? p.heroBody
            : "Share a few details and we'll prepare an estimated sale or rental figure, along with a recommended approach."
        }
      />

      <section className="bg-[#FBFAF7] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-6 lg:grid-cols-[1.45fr_0.85fr] lg:gap-16">
          {/* Left: Appraisal Form */}
          <div>
            {form.done ? (
              <FormSuccess
                title={isAr ? p.form.successTitle : "Your request has been received"}
                body={
                  isAr
                    ? p.form.successBody
                    : "One of our advisers will be in touch within one working day with an appraisal and next steps."
                }
              />
            ) : (
              <form
                name="appraisal"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={form.submit}
                className="space-y-8"
                noValidate
              >
                <NetlifyFormMeta formName="appraisal" />
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
                  <TextField
                    label={isAr ? p.form.location : "Property location / area"}
                    name="location"
                    value={form.values.location}
                    onChange={form.set("location")}
                    error={form.errors.location}
                  />
                </div>

                <SelectField
                  label={isAr ? p.form.propertyType : "Property type"}
                  name="propertyType"
                  value={form.values.propertyType}
                  onChange={form.set("propertyType")}
                  options={resolvedPropertyTypes}
                  error={form.errors.propertyType}
                />

                <RadioField
                  label={isAr ? p.form.requestType : "Request type"}
                  name="requestType"
                  value={form.values.requestType}
                  onChange={form.set("requestType")}
                  options={resolvedRequestTypes}
                  error={form.errors.requestType}
                />

                <TextAreaField
                  label={isAr ? p.form.propertyDetails : "Property details"}
                  name="propertyDetails"
                  rows={4}
                  placeholder={
                    isAr
                      ? p.form.propertyDetailsPlaceholder
                      : "Bedrooms, size, floor, view, condition, service charges…"
                  }
                  value={form.values.propertyDetails}
                  onChange={form.set("propertyDetails")}
                  error={form.errors.propertyDetails}
                />

                <TextAreaField
                  label={isAr ? p.form.message : "Additional message"}
                  name="message"
                  rows={3}
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
                      : "Request appraisal"}
                </button>
              </form>
            )}
          </div>

          {/* Right: Editorial Advisory Process Sidebar */}
          <aside className="space-y-8 border-t border-[#452C1D]/20 pt-8 lg:border-t-0 lg:border-s lg:border-[#452C1D]/15 lg:ps-12 lg:pt-0">
            <div>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#452C1D]/60">
                {isAr ? p.howWeAppraise : "HOW WE APPRAISE"}
              </p>
              <div className="mt-6 space-y-6">
                {steps.map((item) => (
                  <div key={item.step} className="border-t border-[#452C1D]/15 pt-4">
                    <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#452C1D]/55">
                      {item.step}
                    </span>
                    <h2 className="mt-1.5 font-serif text-[14px] uppercase tracking-[0.06em] text-[#452C1D]">
                      {item.title}
                    </h2>
                    <p className="mt-2 font-sans text-sm leading-[1.65] text-[#452C1D]/80">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#452C1D]/15 pt-6 space-y-3 font-sans text-sm text-[#452C1D]/85">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#452C1D]/60">
                {isAr ? p.directAdvisory : "DIRECT ADVISORY"}
              </p>
              <p>
                <a
                  href={`tel:${company.phone}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2.5 underline decoration-[#452C1D]/40 underline-offset-4 transition-opacity hover:opacity-65"
                >
                  <Phone className="size-3.5 shrink-0 text-[#452C1D]" />
                  <span>{company.phoneDisplay}</span>
                </a>
              </p>
              <p>
                <a
                  href={company.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 underline decoration-[#452C1D]/40 underline-offset-4 transition-opacity hover:opacity-65"
                >
                  <WhatsAppIcon className="size-4 shrink-0 text-[#25D366]" />
                  <span>{isAr ? commonAr.whatsappChat : "WhatsApp Us"}</span>
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2.5 underline decoration-[#452C1D]/40 underline-offset-4 transition-opacity hover:opacity-65"
                >
                  <Mail className="size-3.5 shrink-0 text-[#452C1D]" />
                  <span>{company.email}</span>
                </a>
              </p>
            </div>

            <div className="border-t border-[#452C1D]/15 pt-6">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#452C1D]/60">
                {isAr ? p.coverageHeading : "VALUATION COVERAGE"}
              </p>
              <p className="mt-3 font-sans text-[13px] leading-[1.7] text-[#452C1D]/80">
                {isAr
                  ? p.coverageBody
                  : "We prepare data-backed sale and rental valuations for apartments, townhouses, and villas across Downtown Dubai, Dubai Hills Estate, Dubai Creek Harbour, Emaar Beachfront, Arabian Ranches III, The Valley, Palm Jumeirah, and Dubai Marina."}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
