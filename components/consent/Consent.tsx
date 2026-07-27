"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Cookie consent + GA4 via Google Consent Mode v2.
//
// GA loads on every page from first paint, but starts in a DENIED default state
// (cookieless pings only — no cookies, no identifiers). Accepting updates
// analytics_storage to granted and full tracking begins; declining leaves it
// denied. Consent state is carried entirely through Consent Mode signals — there
// is no script-injection gate and no `ga-disable` flag anymore.
//
//  - Choice persists in localStorage under `pm-consent` ("granted" | "denied").
//  - <html data-pm-consent> mirrors the choice so the footer withdrawal link
//    toggles via CSS with no server/client render mismatch.
//  - Measurement ID comes from NEXT_PUBLIC_GA_ID; absent → no GA, no error.

const KEY = "pm-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __pmGALoaded?: boolean;
  }
}

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}
function saveChoice(v: Choice) {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* storage unavailable — banner reappears next load */
  }
}
function reflect(v: Choice | null) {
  document.documentElement.setAttribute("data-pm-consent", v ?? "none");
}

// Load GA once, with Consent Mode v2. The denied `default` is the FIRST gtag call
// — before config, before any event — so no unconsented storage is ever used. A
// stored prior grant is applied immediately after, so a returning accepter isn't
// tracked in denied mode (wait_for_update covers the timing).
function loadGA(stored: Choice | null) {
  if (!GA_ID || window.__pmGALoaded) return;
  window.__pmGALoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // Google's canonical stub pushes the `arguments` object; GA reads dataLayer
    // entries in that exact shape, so rest-params (an array) is not equivalent.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  // 1) Denied defaults, before everything else.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });

  // 2) Apply a stored prior choice. Only analytics_storage is relevant here —
  //    there is no advertising, so the ad_* signals stay denied.
  if (stored === "granted") {
    window.gtag("consent", "update", { analytics_storage: "granted" });
  }

  // 3) Load the script and configure. We emit page_view ourselves on route
  //    change, so the automatic one is off (avoids SPA double-counting).
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });
}

function updateConsent(granted: boolean) {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

// Pageview for EVERY visitor: a cookieless ping when denied, a full hit when
// granted. Consent Mode governs what may be stored, not whether we send.
function sendPageView() {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export default function Consent() {
  // null = not yet read (first paint); "none" = read, no stored choice.
  const [choice, setChoice] = useState<Choice | "none" | null>(null);
  const pathname = usePathname();

  // Init once on mount: reflect the stored choice and load GA (always) with
  // denied defaults + any stored grant. Declared FIRST so window.gtag exists
  // before the pageview effect below runs.
  useEffect(() => {
    const c = readChoice();
    reflect(c);
    // localStorage is unreadable during SSR, so the banner gate is applied here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(c ?? "none");
    loadGA(c);
  }, []);

  // Pageviews on every route change (and the initial load). Fires for all
  // visitors; storage is gated by Consent Mode.
  useEffect(() => {
    sendPageView();
  }, [pathname]);

  // Delegated withdrawal: any [data-pm-withdraw] element in the footer.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("[data-pm-withdraw]");
      if (!target) return;
      e.preventDefault();
      withdraw();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const accept = useCallback(() => {
    saveChoice("granted");
    reflect("granted");
    setChoice("granted");
    updateConsent(true);
  }, []);

  const decline = useCallback(() => {
    saveChoice("denied");
    reflect("denied");
    setChoice("denied");
    // No consent update needed — defaults are already denied. GA keeps running
    // in cookieless-ping mode.
  }, []);

  // Banner only renders client-side, only when no choice has been stored.
  if (choice !== "none") return null;
  return <Banner onAccept={accept} onDecline={decline} />;
}

// Revoke: persist the denial, update Consent Mode back to denied, wipe GA
// cookies, and confirm inline on the footer link(s). The <html> attribute is
// deliberately left as "granted" for the rest of this session so the "Analytics
// consent withdrawn" text stays visible; the stored "denied" hides it next load.
// GA reverts to cookieless-ping mode rather than stopping entirely.
function withdraw() {
  saveChoice("denied");
  updateConsent(false);
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name.startsWith("_ga") || name.startsWith("_gid")) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
  document.querySelectorAll<HTMLElement>("[data-pm-withdraw]").forEach((el) => {
    el.textContent = "Analytics consent withdrawn";
    el.removeAttribute("href");
    el.removeAttribute("data-pm-withdraw");
    el.style.pointerEvents = "none";
    el.style.cursor = "default";
    el.style.color = "#7E6C9B";
  });
}

function Banner({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      // Above page content and the sticky nav, but BELOW the mobile menu modal
      // (backdrop z-60), so opening the hamburger covers the banner rather than
      // colliding with it.
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 55,
        maxWidth: 900,
        margin: "0 auto",
        background: "rgba(36,18,56,0.97)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 18,
        boxShadow: "0 20px 60px rgba(8,3,20,0.6)",
        padding: "22px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "18px 24px",
        fontFamily: "var(--pm-font-body)",
      }}
    >
      <div
        style={{
          flex: "1 1 380px",
          minWidth: 280,
          color: "#D8CCEA",
          fontSize: 14.5,
          lineHeight: 1.6,
        }}
      >
        <strong
          style={{
            fontFamily: "var(--pm-font-display)",
            color: "#fff",
            fontSize: 15.5,
            display: "block",
            marginBottom: 4,
          }}
        >
          We use cookies
        </strong>
        We&rsquo;d like to set Google Analytics cookies to understand how the site is used. They load{" "}
        <em>only</em> if you accept. Essential cookies (remembering this choice) are always set. See our{" "}
        <a href="/privacy" style={{ color: "#8CDC00", textDecoration: "underline" }}>
          Privacy Policy
        </a>
        .
      </div>
      <div style={{ display: "flex", gap: 12, flex: "0 0 auto" }}>
        <button type="button" onClick={onDecline} className="pm-consent-btn pm-consent-decline">
          Decline
        </button>
        <button type="button" onClick={onAccept} className="pm-consent-btn pm-consent-accept">
          Accept
        </button>
      </div>
    </div>
  );
}
