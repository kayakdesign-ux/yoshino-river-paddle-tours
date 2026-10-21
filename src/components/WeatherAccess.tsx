import { useEffect, useState } from "react";
import { Sun, Cloud, CloudRain, CloudSun, CloudSnow, CloudLightning, CloudFog, Navigation, X } from "lucide-react";

const LAT = 33.7647;
const LNG = 133.6639;
export const DEST = "高知県長岡郡大豊町西土居1番地";
export const DEST_DIR_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(DEST)}&travelmode=driving`;

type Day = { date: string; code: number; max: number; min: number; rain: number };

function info(code: number) {
  if (code === 0) return { Icon: Sun, label: "晴れ", cls: "text-amber-500" };
  if (code <= 2) return { Icon: CloudSun, label: "晴れ時々曇り", cls: "text-amber-500" };
  if (code === 3) return { Icon: Cloud, label: "曇り", cls: "text-muted-foreground" };
  if (code <= 48) return { Icon: CloudFog, label: "霧", cls: "text-muted-foreground" };
  if (code <= 67 || (code >= 80 && code <= 82)) return { Icon: CloudRain, label: "雨", cls: "text-primary" };
  if (code <= 86) return { Icon: CloudSnow, label: "雪", cls: "text-primary" };
  return { Icon: CloudLightning, label: "雷雨", cls: "text-primary" };
}

const LABELS = ["今日", "明日", "明後日"];

function MapPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(DEST)}&z=13&output=embed`;
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-card p-4" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between">
          <p className="font-bold">{DEST}</p>
          <button onClick={onClose} aria-label="閉じる"><X className="h-5 w-5" /></button>
        </div>
        <iframe title="地図" src={mapSrc} className="h-72 w-full rounded-xl border" loading="lazy" />
        <p className="mt-2 text-xs text-muted-foreground">目安：おおとよICから約15分／高松空港から約90分</p>
        <a href={DEST_DIR_URL} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-primary-foreground">
          <Navigation className="h-4 w-4" />現在地からのルートと所要時間を見る
        </a>
      </div>
    </div>
  );
}

export function MapAccessButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="ml-1 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground"
      >
        <Navigation className="h-3 w-3" />
        aboutTime
      </button>
      <MapPopup open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function WeatherAccess() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [err, setErr] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=3`,
    )
      .then((r) => r.json())
      .then((j) =>
        setDays(
          j.daily.time.map((d: string, i: number) => ({
            date: d,
            code: j.daily.weather_code[i],
            max: Math.round(j.daily.temperature_2m_max[i]),
            min: Math.round(j.daily.temperature_2m_min[i]),
            rain: j.daily.precipitation_probability_max[i] ?? 0,
          })),
        ),
      )
      .catch(() => setErr(true));
  }, []);

  return (
    <div className="mt-3 space-y-3 text-sm">
      <div>
        <p className="font-bold">{"\n"}</p>
        <p className="text-xs text-muted-foreground">{"\n"}</p>
        {err ? (
          <p className="text-muted-foreground">天気を取得できませんでした。</p>
        ) : !days ? (
          <p className="text-muted-foreground">読み込み中…</p>
        ) : (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {days.map((d, i) => {
              const { Icon, label, cls } = info(d.code);
              return (
                <div key={d.date} className="rounded-xl bg-muted p-2 text-center">
                  <p className="text-xs font-bold">{LABELS[i]} {d.date.slice(5).replace("-", "/")}</p>
                  <Icon className={`mx-auto my-1 h-8 w-8 ${cls}`} />
                  <p className="text-xs font-bold">{label}</p>
                  <p className="text-xs"><span className="text-destructive">{d.max}°</span> / <span className="text-primary">{d.min}°</span></p>
                  <p className="text-xs text-muted-foreground">降水 {d.rain}%</p>
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-2 rounded-xl bg-accent px-3 py-2 font-bold text-accent-foreground">
          <span className="mr-2 rounded-full bg-background px-2 py-0.5 text-xs text-accent">ワンポイント</span>
          雨の日特典あります。濡れるから楽しいよ
        </p>
      </div>
      <p>
        <b>場所を確認</b>　高知県　おおとよICから約15分{"\n"}
        <MapAccessButton />
      </p>
      <div className="mt-2 rounded-2xl bg-muted p-3">
        <div className="relative">
          <img
            src="/shikoku-map.png"
            alt="四国の地図（高知県おおとよICの場所）"
            loading="lazy"
            className="block h-auto w-full object-contain"
          />
          <button
            type="button"
            onClick={() => setMapOpen(true)}
            aria-label="おおとよICの地図と現在地からのルートを開く"
            title="おおとよICの地図と現在地からのルートを開く"
            className="absolute cursor-pointer rounded-xl outline-none transition hover:ring-2 hover:ring-primary/70 focus-visible:ring-2 focus-visible:ring-primary"
            style={{ left: "55.1%", top: "21.9%", width: "26.7%", height: "18.5%" }}
          />
        </div>
      </div>
      <MapPopup open={mapOpen} onClose={() => setMapOpen(false)} />
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <caption className="bg-muted px-3 py-2 text-left font-bold">アクセス所要時間（目安）</caption>
          <tbody>
            {[
              ["高知市内｜ひろめ市場 🚗", "約50分〜60分"],
              ["高知駅〜大杉駅 🚃", "特急 約35分／普通 約70分"],
              ["高知空港から 🚗", "約50分"],
              ["高松・徳島・松山空港 🚗", "約80〜110分"],
            ].map(([from, time]) => (
              <tr key={from} className="border-t border-border">
                <th className="px-3 py-2 text-left font-bold">{from}</th>
                <td className="px-3 py-2 text-right">{time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-3 pb-2 text-xs text-muted-foreground">※高速道路利用時の目安。道路状況・列車により変わります。</p>
      </div>
      <p><b>出発時間</b>　9時30分　13時30分</p>
      <p className="rounded-xl bg-accent px-3 py-2 font-bold text-accent-foreground">
        <span className="mr-2 rounded-full bg-background px-2 py-0.5 text-xs text-accent">ワンポイント</span>
        出発時間までに着替えて集合です。
      </p>
    </div>
  );
}
