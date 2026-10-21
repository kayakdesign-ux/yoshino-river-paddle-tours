import { createFileRoute } from "@tanstack/react-router";
import { EntryForm } from "@/components/EntryForm";
import { MessageCircle, MapPin, Check, Lock, ShowerHead } from "lucide-react";
import gearWomanAsset from "@/assets/sup-gear-woman.png.asset.json";
import gearManAsset from "@/assets/sup-gear-man.png.asset.json";
import { WeatherAccess, MapAccessButton } from "@/components/WeatherAccess";

const afterFlow: { t: string; b: string[] }[] = [
  { t: "忘れ物ありませんか？", b: ["夏期は、化繊のTシャツやラッシュガード、サーフトランクスで参加いただけます。", "飲み物は川に沈まない物なら持込ます。", "携帯は防水ケースに入れて沈まないようにしてください。\n携帯ケースのヒモが切れて水中に沈んだ例がございます。水深が深いと回収できません。防水ケース、浮力付きを強くオススメ致します。"] },
  { t: "移動開始", b: ["大豊ICを降りて、ラストコンビニ「ファミリーマート」あります。", "道の駅「大杉」もあります。", "施設近くに「こんどうストア」あります。（飲み物、田舎寿司、イートインあります。）"] },
  { t: "駐車場は６０分前から駐車可能 aboutTime", b: ["長時間駐車は河川敷駐車場へお願いします。"] },
  { t: "更衣室・トイレは30分前から利用可能", b: ["鍵付きロッカー有ります。", "貴重品は、鍵付きロッカーへ必ずお願いします。"] },
  { t: "保険の申込をQRコードからお願いします。（お名前、誕生日、連絡先）", b: [] },
  { t: "希望レンタル料はQR決済（PayPay,楽天Pay）でお支払いください。", b: ["リバーシューズはご自身で選んでください。", "精算は参加料金、レンタル料金の清算です。", ""] },
  { t: "出発時間までに着替えしてお待ちください。ツアースタート", b: ["時間になりましたら、送迎車両出発or安全説明開始となります。", "", ""] },
  { t: "レッスン後・自由行動あり", b: [] },
  { t: "ゴール　11時15分頃／15時15分頃", b: ["無料シャワーあります。"] },
  { t: "自由解散", b: ["忘れ物無いようご注意ください。"] },
];


const LINE_URL = "https://page.line.me/418xyaym?openQrModal=true";
const W = "https://kawaasobi.com/wp/wp-content/uploads";
const K = "https://kayaks.jp/wp/wp-content/uploads";
const HERO = `${W}/2024/10/GOPR3336-1024x896.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "高知・吉野川SUP体験｜初心者・家族連れ歓迎！手ぶらで川遊びツアー" },
      { name: "description", content: "【高知・吉野川SUP体験ツアー】初心者・家族連れ大歓迎！手ぶらでOKの川遊びアクティビティです。美しい吉野川の絶景をSUPでクルージング。ウェットスーツや道具は全てレンタル可能。専属ガイドが丁寧にレクチャーするので、初めての方や子供連れでも安心してお楽しみいただけます。今すぐ予約！" },
      { property: "og:title", content: "高知・吉野川SUP体験｜初心者・家族連れ歓迎！手ぶらで川遊びツアー" },
      { property: "og:description", content: "【高知・吉野川SUP体験ツアー】初心者・家族連れ大歓迎！手ぶらでOKの川遊びアクティビティです。美しい吉野川の絶景をSUPでクルージング。ウェットスーツや道具は全てレンタル可能。専属ガイドが丁寧にレクチャーするので、初めての方や子供連れでも安心してお楽しみいただけます。今すぐ予約！" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: HERO },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO },
    ],
  }),
  component: Index,
});

function LineButton({ label = "公式LINEで予約・空き確認", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={LINE_URL} target="_blank" rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-line px-6 py-4 font-bold text-primary-foreground shadow-lg transition hover:brightness-105 ${className}`}>
      <MessageCircle className="h-5 w-5" />{label}
    </a>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-6 text-center font-display text-2xl font-bold text-primary md:text-3xl">{children}</h2>;
}

function CourseCard() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-md">
      <img src={HERO} alt="リバーサップ体験" className="aspect-[8/7] w-full object-cover" />
      <div className="space-y-2 p-5 text-center">
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">オススメ</span>
        <p className="text-xl font-bold">ミニ！ツーリング1.5km</p>
        <p className="text-sm text-muted-foreground">たくさんの人に体験して欲しい</p>
        <p className="font-display text-3xl font-bold text-primary">5000円<span className="text-base">/1人</span></p>
        <p className="text-sm">８歳ぐらいから ／ 9時30分・13時30分出発</p>
      </div>
    </div>
  );
}

const features = [
  { img: `${W}/2024/10/DJI_0678__s-1024x683.jpg`, t: "塩水じゃないからサラサラ", d: "のんびり遊べます" },
  { img: `${W}/2024/07/P9201623_s.jpg`, t: "泳げ無くてもライフジャケット着用", d: "夏は浮かんでいるだけも楽しい" },
  { img: `${W}/2019/08/P6029311-1.jpg`, t: "2人乗りも可", d: "ゆったりとした流れの中なので色々ためせます" },
  { img: `${W}/2024/07/GOPR1582_s.jpg`, t: "20分程度のレッスン付", d: "初めてでも乗り方、パドル持ち方から習えます。" },
  { img: `${W}/2024/07/P9171579_s.jpg`, t: "のんびり時間もあります", d: "自由時間もあるのでのんびりくつろぐことも" },
  { img: `${W}/2024/07/GOPR1471_s.jpg`, t: "飛び込みも複数回OK", d: "体験飛び込み" },
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
  { t: "申込フォーム送信・公式LINE（空き状況を聞くだけでもOK！）", b: [], line: true },
  {
    t: "弊社からの返信を持って「予約」とさせていただきます。",
    b: ["当日は、スタッフが用具準備、運搬をしております。また急な連絡無しの不参加は、用具を回収するスタッフの労力もございます。ご予定の変更、取消がありましたら【必ずご連絡ください。】"],
    note: {
      lead: "返信にて、参加できる時間をご返信します。",
      items: [
        { text: "空席が取れない場合はごめんなさい。", bold: true },
        { text: "空席があれば、その後、お名前や参加者の身長などお聞きします。" },
        { text: "お支払いは、QR決済でお願いしてます。（PayPay,楽天Pay）" },
        { text: "少し先のご予約は、本社サイトからお申し込みとなります。" },
      ],
      tail: "参加・お問合せ後、友達削除、ミュートOKです。",
    },
  },
];

function Index() {
  return (
    <div id="toppage" className="min-h-screen bg-background pb-24 text-foreground md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <a href="https://kawaasobi.com/" className="font-display text-sm font-bold text-primary md:text-base">高知 SUP（サップ）｜シャワークライミング ガルバンゾ</a>
          <a href="#entry" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground md:inline-block">予約申込</a>
        </div>
      </header>

      {/* Title */}
      <section className="mx-auto max-w-5xl px-4 pt-8 text-center">
        <h1 className="font-display text-2xl font-bold leading-snug md:text-4xl">高知・吉野川SUP体験<br className="md:hidden" />｜初心者・家族連れ歓迎！<br />手ぶらで川遊びツアー</h1>
        <p className="mt-2 text-sm text-muted-foreground">– 高知サップ（SUP）清流吉野川で川遊び –</p>
        <p className="mt-4">高知でSUP体験を探している方へ――清流ランキング2023 1位の吉野川グリーンでリバーサップを満喫しませんか？</p>
      </section>

      <section className="mx-auto mt-8 grid max-w-5xl items-center gap-8 px-4 md:grid-cols-2">
        <CourseCard />
        <div className="space-y-4 text-center">
          <p className="font-display text-2xl font-bold text-primary">この綺麗な川に遊びに来て下さい。</p>
          <p>初めてでも楽しめる<br />インター15分で清流で遊ぶ<br />吉野川へぜひ遊びにきてね</p>
          <a href="#entry" className="inline-block rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground shadow">空席無くなる前に申し込もう！！</a>
        </div>
      </section>

      {/* Tags */}
      <section className="mx-auto mt-10 max-w-5xl px-4">
        <img src={`${W}/2025/05/Sup03.png`} alt="高知の吉野川でSUPを楽しむ参加者" className="mx-auto w-full max-w-3xl rounded-2xl" />
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["初めてでも楽しめる", "家族でも楽しめる", "楽しさ満点", "大豊IC15分、アクセス抜群", "レンタルで気軽に", "施設は川の真横！移動が少ない"].map((t) => (
            <span key={t} className="rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground">{t}</span>
          ))}
        </div>
        <p className="mt-6 text-center font-bold text-river">塩水じゃないから遊びやすいよ</p>
        <img src={`${W}/2025/05/SUP02.png`} alt="高知の吉野川でSUPを楽しむ参加者" className="mx-auto mt-4 w-full max-w-3xl rounded-2xl" />
      </section>

      {/* About */}
      <section className="mx-auto mt-16 max-w-3xl px-4">
        <H2>{"高知の自然 SUP体験\n清流ランキング１位 吉野川を楽しもう"}</H2>
        <div className="space-y-3 leading-relaxed">
          <p>四国の清流と言うと、「四万十川」「仁淀川」が有名ですが、吉野川も清流ランキングで１位になる清流です。</p>
          <p>高松空港から約９０分なので高松から高知への途中（大豊IC）でおりればこの清流を体験できます。</p>
          <p>吉野川を気軽に体験してもらう為に、サップ（SUP）ツアーを始めたのは2011年。当時よりも知名度もあがり、用具も進化して、毎年たくさんの方に吉野川で遊んでいただいています。</p>
          <p>最初は海用SUPで薄いのしかなかったんですよ。</p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto mt-16 max-w-5xl px-4">
        <H2>高知・吉野川で楽しむSUP体験の魅力</H2>
        <div className="grid items-center gap-6 md:grid-cols-2">
          <img src={`${W}/2025/05/8b741230ea1fc9769777e44b34daa304-1024x768.png`} alt="川用SUPボード" className="rounded-2xl" />
          <div className="text-center">
            <p>川はま水、さらさらして気持ちいいですよ。</p>
            <p className="mt-3 text-xl font-bold">川用は幅が広く<br />安定感があります。</p>
          </div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <figure key={f.t} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <img src={f.img} alt={f.t} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="p-4">
                <p className="font-bold text-primary">{f.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Reasons */}
      <section className="mt-16 bg-secondary py-14">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 md:grid-cols-2">
          <div>
            <H2>ガルバンゾがオススメの理由</H2>
            <ul className="space-y-3">
              {["JRCA公認インストラクターがレッスン", "27年リバースポーツで無事故", "2006年からSup事業展開", "各種保険に加入"].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-xl bg-card p-4 font-bold"><Check className="h-5 w-5 shrink-0 text-primary" />{t}</li>
              ))}
            </ul>
          </div>
          <img src={`${W}/2025/05/Photo02.png`} alt="ガルバンゾのインストラクター" className="rounded-2xl" />
        </div>
      </section>

      {/* Family reasons (内容保留) */}
      <section className="mx-auto mt-16 max-w-5xl px-4">
        <H2>家族連れに選ばれる理由</H2>
        <div className="rounded-2xl border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
          <p className="font-bold text-foreground">内容は準備中です</p>
          <p className="mt-2">
            こちらに「家族連れに選ばれる理由」を掲載予定です。
            <br />
            掲載内容が決まりましたらお知らせください。
          </p>
        </div>
      </section>

      {/* Photos */}
      <section className="mx-auto mt-16 grid max-w-5xl gap-8 px-4 md:grid-cols-2">
        <div className="space-y-3">
          <H2>ツアー中の写真お撮りします</H2>
          <p className="text-center">写真は気に入ったら購入できます。</p>
          <img src={`${W}/2025/05/Photo03.png`} alt="ツアー写真" className="rounded-2xl" />
        </div>
        <div className="space-y-3">
          <H2>カメラ・スマートホン持込OK</H2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>防水ケースに入れて下さい</li>
            <li>ヒモを着けて落下しないようにしてください</li>
            <li>浮力つけて沈まないようにしてください</li>
            <li>バックアップを取ることを強くオススメします。</li>
            <li>他のお客様の迷惑になる撮影、レッスン動画の撮影はご遠慮ください。</li>
          </ul>
          <img src={`${W}/2025/05/SUP06.png`} alt="スマホ持ち込み" className="rounded-2xl" />
        </div>
      </section>

      {/* Lesson note */}
      <section className="mx-auto mt-16 max-w-3xl px-4 text-center">
        <H2>{"こんな人にはオススメしません。\n\n・しっかり練習したい方→レッスンへ\n・激しい川下りした方→8km,6kmコースへ\n・水に濡れたくない→多少は濡れちゃいます。\n"}</H2>
        <p className="leading-relaxed">{"\n"}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <img src={`${W}/2025/05/SUP11-1024x614.png`} alt="吉野川SUP" className="rounded-2xl" />
          <img src={`${W}/2025/05/SUP08-1024x586.png`} alt="吉野川SUP" className="rounded-2xl" />
        </div>
        <p className="mt-4">始めてサップ（SUP）で川下りする方が、のんびりと楽しめるツアーになります。</p>
      </section>

      {/* Flow */}
      <section className="mx-auto mt-16 max-w-5xl px-4">
        <H2>ツアーの流れ</H2>
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
      <section className="mx-auto mt-16 grid max-w-5xl items-center gap-6 px-4 md:grid-cols-2">
        <img src={`${W}/2024/07/P1012125_s-1024x768.jpg`} alt="高知リバーサップ" className="rounded-2xl" />
        <div className="text-center">
          <H2>今年、最高の趣味を手に入れよう</H2>
          <p>リバーSUPは日本中でやってます。経験があれば他の川に旅行いっても色々な川に行けます。</p>
        </div>
      </section>

      {/* Rental */}
      <section className="mx-auto mt-16 max-w-5xl px-4">
        <H2>持ち物・レンタル</H2>
        <div className="rounded-2xl border bg-card p-5 md:p-6">
          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,500px)_1fr]">
            <div className="grid grid-cols-2 items-end gap-2">
              <img src={gearWomanAsset.url} alt="当日の服装と装備のイメージ（女性）：つば付きハット、オレンジのライフジャケット、長袖ラッシュガード、マリンシューズを着用し、SUPボードとパドルを持った状態" className="mx-auto w-full max-w-[240px]" />
              <img src={gearManAsset.url} alt="当日の服装と装備のイメージ（男性）：つば付きハット、柄のショートパンツ、マリンシューズを着用し、ライフジャケット・SUPボード・パドルを持った状態" className="mx-auto w-full max-w-[240px]" />
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-lg font-bold text-primary">この格好でそのまま川へ</p>
                <p className="mt-1"><span className="font-bold">「夏はラッシュガード、上下」</span>がオススメです。</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
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
      <section className="mx-auto mt-16 max-w-5xl px-4">
        <h2 className="mb-6 text-left font-display text-2xl font-bold text-primary md:text-3xl">料金</h2>
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
                ["事前決済カード", "○", "○", "○"],
                ["有料レンタルA", "－", "－", "✓"],
                ["有料レンタルB", "－", "－", "✓"],
                ["キャンセル料", "5000円", "無料", "1,000円"],
              ].map((r) => (
                <tr key={r[0]} className="border-b">
                  <th className="p-3 text-left font-bold">{r[0]}</th>
                  <td className="p-3">{r[1]}</td>
                  <td className="bg-secondary p-3 font-bold">{r[2]}</td>
                  <td className="p-3">{r[3]}</td>
                </tr>
              ))}
              <tr><th colSpan={4} className="px-3 pt-3 text-left font-bold text-primary">雨の日特典</th></tr>
              {[
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
      <section className="mx-auto mt-16 max-w-5xl px-4">
        <h2 className="mb-6 text-left font-display text-2xl font-bold text-primary md:text-3xl">
          有料レンタル<span className="ml-3 text-base font-bold md:text-lg">当日｜お支払いはQR決済（PayPay・楽天Pay）</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">靴だけレンタルの方は</p>
            <p className="mt-1 font-bold text-primary">レンタルA　リバーシューズ</p>
            <p className="mt-1 text-3xl font-bold">300<span className="ml-1 text-sm font-normal">円</span></p>
            <p className="mt-2 text-sm text-muted-foreground">ビーチサンダルは怪我防止で不可です。</p>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">ウェアセットが必要な方は</p>
            <p className="mt-1 font-bold text-primary">レンタルB　ラッシュガード、帽子、ウェットスーツ長ズボン、パドリングジャケット</p>
            <p className="mt-1 text-3xl font-bold">700<span className="ml-1 text-sm font-normal">円</span></p>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-destructive">ウェットスーツは30度を超えると熱中症回避の為、貸出自粛とさせていただきます。</p>
      </section>


      {/* More */}
      <section className="mt-16 bg-secondary py-14">
        <div className="mx-auto max-w-5xl px-4">
          <H2>さぁ！やってみよう！</H2>
          <div className="mx-auto mt-8 max-w-md">
            <CourseCard />
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            <img src={`${W}/2025/05/P7253530-1024x768.jpg`} alt="パックラフト" className="rounded-2xl" />
            <div className="flex items-start gap-3 rounded-2xl bg-card p-4">
              <img src="/duck.png" alt="だっく" className="h-14 w-14 shrink-0 rounded-full" />
              <p className="text-sm"><b>だっく</b><br />SUP（サップ）が難しそうと思う方は 安定性抜群のパックラフトで一緒に川下りする事ができます。</p>
            </div>
            <a href="https://kayaks.jp/lp/packraft/" className="block rounded-full border-2 border-primary bg-card px-6 py-3 text-center font-bold text-primary">レンタルで気軽に挑戦！！</a>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { img: `${K}/2025/05/Swim01.png`, t: "スマートフォンは防水ケースに入れて落下防止のヒモがあれば持っていけます" },
              { img: `${K}/2025/05/Junp02.png`, t: "飛び込みもできます。" },
              { img: `${K}/2025/05/Photo03.png`, t: "写真もお撮りしてます。" },
            ].map((x) => (
              <figure key={x.t} className="overflow-hidden rounded-2xl bg-card">
                <img src={x.img} alt={x.t} loading="lazy" className="w-full" />
                <figcaption className="p-3 text-sm">{x.t}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-center">がっつりレッスンではないので のんびりするのもOKです。</p>
          <img src={`${K}/2025/05/P8054157-Sup_nerrupng-1024x586.png`} alt="楽しみ方はいろいろ" className="mx-auto mt-4 max-w-3xl rounded-2xl" />
          <p className="mt-2 text-center font-bold">楽しみ方はいろいろ</p>
          <div className="mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-2xl bg-card p-4">
            <img src="/duck.png" alt="だっく" className="h-14 w-14 shrink-0 rounded-full" />
            <p className="text-sm"><b>だっく</b><br />初めての人が気軽に参加できるようにキャンペーンページ特別です。</p>
          </div>
        </div>
      </section>

      {/* Entry */}
      <section id="entry" className="mx-auto mt-16 max-w-3xl px-4">
        <H2>予約はいますぐ！！ ここから始まる</H2>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} className="rounded-2xl border bg-card p-5">
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
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-3xl border bg-card p-5 md:p-8">
          <h3 className="text-center font-display text-2xl font-bold text-primary md:text-3xl">予約後の流れ</h3>
          <p className="mt-1 text-center text-sm text-muted-foreground">スムーズなご参加のため、以下の流れをご確認ください</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
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

      {/* Footer */}
      <footer className="mt-16 bg-primary py-12 text-primary-foreground">
        <div className="mx-auto max-w-5xl space-y-6 px-4 text-center">
          <p className="font-display text-3xl font-bold">最高の休日に出発。</p>
          <img src={`${K}/2024/10/%E5%BA%97%E8%88%971-1024x836-1.jpg`} alt="ガルバンゾのベース（店舗）" className="mx-auto max-w-md rounded-2xl" />
          <p>大豊インター 約15分。<br />四国・吉野川のすぐそばにベース（店舗）があります。</p>
          <a href="https://www.google.com/maps/search/?api=1&query=高知県長岡郡大豊町西土居1番地" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline">
            <MapPin className="h-4 w-4" />高知県長岡郡大豊町西土居１番地
          </a>
          <div><LineButton /></div>
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
