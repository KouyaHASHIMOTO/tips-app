import { render, screen } from "@testing-library/react";
import { TipList } from "./TipList";

const tips = [
  { id: 1, user_id: "山田太郎", content: "Tips1", created_at: "1111/11/11" },
  { id: 2, user_id: "佐藤花子", content: "Tips2", created_at: "1111/11/11" },
];

describe("TipList", () => {
  test("カードが複数表示されている", () => {
    render(<TipList tips={tips} />);
    expect(screen.getByText("山田太郎")).toBeInTheDocument();
    expect(screen.getByText("佐藤花子")).toBeInTheDocument();
  });
});
