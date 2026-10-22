import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bookingSchema } from "@/lib/booking-schema";
import { submitBooking } from "@/lib/bookings.functions";

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
      value: t.toISOString().slice(0, 10),
      label: `${t.getUTCMonth() + 1}/${t.getUTCDate()}(${WD[t.getUTCDay()]})`,
      todayOnlyAfternoon: start === 0 && i === 0,
    };
  });
}

export function EntryForm() {
  const saveBooking = useServerFn(submitBooking);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const submission = useRef<{ payload: string; id: string } | null>(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [days, setDays] = useState<{ value: string; label: string; todayOnlyAfternoon: boolean }[]>([]);
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
    `お名前：${name || "未入力"}`,
    `連絡先：${contact || "未入力"}`,
    `希望日：${days.find((d) => d.value === date)?.label || "未定"}`,
    `便：${slot || "未定"}`,
    ...groups.map((g) => `${g.title}：${g.fields.map((f) => `${f.label}${c[f.key] ?? 0}人`).join("／")}`),
    `体重80kg：${weight80}人`,
    `合計：${total}人`,
  ].join("\n");

  const send = async () => {
    if (pairError || busy) return;
    setError("");
    setStatus("");
    const payload = { name, contact, preferredDate: date, departure: slot.startsWith("午前") ? "09:30" : "13:30",
      participants: { s1a: c["s1a"] ?? 0, s1k: c["s1k"] ?? 0, s2a: c["s2a"] ?? 0, s2p: c["s2p"] ?? 0, pa: c["pa"] ?? 0, pk: c["pk"] ?? 0 }, weight80 };
    const signature = JSON.stringify(payload);
    if (submission.current?.payload !== signature) submission.current = { payload: signature, id: crypto.randomUUID() };
    const result = bookingSchema.safeParse({ ...payload, id: submission.current.id });
    if (!result.success) { setError(result.error.issues[0]?.message ?? "入力内容を確認してください。"); return; }
    setBusy(true);
    try {
      await saveBooking({ data: result.data });
      setStatus("送信内容を受け付けました。予約はまだ確定していません。続けて公式LINEでご確認ください。");
    } catch {
      setError("保存できませんでした。時間をおいて再度お試しください。");
      setBusy(false);
      return;
    }
    setBusy(false);
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
      <label className="block space-y-1 text-sm font-bold">
        お名前<Input autoComplete="name" value={name} maxLength={100} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="block space-y-1 text-sm font-bold">
        電話番号またはメールアドレス<Input autoComplete="email" value={contact} maxLength={255} onChange={(e) => setContact(e.target.value)} />
      </label>
      <div className="text-sm">
        希望日
        <div className={`mt-1 grid gap-2 ${days.length === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
          {days.map((d) => (
            <div key={d.label} className="space-y-1 rounded-lg border bg-card p-2 text-center">
              <p className="font-bold">{d.label}</p>
              {SLOTS.map((s) => {
                const disabled = d.todayOnlyAfternoon && s.startsWith("午前");
                if (disabled) return <div key={s} className="h-[34px]" />;
                const on = date === d.value && slot === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setDate(d.value);
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
      {error && <p role="alert" className="text-sm font-bold text-destructive">{error}</p>}
      {status && <p role="status" className="text-sm text-primary">{status}</p>}
      {status && <a className="block font-bold text-primary underline" href={`https://line.me/R/oaMessage/${encodeURIComponent(LINE_ID)}/?${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">公式LINEを開く</a>}
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          onClick={send}
          disabled={!!pairError || busy}
          className={`flex-1 rounded-full p-3 font-bold ${
            pairError ? "cursor-not-allowed bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
          }`}
        >
          {busy ? "保存しています…" : "公式LINEで送信"}
        </Button>
        <Button variant="outline" type="button" onClick={copy} className="flex-1 rounded-full border p-3 font-bold">
          {copied ? "コピーしました" : "内容をコピー"}
        </Button>
      </div>
    </div>
  );
}
