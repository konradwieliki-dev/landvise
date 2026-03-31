"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("lv_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("lv_sid", sid);
  }
  return sid;
}

function track(event_type: string, extra: Record<string, string> = {}) {
  const payload = {
    event_type,
    page: window.location.pathname,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    session_id: getSessionId(),
    ...extra,
  };

  // Używamy sendBeacon dla niezawodności (nie blokuje nawigacji)
  const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/track", blob);
  } else {
    fetch("/api/track", { method: "POST", body: blob, keepalive: true });
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Track page views
  useEffect(() => {
    // Pierwsze załadowanie strony
    track("page_view");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      track("page_view");
    }
  }, [pathname]);

  // Track section clicks (nawigacja do sekcji)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";

      // Kliknięcie w sekcję (np. #uslugi, /#uslugi)
      const sectionMatch = href.match(/\/?#(\w+)/);
      if (sectionMatch) {
        track("section_click", { section: sectionMatch[1] });
      }

      // Kliknięcie w link do podstrony
      if (href.startsWith("/") && !href.startsWith("/#") && href !== "/") {
        track("section_click", { section: href });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null; // Komponent niewidoczny
}
