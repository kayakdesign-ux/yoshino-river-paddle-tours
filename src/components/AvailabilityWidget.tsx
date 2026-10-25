import { useEffect, useRef } from "react";

const SRC = "https://galbanzo-sys.ai.studio/widget.js";

export function AvailabilityWidget() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = "";
    const box = document.createElement("div");
    box.id = "outdoor-booking-widget";
    box.setAttribute("data-group", "1.5km");
    host.appendChild(box);
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    host.appendChild(s);
    return () => {
      host.innerHTML = "";
    };
  }, []);
  return <div ref={ref} className="w-full text-left" />;
}
