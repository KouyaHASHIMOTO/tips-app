import { render, screen } from "@testing-library/react";
import { CategoryTag } from "./CategoryTag";

describe("CategoryTag", () => {
  test("カテゴリ名が表示されている", () => {
    render(<CategoryTag category="料理・グルメ" />);
    expect(screen.getByText("料理・グルメ")).toBeInTheDocument();
  });
  test("カテゴリタグの中にアイコンが表示されている", () => {
    render(<CategoryTag category="料理・グルメ" />);
    const categoryTag = screen.getByTestId("category-tag");
    const categoryIcon = categoryTag.querySelector("svg");
    expect(categoryIcon).toBeInTheDocument();
  });
});
