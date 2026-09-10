/*
 * Ramirez Hospitality Group — Terms of Service
 *
 * Rewritten 2026-09-10 for A2P 10DLC registration through LeadConnector.
 * The SMS section follows the Harvest Creatives "A2P Terms and Conditions"
 * template (Drive folder "A2p Verification"), adapted so the program
 * description matches reality: consent is collected through the chat
 * widget, not a site-hosted form. RHG-specific sections that protect the
 * brand (illustrative figures, what the Site is) are kept from the
 * original 2026-08-28 version.
 *
 * Linked as /terms#sms from the Privacy Policy and from the A2P campaign
 * registration. Not a substitute for review by an attorney.
 */

import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { BRAND } from "@/lib/brand";

const H2 = "font-display text-2xl md:text-3xl text-cream mt-14 mb-5 leading-snug";
const H3 = "text-[0.7rem] tracking-[0.28em] uppercase text-brass mt-8 mb-3";
const P = "text-cream/75 text-base leading-[1.8] mb-4";
const UL = "list-disc pl-6 space-y-2 text-cream/75 text-base leading-[1.7] mb-4";
const STRONG = "text-cream/90";
const LINK = "text-brass underline underline-offset-4";

export default function Terms() {
  return (
    <PageLayout
      title="Terms of Service | Ramirez Hospitality Group"
      description="The terms that govern use of ramirezhospitality.com, including our SMS messaging program terms and the limits of figures and case studies shown for marketing purposes."
      canonical="/terms"
      breadcrumbs={[{ name: "Terms of Service", href: "/terms" }]}
    >
      <section className="pt-44 pb-24 lg:pt-56 lg:pb-32 bg-obsidian">
        <div className="container max-w-3xl">
          <Eyebrow numeral="I" label="Legal" />
          <h1 className="mt-7 font-display font-medium text-4xl md:text-5xl leading-[1.08] text-cream tracking-[-0.02em]">
            Terms of Service
          </h1>
          <p className="mt-6 text-cream/55 text-sm">Effective August 28, 2026. Last updated September 10, 2026.</p>

          <p className={`${P} mt-10`}>
            This website, ramirezhospitality.com (the "Site"), is owned and operated by Ramirez
            Hospitality Group ("RHG," "we," or "us"). By using the Site, including starting a
            chat, submitting a form, or booking a call, you agree to be bound by these Terms of
            Service and to use the Site in accordance with these Terms, our{" "}
            <a href="/privacy" className={LINK}>Privacy Policy</a>, and any additional terms that
            apply to specific services. If you do not agree, please do not use the Site.
          </p>

          <h2 id="sms" className={`${H2} scroll-mt-32`}>SMS messaging terms and compliance</h2>

          <p className={H3}>1. Program description</p>
          <p className={P}>
            This messaging program sends appointment confirmations, reminders, follow-up
            communications, and customer support messages to hotel owners and operators who have
            contacted Ramirez Hospitality Group and have explicitly opted in to receive SMS
            notifications. Opt-in is collected on ramirezhospitality.com through the opt-in form
            on our booking pages and through the chat widget, where you provide your mobile
            number and check an unchecked box explicitly agreeing to receive text messages before
            submitting. The form has a separate checkbox for marketing and promotional messages;
            those are sent only if you checked it. You may also opt in verbally during a
            consultation call. Consent is not a condition of any purchase or engagement.
          </p>

          <p className={H3}>2. Cancellation instructions</p>
          <p className={P}>
            You can cancel the SMS service at any time. Simply text{" "}
            <strong className={STRONG}>STOP</strong> to the number that sent you the message.
            We will confirm your unsubscribe status by SMS. After that confirmation you will no
            longer receive text messages from us. To rejoin, opt in again as you did initially
            and we will resume.
          </p>

          <p className={H3}>3. Support information</p>
          <p className={P}>
            If you experience issues with the messaging program, reply{" "}
            <strong className={STRONG}>HELP</strong> for assistance, or contact us directly at{" "}
            {BRAND.email} or {BRAND.phone} during business hours.
          </p>

          <p className={H3}>4. Carrier liability</p>
          <p className={P}>Carriers are not liable for delayed or undelivered messages.</p>

          <p className={H3}>5. Message and data rates</p>
          <p className={P}>
            Message and data rates may apply for messages sent to you from us and to us from
            you. Message frequency varies based on your inquiry and appointment schedule. For
            questions about your text or data plan, contact your wireless provider.
          </p>

          <p className={H3}>6. Supported carriers</p>
          <p className={P}>
            Our SMS program works with all major U.S. wireless carriers, including AT&amp;T,
            T-Mobile, Verizon, and most regional carriers.
          </p>

          <p className={H3}>7. Age restriction</p>
          <p className={P}>You must be 18 years or older to participate in our SMS program.</p>

          <p className={H3}>8. Privacy</p>
          <p className={P}>
            How we handle your phone number and opt-in record is described in our{" "}
            <a href="/privacy#sms" className={LINK}>Privacy Policy</a>. Mobile information is
            never shared with third parties or affiliates for marketing or promotional purposes.
          </p>
          <p className={P}>
            We comply with all applicable laws and regulations, including the Telephone Consumer
            Protection Act (TCPA) and CTIA guidelines, regarding the use of SMS communications.
          </p>

          <h2 className={H2}>General terms</h2>
          <p className={P}>
            Accessing the Site in any manner, whether automated or otherwise, constitutes use of
            the Site and your agreement to be bound by these Terms. We reserve the right to
            change these Terms or to impose new conditions on use of the Site from time to time,
            in which case we will post the revised Terms on this page. By continuing to use the
            Site after we post changes, you accept the Terms as modified.
          </p>

          <h2 className={H2}>What this Site is</h2>
          <p className={P}>
            The Site is a marketing and client-acquisition resource for RHG's hospitality
            consulting practice. Browsing the Site, starting a chat, submitting an inquiry, or
            booking The Modern Hotel Audit does not by itself create a client relationship or any
            obligation on either side. A consulting engagement, including The Modern Hotel Audit
            itself, begins only once we have spoken and agreed on scope, in writing where a paid
            engagement is involved. No purchases are made through the Site.
          </p>

          <h2 className={H2}>Figures, case studies, and estimates are illustrative</h2>
          <p className={P}>
            Property scores, dollar figures, revenue lifts, feasibility ranges, and valuation
            approaches described on this Site, including the published case studies (for
            example, The Lincoln, Marfa), reflect specific engagements, publicly available
            information, or general industry methodology at a point in time. They are shown to
            illustrate how we work and are not a guarantee, appraisal, projection, or
            professional valuation for any other property. Actual results for any hotel depend
            on facts specific to that property and market. Nothing on this Site is financial,
            investment, legal, tax, or appraisal advice; where a decision has real money behind
            it, get independent professional advice in addition to anything discussed with us.
          </p>

          <h2 className={H2}>Acceptable use</h2>
          <ul className={UL}>
            <li>Use the Site only for lawful purposes and only to make genuine inquiries.</li>
            <li>Do not attempt to scrape, reverse-engineer, or overload the Site, the chat widget, or any form on it.</li>
            <li>Do not submit false or misleading information. Automated and abusive submissions are filtered and may be discarded without notice.</li>
          </ul>

          <h2 className={H2}>Intellectual property rights</h2>
          <p className={H3}>Our limited license to you</p>
          <p className={P}>
            The Site and all materials available on it are the property of Ramirez Hospitality
            Group, its founder Adam Ramirez, or our licensors, and are protected by copyright,
            trademark, and other intellectual property laws. The Site is provided solely for your
            personal, non-commercial use. Unless explicitly authorized, you may not modify, copy,
            reproduce, republish, upload, post, transmit, sell, create derivative works from,
            exploit, or distribute any material from the Site. You may download or print one
            copy of individual pages for your own non-commercial use, provided you keep all
            copyright notices intact. To ask permission for anything else, email {BRAND.email}.
          </p>
          <p className={H3}>Your license to us</p>
          <p className={P}>
            By submitting material to us through the Site, the chat widget, or other digital
            channels (for example, comments, testimonials, photos, or documents), you represent
            that you own the material or have the necessary permissions, and you grant us a
            royalty-free, perpetual, irrevocable, non-exclusive, worldwide license to use,
            modify, reproduce, distribute, and display that material in connection with our
            services. Confidential client data shared during an engagement is governed by that
            engagement's agreement, not by this license.
          </p>

          <h2 className={H2}>Third-party links and services</h2>
          <p className={P}>
            The Site links to and embeds services we don't control, including Google Calendar
            for scheduling and LeadConnector for the chat widget, forms, and text messaging.
            Our linking to or embedding a third-party service does not imply endorsement. Your
            use of those services is governed by their own terms and privacy policies. See our{" "}
            <a href="/privacy" className={LINK}>Privacy Policy</a> for how information moves
            between this Site and those services.
          </p>

          <h2 className={H2}>Disclaimers and limitation of liability</h2>
          <p className={P}>
            The Site and its content are provided "as is" and without warranties of any kind,
            either express or implied. To the fullest extent permitted by law, we disclaim all
            warranties, including implied warranties of merchantability and fitness for a
            particular purpose, and Ramirez Hospitality Group is not liable for any decision made
            in reliance on information published on this Site outside the scope of a signed
            engagement. You agree to indemnify and hold harmless Ramirez Hospitality Group, its
            affiliates, and their respective officers, agents, and employees from any claims,
            damages, liabilities, costs, and expenses arising out of your breach of these Terms.
          </p>

          <h2 className={H2}>Client portal access</h2>
          <p className={P}>
            If we provide you with login credentials to a client portal as part of an
            engagement, you agree to provide accurate information, to keep your credentials
            confidential, and to be responsible for activity under your account. If you suspect
            unauthorized use, notify us immediately at {BRAND.email}.
          </p>

          <h2 className={H2}>Termination</h2>
          <p className={P}>
            We reserve the right to terminate or suspend your access to the Site or the
            messaging program, without notice, if we determine that you have violated these
            Terms or engaged in conduct we deem inappropriate or unlawful.
          </p>

          <h2 className={H2}>Governing law</h2>
          <p className={P}>
            These Terms are governed by the laws of the State of California, without regard to
            conflict-of-law principles. Any dispute arising under these Terms shall be resolved
            exclusively through binding arbitration in Riverside County, California.
          </p>

          <h2 className={H2}>Changes to these Terms</h2>
          <p className={P}>
            We may update these Terms from time to time. The latest version will always be
            available on this page with its effective date.
          </p>

          <h2 className={H2}>Contact</h2>
          <p className={P}>
            Questions about these Terms:
            <br />
            {BRAND.name}
            <br />
            Phone: {BRAND.phone}
            <br />
            Email: <a href={BRAND.emailHref} className={LINK}>{BRAND.email}</a>
            <br />
            Website: ramirezhospitality.com
            <br />
            {BRAND.address}
          </p>
          <p className={P}>By using our website and services, you consent to these Terms of Service.</p>
        </div>
      </section>
    </PageLayout>
  );
}
