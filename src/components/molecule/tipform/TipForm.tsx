import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { CATEGORIES, type Category } from "../../../constants/categories";

interface TipFormProps {
  onSubmit?: (
    title: string,
    content: string,
    category: Category,
    tags: string[],
  ) => void;
}

export const TipForm = ({ onSubmit }: TipFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("その他");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed === "") return;
    setTags([...tags, trimmed]);
    setTagInput("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit?.(title, content, category, tags);
        setTitle("");
        setContent("");
      }}
      className="bg-card border border-border rounded-xl p-4 mb-4"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 outline-none font-semibold text-text-main placeholder:text-text-muted bg-transparent border-b border-border mb-2"
        placeholder="タイトルを入力..."
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
        className="w-full p-2 border border-border rounded-lg text-text-main bg-transparent outline-none"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-accent-light text-accent text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="タグを入力（例：サッカー）"
          className="flex-1 p-2 border border-border rounded-lg text-text-main bg-transparent outline-none"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-3 py-2 border border-border rounded-lg text-text-sub text-sm hover:border-accent hover:text-accent"
        >
          タグを追加
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 resize-none outline-none mt-2 text-text-main placeholder:text-text-muted bg-transparent"
        placeholder="豆知識を共有しよう..."
      />
      <div className="flex justify-between items-center mt-2">
        <span
          className={content.length > 280 ? "text-red-500" : "text-text-muted"}
        >
          {280 - content.length}
        </span>
        <Button type="submit" disabled={content.length > 280} variant="primary">
          投稿
        </Button>
      </div>
    </form>
  );
};
