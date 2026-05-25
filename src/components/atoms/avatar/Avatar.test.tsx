import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("アバターのテスト", () => {
  test("アバターが表示されている", () => {
   render(<Avatar alt="ユーザーアイコン" src="test-image.jpg"/>)
   expect(screen.getByRole("img")).toHaveAttribute("alt","ユーザーアイコン")
   expect(screen.getByRole("img")).toHaveAttribute("src","test-image.jpg")

  });
});