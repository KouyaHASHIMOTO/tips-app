import { render, screen } from "@testing-library/react";
import { MainLayout } from "./MainLayout";

describe("メインレイアウトテスト", () => {
  test("organismsが表示されている", () => {
    render(<MainLayout>メインコンテンツ</MainLayout>);
    expect(screen.getByText("Tips")).toBeInTheDocument();
    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("投稿")).toBeInTheDocument();
    expect(screen.getByText("設定")).toBeInTheDocument();
    expect(screen.getByText("メインコンテンツ")).toBeInTheDocument();
  });
});
