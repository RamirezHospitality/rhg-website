/*
 * Ramirez Hospitality Group — Privacy Policy
 *
 * Originally added 2026-08-28 because /privacy was linked from the footer
 * but never existed (Google Ads policy and the Google Auth OAuth consent
 * screen both require it).
 *
 * Rewritten 2026-09-10 for A2P 10DLC registration through LeadConnector.
 * Structure and required SMS clauses follow the Harvest Creatives "A2P
 * Privacy Policy" template (Drive folder "A2p Verification"), adapted to
 * what this site actually does: the LeadConnector chat widget is the only
 * place SMS consent is collected, there is no site-hosted lead form any
 * more, and the Google Ads tag is static in client/index.html.
 *
 * The bold "no mobile information shared" statements are the exact wording
 * carriers look for. Do not paraphrase them.
 *
 * Not a substitute for review by an attorney.
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

export default function Privacy() {
  return (
    <PageLayout
      title="Privacy Policy | Ramirez Hospitality Group"
      description="How Ramirez Hospitality Group collects, uses, and protects information from visitors, hotel owners who book The Modern Hotel Audit, and anyone who opts in to text messages."
      canonical="/privacy"
      breadcrumbs={[{ name: "Privacy Policy", href: "/privacy" }]}
    >
      <section className="pt-44 pb-24 lg:pt-56 lg:pb-32 bg-obsidian">
        <div className="container max-w-3xl">
          <Eyebrow numeral="I" label="Legal" />
          <h1 className="mt-7 font-display font-medium text-4xl md:text-5xl leading-[1.08] text-cream tracking-[-0.02em]">
            Privacy Policy
          </h1>
          <p className="mt-6 text-cream/55 text-sm">Effective August 28, 2026. Last updated September 10, 2026.</p>

          <p className={`${P} mt-10`}>
            Ramirez Hospitality Group ("RHG," "we," "us," or "our") operates ramirezhospitality.com
            (the "Site") and related booking pages. This policy explains what information we
            collect when you visit the Site, start a conversation in our chat widget, book The
            Modern Hotel Audit, or opt in to text messages, how we use it, and the choices you
            have.
          </p>

          <div className="border border-brass/40 bg-card p-6 sm:p-8 mt-8 mb-4">
            <p className={H3}>Important notice regarding text messaging data</p>
            <p className="text-cream/90 text-base leading-[1.8]">
              Ramirez Hospitality Group does not share customer opt-in information, including
              phone numbers and consent records, with any affiliates or third parties for
              marketing, promotional, or any other purposes unrelated to providing our direct
              services. All text messaging originator opt-in data is kept strictly confidential.
            </p>
          </div>

          <h2 className={H2}>1. Information we collect</h2>
          <p className={H3}>Personal information</p>
          <ul className={UL}>
            <li>Name, email address, and phone number, when you provide them in the chat widget, a booking form, or a scheduling page</li>
            <li>Your property name, location, and number of keys (rooms), and anything else you tell us about the hotel or the deal</li>
            <li>Opt-in records and timestamps for every communication channel you agree to (SMS, email)</li>
            <li>Payment information, only if you later engage us for paid work, and only through the invoicing or payment provider we use for that engagement, never through the Site</li>
          </ul>
          <p className={H3}>Non-personal information</p>
          <ul className={UL}>
            <li>IP address, approximate country, browser type, and device information, collected automatically by our hosting provider</li>
            <li>
              Advertising attribution values when you arrive from a paid ad or a tagged link:
              Google Ads click identifiers (gclid, gbraid, wbraid), UTM parameters, the page you
              landed on, and the referring page. These are held in your browser's local storage
              for up to 90 days and are only associated with you if you contact us.
            </li>
          </ul>
          <p className={H3}>Customer communication</p>
          <ul className={UL}>
            <li>Records of inquiries, chat conversations, and service requests</li>
            <li>Appointment details and scheduling preferences</li>
            <li>Audit findings, engagement history, and feedback</li>
          </ul>

          <h2 className={H2}>2. How we use your information</h2>
          <ul className={UL}>
            <li>To respond to your inquiry and schedule The Modern Hotel Audit or a strategy call</li>
            <li>To send confirmations, reminders, follow-ups, and customer support related to what you asked for, by email or, only if you opted in, by text message</li>
            <li>To deliver the audit and any consulting engagement you agree to</li>
            <li>To measure which ad campaigns, keywords, and pages produce genuine inquiries so ad spend is not wasted</li>
            <li>To maintain records of your communication preferences and consent</li>
            <li>To keep the Site secure and to detect and filter automated spam</li>
          </ul>

          <h2 id="sms" className={`${H2} scroll-mt-32`}>3. SMS messaging and compliance</h2>
          <p className={P}>
            <strong className={STRONG}>Where consent is collected.</strong> We collect consent
            to text you in two places on this Site: the opt-in form on our booking pages, and the
            chat widget. In both, you provide your mobile number and check an unchecked box that
            explicitly agrees to receive text messages before you submit. The form offers two
            separate boxes: one for transactional messages related to the services you asked
            about (appointment confirmations and reminders for The Modern Hotel Audit, follow-up
            on your inquiry, and customer support), and one for marketing and promotional
            messages. You may also opt in verbally during a consultation call. Consent is never
            a condition of booking, purchasing, or working with us.
          </p>

          <p className={H3}>Opt-in and consent</p>
          <ul className={UL}>
            <li>You will only receive text messages if you have explicitly opted in</li>
            <li>We maintain timestamped records of every opt-in action</li>
            <li>We comply with the Telephone Consumer Protection Act (TCPA), CTIA messaging guidelines, and all applicable laws</li>
          </ul>

          <p className={H3}>Opt-out instructions</p>
          <ul className={UL}>
            <li>You can cancel text messages at any time by replying <strong className={STRONG}>STOP</strong></li>
            <li>You will receive one final confirmation message, and no further messages will be sent unless you opt in again</li>
            <li>All opt-out requests are processed immediately</li>
          </ul>

          <p className={H3}>Message frequency and content</p>
          <ul className={UL}>
            <li>Message frequency varies based on your interactions with us</li>
            <li>Messages relate directly to the services you have requested</li>
            <li>We do not send marketing or promotional content unless you checked the separate marketing consent box</li>
          </ul>

          <p className={H3}>Help and support</p>
          <ul className={UL}>
            <li>Reply <strong className={STRONG}>HELP</strong> for assistance, or contact us at {BRAND.email} or {BRAND.phone}</li>
            <li>Support is available during regular business hours, {BRAND.hours}</li>
          </ul>

          <p className={H3}>Carrier information</p>
          <ul className={UL}>
            <li>Standard message and data rates may apply</li>
            <li>Carriers are not liable for delayed or undelivered messages</li>
            <li>Supported carriers include AT&amp;T, Verizon, T-Mobile, and most regional U.S. carriers</li>
          </ul>

          <p className={H3}>SMS data protection statement</p>
          <p className={P}>
            <strong className={STRONG}>
              No mobile information will be shared with third parties or affiliates for marketing
              or promotional purposes. Information sharing with subcontractors in support
              services, such as customer service, is permitted. All other use case categories
              exclude text messaging originator opt-in data and consent; this information will
              not be shared with any third parties.
            </strong>
          </p>
          <p className={P}>
            We implement strict data protection measures to safeguard your SMS opt-in
            information and consent records. Full program terms are in the{" "}
            <a href="/terms#sms" className={LINK}>Terms of Service</a>.
          </p>

          <h2 className={H2}>4. Information sharing and disclosure</h2>
          <p className={P}>We do not sell, rent, or trade personal information. We may share information with:</p>
          <p className={H3}>Service providers</p>
          <ul className={UL}>
            <li>
              <strong className={STRONG}>LeadConnector</strong>, which powers the chat widget,
              our booking and contact forms, and our CRM, and which delivers our text messages
              and emails and receives your replies. It processes your information solely so we
              can respond to you and is contractually bound to keep it confidential.
            </li>
            <li>
              <strong className={STRONG}>Cloudflare</strong>, which hosts the Site.
            </li>
            <li>
              <strong className={STRONG}>Google Calendar</strong> appointment scheduling, which
              is embedded on our booking pages so you can pick a time. That embed is Google's own
              product, governed by Google's privacy policy.
            </li>
            <li>
              <strong className={STRONG}>Google Ads</strong>. Google's tag loads on this Site so
              we can measure which campaigns produce genuine inquiries. Where we report a
              conversion with your email or phone number, Google's tag hashes it in your browser
              before it is sent. You can adjust your ad settings at{" "}
              <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer" className={LINK}>myadcenter.google.com</a>.
            </li>
            <li>SMS aggregators and carriers, solely to deliver messages you have consented to receive</li>
          </ul>
          <p className={H3}>Legal compliance</p>
          <ul className={UL}>
            <li>If required by law, legal process, or to protect our rights</li>
            <li>In response to valid law enforcement requests or court orders</li>
          </ul>
          <p className={H3}>Business transfers</p>
          <ul className={UL}>
            <li>In case of a merger, acquisition, or sale of assets, your data remains protected under the terms of this policy</li>
          </ul>
          <p className={P}>
            <strong className={STRONG}>
              All of the above categories exclude text messaging originator opt-in data and
              consent; this information will not be shared with any third parties, excluding
              the aggregators and providers of the text message service.
            </strong>
          </p>

          <h2 className={H2}>5. Data security</h2>
          <p className={P}>We implement and maintain reasonable security measures to protect your personal information:</p>
          <ul className={UL}>
            <li>Encryption of data in transit (the Site is served only over HTTPS) and at rest with our providers</li>
            <li>Access controls and authentication on every system that holds client information</li>
            <li>Confidential client files are kept in access-logged storage, never in analytics, URLs, or public hosting</li>
            <li>Breach notification in accordance with applicable law</li>
          </ul>
          <p className={P}>
            No method of transmission over the Internet or electronic storage is completely
            secure. We use commercially acceptable means to protect your information but cannot
            guarantee absolute security.
          </p>

          <h2 className={H2}>6. Cookies and tracking technologies</h2>
          <p className={P}>
            We do not set tracking cookies of our own. The only data the Site keeps in your
            browser is the advertising attribution record described in Section 1, held in local
            storage, and it is used solely to attribute an inquiry to the channel that produced
            it. Google's tag and the LeadConnector chat widget may set their own cookies to
            function, governed by their own policies. You can clear local storage and control
            cookies through your browser settings; doing so may limit some features.
          </p>

          <h2 className={H2}>7. Your rights and choices</h2>
          <p className={P}>You have the right to:</p>
          <ul className={UL}>
            <li>Access, update, or delete your personal information</li>
            <li>Opt out of marketing emails by clicking "unsubscribe" in any email we send</li>
            <li>Opt out of text messages by replying <strong className={STRONG}>STOP</strong>; this does not affect your inquiry or any email follow-up</li>
            <li>Request information on how we process your data</li>
            <li>Withdraw consent at any time for future communications</li>
            <li>Lodge a complaint with a supervisory authority if you believe your rights have been violated</li>
          </ul>
          <p className={P}>
            To exercise these rights, contact us using the information in Section 10. If you are
            located somewhere with specific statutory privacy rights (for example, California or
            the EU/UK), we will honor a request made in good faith to the extent those rights
            apply.
          </p>

          <h2 className={H2}>8. Third-party links</h2>
          <p className={P}>
            The Site may contain links to third-party websites. We are not responsible for their
            privacy practices and encourage you to review their policies. This policy applies
            only to information collected by Ramirez Hospitality Group.
          </p>

          <h2 className={H2}>Children's privacy</h2>
          <p className={P}>
            The Site is directed at hotel owners, operators, and investors. It is not directed
            at, and we do not knowingly collect information from, anyone under 18.
          </p>

          <h2 className={H2}>9. Changes to this policy</h2>
          <p className={P}>
            We may update this policy as the Site or our tools change. The latest version will
            always be available on this page with its effective date. For significant changes we
            will notify you by email or by a notice on the Site.
          </p>

          <h2 className={H2}>10. Contact us</h2>
          <p className={P}>
            Questions about this policy, or a request to access or delete your information:
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
          <p className={P}>By using our website and services, you consent to this Privacy Policy.</p>
        </div>
      </section>
    </PageLayout>
  );
}
