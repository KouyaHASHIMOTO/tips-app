import { render, screen } from "@testing-library/react";
import { TipList } from "./TipList";

const tips = [
  { id: "1", userName: "山田太郎", content: "豆知識1", likeCount: 5 },
  { id: "2", userName: "佐藤花子", content: "豆知識2", likeCount: 3 },
];

describe("Tipリストテスト", () => {
  test("カードが複数表示されている", () => {
    render(<TipList tips={tips} />);
    expect(screen.getByText("山田太郎")).toBeInTheDocument();
    expect(screen.getByText("佐藤花子")).toBeInTheDocument();
  });
});
