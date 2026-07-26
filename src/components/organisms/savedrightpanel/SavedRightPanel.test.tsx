import { render, screen } from "@testing-library/react";
import { SavedRightPanel } from "./SavedRightPanel";

describe("SavedRightPanel", () => {
  const categoryCounts = [{ category: "テクノロジー", count: 1 }];
  test("カテゴリ別の内訳が表示されている", () => {
    render(<SavedRightPanel categoryCounts={categoryCounts} />);
    expect(screen.getByText("テクノロジー")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
