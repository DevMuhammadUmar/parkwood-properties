import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { commonAr } from "@/content/i18n";
import { useNav } from "@/context/NavContext";

export type FieldOption = string | { value: string; label: string };

const controlBase =
  "w-full rounded-none border border-[#452C1D]/45 bg-transparent px-4 py-3 font-sans text-sm sm:text-[13px] text-[#452C1D] placeholder:text-[#452C1D]/45 outline-none transition-colors focus:border-[#452C1D] focus-visible:ring-1 focus-visible:ring-[#452C1D]";

/** Hidden form-name + honeypot for Netlify Forms AJAX submissions. */
export function NetlifyFormMeta({ formName }: { formName: string }) {
  return (
    <>
      <input type="hidden" name="form-name" value={formName} />
      <p className="hidden" aria-hidden="true">
        <label>
          Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
    </>
  );
}

export function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#452C1D]/75"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="font-sans text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  type?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label} htmlFor={name} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(e) => onChange(e.target.value)}
        className={controlBase}
      />
    </Field>
  );
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  rows = 4,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <Field label={label} htmlFor={name} error={error}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(e) => onChange(e.target.value)}
        className={controlBase}
      />
    </Field>
  );
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: FieldOption[];
  error?: string | undefined;
  placeholder?: string;
}) {
  const { lang } = useNav();
  const resolvedPlaceholder =
    placeholder ?? (lang === "ar" ? commonAr.pleaseSelect : "Please select");

  return (
    <Field label={label} htmlFor={name} error={error}>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          aria-invalid={Boolean(error)}
          onChange={(e) => onChange(e.target.value)}
          className={`${controlBase} appearance-none bg-[#FBFAF7] pe-10`}
        >
          <option value="">{resolvedPlaceholder}</option>
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.value;
            const lbl = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-[#452C1D]/65"
        />
      </div>
    </Field>
  );
}

export function RadioField({
  label,
  name,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: FieldOption[];
  error?: string | undefined;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#452C1D]/75">
        {label}
      </legend>
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : opt.label;
          const active = value === val;
          return (
            <button
              key={val}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(val)}
              className={`rounded-none border px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                active
                  ? "border-[#452C1D] bg-[#452C1D] text-[#FBFAF7]"
                  : "border-[#452C1D]/45 text-[#452C1D] hover:border-[#452C1D]"
              }`}
            >
              {lbl}
            </button>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="font-sans text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function FormSuccess({ title, body }: { title: string; body: string }) {
  const { lang } = useNav();
  return (
    <div
      role="status"
      className="border border-[#452C1D]/25 bg-[#452C1D]/[0.03] px-6 py-10 text-center"
    >
      <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#452C1D]/70">
        {lang === "ar" ? commonAr.thankYou : "Thank you"}
      </p>
      <h3 className="mt-3 font-serif text-[19px] uppercase tracking-[0.06em] text-[#452C1D]">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-lg font-sans text-sm leading-relaxed text-[#452C1D]/85">
        {body}
      </p>
    </div>
  );
}
