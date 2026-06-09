import { render, screen } from "@testing-library/react";
import { SettingsPage } from "./SettingsPage";

describe("SettingsPage", () => {
  test("プロフィールアイコン変更テキストが表示されている", () => {
    render(<SettingsPage />);
    expect(screen.getByText("プロフィールアイコンの変更")).toBeInTheDocument();
  });
});
