import { useState } from "react";
import { X, Tag } from "lucide-react";
import { Button } from "../../atoms/button/Button";
import { Textarea } from "../../ui/textarea";
import { Badge } from "../../ui/badge";
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
  ) => void;
}

const MAX_CHARS = 280;

export const TipForm = ({ onSubmit }: TipFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("その他");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed === "" || tags.includes(trimmed) || tags.length >= 5) return;
    setTags([...tags, trimmed]);
    setTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const remaining = MAX_CHARS - content.length;
  const isOverLimit = remaining < 0;
  const progress = Math.min(content.length / MAX_CHARS, 1);
  const circumference = 2 * Math.PI * 10;
  const dashOffset = circumference * (1 - progress);
  const progressColor = isOverLimit
    ? "#ef4444"
    : remaining <= 20
    ? "#f59e0b"
    : "#5b5bd6";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(title, content, category, tags);
        setTitle("");
        setTags([]);
        setContent("");
        setCategory("その他");
      }}
      className="flex flex-col gap-5"
    >
      {/* タイトル */}
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力..."
          className="w-full text-lg font-bold text-text-main placeholder:text-text-muted bg-transparent outline-none leading-tight"
        />
      </div>

      {/* カテゴリ + タグ 横並び */}
      <div className="flex gap-2 items-center">
        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger className="h-8 w-36 text-xs text-text-main border-border rounded-full px-3 shrink-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-1 items-center gap-1.5 border border-border rounded-full px-3 h-8 focus-within:border-accent transition-colors">
          <Tag className="size-3 text-text-muted shrink-0" />
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="タグを追加（最大5つ）"
            className="flex-1 text-xs text-text-main placeholder:text-text-muted bg-transparent outline-none min-w-0"
          />
          {tagInput.trim() !== "" && (
            <button
              type="button"
              onClick={handleAddTag}
              className="text-xs text-accent font-medium shrink-0 hover:opacity-70 transition-opacity"
            >
              追加
            </button>
          )}
        </div>
      </div>

      {/* タグ一覧 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 -mt-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 h-auto text-xs rounded-full bg-accent-light text-accent border-0 hover:bg-accent-light"
            >
              #{tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="rounded-full hover:opacity-60 transition-opacity"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* 本文 */}
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="豆知識を共有しよう..."
        className="resize-none min-h-32 text-sm bg-transparent border-border leading-relaxed"
      />

      {/* フッター */}
      <div className="flex justify-between items-center pt-1 border-t border-border">
        {/* 円形プログレス */}
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" className="-rotate-90">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#ebebe8" strokeWidth="2.5" />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke={progressColor}
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="transition-all duration-200"
            />
          </svg>
          {remaining <= 20 && (
            <span className={`text-xs tabular-nums font-medium ${isOverLimit ? "text-red-500" : "text-amber-500"}`}>
              {remaining}
            </span>
          )}
        </div>

        <Button
          type="submit"
          disabled={isOverLimit || content.trim() === ""}
          variant="primary"
        >
          投稿する
        </Button>
      </div>
    </form>
  );
};
