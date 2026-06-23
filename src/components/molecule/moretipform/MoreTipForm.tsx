import { useState } from "react";
import { Button } from "../../atoms/button/Button";

interface MoreTipFormProps {
  onSubmit?: (content: string) => void;
}

export const MoreTipForm = ({ onSubmit }: MoreTipFormProps) => {
  const [content, setContent] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(content);
        setContent("");
      }}
      className="mt-2 bg-surface border border-border rounded-lg p-3"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 resize-none outline-none text-text-main placeholder:text-text-muted bg-transparent"
        placeholder="MoreTipを入力してください"
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
