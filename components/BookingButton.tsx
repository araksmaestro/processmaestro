"use client";

import type { CSSProperties, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import {
  buildBookingUrl,
  campaignFromPath,
  ensureCalendly,
  type BookingService,
  type BookingSlot,
} from "@/lib/booking";

// variant → the existing hover class, so a BookingButton reuses the same
// button styling the rest of the site already ships. Call sites may also pass
// their own className/style to keep each location pixel-identical.
const VARIANT_CLASS: Record<string, string> = {
  primary: "pm-cta-primary",
  nav: "pm-nav-consult",
  dark: "pm-dark-cta",
  svc: "svc-cta",
};

export default function BookingButton({
  label,
  slot,
  service = "general",
  variant = "primary",
  className,
  style,
  onActivate,
}: {
  /** Exact copy from the design — the component never rewrites it. */
  label: string;
  slot: BookingSlot;
  service?: BookingService;
  variant?: keyof typeof VARIANT_CLASS | (string & {});
  className?: string;
  style?: CSSProperties;
  /** Fires on an unmodified activation (e.g. to close the mobile panel). */
  onActivate?: () => void;
}) {
  const pathname = usePathname();
  const url = buildBookingUrl({
    campaign: campaignFromPath(pathname ?? "/"),
    content: slot,
    term: service,
  });

  const warm = () => {
    void ensureCalendly();
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Leave modified clicks alone — cmd/ctrl/shift/alt and middle-click open a
    // new tab via the href, which is the correct behavior.
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    onActivate?.();

    // Pop up only if the widget is actually loaded; otherwise let the anchor
    // navigate to the same URL. The fallback is the floor, never a dead button.
    if (typeof window !== "undefined" && window.Calendly) {
      e.preventDefault();
      window.Calendly.initPopupWidget({ url });
    }
  };

  const classes = [className, !className ? VARIANT_CLASS[variant] : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={url}
      className={classes || undefined}
      style={style}
      data-booking-slot={slot}
      data-booking-service={service}
      onMouseEnter={warm}
      onFocus={warm}
      onClick={handleClick}
    >
      {label}
    </a>
  );
}
