import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("ヘッダーテスト", () => {
  test("ヘッダーにTipsと表示されている", () => {
    render(<Header />);
    expect(screen.getByText("Tips")).toBeInTheDocument();
  });
});
