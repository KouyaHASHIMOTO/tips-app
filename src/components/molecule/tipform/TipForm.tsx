// src/components/molecule/tipform/TipForm.tsx
import { useState } from "react";
import {
  Bold,
  Italic,
  List,
  Image,
  Link,
  Code,
  MoreHorizontal,
  X,
  Tag,
} from "lucide-react";
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
    tags: string[]
  ) => void;
}

const MAX_CHARS = 5000;
const MAX_TITLE_CHARS = 80;

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
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium text-text-main">
            タイトル <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-text-muted">
            {title.length}/{MAX_TITLE_CHARS}
          </span>
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={MAX_TITLE_CHARS}
          placeholder="タイトルを入力..."
          className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text-main placeholder:text-text-muted outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* カテゴリ */}
      <div>
        <label className="text-sm font-medium text-text-main mb-1.5 block">
          カテゴリ <span className="text-red-500">*</span>
        </label>
        <Select
          value={category}
          onValueChange={(v) => setCategory(v as Category)}
        >
          <SelectTrigger className="w-full h-10 text-sm text-text-main border-border rounded-lg px-3">
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
      </div>

      {/* 本文（見た目だけのリッチテキストツールバー付き） */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium text-text-main">
            本文 <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="border border-border rounded-lg overflow-hidden focus-within:border-accent transition-colors">
          {/* 装飾ツールバー: クリックしても何も起きない見た目のみのボタン */}
          <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-surface">
            {[Bold, Italic, List, Image, Link, Code, MoreHorizontal].map(
              (Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="p-1.5 rounded hover:bg-border text-text-sub"
                  tabIndex={-1}
                >
                  <Icon size={14} />
                </button>
              )
            )}
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="豆知識を共有しよう..."
            className="resize-none min-h-40 text-sm bg-transparent border-0 rounded-none leading-relaxed focus-visible:ring-0"
          />
          <div className="flex justify-end px-3 py-1.5">
            <span
              className={`text-xs tabular-nums ${
                isOverLimit ? "text-red-500" : "text-text-muted"
              }`}
            >
              {content.length}/{MAX_CHARS}
            </span>
          </div>
        </div>
      </div>

      {/* タグ */}
      <div>
        <label className="text-sm font-medium text-text-main mb-1.5 block">
          タグ（任意・最大5つ）
        </label>
        <div className="flex items-center gap-1.5 border border-border rounded-lg px-3 h-10 focus-within:border-accent transition-colors">
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
            className="flex-1 text-sm text-text-main placeholder:text-text-muted bg-transparent outline-none min-w-0"
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
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
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
      </div>

      {/* ボタン: 下書き保存（見た目のみ・押しても何も起きない）+ 投稿する */}
      <div className="flex justify-end gap-2 pt-1 border-t border-border">
        <button
          type="button"
          className="px-4 py-2 rounded-lg text-sm font-medium text-text-sub border border-border hover:bg-border transition-colors"
        >
          下書き保存
        </button>
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
