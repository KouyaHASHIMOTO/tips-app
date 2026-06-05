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
      className="p-4 border-b border-gray-200"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 resize-none outline-none mt-2"
        placeholder="MoreTipを入力してください"
      />
      <div className="flex justify-between items-center mt-2">
        <span
          className={content.length > 280 ? "text-red-500" : "text-gray-500"}
        >
          {280 - content.length}
        </span>
        <Button type="submit" disabled={content.length > 280}>
          投稿
        </Button>
      </div>
    </form>
  );
};
