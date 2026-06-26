import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RightPanel } from "./RightPanel";

describe("RightPanel", () => {
  test("検索欄が表示されている", () => {
    render(
      <MemoryRouter>
        <RightPanel trendTags={[]} />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText("タグで検索...")).toBeInTheDocument();
  });

  test("トレンドタグが表示されている", () => {
    render(
      <MemoryRouter>
        <RightPanel trendTags={[{ name: "サッカー", count: 5 }]} />
      </MemoryRouter>,
    );
    expect(screen.getByText("#サッカー")).toBeInTheDocument();
    expect(screen.getByText("5件のTips")).toBeInTheDocument();
  });

  test("投稿ボタンが表示されている", () => {
    render(
      <MemoryRouter>
        <RightPanel trendTags={[]} />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("button", { name: "+ Tipを投稿する" }),
    ).toBeInTheDocument();
  });
});
