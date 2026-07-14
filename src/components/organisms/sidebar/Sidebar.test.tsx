import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar", () => {
  test("Sidebarにホーム・投稿・設定ボタンが表示されている", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("マイページ")).toBeInTheDocument();
    expect(screen.getByText("設定")).toBeInTheDocument();
  });
  test("カテゴリ一覧が表示されている", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByText("テクノロジー")).toBeInTheDocument();
    expect(screen.getByText("その他")).toBeInTheDocument();
  });
  test("SidebarにTippsと表示されている", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    expect(screen.getByAltText("Tipps")).toBeInTheDocument();
  });
  test("ホームリンクにアイコンが表示されている", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole("link", { name: "ホーム" });
    const homeIcon = homeLink.querySelector("svg");
    expect(homeIcon).toBeInTheDocument();
  });

  test("カテゴリの横に色付きの丸が表示されている", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    const colorCircle = screen.getByTestId("category-dot-テクノロジー");
    expect(colorCircle).toBeInTheDocument();
  });
});
