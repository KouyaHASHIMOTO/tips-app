import { Button } from "../../atoms/button/Button";

export const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-14 h-full w-64 border-r border-gray-200 p-4 flex flex-col gap-2">
      <Button>ホーム</Button>
      <Button>投稿</Button>
      <Button>設定</Button>
    </nav>
  );
};
