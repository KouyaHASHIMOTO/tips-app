import type { Category } from "./categories";
import {
  Cpu,
  HeartPulse,
  Home,
  Briefcase,
  PiggyBank,
  Lightbulb,
  Brain,
  UtensilsCrossed,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface CategoryStyle {
  bg: string;
  bar: string;
  text: string;
  icon: LucideIcon;
}

export const CATEGORY_STYLES: Record<Category, CategoryStyle> = {
  テクノロジー: { bg: "bg-blue-100", bar: "bg-blue-400", text: "text-blue-600", icon: Cpu },
  "健康・美容": {
    bg: "bg-green-100",
    bar: "bg-green-400",
    text: "text-green-600",
    icon: HeartPulse,
  },
  暮らし: { bg: "bg-yellow-100", bar: "bg-yellow-400", text: "text-yellow-700", icon: Home },
  "仕事・勉強": {
    bg: "bg-indigo-100",
    bar: "bg-indigo-400",
    text: "text-indigo-600",
    icon: Briefcase,
  },
  "お金・節約": {
    bg: "bg-emerald-100",
    bar: "bg-emerald-400",
    text: "text-emerald-700",
    icon: PiggyBank,
  },
  雑学: { bg: "bg-cyan-100", bar: "bg-cyan-400", text: "text-cyan-700", icon: Lightbulb },
  心理学: { bg: "bg-rose-100", bar: "bg-rose-400", text: "text-rose-600", icon: Brain },
  "料理・グルメ": {
    bg: "bg-orange-100",
    bar: "bg-orange-400",
    text: "text-orange-600",
    icon: UtensilsCrossed,
  },
  その他: { bg: "bg-gray-100", bar: "bg-gray-400", text: "text-gray-600", icon: Sparkles },
};
