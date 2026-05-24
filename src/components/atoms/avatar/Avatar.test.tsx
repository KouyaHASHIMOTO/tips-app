import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("アバターのテスト", () => {
  test("アバターが表示されている", () => {
   render(<Avatar/>)
   expect(screen.getByRole("img")).toHaveAttribute("alt","ユーザーアイコン")
  });