import { createServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * The GA4 measurement ID is a publishable value, but it is stored as a
 * project secret, so read it server-side and expose it intentionally.
 */
export const getGaMeasurementId = createServerFn({ method: "GET" }).handler(() => {
  return process.env["GOOGLE_ANALYTICS_MEASUREMENT_ID"] ?? null;
});

function initGoogleAnalytics(measurementId: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag("set", "developer_id.dZjgwMW", true);
  gtag("js", new Date());
  gtag("config", measurementId, {
    page_path: window.location.pathname,
  });
}

function GoogleAnalytics() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    getGaMeasurementId()
      .then((measurementId) => {
        if (!measurementId || cancelled) return;
        initGoogleAnalytics(measurementId);
        // SPA route changes are not auto-tracked by gtag.js.
        router.subscribe("onResolved", () => {
          window.gtag?.("event", "page_view", {
            page_path: window.location.pathname,
          });
        });
      })
      .catch((error) => console.error("Google Analytics init failed", error));
    return () => {
      cancelled = true;
    };
    // Subscribe once; router identity is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default GoogleAnalytics;
