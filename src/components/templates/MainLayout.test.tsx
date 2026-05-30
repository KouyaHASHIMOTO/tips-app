import { render, screen } from "@testing-library/react";
import { MainLayout } from "./MainLayout";
import { MemoryRouter } from "react-router-dom";

describe("MainLayout", () => {
  test("Header Sidebar childrenが表示されている", () => {
    render(
      <MemoryRouter>
        <MainLayout>メインコンテンツ</MainLayout>
      </MemoryRouter>
    );
    expect(screen.getByText("Tips")).toBeInTheDocument();
    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("投稿")).toBeInTheDocument();
    expect(screen.getByText("設定")).toBeInTheDocument();
    expect(screen.getByText("メインコンテンツ")).toBeInTheDocument();
  });
});
