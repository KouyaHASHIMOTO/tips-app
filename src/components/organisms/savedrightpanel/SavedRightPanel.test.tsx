import { render, screen } from "@testing-library/react";
import { SavedRightPanel } from "./SavedRightPanel";

describe("SavedRightPanel", () => {
  const categoryCounts = [{ category: "テクノロジー" as const, count: 1 }];
  test("合計件数として「1」が表示される", () => {
    render(<SavedRightPanel categoryCounts={categoryCounts} />);

    expect(screen.getByTestId("total-count").textContent).toBe("1件");
  });

  test("カテゴリ名『テクノロジー』が表示されている", () => {
    render(<SavedRightPanel categoryCounts={categoryCounts} />);

    expect(screen.getByText("テクノロジー")).toBeInTheDocument();
  });

  test("テクノロジーカテゴリが1件ある", () => {
    render(<SavedRightPanel categoryCounts={categoryCounts} />);

    const number = screen.getByTestId("category-count-テクノロジー");

    expect(number.textContent).toBe("1");
  });
});
