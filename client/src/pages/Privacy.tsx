/*
 * Ramirez Hospitality Group — Privacy Policy
 *
 * Added because the site had never had one: /privacy and /terms were linked
 * from the footer since the first build, but no page or route ever backed
 * them — the wouter catch-all silently served the 404 component at both
 * URLs (with an HTTP 200, because the SPA fallback returns 200 for every
 * path). Flagged 2026-08-28 as blocking the Google Ads launch: Ads policy
 * requires a reachable privacy policy, and the Google Auth Platform OAuth
 * consent screen points at this exact URL.
 *
 * Content below is a good-faith description of what this site and its
 * lead form actually do, grounded in the real code (client/src/lib/
 * attribution.ts, client/src/lib/googleAds.ts, functions/api/lead.ts) —
 * not boilerplate copied from a template. It is NOT a substitute for
 * review by an attorney. Adam should have this reviewed before relying on
 * it for compliance purposes beyond "the URL resolves and describes real
 * practices," which is the immediate, narrow problem it fixes.
 */

import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { BRAND } from "@/lib/brand";

const H2 = "font-display text-2xl md:text-3xl text-cream mt-14 mb-5 leading-snug";
const P = "text-cream/75 text-base leading-[1.8] mb-4";
const UL = "list-disc pl-6 space-y-2 text-cream/75 text-base leading-[1.7] mb-4";

export default function Privacy() {
  return (
    <PageLayout
      title="Privacy Policy | Ramirez Hospitality Group"
      description="How Ramirez Hospitality Group collects, uses, and protects information from visitors and hotel owners who submit an inquiry or book The Modern Hotel Audit."
      canonical="/privacy"
      breadcrumbs={[{ name: "Privacy Policy", href: "/privacy" }]}
    >
      <section className="pt-44 pb-24 lg:pt-56 lg:pb-32 bg-obsidian">
        <div className="container max-w-3xl">
          <Eyebrow numeral="I" label="Legal" />
          <h1 className="mt-7 font-display font-medium text-4xl md:text-5xl leading-[1.08] text-cream tracking-[-0.02em]">
            Privacy Policy
          </h1>
          <p className="mt-6 text-cream/55 text-sm">Effective and last updated: August 28, 2026</p>

          <p className={`${P} mt-10`}>
            Ramirez Hospitality Group ("RHG," "we," "us") operates ramirezhospitality.com and
            related booking pages. This policy explains what information we collect when you
            visit the site or submit an inquiry, how we use it, and the choices you have.
          </p>

          <h2 className={H2}>Information we collect</h2>
          <p className={P}>When you submit a lead form (for example, to book The Modern Hotel Audit), we collect:</p>
          <ul className={UL}>
            <li>Your name, email address, and phone number</li>
            <li>Your property name and number of keys (rooms)</li>
            <li>Automatically, from your browser and our hosting provider: IP address, approximate country, and user-agent string</li>
          </ul>
          <p className={P}>
            We also capture standard advertising attribution values when you arrive from a paid
            ad or a link with tracking parameters: Google Ads click identifiers (gclid, gbraid,
            wbraid), UTM parameters (source, medium, campaign, term, content), the page you
            landed on, and the referring page. These are stored in your browser's local storage
            for up to 90 days — not in a tracking cookie, and not shared with anyone until you
            submit a form, at which point they travel with your submission so we know which ad
            or channel produced the inquiry. If you never submit a form, this information never
            leaves your browser.
          </p>
          <p className={P}>
            We do not use tracking cookies for advertising or analytics on this site. The only
            data we persist client-side is the attribution record described above, and it is
            used solely to attribute a form submission to the marketing channel that produced
            it.
          </p>

          <h2 className={H2}>How we use information</h2>
          <ul className={UL}>
            <li>To respond to your inquiry and schedule a call or The Modern Hotel Audit</li>
            <li>To send you a confirmation and any follow-up related to your request, by email</li>
            <li>To measure which ad campaigns, keywords, and pages produce genuine inquiries, so ad spend is not wasted on channels that don't work</li>
            <li>To detect and filter automated spam submissions (a hidden honeypot field and a minimum time-on-page check — no CAPTCHA, no data shared with a third party for this purpose)</li>
          </ul>

          <h2 className={H2}>Google Ads and Enhanced Conversions</h2>
          <p className={P}>
            When a Google Ads campaign is active, this site loads Google's tag (gtag.js) after
            you interact with the lead form — not on page load. When you submit the form, we
            report a conversion to Google Ads and, where you've provided an email or phone
            number, pass those values to Google using Enhanced Conversions for Leads. Google's
            own tag hashes this information in your browser before it is sent; we never transmit
            it in plain text ourselves for this purpose. Google's use of this information is
            governed by Google's own privacy policy. You can review or adjust your ad
            personalization settings directly with Google at{" "}
            <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer" className="text-brass underline underline-offset-4">
              myadcenter.google.com
            </a>.
          </p>

          <h2 className={H2}>Other services we use</h2>
          <ul className={UL}>
            <li>
              <strong className="text-cream/90">Cloudflare</strong> hosts this site and stores
              submitted lead records in a Cloudflare KV database, so an inquiry is never lost
              even if a downstream step fails.
            </li>
            <li>
              <strong className="text-cream/90">Resend</strong> delivers the email notification
              generated when you submit a form. Your submission is sent to Resend's API solely
              to deliver that email.
            </li>
            <li>
              <strong className="text-cream/90">Google Calendar</strong> appointment scheduling
              is embedded directly on the confirmation step so you can pick a time without
              leaving the page. That embed is Google's own product, governed by Google's privacy
              policy, and any information you enter there (your chosen time, and whatever Google
              itself collects) is between you and Google.
            </li>
          </ul>
          <p className={P}>
            We do not sell your information, and we do not share it with anyone outside the
            services listed above except as required by law.
          </p>

          <h2 className={H2}>Data retention</h2>
          <p className={P}>
            We keep submitted lead records for as long as reasonably necessary to respond to
            your inquiry and to maintain our own business records, including for ad-campaign
            performance reporting. You can ask us to delete your information at any time — see
            Contact below.
          </p>

          <h2 className={H2}>Your choices</h2>
          <ul className={UL}>
            <li>Email or call us (below) to request a copy of, or the deletion of, the information we hold about you.</li>
            <li>Clear your browser's local storage at any time to remove the ad-attribution values described above; doing so does not affect anything you've already submitted.</li>
            <li>Adjust your Google ad personalization settings directly with Google.</li>
          </ul>
          <p className={P}>
            If you are located somewhere with specific statutory privacy rights (for example,
            California or the EU/UK), we will honor a request made in good faith to the extent
            those rights apply, even though this policy is not written as a jurisdiction-by-
            jurisdiction legal notice.
          </p>

          <h2 className={H2}>Children's privacy</h2>
          <p className={P}>
            This site is directed at hotel owners, operators, and investors. It is not directed
            at, and we do not knowingly collect information from, anyone under 16.
          </p>

          <h2 className={H2}>Changes to this policy</h2>
          <p className={P}>
            We may update this policy as the site or our tools change. The date at the top of
            this page reflects the most recent update.
          </p>

          <h2 className={H2}>Contact</h2>
          <p className={P}>
            Questions about this policy, or a request to access or delete your information:
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
