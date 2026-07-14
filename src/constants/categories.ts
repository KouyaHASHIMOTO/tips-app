// カテゴリの正解リスト。ここを直せば全部に反映される
export const CATEGORIES = [
  "テクノロジー",
  "健康・美容",
  "暮らし",
  "仕事・勉強",
  "お金・節約",
  "雑学",
  "心理学",
  "料理・グルメ",
  "その他",
] as const;
// as const を付けることで、TypeScriptが配列の中身を
// ただの string[] ではなく "テクノロジー" "健康・医療" ... という
// 具体的な文字列の型として正確に記録する（＋書き換え禁止になる）

// "テクノロジー" | "健康・医療" | ... という型
export type Category = (typeof CATEGORIES)[number];
