import { useState } from "react";
import { X, Tag, ImageIcon } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";
import { CATEGORIES, type Category } from "../../../constants/categories";
import { CATEGORY_STYLES } from "../../../constants/categoryStyles";
import { CategoryTag } from "../../atoms/categorytag/CategoryTag";

interface TipFormProps {
  onSubmit?: (
    title: string,
    content: string,
    category: Category,
    tags: string[],
  ) => void;
  onClose?: () => void;
}

export const TipForm = ({ onSubmit, onClose }: TipFormProps) => {
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

  const categoryStyle = CATEGORY_STYLES[category];
  const CategoryIcon = categoryStyle.icon;

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
      className="flex bg-card rounded-2xl overflow-hidden"
    >
      {/* 左パネル: 入力 */}
      <div className="flex-1 flex flex-col gap-4 p-6 border-r border-border">
        <div className="flex items-center justify-between">
          <p className="text-xs text-text-muted font-medium">入力</p>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center size-6 rounded-full text-text-muted hover:bg-border hover:text-text-main transition-colors"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* タイトル */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力..."
          className="w-full px-4 py-3 text-sm font-semibold text-text-main placeholder:text-text-muted bg-background border border-border rounded-xl outline-none focus:border-accent transition-colors"
        />

        {/* カテゴリ + タグ */}
        <div className="flex gap-2 items-center">
          <Select
            value={category}
            onValueChange={(v) => setCategory(v as Category)}
          >
            <SelectTrigger className="h-9 w-auto border border-border rounded-xl px-3 shrink-0 gap-1.5 focus:ring-0">
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium ${categoryStyle.text}`}
              >
                <CategoryIcon size={12} />
                {category}
              </span>
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => {
                const style = CATEGORY_STYLES[cat];
                const Icon = style.icon;
                return (
                  <SelectItem key={cat} value={cat}>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${style.text}`}
                    >
                      <Icon size={12} />
                      {cat}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <div className="flex flex-1 items-center gap-1.5 border border-border rounded-xl px-3 h-9 focus-within:border-accent transition-colors">
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
              placeholder="タグを追加"
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
          <div className="flex flex-wrap gap-1.5 -mt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 text-xs rounded-full bg-accent-light text-accent"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="rounded-full hover:opacity-60 transition-opacity"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 本文 */}
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="豆知識を共有しよう..."
          className="resize-none min-h-44 text-sm bg-background border-border rounded-xl leading-relaxed focus-visible:ring-0 focus-visible:border-accent"
        />
      </div>

      {/* 右パネル: 生成画像 + 投稿プレビュー */}
      <div className="w-64 flex flex-col gap-4 p-6">
        <p className="text-xs text-text-muted font-medium">生成画像</p>

        {/* 画像エリア */}
        <div className="border-2 border-dashed border-border rounded-xl h-32 flex items-center justify-center">
          <ImageIcon className="size-6 text-text-muted" />
        </div>

        {/* 画像を生成ボタン */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full py-2 border border-border rounded-xl text-sm text-text-main font-medium hover:border-accent hover:text-accent transition-colors"
        >
          <span className="text-base leading-none">✦</span>
          画像を生成
        </button>

        <p className="text-xs text-text-muted leading-relaxed -mt-1">
          タイトルと投稿内容をもとに画像を生成します
        </p>

        <div className="border-t border-border" />

        <p className="text-xs text-text-muted font-medium">投稿プレビュー</p>

        {/* プレビューカード（TipCard準拠） */}
        <div className="bg-background border border-border rounded-xl p-4 flex flex-col gap-2">
          <CategoryTag category={category} />
          <p className="text-base font-medium text-text-main leading-tight line-clamp-1">
            {title || "タイトル"}
          </p>
          <p className="text-text-sub text-xs leading-relaxed line-clamp-2">
            {content || "投稿内容がここに表示されます"}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-accent-light text-accent text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 投稿する */}
        <button
          type="submit"
          disabled={content.trim() === "" || title.trim() === ""}
          className="w-full py-3 bg-accent text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-auto"
        >
          投稿する
        </button>
      </div>
    </form>
  );
};
