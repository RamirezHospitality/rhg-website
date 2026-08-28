/*
 * Ramirez Hospitality Group — Google Calendar appointment embed
 *
 * Renders the public Google Calendar Appointment Schedule page in an iframe.
 * Verified live in a real browser before shipping: the page does not send
 * X-Frame-Options or a frame-ancestors CSP that would block embedding, and
 * both booking links (audit, opening consultation) resolve to real,
 * distinct schedules.
 *
 * Google's embed renders on a white background regardless of host theme, so
 * this wraps it in a light card rather than fighting the iframe's own styles.
 */

interface BookingCalendarProps {
  url: string;
  title: string;
  className?: string;
}

export function BookingCalendar({ url, title, className = "" }: BookingCalendarProps) {
  return (
    <div className={`bg-white ${className}`}>
      <iframe
        src={url}
        title={title}
        className="w-full border-0 block"
        style={{ height: 480 }}
        loading="lazy"
      />
      <div className="px-4 py-2.5 border-t border-black/10 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.7rem] tracking-wide text-black/50 hover:text-black/70 transition-colors"
        >
          Having trouble booking here? Open the calendar in a new tab.
        </a>
      </div>
    </div>
  );
}
