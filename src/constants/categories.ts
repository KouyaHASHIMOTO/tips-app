// カテゴリの正解リスト。ここを直せば全部に反映される
export const CATEGORIES = [
  "料理",
  "暮らし",
  "植物",
  "仕事術",
  "カフェ",
  "健康",
  "その他",
] as const;

// "料理" | "暮らし" | "植物" | ... という型
export type Category = (typeof CATEGORIES)[number];
