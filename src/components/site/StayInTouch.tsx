import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { NetlifyFormMeta } from "@/components/site/form-fields";
import { emailSchema, nameSchema, submitToNetlify } from "@/components/site/use-validated-form";
import { translateValidationMessage } from "@/content/i18n";
import { useNav } from "@/context/NavContext";

const stayInTouchSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the communication consent to continue." }),
  }),
});

const copyI18n = {
  en: {
    headingLine1: "BE IN THE KNOW. LET'S STAY IN",
    headingLine2: "TOUCH.",
    body: "Built on trust and backed by experience, Parkwood Properties advises buyers, sellers, and landlords across Dubai’s premier Emaar communities. From private off-plan releases and accurate property appraisals to acquisitions, leasing, mortgage coordination, and handover snagging, share your details for direct market guidance.",
    namePlaceholder: "Name",
    nameLabel: "Full name",
    emailPlaceholder: "Email",
    emailLabel: "Email address",
    submit: "SUBMIT",
    submitting: "SENDING…",
    consentPrefix:
      "I agree to be contacted by Parkwood Properties via call, email, WhatsApp, and text regarding real estate advisory, property appraisals, and listings. To opt out, you can unsubscribe via any email or let us know at any time. View our ",
    privacyLink: "Privacy Policy",
    successTitle: "Thank you for staying in touch",
    successBody:
      "Your details have been received. An adviser from Parkwood Properties will reach out with tailored market updates and opportunities.",
    consentError: "Please agree to be contacted before submitting.",
    genericError: "Something went wrong. Please try again.",
  },
  ar: {
    headingLine1: "ابقَ على اطلاع.",
    headingLine2: "لنتواصل دائماً.",
    body: "تأسست بارك وود للعقارات على الثقة والخبرة، حيث نقدم استشارات متخصصة للمشترين والبائعين والملاك في أبرز مجتمعات إعمار في دبي. من الإطلاقات الخاصة للمشاريع على الخارطة والتقييمات العقارية الدقيقة إلى الشراء والتأجير والتمويل العقاري وفحص الاستلام، شاركنا بياناتك للحصول على توجيه مباشر للسوق.",
    namePlaceholder: "الاسم",
    nameLabel: "الاسم الكامل",
    emailPlaceholder: "البريد الإلكتروني",
    emailLabel: "البريد الإلكتروني",
    submit: "إرسال",
    submitting: "جاري الإرسال…",
    consentPrefix:
      "أوافق على تواصل بارك وود للعقارات معي عبر الهاتف أو البريد الإلكتروني أو واتساب والرسائل النصية بخصوص الاستشارات العقارية والتقييمات والعقارات المتاحة. يمكنك إلغاء الاشتراك في أي وقت. اطلع على ",
    privacyLink: "سياسة الخصوصية",
    successTitle: "شكراً لتواصلك معنا",
    successBody:
      "تم استلام بياناتك بنجاح. سيتواصل معك أحد مستشاري بارك وود للعقارات بمستجدات السوق والفرص المناسبة.",
    consentError: "يرجى الموافقة على شروط التواصل قبل الإرسال.",
    genericError: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },
};

export function StayInTouch() {
  const { lang } = useNav();
  const t = copyI18n[lang];

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    consent?: string;
  }>({});
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = stayInTouchSchema.safeParse({ fullName, email, consent });

    if (!parsed.success) {
      const next: { fullName?: string; email?: string; consent?: string } = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as "fullName" | "email" | "consent";
        if (key && !next[key]) {
          next[key] =
            key === "consent" ? t.consentError : translateValidationMessage(issue.message, lang);
        }
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitError(undefined);
    setPending(true);

    try {
      await submitToNetlify("stay-in-touch", {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        consent: "agreed",
      });
      setDone(true);
    } catch {
      setSubmitError(t.genericError);
    } finally {
      setPending(false);
    }
  };

  return (
    <section
      aria-labelledby="stay-in-touch-heading"
      className="border-t border-[#452C1D]/10 bg-[#FBFAF7] px-6 py-20 text-[#452C1D] sm:py-24 md:py-28"
      style={{ backgroundColor: "var(--color-cream, #FBFAF7)" }}
    >
      <div className="mx-auto max-w-[1140px] text-center">
        {/* Centered Serif Uppercase Headline */}
        <h2
          id="stay-in-touch-heading"
          className="font-serif uppercase tracking-[0.06em] text-[#452C1D] leading-[1.12]"
          style={{
            fontSize: "clamp(1.55rem, 2.8vw, 2.3rem)",
            color: "var(--color-brown, #452C1D)",
            textWrap: "balance",
          }}
        >
          <span className="block">{t.headingLine1}</span>
          <span className="block">{t.headingLine2}</span>
        </h2>

        {/* Centered Editorial Copy */}
        <p
          className="mx-auto mt-6 max-w-[960px] font-sans text-sm leading-[1.7] sm:text-[13px]"
          style={{ color: "rgba(69, 44, 29, 0.85)" }}
        >
          {t.body}
        </p>

        {/* Form Container */}
        <div className="mx-auto mt-10 max-w-[960px]">
          {done ? (
            <div
              role="status"
              className="border border-[#452C1D]/25 bg-[#452C1D]/[0.03] px-6 py-8 text-center"
            >
              <h3
                className="font-serif text-[19px] uppercase tracking-[0.06em]"
                style={{ color: "var(--color-brown, #452C1D)" }}
              >
                {t.successTitle}
              </h3>
              <p
                className="mx-auto mt-2.5 max-w-lg font-sans text-sm leading-relaxed"
                style={{ color: "rgba(69, 44, 29, 0.82)" }}
              >
                {t.successBody}
              </p>
            </div>
          ) : (
            <form
              name="stay-in-touch"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              noValidate
            >
              <NetlifyFormMeta formName="stay-in-touch" />

              {/* 3-Column Horizontal Row: Name | Email | SUBMIT */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_0.9fr]">
                <div>
                  <label htmlFor="stay-name" className="sr-only">
                    {t.nameLabel}
                  </label>
                  <input
                    id="stay-name"
                    name="fullName"
                    type="text"
                    value={fullName}
                    placeholder={t.namePlaceholder}
                    aria-invalid={Boolean(errors.fullName)}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrors((prev) => ({ ...prev, fullName: undefined }));
                      setSubmitError(undefined);
                    }}
                    className="h-12 w-full rounded-none border border-[#452C1D] bg-transparent px-4 font-sans text-sm text-[#452C1D] placeholder:text-[#452C1D]/55 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#452C1D]"
                  />
                </div>

                <div>
                  <label htmlFor="stay-email" className="sr-only">
                    {t.emailLabel}
                  </label>
                  <input
                    id="stay-email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder={t.emailPlaceholder}
                    aria-invalid={Boolean(errors.email)}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: undefined }));
                      setSubmitError(undefined);
                    }}
                    className="h-12 w-full rounded-none border border-[#452C1D] bg-transparent px-4 font-sans text-sm text-[#452C1D] placeholder:text-[#452C1D]/55 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#452C1D]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className="h-12 w-full rounded-none border border-[#452C1D] bg-transparent px-6 font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#452C1D] transition-colors duration-200 hover:bg-[#452C1D] hover:text-[#FBFAF7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D] disabled:opacity-50"
                >
                  {pending ? t.submitting : t.submit}
                </button>
              </div>

              {/* Validation Error Summary for Name / Email */}
              {(errors.fullName || errors.email) && (
                <div role="alert" className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-start">
                  {errors.fullName && (
                    <p className="font-sans text-xs text-destructive">{errors.fullName}</p>
                  )}
                  {errors.email && (
                    <p className="font-sans text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              )}

              {/* Consent Checkbox + Fine Print */}
              <div className="mt-3.5 flex items-start gap-2.5 text-start">
                <input
                  id="stay-consent"
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  aria-invalid={Boolean(errors.consent)}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    setErrors((prev) => ({ ...prev, consent: undefined }));
                    setSubmitError(undefined);
                  }}
                  className="mt-0.5 size-3.5 shrink-0 cursor-pointer rounded-none border border-[#452C1D] accent-[#452C1D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#452C1D]"
                />
                <label
                  htmlFor="stay-consent"
                  className="cursor-pointer font-sans text-[11.5px] leading-[1.6]"
                  style={{ color: "rgba(69, 44, 29, 0.8)" }}
                >
                  {t.consentPrefix}
                  <Link
                    to="/privacy-policy"
                    className="underline underline-offset-2 transition-opacity hover:opacity-70"
                    style={{ color: "var(--color-brown, #452C1D)" }}
                  >
                    {t.privacyLink}
                  </Link>
                  .
                </label>
              </div>

              {errors.consent && (
                <p role="alert" className="mt-2 text-start font-sans text-xs text-destructive">
                  {errors.consent}
                </p>
              )}

              {submitError && (
                <p role="alert" className="mt-2 text-start font-sans text-xs text-destructive">
                  {submitError}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
