// 開催期間 4/1〜11/30。夏季 7/10〜9/30 は午前 9:45、それ以外は午前 10:45。午後は通年 13:30。
export const SEASON_TEXT = "4月1日〜11月末日";
export const SUMMER_TEXT = "7月10日〜9月末日";

export function isSummer(isoDate: string) {
  const md = isoDate.slice(5, 10);
  return md >= "07-10" && md <= "09-30";
}

export function isOpen(isoDate: string) {
  const md = isoDate.slice(5, 10);
  return md >= "04-01" && md <= "11-30";
}

export function morningTime(isoDate: string) {
  return isSummer(isoDate) ? "09:45" : "10:45";
}

export function departureTimes(isoDate: string) {
  return [morningTime(isoDate), "13:30"] as const;
}
