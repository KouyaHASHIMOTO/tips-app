import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  test("alt属性が正しく設定されている", () => {
    render(<Avatar alt="ユーザーアイコン" src="test-image.jpg" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "ユーザーアイコン");
  });

  test("src属性が正しく設定されている", () => {
    render(<Avatar alt="ユーザーアイコン" src="test-image.jpg" />);
    expect(screen.getByRole("img")).toHaveAttribute("src", "test-image.jpg");
  });
});
