import type { Category } from "./categories";

// カテゴリごとの丸の色（Tailwindの背景色クラス）
export const CATEGORY_COLORS: Record<Category, string> = {
  テクノロジー: "bg-blue-400",
  "健康・美容": "bg-green-400",
  暮らし: "bg-yellow-400",
  "仕事・勉強": "bg-indigo-400",
  "お金・節約": "bg-emerald-400",
  雑学: "bg-cyan-400",
  心理学: "bg-rose-400",
  "料理・グルメ": "bg-orange-400",
  その他: "bg-gray-400",
} as const;
