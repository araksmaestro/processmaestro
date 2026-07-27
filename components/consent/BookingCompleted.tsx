"use client";

import { useEffect, useRef } from "react";

// Fires the GA4 `booking_completed` conversion exactly once per page load, and
// only when analytics consent is granted. No personal data in the payload — the
// page never reads Calendly's query parameters.
//
// DORMANT until the Calendly account is on a paid plan: only then can the event's
// confirmation page redirect to /thanks, which is the only way a real booking
// reaches this component. Until then this never fires in production (nobody lands
// here) — that is expected, not a bug. The interim signal is `booking_click`
// (see components/BookingButton.tsx). No change needed when the plan upgrades.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Module-level guard: survives React strict-mode's double-invoke of effects so
// the event cannot fire twice for one load.
let alreadyFired = false;

export default function BookingCompleted() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (alreadyFired) return;

    let granted = false;
    try {
      granted = localStorage.getItem("pm-consent") === "granted";
    } catch {
      granted = false;
    }
    if (!GA_ID || !granted) return;

    // The Consent provider injects GA from the layout; its effect runs after this
    // page's, so window.gtag may not exist yet. Poll briefly for it, then fire once.
    let tries = 0;
    const fire = () => {
      if (alreadyFired) return;
      if (typeof window.gtag === "function") {
        alreadyFired = true;
        window.gtag("event", "booking_completed");
      } else if (tries++ < 50) {
        timer.current = setTimeout(fire, 100);
      }
    };
    fire();

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return null;
}
