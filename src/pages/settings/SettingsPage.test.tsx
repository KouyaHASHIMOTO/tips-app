import { render, screen } from "@testing-library/react";
import { SettingsPage } from "./SettingsPage";
import type { User } from "@supabase/supabase-js";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockUser = { id: "test-id" } as unknown as User;

vi.mock("../../lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: vi.fn().mockResolvedValue({
        error: null,
      }),
    },
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({ data: null, error: null }),
        }),
      }),
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    }),
    storage: {
      from: vi.fn().mockReturnValue({
        upload: vi.fn().mockResolvedValue({ data: {}, error: null }),
        getPublicUrl: vi.fn().mockReturnValue({
          data: { publicUrl: "https://example.com/avatar.jpg" },
        }),
      }),
    },
  },
}));

describe("SettingsPage", () => {
  test("プロフィールアイコン変更テキストが表示されている", () => {
    render(
      <MemoryRouter>
        <SettingsPage user={mockUser} />
      </MemoryRouter>,
    );
    expect(screen.getByText("プロフィールアイコンの変更")).toBeInTheDocument();
  });
  test("画像選択ボタンが表示されている", () => {
    render(
      <MemoryRouter>
        <SettingsPage user={mockUser} />
      </MemoryRouter>,
    );
    expect(screen.getByText("画像を選択")).toBeInTheDocument();
  });
  test("画像アップロード後に成功メッセージが表示される", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SettingsPage user={mockUser} />
      </MemoryRouter>,
    );
    //ファイルを選択してアップロードをシュミレート
    const input = screen.getByTestId("avatar-input");
    const file = new File(["dummy"], "test.png", { type: "image/png" });
    await user.upload(input, file);

    expect(
      screen.getByText("プロフィール画像を変更しました！"),
    ).toBeInTheDocument();
  });
  test("SettingsPageにログアウトボタンが有る", () => {
    render(
      <MemoryRouter>
        <SettingsPage user={mockUser} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: "ログアウト" }),
    ).toBeInTheDocument();
  });
});
