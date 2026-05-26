import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  test("Sidebarにホーム・投稿・設定ボタンが表示されている", () => {
    render(<Sidebar />);
    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("投稿")).toBeInTheDocument();
    expect(screen.getByText("設定")).toBeInTheDocument();
  });
});
