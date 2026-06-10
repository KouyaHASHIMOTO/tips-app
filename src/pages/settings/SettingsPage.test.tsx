import { render, screen } from "@testing-library/react";
import { SettingsPage } from "./SettingsPage";
import type { User } from "@supabase/supabase-js";
import { MemoryRouter } from "react-router-dom";

describe("SettingsPage", () => {
  test("プロフィールアイコン変更テキストが表示されている", () => {
    const mockUser = { id: "test-id" } as unknown as User;
    render(
      <MemoryRouter>
        <SettingsPage user={mockUser} />
      </MemoryRouter>,
    );
    expect(screen.getByText("プロフィールアイコンの変更")).toBeInTheDocument();
  });
});
