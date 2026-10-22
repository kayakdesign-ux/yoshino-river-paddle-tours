import { useEffect, useState } from "react";

const LINE_ID = "@418xyaym";

type Counts = Record<string, number>;
const groups: {
  title: string;
  note?: string;
  set?: boolean;
  fields: { key: string; label: string }[];
}[] = [
  { title: "SUP 1人乗り", fields: [{ key: "s1a", label: "大人" }, { key: "s1k", label: "9歳〜16歳" }] },
  {
    title: "SUP 2人乗り（大人1名＋未就学1名がセット）",
    note: "\n",
    set: true,
    fields: [{ key: "s2a", label: "大人" }, { key: "s2p", label: "未就学" }],
  },
  {
    title: "パックラフト（水に落ちるのが苦手な人はこちら）",
    note: "\n",
    fields: [{ key: "pa", label: "大人" }, { key: "pk", label: "9歳〜16歳" }],
  },
];

const SLOTS = ["午前 9:30出発", "午後 13:30出発"];
const WD = ["日", "月", "火", "水", "木", "金", "土"];

// 当日表示は当日12時（日本時間）まで。12時を過ぎたら当日を消し、翌日から3日分を表示する。
function jstNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const num = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { y: num("year"), m: num("month"), d: num("day"), h: num("hour") % 24 };
}

function buildDays() {
  const { y, m, d, h } = jstNow();
  const start = h >= 12 ? 1 : 0;
  const length = h >= 12 ? 3 : 4;
  return Array.from({ length }, (_, i) => {
    const t = new Date(Date.UTC(y, m - 1, d + start + i));
    return {
      label: `${t.getUTCMonth() + 1}/${t.getUTCDate()}(${WD[t.getUTCDay()]})`,
      todayOnlyAfternoon: start === 0 && i === 0,
    };
  });
}

export function EntryForm() {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [days, setDays] = useState<{ label: string; todayOnlyAfternoon: boolean }[]>([]);
  useEffect(() => {
    setDays(buildDays());
  }, []);
  const [c, setC] = useState<Counts>({});
  const [weight80, setWeight80] = useState(0);
  const [copied, setCopied] = useState(false);
  const total = Object.values(c).reduce((a, b) => a + b, 0);

  const pairAdult = c["s2a"] ?? 0;
  const pairChild = c["s2p"] ?? 0;
  const pairError =
    pairAdult === 0 && pairChild === 0
      ? ""
      : pairAdult === 0 || pairChild === 0
        ? "SUP 2人乗りは大人1名＋未就学1名がセットです。両方をお選びください。"
        : pairAdult !== pairChild
          ? "SUP 2人乗りは大人1名＋未就学1名がセットです。大人と未就学を同じ人数にしてください。"
          : "";

  const text = [
    "【空き状況の確認・申込】",
    `希望日：${date || "未定"}`,
    `便：${slot || "未定"}`,
    ...groups.map((g) => `${g.title}：${g.fields.map((f) => `${f.label}${c[f.key] ?? 0}人`).join("／")}`),
    `体重80kg：${weight80}人`,
    `合計：${total}人`,
  ].join("\n");

  const send = async () => {
    if (pairError) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
    window.open(
      `https://line.me/R/oaMessage/${encodeURIComponent(LINE_ID)}/?${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div id="entry-form" tabIndex={-1} className="scroll-mt-24 space-y-4 rounded-2xl border bg-background p-4">
      <p className="font-bold">申込フォーム（空き状況を聞くだけでもOK！）</p>
      <div className="text-sm">
        希望日
        <div className={`mt-1 grid gap-2 ${days.length === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
          {days.map((d) => (
            <div key={d.label} className="space-y-1 rounded-lg border bg-card p-2 text-center">
              <p className="font-bold">{d.label}</p>
              {SLOTS.map((s) => {
                const disabled = d.todayOnlyAfternoon && s.startsWith("午前");
                if (disabled) return <div key={s} className="h-[34px]" />;
                const on = date === d.label && slot === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setDate(d.label);
                      setSlot(s);
                    }}
                    className={`block w-full rounded-md border px-1 py-1.5 text-xs font-bold ${on ? "bg-primary text-primary-foreground" : "bg-background"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {groups.map((g) => (
        <div key={g.title}>
          {g.note && (
            <p className={`text-xs ${g.set ? "font-bold text-primary" : "text-muted-foreground"}`}>{g.note}</p>
          )}
          <p className="text-sm font-bold">{g.title}</p>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {g.fields.map((f) => (
              <label
                key={f.key}
                className="flex items-center justify-between gap-2 rounded-lg border bg-card p-2 text-sm"
              >
                {f.label}
                <select
                  aria-label={`${g.title} ${f.label}`}
                  value={c[f.key] ?? 0}
                  onChange={(e) => setC({ ...c, [f.key]: Number(e.target.value) })}
                  className="rounded border bg-background p-1"
                >
                  {Array.from({ length: 11 }, (_, n) => (
                    <option key={n} value={n}>
                      {n}人
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      ))}
      <label className="flex items-center justify-between gap-2 rounded-lg border bg-card p-2 text-sm font-bold">
        体重80kg以上の方は何人いますか？
        <select
          aria-label="体重80kg以上の方は何人いますか？"
          value={weight80}
          onChange={(e) => setWeight80(Number(e.target.value))}
          className="rounded border bg-background p-1 font-normal"
        >
          {Array.from({ length: 11 }, (_, n) => (
            <option key={n} value={n}>
              {n}人
            </option>
          ))}
        </select>
      </label>
      <pre className="whitespace-pre-wrap rounded-xl bg-muted p-3 font-sans text-sm">{text}</pre>
      {pairError && (
        <p role="alert" className="text-sm font-bold text-destructive">
          {pairError}
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={send}
          disabled={!!pairError}
          className={`flex-1 rounded-full p-3 font-bold ${
            pairError ? "cursor-not-allowed bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
          }`}
        >
          公式LINEで送信
        </button>
        <button type="button" onClick={copy} className="flex-1 rounded-full border p-3 font-bold">
          {copied ? "コピーしました" : "内容をコピー"}
        </button>
      </div>
    </div>
  );
}
