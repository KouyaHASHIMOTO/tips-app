import { render, screen } from "@testing-library/react";
import { CategoryTag } from "./CategoryTag";

describe("CategoryTag", () => {
  test("カテゴリ名が表示されている", () => {
    render(<CategoryTag category="料理・グルメ" />);
    expect(screen.getByText("料理・グルメ")).toBeInTheDocument();
  });
});
