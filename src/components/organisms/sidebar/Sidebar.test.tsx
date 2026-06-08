import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import { MemoryRouter } from "react-router-dom";

describe("Sidebar", () => {
  test("Sidebarにホーム・投稿・設定ボタンが表示されている", () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );
    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("マイページ")).toBeInTheDocument();
    expect(screen.getByText("設定")).toBeInTheDocument();
  });
});
