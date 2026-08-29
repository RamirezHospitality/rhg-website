/*
 * Ramirez Hospitality Group — Terms of Service
 * See the header comment in Privacy.tsx for why this page exists now and
 * what it is (and isn't) — same situation, same caveat about attorney review.
 */

import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { BRAND } from "@/lib/brand";

const H2 = "font-display text-2xl md:text-3xl text-cream mt-14 mb-5 leading-snug";
const P = "text-cream/75 text-base leading-[1.8] mb-4";
const UL = "list-disc pl-6 space-y-2 text-cream/75 text-base leading-[1.7] mb-4";

export default function Terms() {
  return (
    <PageLayout
      title="Terms of Service | Ramirez Hospitality Group"
      description="The terms that govern use of ramirezhospitality.com, including the limits of figures and case studies shown for marketing purposes."
      canonical="/terms"
      breadcrumbs={[{ name: "Terms of Service", href: "/terms" }]}
    >
      <section className="pt-44 pb-24 lg:pt-56 lg:pb-32 bg-obsidian">
        <div className="container max-w-3xl">
          <Eyebrow numeral="I" label="Legal" />
          <h1 className="mt-7 font-display font-medium text-4xl md:text-5xl leading-[1.08] text-cream tracking-[-0.02em]">
            Terms of Service
          </h1>
          <p className="mt-6 text-cream/55 text-sm">Effective and last updated: August 28, 2026</p>

          <p className={`${P} mt-10`}>
            These terms govern your use of ramirezhospitality.com (the "Site"), operated by
            Ramirez Hospitality Group ("RHG," "we," "us"). By using the Site — including
            submitting a form or booking a call — you agree to these terms. If you do not
            agree, please do not use the Site.
          </p>

          <h2 className={H2}>What this Site is</h2>
          <p className={P}>
            The Site is a marketing and lead-generation resource for RHG's hospitality
            consulting practice. Browsing the Site, submitting an inquiry, or booking The
            Modern Hotel Audit does not by itself create a client relationship or any
            obligation on either side. A consulting engagement, including The Modern Hotel
            Audit itself, begins only once we've spoken and agreed on scope — in writing where
            a paid engagement is involved.
          </p>

          <h2 className={H2}>Figures, case studies, and estimates are illustrative</h2>
          <p className={P}>
            Property scores, dollar figures, revenue lifts, feasibility ranges, and valuation
            approaches described on this Site — including the published case studies (for
            example, The Lincoln, Marfa) — reflect specific engagements, publicly available
            information, or general industry methodology at a point in time. They are shown to
            illustrate how we work and are not a guarantee, appraisal, projection, or
            professional valuation for any other property. Actual results for any hotel depend
            on facts specific to that property and market. Nothing on this Site is financial,
            investment, legal, tax, or appraisal advice; where a decision has real money behind
            it — buying, building, or valuing a property — get independent professional advice
            in addition to anything discussed with us.
          </p>

          <h2 className={H2}>Acceptable use</h2>
          <ul className={UL}>
            <li>Use the Site only for lawful purposes and only to make genuine inquiries.</li>
            <li>Do not attempt to scrape, reverse-engineer, or overload the Site or its lead-intake form.</li>
            <li>Do not submit false or misleading information through any form on the Site. Automated and abusive submissions are filtered and may be discarded without notice.</li>
          </ul>

          <h2 className={H2}>Intellectual property</h2>
          <p className={P}>
            The Site's text, design, case studies, and figures are the property of Ramirez
            Hospitality Group or its founder, Adam Ramirez, unless otherwise credited (for
            example, press logos). Please don't reproduce or redistribute them without asking
            first — {BRAND.email}.
          </p>

          <h2 className={H2}>Third-party links and services</h2>
          <p className={P}>
            The Site links to and embeds services we don't control, including Google Calendar
            for scheduling. Your use of those services is governed by their own terms and
            privacy policies, not ours. See our{" "}
            <a href="/privacy" className="text-brass underline underline-offset-4">Privacy Policy</a>{" "}
            for how information moves between this Site and those services.
          </p>

          <h2 className={H2}>No warranty; limitation of liability</h2>
          <p className={P}>
            The Site and its content are provided "as is," without warranty of any kind, express
            or implied. To the fullest extent permitted by law, Ramirez Hospitality Group is not
            liable for any decision made in reliance on information published on this Site
            outside the scope of a signed engagement — that protection exists precisely so a
            real, scoped conversation can happen first, on the facts of your property.
          </p>

          <h2 className={H2}>Changes</h2>
          <p className={P}>
            We may update these terms as the Site or our services change. The date at the top of
            this page reflects the most recent update. Continued use of the Site after a change
            means you accept the updated terms.
          </p>

          <h2 className={H2}>Governing law</h2>
          <p className={P}>
            These terms are governed by the laws of the State of California, without regard to
            conflict-of-law principles.
          </p>

          <h2 className={H2}>Contact</h2>
          <p className={P}>
            Questions about these terms:
            <br />
            <a href={BRAND.emailHref} className="text-brass underline underline-offset-4">{BRAND.email}</a>
            {" · "}
            <a href={BRAND.phoneHref} className="text-brass underline underline-offset-4">{BRAND.phone}</a>
            <br />
            {BRAND.address}
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
