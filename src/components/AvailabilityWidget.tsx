import { useEffect, useRef } from "react";

const SRC = "https://galbanzo-sys.ai.studio/widget.js";
// 外部ウィジェットは固定IDの要素を1つだけ探すため、ページ内で複数表示できるよう1つずつ枠（iframe）に分けて読み込む。
const DOC = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}</style></head><body><div id="outdoor-booking-widget" data-group="1.5km"></div><script src="${SRC}" async></script></body></html>`;

export function AvailabilityWidget() {
  const ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const fit = () => {
      const h = frame.contentDocument?.documentElement.scrollHeight;
      if (h) frame.style.height = `${h}px`;
    };
    const timer = window.setInterval(fit, 500);
    return () => window.clearInterval(timer);
  }, []);
  return <iframe ref={ref} title="空き状況（3日間）" srcDoc={DOC} className="block h-64 w-full border-0" />;
}
