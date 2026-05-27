import { useState } from "react";
import { Button } from "../../atoms/button/Button";

interface TipFormProps {
  onSubmit?: () => void;
}

export const TipForm = ({ onSubmit }: TipFormProps) => {
  const [content, setContent] = useState("");
  return (
    <div className="p-4 border-b border-gray-200">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 resize-none outline-none"
        placeholder="豆知識を共有しよう..."
      />
      <div className="flex justify-between items-center mt-2">
        <span
          className={content.length > 280 ? "text-red-500" : "text-gray-500"}
        >
          {280 - content.length}
        </span>
        <Button onClick={onSubmit} disabled={content.length > 280}>
          投稿
        </Button>
      </div>
    </div>
  );
};
