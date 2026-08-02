// src/components/molecule/tipform/TipForm.tsx
import { useState } from "react";
import { Plus, X, Lightbulb } from "lucide-react";
import { Button } from "../../atoms/button/Button";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { CATEGORIES, type Category } from "../../../constants/categories";

interface TipFormProps {
  onSubmit?: (
    title: string,
    content: string,
    category: Category,
    tags: string[],
    points: string[]
  ) => void;
}

const MAX_CHARS = 5000;
const MAX_TITLE_CHARS = 80;
const MAX_POINT_CHARS = 100;
const MAX_POINTS = 5;

export const TipForm = ({ onSubmit }: TipFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [points, setPoints] = useState<string[]>([""]);

  const remaining = MAX_CHARS - content.length;
  const isOverLimit = remaining < 0;

  const addPoint = () => {
    if (points.length < MAX_POINTS) {
      setPoints([...points, ""]);
    }
  };

  const removePoint = (index: number) => {
    if (points.length <= 1) return;
    setPoints(points.filter((_, i) => i !== index));
  };

  const updatePoint = (index: number, value: string) => {
    const next = [...points];
    next[index] = value;
    setPoints(next);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filledPoints = points.filter((p) => p.trim() !== "");
    onSubmit?.(title, content, category as Category, [], filledPoints);
    setTitle("");
    setContent("");
    setCategory("");
    setPoints([""]);
  };

  const canSubmit =
    !isOverLimit &&
    title.trim() !== "" &&
    content.trim() !== "" &&
    category !== "";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* タイトル */}
      <div>
        <label className="text-sm font-medium text-text-main mb-1.5 block">
          タイトル <span className="text-[#E36A62]">*</span>
        </label>
        <div className="border border-border rounded-lg overflow-hidden focus-within:border-accent transition-colors">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={MAX_TITLE_CHARS}
            placeholder="例）織田信長は「楽市楽座」を全国で最初に実現した人だった"
            className="w-full px-3 py-2 text-sm text-text-main placeholder:text-text-muted outline-none bg-transparent"
          />
          <div className="flex justify-end px-3 py-1.5">
            <span className="text-xs text-text-muted tabular-nums">
              {title.length}/{MAX_TITLE_CHARS}
            </span>
          </div>
        </div>
      </div>

      {/* カテゴリ */}
      <div>
        <label className="text-sm font-medium text-text-main mb-1.5 block">
          カテゴリ <span className="text-[#E36A62]">*</span>
        </label>
        <Select
          value={category}
          onValueChange={(v) => setCategory(v as Category)}
        >
          <SelectTrigger className="w-full h-10 text-sm text-text-main border-border rounded-lg px-3">
            <SelectValue placeholder="カテゴリを選択" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 本文 */}
      <div>
        <label className="text-sm font-medium text-text-main mb-1.5 block">
          本文 <span className="text-[#E36A62]">*</span>
        </label>
        <div className="border border-border rounded-lg overflow-hidden focus-within:border-accent transition-colors">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="知識の背景や詳しい説明を書いてください..."
            className="resize-none min-h-32 text-sm bg-transparent border-0 rounded-none leading-relaxed focus-visible:ring-0"
          />
          <div className="flex justify-end px-3 py-1.5">
            <span
              className={`text-xs tabular-nums ${
                isOverLimit ? "text-[#E36A62]" : "text-text-muted"
              }`}
            >
              {content.length}/{MAX_CHARS}
            </span>
          </div>
        </div>
      </div>

      {/* ポイント */}
      <div>
        <label className="text-sm font-medium text-text-main mb-1.5 block">
          ポイント
          <span className="text-xs text-text-muted font-normal ml-2">
            （最大{MAX_POINTS}件）
          </span>
        </label>
        <div className="flex flex-col gap-2">
          {points.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-accent shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8L6.5 11.5L13 4.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <input
                value={point}
                onChange={(e) => updatePoint(index, e.target.value)}
                maxLength={MAX_POINT_CHARS}
                placeholder={`ポイント ${index + 1}`}
                className="flex-1 px-3 py-2 text-sm text-text-main placeholder:text-text-muted border border-border rounded-lg outline-none focus:border-accent transition-colors bg-transparent"
              />
              {points.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePoint(index)}
                  className="p-1 rounded text-text-muted hover:text-[#E36A62] transition-colors"
                  aria-label="削除"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          {points.length < MAX_POINTS && (
            <button
              type="button"
              onClick={addPoint}
              className="flex items-center gap-1 text-xs text-text-sub hover:text-accent transition-colors mt-1 self-start"
            >
              <Plus size={14} />
              ポイントを追加
            </button>
          )}
        </div>
      </div>

      {/* 投稿のヒント */}
      <div className="bg-hint-bg border border-[#F5F1E9] rounded-xl p-4 flex gap-2">
        <Lightbulb className="size-4 text-hint-accent shrink-0 mt-0.5" />
        <div className="text-xs text-[#555A60] space-y-1">
          <p className="font-medium text-sm text-text-main mb-1">投稿のヒント</p>
          <p>・1つの投稿はシンプルに、読みやすくまとめるのがコツです。</p>
          <p>・出典がある場合は、本文やリンクで紹介してみましょう。</p>
          <p>・誰かの役に立つ知識は、きっと誰かの「へぇ！」になります。</p>
        </div>
      </div>

      {/* ボタン */}
      <div className="flex justify-end gap-2 pt-1 border-t border-border">
        <button
          type="button"
          className="px-4 py-2 rounded-lg text-sm font-medium text-text-sub border border-border hover:bg-border transition-colors"
        >
          下書き保存
        </button>
        <Button type="submit" disabled={!canSubmit} variant="primary">
          投稿する
        </Button>
      </div>
    </form>
  );
};
