import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  test("HeaderにTipsと表示されている", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Tips")).toBeInTheDocument();
  });
  test("Headerにログアウトボタンが有る", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: "ログアウト" })
    ).toBeInTheDocument();
  });
});
