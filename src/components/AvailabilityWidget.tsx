import { useEffect, useRef } from "react";

const SRC = "https://galbanzo-sys.ai.studio/widget.js";
// Override only the provider's layout; availability, times and booking links stay provider-owned.
const COMPACT_STYLES = `
  html, body { margin: 0; width: 100%; }
  *, *::before, *::after { box-sizing: border-box; }
  .rv-widget-root { padding: 10px !important; border-radius: 8px !important; box-shadow: none !important; }
  .rv-widget-root > div:first-child { gap: 6px !important; margin-bottom: 10px !important; padding-bottom: 8px !important; }
  .rv-widget-root h3 { font-size: 13px !important; overflow-wrap: anywhere; }
  .rv-widget-root > div:nth-child(2) { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 6px !important; margin-bottom: 10px !important; }
  .rv-widget-root > div:nth-child(2) > div { min-width: 0; padding: 6px !important; border-radius: 8px !important; }
  .rv-widget-root > div:nth-child(2) > div > div:first-child { flex-wrap: wrap; justify-content: center !important; gap: 3px; margin-bottom: 6px !important; text-align: center; }
  .rv-widget-root > div:nth-child(2) > div > div:first-child > div { font-size: 12px !important; }
  .rv-widget-root > div:nth-child(2) > div > div:nth-child(2) { gap: 4px !important; margin-bottom: 6px !important; }
  .rv-widget-root > div:nth-child(2) > div > div:nth-child(2) > div { flex-direction: column; justify-content: center !important; gap: 3px; padding: 5px 2px !important; text-align: center; }
  .rv-widget-root > div:nth-child(2) > div > div:nth-child(2) > div > div { line-height: 1.4; }
  .rv-widget-root > div:nth-child(2) > div > :last-child { padding: 6px 3px !important; line-height: 1.5; overflow-wrap: anywhere; }
  .rv-widget-root > div:last-child { gap: 6px !important; padding-top: 8px !important; line-height: 1.5; }
  @media (max-width: 300px) {
    .rv-widget-root { padding: 6px !important; }
    .rv-widget-root > div:nth-child(2) { gap: 4px !important; }
    .rv-widget-root > div:nth-child(2) > div { padding: 4px !important; }
  }
`;
// 外部ウィジェットは固定IDの要素を1つだけ探すため、ページ内で複数表示できるよう1つずつ枠（iframe）に分けて読み込む。
const DOC = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${COMPACT_STYLES}</style></head><body><div id="outdoor-booking-widget" data-group="1.5km"></div><script src="${SRC}" async></script></body></html>`;

export function AvailabilityWidget() {
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let observer: ResizeObserver | undefined;
    const fit = () => {
      const h = frame.contentDocument?.body.getBoundingClientRect().height;
      if (h) frame.style.height = `${Math.ceil(h)}px`;
    };
    const watch = () => {
      observer?.disconnect();
      const body = frame.contentDocument?.body;
      if (!body) return;
      observer = new ResizeObserver(fit);
      observer.observe(body);
      fit();
    };
    frame.addEventListener("load", watch);
    watch();
    return () => {
      frame.removeEventListener("load", watch);
      observer?.disconnect();
    };
  }, []);
  return <iframe ref={ref} title="空き状況（3日間）" srcDoc={DOC} className="block h-64 w-full border-0" />;
}
