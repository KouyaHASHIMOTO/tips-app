import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { CATEGORIES, type Category } from "../../../constants/categories";

interface TipFormProps {
  onSubmit?: (title: string, content: string, category: Category) => void;
}

export const TipForm = ({ onSubmit }: TipFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("その他");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(title, content, category);
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
