/*
 * Ramirez Hospitality Group — The Reserve · CONTACT
 * Three modes of reach: the two live Google Calendar booking links, a simple
 * message form, and direct phone/email.
 */

import { useState } from "react";
import { ArrowRight, Calendar, Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { PageLayout } from "@/components/PageLayout";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/brand";
import { ORGANIZATION_SCHEMA } from "@/components/SEO";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks — Adam reads every message himself.", {
        description:
          "(Form submission is a placeholder. We'll wire to your CRM / lead-gen webhook on launch.)",
      });
      (e.target as HTMLFormElement).reset();
    }, 600);
  }

  return (
    <PageLayout
      title="Contact Adam Ramirez — Hotel Consulting & Revenue Management | Ramirez Hospitality Group"
      description="Contact Adam Ramirez directly. Phone, email, or book The Modern Hotel Audit — free and scored across seven dimensions — for independent and boutique hotel owners. Based in Palm Springs, CA. Available nationwide."
      canonical="/contact"
      breadcrumbs={[{ name: "Contact", href: "/contact" }]}
      jsonLd={[ORGANIZATION_SCHEMA]}
    >
      {/* HERO */}
      <section className="pt-44 pb-16 lg:pt-56 lg:pb-24 bg-obsidian">
        <div className="container">
          <div className="max-w-4xl">
            <Eyebrow numeral="I" label="Reach Out" />
            <h1 className="mt-7 font-display font-medium text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.04] text-cream tracking-[-0.025em]">
              Let's talk about
              <br />
              <span className="italic text-brass">your hotel.</span>
            </h1>
            <p className="mt-9 text-cream/80 text-lg md:text-xl leading-[1.55] max-w-2xl">
              Most owner-operators reach me one of three ways. Pick whichever feels right.
            </p>
          </div>
        </div>
      </section>

      {/* THREE PATHS */}
      <section className="py-16 lg:py-20 bg-obsidian">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-px bg-brass/15 border border-brass/15">
            {/* Schedule */}
            <Reveal className="bg-card p-8 lg:p-10 flex flex-col">
              <div className="text-brass mb-6">
                <Calendar className="w-7 h-7" strokeWidth={1.4} />
              </div>
              <h2 className="font-display text-2xl text-cream">Schedule a Call</h2>
              <p className="mt-4 text-cream/70 text-sm leading-[1.7] flex-1">
                Every revenue management client starts with The Modern Hotel Audit. Opening
                or reopening a property instead? Book the Opening Consultation. Anything
                else — subscription details, an asset advisory engagement, a tech/OTA
                question — send a message and Adam will find the right time.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={BRAND.auditBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brass w-full justify-center"
                >
                  Book The Modern Hotel Audit <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={BRAND.openingBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full justify-center"
                >
                  Book an Opening Consultation
                </a>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={120} className="bg-card p-8 lg:p-10 flex flex-col">
              <div className="text-brass mb-6">
                <MessageSquare className="w-7 h-7" strokeWidth={1.4} />
              </div>
              <h2 className="font-display text-2xl text-cream">Send a Message</h2>
              <p className="mt-4 text-cream/70 text-sm leading-[1.7] flex-1">
                Drop a note. Adam reads every message himself and replies personally.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors"
                />
                <input
                  type="text"
                  name="hotel"
                  placeholder="Hotel name"
                  className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors"
                />
                <textarea
                  name="message"
                  placeholder="What can I help with?"
                  rows={4}
                  required
                  className="w-full bg-obsidian border border-brass/20 px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-brass/60 transition-colors resize-none"
                />
                <button type="submit" disabled={submitting} className="btn-brass w-full justify-center">
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </Reveal>

            {/* Direct */}
            <Reveal delay={240} className="bg-card p-8 lg:p-10 flex flex-col">
              <div className="text-brass mb-6">
                <Phone className="w-7 h-7" strokeWidth={1.4} />
              </div>
              <h2 className="font-display text-2xl text-cream">Direct Reach</h2>
              <p className="mt-4 text-cream/70 text-sm leading-[1.7] flex-1">
                Old-fashioned phone and email. Both go straight to Adam.
              </p>
              <div className="mt-8 space-y-5">
                <a
                  href={BRAND.phoneHref}
                  className="flex items-center gap-3 text-cream hover:text-brass transition-colors group"
                >
                  <Phone className="w-4 h-4 text-brass" strokeWidth={1.5} />
                  <span className="font-display text-xl group-hover:text-brass transition-colors">
                    {BRAND.phone}
                  </span>
                </a>
                <a
                  href={BRAND.emailHref}
                  className="flex items-center gap-3 text-cream hover:text-brass transition-colors group"
                >
                  <Mail className="w-4 h-4 text-brass" strokeWidth={1.5} />
                  <span className="text-base group-hover:text-brass transition-colors break-all">
                    {BRAND.email}
                  </span>
                </a>
                <div className="flex items-start gap-3 text-cream/65 text-sm">
                  <MapPin className="w-4 h-4 text-brass mt-0.5" strokeWidth={1.5} />
                  <span>
                    {BRAND.city}
                    <br />
                    {BRAND.reach}
                  </span>
                </div>
                <div className="text-cream/45 text-xs leading-[1.7] pt-4 border-t border-brass/10">
                  {BRAND.hours}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
