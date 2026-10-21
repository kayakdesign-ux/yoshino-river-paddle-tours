import { useEffect, useState } from "react";
import { Sun, Cloud, CloudRain, CloudSun, CloudSnow, CloudLightning, CloudFog, Navigation, X } from "lucide-react";
import accessMap from "@/assets/access_map.png.asset.json";

const LAT = 33.7647;
const LNG = 133.6639;
const DEST = "高知県長岡郡大豊町西土居1番地";

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

export function WeatherAccess() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(false);

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

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(DEST)}&z=13&output=embed`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(DEST)}&travelmode=driving`;

  return (
    <div className="mt-3 space-y-3 text-sm">
      <div>
        <p className="font-bold">天気（大豊町・3日間）</p>
        <p className="text-xs text-muted-foreground">天気予報</p>
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
        <b>場所</b>　高知県　大豊ICから約15分{" "}
        <button onClick={() => setOpen(true)} className="ml-1 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
          <Navigation className="h-3 w-3" />aboutTime
        </button>
      </p>
      <img src={accessMap.url} alt="四国のイラスト地図（大豊IC・ガルバンゾの場所）" className="w-full rounded-xl border" loading="lazy" />
      <p><b>出発時間</b>　9時30分　13時30分</p>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg rounded-2xl bg-card p-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <p className="font-bold">{DEST}</p>
              <button onClick={() => setOpen(false)} aria-label="閉じる"><X className="h-5 w-5" /></button>
            </div>
            <iframe title="地図" src={mapSrc} className="h-72 w-full rounded-xl border" loading="lazy" />
            <p className="mt-2 text-xs text-muted-foreground">目安：大豊ICから約15分／高松空港から約90分</p>
            <a href={dirUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-bold text-primary-foreground">
              <Navigation className="h-4 w-4" />現在地からのルートと所要時間を見る
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
