import { Fragment, useId, useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EntryForm } from "@/components/EntryForm";
import { Reveal } from "@/components/Reveal";
import { MessageCircle, MapPin, Check, Lock, ShowerHead, ChevronDown, Fish, Droplets, Flame, ArrowDown, Ship, Camera, Baby, Smartphone, Smile, Store } from "lucide-react";

import { WeatherAccess, MapAccessButton, DEST_DIR_URL } from "@/components/WeatherAccess";

const afterFlow: { t: string; b: string[] }[] = [
  { t: "忘れ物ありませんか？", b: ["夏期は、化繊のTシャツやラッシュガード、サーフトランクスで参加いただけます。", "飲み物は川に沈まない物なら持込ます。", "携帯は防水ケースに入れて沈まないようにしてください。\n携帯ケースのヒモが切れて水中に沈んだ例がございます。水深が深いと回収できません。防水ケース、浮力付きを強くオススメ致します。"] },
  { t: "移動開始", b: ["おおとよICを降ると「ファミリーマート」道の駅「大杉」有", "施設近くに「こんどうストア」あります。（飲み物、田舎寿司、イートインあります。）", "徳島方面から集合25分手前に道の駅「大歩危」「ローソン」有"] },
  { t: "駐車場は６０分前から駐車可能 GoodleMapaboutTime", b: ["長時間駐車は河川敷駐車場へお願いします。"] },
  { t: "更衣室・トイレは30分前から利用可能", b: ["鍵付きロッカー有ります。", "貴重品は、鍵付きロッカーへ必ずお願いします。"] },
  { t: "保険の申込をQRコードからお願いします。（お名前、誕生日、連絡先）", b: ["傷害保険の１人１通、記入しないと利用できません"] },
  { t: "希望レンタル料はQR決済（PayPay,楽天Pay）でお支払いください。", b: ["リバーシューズは少し大きめをご自身で選んでください。", "精算は参加料金、レンタル料金の清算です。"] },
  { t: "出発時間までに着替えしてお待ちください。ツアースタート", b: ["時間になりましたら、送迎車両出発or安全説明開始となります。"] },
  { t: "レッスン後・自由行動あり", b: ["用具説明→基本練習20分程度→自由行動→岩からジャンプ（複数回、希望者のみ）"] },
  { t: "ゴール　11時15分頃／15時15分頃", b: ["脱水機、無料シャワーあります。"] },
  { t: "自由解散", b: ["忘れ物無いようご注意ください。"] },
];


const LINE_URL = "https://page.line.me/418xyaym?openQrModal=true";
const W = "https://kawaasobi.com/wp/wp-content/uploads";
const K = "https://kayaks.jp/wp/wp-content/uploads";
const HERO = `${W}/2024/10/GOPR3336-1024x896.jpg`;

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "アウトドア！ガルバンゾ（一般社団法人 自然体感ガルバンゾ）",
  description: "吉野川の初心者・ファミリー向けリバーSUP体験ツアー。ツアー出発 9:30／13:30。ウォーターアクティビティは5月〜11月。",
  image: HERO,
  url: "https://yoshino-river-paddle-tours.lovable.app/",
  sameAs: [
    "https://page.line.me/418xyaym?openQrModal=true",
    "https://natural.or.jp/",
    "https://kawaasobi.com/",
    "https://rafting.co.jp",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "JP",
    addressRegion: "高知県",
    addressLocality: "長岡郡大豊町",
    streetAddress: "西土居1番地",
  },
  priceRange: "¥5,000 - ¥14,000",
  paymentAccepted: "Stripe（カード決済）, QRコード決済（PayPay, 楽天ペイ）",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
};

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "高知・吉野川SUP体験｜初心者・家族連れ歓迎！手ぶらで川遊びツアー" },
      { name: "description", content: "【高知・吉野川SUP体験ツアー】初心者・家族連れ大歓迎！手ぶらでOKの川遊びアクティビティです。美しい吉野川の絶景をSUPでクルージング。ウェットスーツや道具は全てレンタル可能。専属ガイドが丁寧にレクチャーするので、初めての方や子供連れでも安心してお楽しみいただけます。今すぐ予約！" },
      { property: "og:title", content: "高知・吉野川SUP体験｜初心者・家族連れ歓迎！手ぶらで川遊びツアー" },
      { property: "og:description", content: "【高知・吉野川SUP体験ツアー】初心者・家族連れ大歓迎！手ぶらでOKの川遊びアクティビティです。美しい吉野川の絶景をSUPでクルージング。ウェットスーツや道具は全てレンタル可能。専属ガイドが丁寧にレクチャーするので、初めての方や子供連れでも安心してお楽しみいただけます。今すぐ予約！" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://yoshino-river-paddle-tours.lovable.app/" },
      { property: "og:image", content: HERO },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO },
    ],
    links: [{ rel: "canonical", href: "https://yoshino-river-paddle-tours.lovable.app/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(LOCAL_BUSINESS_JSONLD) }],
  }),
  component: Index,
});

// 予約ボタン押下後、申込フォームをヘッダー直下まで運んで、そのまま入力始められる位置に着地させる
function scrollToEntryForm(e: MouseEvent<HTMLAnchorElement>) {
  const form = document.getElementById("entry-form");
  if (!form) return; // フォームが見つからない場合はブラウザ標準のアンカー移動に任せる
  e.preventDefault();
  const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
  const top = form.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  form.focus({ preventScroll: true });
}

function LineButton({
  label = "公式LINEで予約・空き確認",
  className = "",
  href = LINE_URL,
  onPress,
}: {
  label?: string;
  className?: string;
  href?: string;
  onPress?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const external = !href.startsWith("#");
  return (
    <a href={href} onClick={onPress} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 min-h-14 rounded-full bg-cta px-8 py-4 text-lg font-black text-cta-foreground shadow-xl shadow-cta/30 transition hover:brightness-105 active:scale-[0.98] ${className}`}>
      <MessageCircle className="h-5 w-5" />{label}
    </a>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-10 text-center font-display text-3xl font-black leading-tight tracking-tight text-river md:text-4xl">{children}</h2>;
}

function PointNote({ main, sub, tone = "accent" }: { main: string; sub: string; tone?: "accent" | "sakura" }) {
  const bar = tone === "sakura" ? "bg-sakura text-sakura-foreground" : "bg-accent text-accent-foreground";
  const badge = tone === "sakura" ? "text-sakura-strong" : "text-accent";
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="mt-3 space-y-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 text-left font-bold ${bar}`}
      >
        <span className="flex items-center gap-2">
          <span className={`rounded-full bg-background px-2 py-0.5 text-xs ${badge}`}>ワンポイント</span>
          {main}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p id={id} className="rounded-xl border bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          <span className={`mr-2 inline-block rounded-full bg-background px-2 py-0.5 font-bold ${badge}`}>補足</span>
          {sub}
        </p>
      )}
    </div>
  );
}

function PhoneRulePill() {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className="flex w-full flex-col items-center gap-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-sakura px-5 py-3 text-center font-bold text-sakura-foreground shadow-sm ring-2 ring-sakura-strong/30"
      >
        <Smartphone className="h-5 w-5 shrink-0" />
        カメラ・スマートホン持込OK（ルール有）
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id={id} className="w-full max-w-xl rounded-xl border bg-muted/60 px-4 py-3 text-left text-sm leading-relaxed">
          <ul className="list-disc space-y-1 pl-5 font-bold text-foreground">
            <li>防水ケースに入れてください。浮くの推奨</li>
            <li>紐で落とさないようしてください。</li>
            <li>他のお客撮影、レッスン動画の撮影公開は禁止です。</li>
          </ul>
          <p className="mt-2 text-muted-foreground">例年、落とされるお客がおり、沈んで回収不能となるケースが多くあります。必ずバックアップもおとりください。ご不安な方は、ロッカーにお預けください。</p>
        </div>
      )}
    </li>
  );
}

function CourseCard() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-md">
      <img src={`${W}/2024/10/GOPR3336-1024x896.jpg`} alt="リバーサップ体験" className="aspect-[8/7] w-full object-cover" />
      <div className="space-y-2 p-5 text-center">
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">オススメ</span>
        <p className="text-xl font-bold">ミニ！ツーリング1.5km</p>
        <p className="text-sm text-muted-foreground">たくさんの人に体験して欲しい</p>
        <p className="font-display text-3xl font-bold text-primary">5000円〜<span className="text-base">/1人</span></p>
        <p className="text-sm">８歳ぐらいから ／ 9時30分・13時30分出発</p>
      </div>
    </div>
  );
}

const features: { img: string; t: string; d: string; hot?: boolean; i?: typeof MapPin }[] = [
  { img: `${W}/2024/10/DJI_0678__s-1024x683.jpg`, t: "塩水じゃないからサラサラ", d: "のんびり遊べます" },
  { img: `${W}/2024/07/GOPR1471_s.jpg`, t: "飛び込みも複数回OK", d: "体験飛び込み", hot: true },
  { img: `${W}/2024/07/P9201623_s.jpg`, t: "泳げ無くてもライフジャケット着用", d: "夏は浮かんでいるだけも楽しい" },
  { img: `${W}/2019/08/P6029311-1.jpg`, t: "2人乗りも可", d: "ゆったりとした流れの中なので色々ためせます" },
  { img: `${W}/2024/07/GOPR1582_s.jpg`, t: "20分程度のレッスン付", d: "初めてでも乗り方、パドル持ち方から習えます。" },
  { img: `${W}/2024/07/P1012125_s-1024x768.jpg`, t: "魚ウオッチングも楽しめる", d: "自由時間もあるのでのんびりくつろぐことも", i: Fish },
];

const accessPills: { t: string; i?: typeof MapPin; leaf?: boolean }[] = [
  { t: "アクセス抜群　IC約15分", i: MapPin },
  { t: "ひろめ市場まで約50分", i: Store },
  { t: "大歩危温泉も近い", i: Flame },
  { t: "水が綺麗", i: Droplets, leaf: true },
];

const highlights: { t: string; i?: typeof MapPin; hot?: boolean; soft?: boolean; leaf?: boolean; em?: string }[] = [
  { t: "初めてでも楽しめる｜家族でも楽しめる", i: Baby, soft: true },
  { t: "レンタルで気軽できる｜SUP以外もできる", i: Check, soft: true },
  { t: "川用サップ(SUP)は幅が広く ", i: Ship, em: "安定感抜群", soft: true },
  { t: "岩からジャンプは何回もできる", i: ArrowDown, hot: true },
];

const flow = [
  { img: `${W}/2025/05/P8013228-1024x768.jpg`, d: "準備運動、漕ぎ方の練習。JRCA公認インストラクターがレッスン 20分程度" },
  { img: `${K}/2024/07/GOPR2636_1500-1024x896.jpg`, d: "浮く練習・クールダウン・レスキュー練習と熱中症対策。記念写真もお撮りします。" },
  { img: `${W}/2025/05/GOPR4249-1024x768.jpg`, d: "出発！のんびりする、練習する、癒される！ミニレッスンを受ける事も可能" },
  { img: `${W}/2023/07/202307131342-1.jpg`, d: "希望者は岩から飛び込みもあり。約40分間 自由時間あるので自分のペースで遊ぶ。" },
  { img: `${W}/2025/05/GOPR4324-1024x896.jpg`, d: "無事ゴール。笑顔が楽しさの証です。スタッフが撮った写真は購入も可能です。" },
];

const steps = [
  { t: "お天気を確認（大豊町・3日間）（ワクワク）", b: ["\n"] },
  { t: "空き状況を聞くだけでもOK！（公式ライン）お問合せ後、友達削除、ミュートOKです。", b: [], line: true },
  {
    t: "弊社からの返信を持って「予約」とさせていただきます。",
    b: [],
    pay: true,
    point: {
      main: "無断キャンセルはご遠慮ください。必ずご連絡ください。",
      sub: "スタッフが用具運搬して準備します。急なキャンセルは必ずご連絡ください、悪質な場合は営業損害金も含めて請求します。",
    },
    note: {
      lead: "返信にて、参加できる時間をご返信→お名前、80kgが何人をお知らせください。",
      items: [
        { text: "空席が取れない場合はごめんなさい。", bold: true },
        { text: "お支払いは、QR決済でお願いしてます。（PayPay,楽天Pay）" },
        { text: "少し先のご予約は、本社サイトからお申し込みとなります。" },
      ],
      tail: "\n",
    },
  },
];

function Index() {
  return (
    <div id="toppage" className="min-h-screen bg-background pb-24 text-foreground md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <a href="https://kawaasobi.com/" className="font-display text-sm font-bold text-primary md:text-base">高知 SUP（サップ）吉野川｜一般社団法人自然体感 ガルバンゾ</a>
          <a href="#entry" className="shrink-0 rounded-full bg-destructive px-4 py-2 text-xs font-black text-destructive-foreground shadow md:px-5 md:text-sm">高知・吉野川SUP予約</a>
        </div>
      </header>

      {/* Hero banner */}
      <section className="relative w-full overflow-hidden">
        <img src="/dji-hero.jpg" alt="夏の吉野川の清流とSUP" className="h-[88svh] max-h-[760px] min-h-[520px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-river/90 via-river/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-5 pb-12 text-center text-primary-foreground">
          <p className="mx-auto mb-4 w-fit rounded-full bg-cta px-5 py-2 text-sm font-black text-cta-foreground shadow-lg md:text-base">7/10 〜 9/30 毎日開催！</p>
          <h1 className="font-display text-3xl font-black leading-tight drop-shadow-lg md:text-5xl">【高知・吉野川】絶景リバーSUP体験！<br />初心者・家族連れで川遊び</h1>
          <p className="mt-4 text-sm opacity-90 md:text-base">手ぶらでOK！ウェットスーツや道具は全てレンタル可能。<br />専属ガイドが丁寧にレクチャーするので、初めての方や子供連れも安心です。</p>
          <a href="#entry" className="mt-8 inline-flex min-h-14 w-full max-w-sm items-center justify-center rounded-full bg-cta px-8 py-4 text-lg font-black text-cta-foreground shadow-2xl shadow-cta/40 active:scale-[0.98]">今すぐ空き状況を確認・予約</a>
          <p className="mx-auto mt-3 w-fit animate-pulse rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">夏休み・週末は残席わずか！</p>
          <p className="mt-3 text-xs opacity-80">9:30・13:30出発 ／ 5,000円〜</p>
        </div>
      </section>

      {/* Summer outline */}
      <section className="mx-auto max-w-3xl px-4 pt-20">
        <div className="rounded-3xl border-4 border-cta bg-card p-6 text-center shadow-xl md:p-10">
          <h2 className="font-display text-2xl font-black text-primary md:text-3xl">【2027年夏】吉野川SUPツアー開催概要</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl bg-secondary p-5"><p className="text-3xl">📅☀️</p><p className="font-display text-xl font-black md:text-2xl">開催期間：7月10日(土) 〜 9月30日(木)</p><p className="mt-1 font-display text-xl font-black md:text-2xl">期間中、毎日開催！</p></div>
            <div className="rounded-2xl bg-cta p-5 text-cta-foreground"><p className="text-3xl">⏰</p><p className="font-display text-xl font-black md:text-2xl">ご予約はお早めに</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pt-20">
        <h2 className="font-display text-2xl font-black leading-snug text-primary md:text-3xl">高知の吉野川でSUPツアーを始めた理由</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed">
          <p>私たちとSUPの出会いは2006年。当時は「川でSUP？」と驚かれる時代でした。高知の川といえば四万十川や仁淀川が有名ですが、私たちは吉野川の自然と水の美しさにすっかり惚れ込みました。</p>
          <p>2008年に高知・吉野川でSUPツアーを始めた当初は、月に2人のお客様しかいないこともありました。それでも、吉野川の川遊びを安全に楽しめる区間を探し続け、今では毎年たくさんの皆さんにSUPの魅力を感じていただけるようになりました。</p>
          <p>ご案内するのは、流れが穏やかで「かなり安全な区間」。透明な吉野川の水面をSUPでのんびり進めば、カワセミやヤマセミ、泳ぐ魚たち、運が良ければ亀や超希少なアカショウビンに出会えることも。川沿いを走るアンパンマン列車の姿も見られますよ。</p>
          <p>都会の喧騒を離れ、高知の雄大な自然の中で、家族や仲間と吉野川の川遊びを楽しみませんか？</p>
        </div>
        <div className="mt-8 text-center">
          <a href="#features" className="inline-flex min-h-12 items-center rounded-full bg-cta px-6 py-3 text-base font-black text-cta-foreground shadow-lg shadow-cta/30">ツアーの詳細を見る</a>
        </div>
      </section>

      <section className="mx-auto grid py-20 max-w-3xl items-center gap-8 px-4">
        <CourseCard />
        <div className="space-y-4 text-center">
          <p className="font-display text-2xl font-bold text-primary">この綺麗な川に遊びに来て下さい。</p>
          <p>初めてでも楽しめる<br />インター15分で清流で遊ぶ<br />吉野川へぜひ遊びにきてね</p>
          <a href="#entry" className="inline-flex min-h-14 items-center rounded-full bg-cta px-8 py-4 text-lg font-black text-cta-foreground shadow-xl shadow-cta/30">空席無くなる前に申し込もう！！</a>
        </div>
      </section>

      {/* Tags */}
      <section className="mx-auto py-20 max-w-3xl px-4">
        <img src={`${W}/2025/05/Sup03.png`} alt="高知の吉野川でSUPを楽しむ参加者" className="mx-auto w-full max-w-3xl rounded-2xl" />
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["初めてでも楽しめる", "家族でも楽しめる", "楽しさ満点", "おおとよIC15分、アクセス抜群", "レンタルで気軽に", "施設は川の真横！移動が少ない"].map((t) => (
            <span key={t} className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground">{t}</span>
          ))}
        </div>
        <Reveal>
          <p className="mx-auto mt-8 w-fit rounded-full border-2 border-sakura-strong/30 bg-sakura px-8 py-4 text-center text-lg font-bold text-sakura-foreground shadow-lg md:text-2xl">塩水じゃないから遊びやすいよ</p>
        </Reveal>
        <img src={`${W}/2025/05/SUP02.png`} alt="高知の吉野川でSUPを楽しむ参加者" className="mx-auto mt-4 w-full max-w-3xl rounded-2xl" />
      </section>

      {/* About copy 1 */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <H2>{"高知SUP（サップ）清流 吉野川を楽しもう"}</H2>
        <ul className="mx-auto mt-6 grid max-w-3xl gap-3">
          {accessPills.map((h) => (
            <li key={h.t} className={`flex items-center gap-3 rounded-full px-5 py-3 font-bold ${h.leaf ? "bg-leaf text-leaf-foreground shadow-sm ring-2 ring-leaf-foreground/25" : "bg-card text-secondary-foreground shadow-sm ring-1 ring-primary/15"}`}>
              {h.i && <h.i className={`h-5 w-5 shrink-0 ${h.leaf ? "text-leaf-foreground" : "text-primary"}`} />}
              <span>{h.t}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-3 leading-relaxed">
          <p>四国の清流と言うと、「四万十川」「仁淀川」が有名ですが、吉野川も清流ランキングで１位になる清流です。</p>
          <p>{"\n"}</p>
          <p>吉野川を気軽に体験してもらう為に、サップ（SUP）ツアーを始めたのは2008年。当時よりも知名度もあがり、用具も進化して、毎年たくさんの方に吉野川で遊んでいただいています。</p>
          <p>最初の頃は、海用SUPの薄いSUPでよく落ちていましたね。</p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <H2>高知・吉野川SUP体験の魅力｜初心者・家族連れも安心</H2>
        <div>
          <p className="text-lg font-bold leading-relaxed">{"\n"}</p>
          <ul className="mx-auto mt-6 grid max-w-3xl gap-3">
            {highlights.map((h) => (
              <Fragment key={h.t}>
                {h.t === "岩からジャンプは何回もできる" && <PhoneRulePill />}
              <li className={`flex items-center gap-3 rounded-full px-5 py-3 font-bold ${h.hot ? "bg-primary text-lg text-primary-foreground shadow-lg ring-2 ring-primary/30 md:text-xl" : h.leaf ? "bg-leaf text-leaf-foreground shadow-sm ring-2 ring-leaf-foreground/25" : h.soft ? "bg-primary/10 text-primary shadow-sm ring-2 ring-primary/40" : "bg-card text-secondary-foreground shadow-sm ring-1 ring-primary/15"}`}>
                {h.i && <h.i className={`h-5 w-5 shrink-0 ${h.hot ? "text-primary-foreground" : h.leaf ? "text-leaf-foreground" : "text-primary"}`} />}
                <span>
                  {h.t}
                  {h.em && <span className="font-black">{h.em}</span>}
                </span>
              </li>
              </Fragment>
            ))}
          </ul>
        </div>
        <div className="mt-10 grid gap-5">
          {features.map((f) => (
            <figure key={f.t} className={`overflow-hidden rounded-2xl ${f.hot ? "border-2 border-primary bg-primary/10 shadow-md" : "border bg-card shadow-sm"}`}>
              <img src={f.img} alt={f.t} loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <figcaption className="p-4 text-center">
                <p className={`inline-flex items-center gap-2 rounded-lg px-3 py-1 font-bold ${f.hot ? "bg-primary text-primary-foreground" : "text-primary"}`}>{f.i && <f.i className="h-4 w-4 shrink-0" />}{f.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Reasons */}
      <section className="bg-secondary py-20">
        <div className="mx-auto grid max-w-3xl items-center gap-8 px-4">
          <div>
            <H2>ガルバンゾがオススメの理由</H2>
            <ul className="space-y-3">
              {["JRCA公認インストラクターがレッスン", "27年リバースポーツで無事故", "2006年からSup事業展開", "各種保険に加入"].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-xl bg-card p-4 font-bold"><Check className="h-5 w-5 shrink-0 text-primary" />{t}</li>
              ))}
            </ul>
          </div>
          <img src={`${W}/2025/05/Photo03.png`} alt="ツアー写真" className="rounded-2xl" />
        </div>
      </section>

      {/* Family reasons */}
      <section className="mx-auto max-w-3xl px-4 py-20 overflow-x-clip">
        <H2>吉野川の川遊びが家族連れに選ばれる理由</H2>
        <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 shadow-2xl">
          <img src="/sup-family.jpg" alt="家族でSUPを楽しむイラスト" loading="lazy" className="block aspect-[16/9] w-full object-cover object-center md:aspect-[21/9]" />
        </div>
        <ul className="mx-auto mt-8 flex w-full flex-col gap-4">
          <li className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-md ring-1 ring-primary/10 md:p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
              <Camera className="h-6 w-6" />
            </span>
            <p className="flex-1 text-base font-bold leading-snug md:text-lg">ツアー中の家族写真お撮りします</p>
          </li>
          <li className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-md ring-1 ring-primary/10 md:p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary ring-1 ring-primary/20">
              <Baby className="h-6 w-6" />
            </span>
            <p className="flex-1 text-base font-bold leading-snug md:text-lg">未就学も参加可能<span className="mt-1 block text-sm font-semibold text-muted-foreground">2人乗り 5歳ぐらい・35kgぐらい迄</span></p>
          </li>
          <li className="flex items-center gap-4 rounded-2xl bg-cta p-4 text-cta-foreground shadow-lg shadow-cta/40 md:p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card/90 text-cta shadow-sm">
              <Smile className="h-6 w-6" />
            </span>
            <p className="flex-1 text-lg font-black leading-snug md:text-xl">お子様の笑顔がまじかで見れる</p>
          </li>
        </ul>
      </section>



      {/* Lesson note */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <Reveal>
          <H2>こんな人にはオススメしません。</H2>
        </Reveal>
        <div className="mt-6 grid gap-3 text-left">
          {[
            { who: "しっかり練習したい方", go: "レッスンへ" },
            { who: "激しい川下りをしたい方", go: "8km・6kmコースへ" },
            { who: "水に濡れたくない方", go: "多少は濡れちゃいます" },
          ].map((it, i) => (
            <Reveal key={it.who} delay={i * 150}>
              <div className="h-full rounded-2xl border bg-card p-4 shadow-sm">
                <p className="font-bold">{it.who}</p>
                <p className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">→ {it.go}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={250}>
          <img src={`${W}/2025/05/SUP06.png`} alt="スマホ持ち込み" loading="lazy" className="mx-auto mt-6 block w-full max-w-md rounded-2xl shadow-lg" />
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-4 rounded-2xl bg-accent px-4 py-3 font-semibold text-accent-foreground">始めてサップ（SUP）で川下りする方が、のんびりと楽しめるツアーになります。</p>
        </Reveal>
      </section>

      {/* Flow */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <H2>吉野川SUP体験ツアーの流れ</H2>
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4">
          {flow.map((f, i) => (
            <div key={i} className="w-72 shrink-0 snap-start overflow-hidden rounded-2xl border bg-card shadow-sm">
              <img src={f.img} alt={`パドル${i + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <div className="p-4">
                <p className="font-display font-bold text-primary">パドル{i + 1}</p>
                <p className="mt-1 text-sm">{f.d}</p>
              </div>
            </div>
          ))}
          <div className="w-72 shrink-0 snap-start overflow-hidden rounded-2xl border bg-card shadow-sm">
            <img src={`${W}/2018/05/IONX0079-1.jpg`} alt="リバーSUP吉野川" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="p-4">
              <p className="font-display font-bold text-accent-foreground">番外</p>
              <p className="mt-1 text-sm">リバーSUP（サップ）は１回で終わらない！もっとスリリングな1.5km→4.0kmコースもあります。</p>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground">← スクロールできます →</p>
      </section>

      {/* Hobby */}
      <section className="mx-auto py-20 grid max-w-3xl items-center gap-6 px-4">
        <img src={`${W}/2025/05/SUP11-1024x614.png`} alt="吉野川SUP" className="rounded-2xl" />
        <div className="text-center">
          <H2>今年、最高の趣味を手に入れよう</H2>
          <p>リバーSUPは日本中でやってます。経験があれば他の川に旅行いっても色々な川に行けます。</p>
        </div>
      </section>

      {/* Rental */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <H2>持ち物・レンタル｜手ぶらでOK</H2>
        <div className="rounded-2xl border bg-card p-5 md:p-6">
          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,500px)_1fr]">
            <div className="grid grid-cols-2 items-end gap-2">
              <img src="/sup-gear-woman.png" alt="当日の服装と装備のイメージ（女性）：つば付きハット、オレンジのライフジャケット、長袖ラッシュガード、マリンシューズを着用し、SUPボードとパドルを持った状態" className="mx-auto w-full max-w-[240px]" />
              <img src="/sup-gear-man.png" alt="当日の服装と装備のイメージ（男性）：つば付きハット、柄のショートパンツ、マリンシューズを着用し、ライフジャケット・SUPボード・パドルを持った状態" className="mx-auto w-full max-w-[240px]" />
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-lg font-bold text-primary">この格好でそのまま川へ</p>
                <p className="mt-1"><span className="font-bold">「夏はラッシュガード、上下」</span>がオススメです。</p>
              </div>
              <div className="grid gap-3">
                <div className="rounded-xl bg-secondary p-4">
                  <p className="mb-2 font-bold text-primary">レンタル料込み</p>
                  <ul className="space-y-1">
                    {["ライフジャケット", "SUP", "パドル"].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-line" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-secondary p-4">
                  <p className="mb-2 font-bold text-primary">必要に応じてレンタル</p>
                  <ul className="space-y-1">
                    {["リーシュコード", "ヘルメット", "作業グローブ"].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-line" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-secondary p-4">
            <p className="mb-2 font-bold text-primary">必要に応じて<br className="sm:hidden" />ご用意いただくと良いもの</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {["飲み物", "携帯防水パック", "メガネバンド", "ゴーグル", "虫除け", "日焼け止め"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-line" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm font-bold text-primary">注：水上へ持ち込みは浮く物のみ 川で沈んだら回収できません。</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="mb-6 text-left font-display text-2xl font-bold text-primary md:text-3xl">吉野川SUP体験コース一覧・料金</h2>
        <div className="overflow-x-auto rounded-2xl border bg-card">
          <table className="w-full min-w-[480px] text-center text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-3"></th>
                <th className="p-3 pt-6">
                  <span className="block rounded-2xl border bg-card px-2 py-3 text-xl font-bold shadow-sm">5,000円</span>
                </th>
                <th className="bg-secondary p-3 pt-6">
                  <span className="relative block rounded-2xl border-2 border-primary bg-card px-2 py-3 text-xl font-bold text-primary shadow-lg">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-0.5 text-xs text-primary-foreground">便利でオススメ</span>
                    6,000円
                  </span>
                </th>
                <th className="p-3 pt-6">
                  <span className="block rounded-2xl border bg-card px-2 py-3 text-xl font-bold shadow-sm">7,000円</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["前日支払（クレジット｜PayPay）", "-", "○", "○"],
                ["当日支払（QR決済：PayPay・楽天Pay）", "-", "○", "○"],
                ["有料レンタルA 300円", "-", "○", "⚪︎", "靴だけレンタル（リバーシューズ）"],
                ["有料レンタルB 500円", "－", "－", "○", "ラッシュガード・ウェット長ズボン・帽子"],
                ["通常キャンセル料（当日）", "5000円", "1000円", "1,000円"],
              ].map((r) => (
                <tr key={r[0]} className="border-b">
                  <th className="p-3 text-left font-bold">
                    {r[0]}
                    {r[4] && <span className="mt-1 block text-xs font-normal text-muted-foreground">{r[4]}</span>}
                  </th>
                  <td className="p-3">{r[1]}</td>
                  <td className="bg-secondary p-3 font-bold">{r[2]}</td>
                  <td className="p-3">{r[3]}</td>
                </tr>
              ))}
              <tr><th colSpan={4} className="px-3 pt-3 text-left font-bold text-primary">雨の日特典</th></tr>
              {[
                ["雨の日キャンセル料", "5000円", "1000円", "無料"],
                ["・写真割引", "－", "✓", "✓"],
                ["・ウェットスーツ貸出", "有料", "半額", "無料"],
              ].map((r) => (
                <tr key={r[0]} className="border-b last:border-0">
                  <th className="p-3 text-left font-normal">{r[0]}</th>
                  <td className="p-3">{r[1]}</td>
                  <td className="bg-secondary p-3 font-bold">{r[2]}</td>
                  <td className="p-3">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Paid rental */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="mb-6 text-left font-display text-2xl font-bold text-primary md:text-3xl">
          急な予定変更｜体調不良がご不安の方は<br />「おすすめ6000円コース・7000円コース」をお選びください。
        </h2>
        <div className="mt-6 rounded-2xl border-2 border-destructive/40 bg-card p-5">
          <p className="mb-3">
            <span className="inline-block rounded-full border-2 border-destructive px-4 py-1 text-sm font-bold text-destructive">ご注意</span>
          </p>
          <ul className="space-y-2 text-sm leading-relaxed">
            <li>・ビーチサンダルは怪我防止の為、不可です。</li>
            <li className="font-bold text-destructive">・ウェットスーツは30度超えると熱中症回避の為、貸出自粛してます。</li>
          </ul>
        </div>
      </section>


      {/* More */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-3xl px-4">
          <H2>さぁ！やってみよう！</H2>
          <div className="mx-auto mt-8 max-w-md">
            <CourseCard />
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            <img src={`${W}/2025/05/P7253530-1024x768.jpg`} alt="パックラフト" className="mx-auto w-full max-w-md rounded-2xl" />
            <p className="flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-card px-5 py-3 text-center font-bold text-primary"><img src="/duck.png" alt="だっく" className="h-10 w-10 shrink-0 rounded-full" />サップ（SUP）が難しそうと思う方は、安定感抜群のパックラフトで一緒に参加できます。</p>
          </div>
          <p className="mt-6 text-center">{"\n"}</p>
          <p className="mt-2 text-center font-bold">{"\n"}</p>
          <div className="mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-2xl bg-card p-4">
            <img src="/duck.png" alt="だっく" className="h-14 w-14 shrink-0 rounded-full" />
            <p className="text-sm"><b>だっく</b><br />初めての人が気軽に参加できるようにキャンペーンページ特別です。</p>
          </div>
        </div>
      </section>

      {/* Entry */}
      <section id="entry" className="mx-auto max-w-3xl px-4 py-20">
        <H2>予約はいますぐ！！ ここから始まる</H2>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} id={`step-${i + 1}`} className="scroll-mt-24 rounded-2xl border bg-card p-5">
              <p className="text-xs font-bold tracking-widest text-primary">STEP {i + 1}</p>
              <p className="mt-1 font-bold">{s.t}</p>
              {i === 0 ? (
                <div className="mt-2 text-sm">
                  <p>{s.b[0]}</p>
                  <WeatherAccess />
                </div>
              ) : s.b.length > 0 && <ul className="mt-2 space-y-1 text-sm">{s.b.map((b) => <li key={b}>・{b}</li>)}</ul>}
              {s.note && (
                <div className="mt-3 space-y-2 text-sm">
                  <p>{s.note.lead}</p>
                  <img src="/duck.png" alt="だっく" className="h-14 w-14 rounded-full" />
                  <ul className="space-y-1">
                    {s.note.items.map((it) => (
                      <li key={it.text} className={it.bold ? "font-bold" : undefined}>・{it.text}</li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground">{s.note.tail}</p>
                </div>
              )}
              {s.line && (
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <a href={LINE_URL} target="_blank" rel="noopener noreferrer"><img src={`${W}/2024/07/QR_LINE_336.png`} alt="公式LINE QRコード" className="h-32 w-32" /></a>
                    <div className="text-center sm:text-left">
                      <LineButton label="Galbanzo | LINE 公式アカウント" />
                      <p className="mt-2">{"\n"}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{"\n"}</p>
                  <EntryForm />
                </div>
              )}
              {s.pay && <PointNote tone="sakura" main="お支払い" sub="クレジットカード、PayPay支払こちら" />}
              {s.point && <PointNote main={s.point.main} sub={s.point.sub} />}
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-3xl border bg-card p-5 md:p-8">
          <h3 className="text-center font-display text-2xl font-bold text-primary md:text-3xl">予約後の流れ</h3>
          <p className="mt-1 text-center text-sm text-muted-foreground">スムーズなご参加のため、以下の流れをご確認ください</p>
          <div className="mt-6 grid gap-3">
            <div className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card"><Lock className="h-5 w-5 text-primary" /></span>
              <div><p className="font-bold">鍵付きロッカー完備</p><p className="text-sm text-muted-foreground">貴重品は必ずロッカーへ</p></div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card"><ShowerHead className="h-5 w-5 text-primary" /></span>
              <div><p className="font-bold">更衣室・トイレ・無料シャワー</p><p className="text-sm text-muted-foreground">ゴール後もさっぱり</p></div>
            </div>
          </div>
          <ol className="mt-8">
            {afterFlow.map((f, i) => {
              const big = f.t.match(/(６０|60|30)分前/);
              return (
                <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < afterFlow.length - 1 && <span className="absolute left-6 top-12 h-[calc(100%-3rem)] w-px bg-border" />}
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xs font-bold ${big ? "bg-accent text-accent-foreground" : "bg-secondary text-primary"}`}>SUP{i + 1}</span>
                  <div className="pt-1">
                    {big && (
                      <span className="mb-1 inline-block rounded-full bg-accent px-3 py-1 text-accent-foreground">
                        出発<b className="mx-0.5 font-display text-2xl">{big[1] === "６０" ? "60" : big[1]}分</b>前
                      </span>
                    )}
                    <p className="text-lg font-bold">{f.t}{f.t.includes("駐車場") && <MapAccessButton />}</p>
                    {f.b.length > 0 && <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground">{f.b.map((b) => <li key={b}>{b}</li>)}</ul>}
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 space-y-1 rounded-xl bg-secondary p-4 text-sm">
            <p>・写真購入希望はスタッフ迄<br />　ダウンロード方式で購入いただけます。</p>
            <p className="pt-2 font-bold text-primary">ツアー後も良い休日をお楽しみください。</p>
          </div>
        </div>
      </section>

      {/* Field about */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <Reveal>
          <div className="rounded-3xl border border-border bg-secondary/60 p-6 md:p-10">
            <p className="inline-block rounded-full bg-card px-4 py-1 text-sm font-bold text-primary shadow-sm">
              フィールドについて
            </p>
            <div className="mt-5 space-y-5 text-base leading-loose text-foreground md:text-lg">
              <p>
                当ツアーは、四国の中央を流れる吉野川の、流れが穏やかで透明度の高い安全な区間で開催しています。20年以上ツアー無事故で開催。徳島県と高知県の県境に位置し、高速道路のインターチェンジからもアクセスが良く、四国観光のスケジュールにも組み込みやすい立地です。
              </p>
              <p>
                日本三大暴れ川の雄大な自然景観と、驚くほど澄んだ「碧（あお）」の流れを、ぜひ体感してください。都会の喧騒を離れ、鳥のさえずりやアンパンマン列車を眺めながら、のんびりとした時間を過ごせます。
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-center">
          <Reveal><img src={`${K}/2025/05/P8054157-Sup_nerrupng-1024x586.png`} alt="楽しみ方はいろいろ" className="mx-auto w-full max-w-3xl rounded-2xl shadow-2xl animate-float" /></Reveal>
          <p className="font-display text-3xl font-bold">最高の休日に出発。</p>
          <div className="grid items-center gap-5 text-left sm:grid-cols-[minmax(0,240px)_1fr]">
            <img src={`${K}/2024/10/%E5%BA%97%E8%88%971-1024x836-1.jpg`} alt="ガルバンゾのベース（店舗）" className="mx-auto w-full max-w-[240px] rounded-2xl" />
            <div className="space-y-1">
              <p className="font-display text-xl font-bold">おおとよIC 約15分</p>
              <p>国道32号と国道439号の合流に</p>
              <p>四国吉野川のほとりにベース（店舗）があります。</p>
              <a href={DEST_DIR_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-2 underline">
                <MapPin className="h-4 w-4" />高知県長岡郡大豊町西土居１番地
              </a>
              <a href="https://natural.or.jp/" target="_blank" rel="noopener noreferrer" className="mt-1 block w-fit underline">一般社団法人　自然体感ガルバンゾHP</a>
              <p className="text-sm">
                運営「アウトドア！ガルバンゾ」
                <a href="https://rafting.co.jp" target="_blank" rel="noopener noreferrer" className="underline">株式会社リバーランプラス</a>
              </p>
            </div>
          </div>
          <p className="rounded-2xl bg-background/10 p-4 text-left text-sm leading-relaxed">［SUPかわあそび］は吉野川で夏期（7月〜9月）を中心にSUPツアーを開催しています。オフシーズンの団体予約やその他のお問い合わせは、お電話またはメールにてご連絡ください。</p>
          <div><LineButton href="#entry-form" onPress={scrollToEntryForm} className="w-full max-w-md py-5 text-lg" /></div>
          <a href="#toppage" className="block text-sm underline">Topへ戻る</a>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t bg-background/95 p-3 backdrop-blur md:hidden">
        <div className="text-xs leading-tight"><b className="text-base text-primary">5000円</b>/1人<br />前日20時迄キャンセル無料</div>
        <LineButton label="LINEで予約" className="flex-1 py-3" />
      </div>
    </div>
  );
}
