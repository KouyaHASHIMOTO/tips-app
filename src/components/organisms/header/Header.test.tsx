import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  test("HeaderにTipsと表示されている", () => {
    render(<Header />);
    expect(screen.getByText("Tips")).toBeInTheDocument();
  });
});
