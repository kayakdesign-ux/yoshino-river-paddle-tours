import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, MapPin, Clock, ShieldCheck, Waves, Camera, Car, Droplets, Check, ChevronDown } from "lucide-react";
import hero from "@/assets/hero.jpg";
import jump from "@/assets/jump.jpg";

// TODO: 実際の公式LINE URLに差し替え
const LINE_URL = "https://lin.ee/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "高知・吉野川 リバーサップ体験ツアー｜ガルバンゾ" },
      { name: "description", content: "清流ランキング1位の吉野川でリバーサップ。初心者・ファミリーOK、レッスン付きで1人5,000円。公式LINEで空き確認・直前予約。" },
      { property: "og:title", content: "高知・吉野川 リバーサップ体験ツアー｜ガルバンゾ" },
      { property: "og:description", content: "エメラルドグリーンの吉野川をSUPで川下り。1人5,000円、8歳頃から参加OK。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function LineButton({ label = "LINEで空き状況を確認", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-line px-6 py-4 font-bold text-primary-foreground shadow-lg transition hover:brightness-105 active:scale-[0.98] ${className}`}>
      <MessageCircle className="h-5 w-5" />{label}
    </a>
  );
}

function H2({ en, children }: { en: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 text-center">
      <p className="text-xs font-bold tracking-[0.3em] text-primary">{en}</p>
      <h2 className="mt-2 font-display text-2xl font-black md:text-3xl">{children}</h2>
    </div>
  );
}

const points = [
  { icon: Droplets, t: "清流ランキング1位", d: "エメラルドグリーンの吉野川。塩水じゃないからサラサラ、ベタつきません。" },
  { icon: MapPin, t: "ベースが川の真横", d: "施設から川まで移動が少なく、着替えたらすぐ水辺へ。" },
  { icon: Car, t: "アクセス良好", d: "大豊ICから車で約15分、高松空港から約90分。" },
  { icon: ShieldCheck, t: "27年間無事故", d: "JRCA公認インストラクターが案内。各種保険にも加入しています。" },
];

const flow = [
  ["集合・準備運動・レッスン", "10〜20分。パドルの持ち方から丁寧に。"],
  ["浮く練習・レスキュー練習", "ライフジャケットで浮く感覚を体験。泳げなくても安心。"],
  ["出発・川下り", "ミニ！ツーリング 1.5km をのんびり。"],
  ["飛び込み・自由時間", "約40分。岩からジャンプ、2人乗りなど思い思いに。"],
  ["ゴール・写真確認", "スタッフ撮影の写真データは購入できます。"],
];

const faqs = [
  ["泳げなくても大丈夫？", "ライフジャケットを着用し、浮く練習もするので安心してご参加いただけます。"],
  ["立てるか不安です", "難しそうな方はパックラフト（ゴムボート）への変更も可能です。"],
  ["スマホは持っていける？", "持ち込み可能です。落下防止の方法を当日ご案内します。"],
  ["更衣室はありますか？", "更衣室・鍵付きロッカーを完備しています。"],
  ["キャンセル料は？", "前日20時までのキャンセルは無料です。"],
];

function Index() {
  return (
    <main className="pb-24">
      {/* Hero */}
      <section className="relative min-h-[92svh] overflow-hidden">
        <img src={hero} alt="吉野川をSUPで下る参加者たち" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-river/50 via-transparent to-river/90" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-3xl flex-col justify-end px-5 pb-12 text-primary-foreground">
          <p className="text-sm font-bold tracking-widest">GALBANZO ｜ 高知・大豊町</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
            エメラルドの清流を、<br />SUPで下ろう。
          </h1>
          <p className="mt-4 text-base opacity-95">高知・吉野川 リバーサップ体験ツアー。初心者・ファミリー大歓迎、8歳頃から参加OK。</p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {["1人 5,000円", "レッスン付き", "前日20時までキャンセル無料"].map((x) => (
              <span key={x} className="rounded-full bg-background/20 px-3 py-1 backdrop-blur">{x}</span>
            ))}
          </div>
          <LineButton className="mt-7 w-full md:w-auto" />
        </div>
      </section>

      {/* Points */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <H2 en="WHY GALBANZO">吉野川SUPが選ばれる理由</H2>
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map(({ icon: I, t, d }) => (
            <div key={t} className="flex gap-4 rounded-2xl bg-card p-5 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><I className="h-6 w-6" /></div>
              <div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Plan */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-3xl px-5">
          <H2 en="COURSE & PRICE">コース・料金</H2>
          <div className="overflow-hidden rounded-3xl bg-card shadow-md">
            <div className="bg-primary px-6 py-4 text-primary-foreground">
              <p className="text-sm opacity-90">初心者・ファミリー向け</p>
              <h3 className="font-display text-2xl font-black">ミニ！ツーリング 1.5km</h3>
            </div>
            <div className="space-y-5 p-6">
              <div>
                <span className="rounded bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">Web特別・直前価格</span>
                <p className="mt-2 font-display text-4xl font-black">5,000<span className="text-lg">円 / 1人</span></p>
                <p className="text-sm text-muted-foreground">前日20時までキャンセル無料</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[["午前便", "9:45 発"], ["午後便", "13:30 発"]].map(([a, b]) => (
                  <div key={a} className="rounded-xl border p-4 text-center">
                    <Clock className="mx-auto h-5 w-5 text-primary" />
                    <p className="mt-1 text-sm text-muted-foreground">{a}</p>
                    <p className="text-xl font-bold">{b}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">※集合は各出発時間の前です。対象年齢：8歳頃から</p>
              <LineButton label="LINEで予約する" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Fun */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <H2 en="HOW TO ENJOY">川遊びの楽しみ方</H2>
        <img src={jump} alt="岩から川へ飛び込む家族" width={1024} height={768} loading="lazy" className="mb-6 aspect-[4/3] w-full rounded-3xl object-cover md:aspect-[16/7]" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[[Waves, "のんびり川下り"], [Droplets, "岩から飛び込み"], [Check, "2人乗りもOK"], [Camera, "スタッフが写真撮影"]].map(([I, t]: any) => (
            <div key={t} className="rounded-2xl bg-card p-4 text-center shadow-sm">
              <I className="mx-auto h-6 w-6 text-primary" /><p className="mt-2 text-sm font-bold">{t}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">スマホの持ち込みもOK（落下防止をご案内）。立つのが難しそうな方はパックラフトへの変更も可能です。</p>
      </section>

      {/* Flow */}
      <section className="bg-river py-16 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-5">
          <div className="mb-8 text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-accent">TOUR FLOW</p>
            <h2 className="mt-2 font-display text-2xl font-black md:text-3xl">ツアーの流れ</h2>
          </div>
          <ol className="relative space-y-6 border-l-2 border-primary-foreground/30 pl-8">
            {flow.map(([t, d], i) => (
              <li key={t} className="relative">
                <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">{i + 1}</span>
                <h3 className="font-bold">{t}</h3><p className="text-sm opacity-80">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Items */}
      <section className="mx-auto max-w-5xl px-5 py-16">
        <H2 en="WHAT TO BRING">持ち物・レンタル</H2>
        <div className="grid gap-4 md:grid-cols-3">
          <Box title="無料レンタル" tag="0円" items={["ヘルメット", "ライフジャケット", "パドル", "リーシュコード 等"]} />
          <Box title="有料レンタル" tag="オプション" items={["ウェットスーツ 500円（夏期は熱中症防止のため非推奨）", "レンタルシューズ 300円"]} />
          <Box title="ご用意いただくもの" tag="持参" items={["水着 / 濡れてもいい下着", "濡れてもいい靴", "化繊Tシャツ / ラッシュガード", "日焼け止め", "飲み物 等"]} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-3xl px-5">
          <H2 en="FAQ">当日の注意事項・よくある質問</H2>
          <div className="space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-2xl bg-card p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between font-bold">
                  Q. {q}<ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Reserve */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <H2 en="RESERVATION">ご予約・お支払い</H2>
        <p className="text-muted-foreground">空き状況の確認・直前のご予約は公式LINEから。お気軽にメッセージください。</p>
        <LineButton label="公式LINEで予約・空き確認" className="mt-6 w-full" />
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["PayPay", "楽天Pay", "現金"].map((p) => <span key={p} className="rounded-full border px-4 py-1.5 text-sm font-bold">{p}</span>)}
        </div>
        <div className="mt-10 rounded-2xl bg-card p-6 text-left shadow-sm">
          <p className="font-display text-lg font-black">ガルバンゾ（Galbanzo）ベース</p>
          <p className="mt-2 flex gap-2 text-sm"><MapPin className="h-4 w-4 shrink-0 text-primary" />高知県長岡郡大豊町西土居1番地</p>
          <p className="mt-1 flex gap-2 text-sm"><Car className="h-4 w-4 shrink-0 text-primary" />大豊ICから約15分 / 高松空港から約90分</p>
          <a className="mt-4 inline-block text-sm font-bold text-primary underline" target="_blank" rel="noopener noreferrer"
            href="https://www.google.com/maps/search/?api=1&query=高知県長岡郡大豊町西土居1">Googleマップで見る</a>
        </div>
      </section>

      <footer className="bg-river py-8 text-center text-xs text-primary-foreground/70">© Galbanzo / 川遊び</footer>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 p-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="shrink-0 leading-tight"><p className="text-[10px] text-muted-foreground">1人</p><p className="font-black">5,000円</p></div>
          <LineButton label="LINEで予約" className="flex-1 py-3" />
        </div>
      </div>
    </main>
  );
}

function Box({ title, tag, items }: { title: string; tag: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between"><h3 className="font-bold">{title}</h3><span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-primary">{tag}</span></div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{i}</li>)}
      </ul>
    </div>
  );
}
