import { z } from "zod";
import { departureTimes, isOpen } from "@/lib/season";

const count = z.number().int().min(0).max(10);
export const bookingSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1, "お名前を入力してください。").max(100),
  contact: z.string().trim().min(1, "電話番号またはメールアドレスを入力してください。").max(255)
    .refine((value) => z.string().email().safeParse(value).success || /^[+\d()\s-]{8,25}$/.test(value), "電話番号またはメールアドレスを確認してください。"),
  preferredDate: z.string().date("希望日と便を選択してください。"),
  departure: z.enum(["09:45", "10:45", "13:30"]),
  participants: z.object({ s1a: count, s1k: count, s2a: count, s2p: count, pa: count, pk: count }).strict(),
  weight80: count,
}).strict().superRefine((data, ctx) => {
  const total = Object.values(data.participants).reduce((a, b) => a + b, 0);
  if (!isOpen(data.preferredDate)) ctx.addIssue({ code: "custom", message: "開催期間は4月1日〜11月末日です。" });
  else if (!(departureTimes(data.preferredDate) as readonly string[]).includes(data.departure)) ctx.addIssue({ code: "custom", message: "この日の出発時間を選択してください。" });
  if (!total) ctx.addIssue({ code: "custom", message: "参加人数を選択してください。" });
  if (data.participants.s2a !== data.participants.s2p) ctx.addIssue({ code: "custom", message: "SUP 2人乗りは大人と未就学を同じ人数にしてください。" });
  if (data.weight80 > total) ctx.addIssue({ code: "custom", message: "体重80kg以上の人数は合計人数以下にしてください。" });
});

export type BookingInput = z.infer<typeof bookingSchema>;

export function bookingMessage(data: BookingInput) {
  const p = data.participants;
  return ["【空き状況の確認・申込】", `お名前：${data.name}`, `連絡先：${data.contact}`,
    `希望日：${data.preferredDate}`, `便：${data.departure}出発`,
    `SUP 1人乗り：大人${p.s1a}人／9歳〜16歳${p.s1k}人`,
    `SUP 2人乗り：大人${p.s2a}人／未就学${p.s2p}人`,
    `パックラフト：大人${p.pa}人／9歳〜16歳${p.pk}人`,
    `体重80kg：${data.weight80}人`, `合計：${Object.values(p).reduce((a, b) => a + b, 0)}人`].join("\n");
}