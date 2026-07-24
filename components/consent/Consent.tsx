"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Cookie consent + GA4 gating, re-expressed from the handoff's consent.js as an
// idiomatic React client component. Behaviour contract:
//  - Choice persists in localStorage under `pm-consent` ("granted" | "denied").
//  - GA is HARD-gated: no gtag request at all before Accept (not Consent Mode).
//  - <html data-pm-consent> mirrors the choice so CSS can show/hide the footer
//    withdrawal link without server-side conditional rendering (no hydration
//    mismatch).
//  - The Measurement ID comes from NEXT_PUBLIC_GA_ID; absent → no GA, no error.

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
    /* storage unavailable — banner will simply reappear next load */
  }
}
function reflect(v: Choice | null) {
  document.documentElement.setAttribute("data-pm-consent", v ?? "none");
}

// Inject gtag.js. Only ever called once, only after consent, and only when a
// real Measurement ID is configured (so preview deploys send nothing).
function loadGA() {
  if (!GA_ID || window.__pmGALoaded) return;
  window.__pmGALoaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // Google's canonical stub pushes the `arguments` object; GA reads dataLayer
    // entries in that exact shape, so rest-params (an array) is not equivalent.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  // We emit page_view ourselves on every route change (incl. the first), so the
  // built-in one is turned off — otherwise SPA navigations double-count.
  window.gtag("config", GA_ID, { send_page_view: false });
}
function disableGA() {
  if (GA_ID) (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
}
function sendPageView() {
  if (!GA_ID || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: window.location.pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export default function Consent() {
  // null = not yet read (SSR/first paint); "none" = read, no stored choice.
  const [choice, setChoice] = useState<Choice | "none" | null>(null);
  const pathname = usePathname();

  // Init once on mount: reflect the stored choice and gate GA accordingly.
  useEffect(() => {
    const c = readChoice();
    reflect(c);
    // localStorage is unreadable during SSR, so the stored choice can only be
    // applied here after mount — the whole point of gating the banner client-side.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChoice(c ?? "none");
    if (c === "granted") loadGA();
    else if (c === "denied") disableGA();
  }, []);

  // Client-side pageviews on route change (only when GA is actually running).
  useEffect(() => {
    if (choice === "granted") sendPageView();
  }, [pathname, choice]);

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
    loadGA();
  }, []);

  const decline = useCallback(() => {
    saveChoice("denied");
    reflect("denied");
    setChoice("denied");
    disableGA();
  }, []);

  // Banner only renders client-side, only when no choice has been stored.
  if (choice !== "none") return null;
  return <Banner onAccept={accept} onDecline={decline} />;
}

// Persist the denial, disable GA, wipe GA cookies, and confirm inline on the
// footer link(s). The <html> attribute is deliberately left as "granted" for the
// rest of this session so the "Analytics consent withdrawn" text stays visible;
// on the next load the stored "denied" hides the slot.
function withdraw() {
  saveChoice("denied");
  disableGA();
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
      // z-index sits above page content and the sticky nav but BELOW the mobile
      // menu modal (backdrop z-60), so opening the hamburger covers the banner
      // rather than colliding with it.
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
