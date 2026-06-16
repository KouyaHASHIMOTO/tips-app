import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "./LoginPage";
import { MemoryRouter } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { AuthError } from "@supabase/supabase-js";

// vi.mockでsupabaseをモックする
vi.mock("../../lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({
        data: {},
        error: null,
      }),
    },
  },
}));

describe("LoginPage", () => {
  test("メールアドレス入力欄が表示されている", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
  });
  test("パスワード入力欄が表示されている", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
  });
  test("ログインボタンが表示されている", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: "ログイン" }),
    ).toBeInTheDocument();
  });
  test("ログインボタンをクリックできる", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage onSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button", { name: "ログイン" }));

    expect(handleSubmit).toHaveBeenCalled();
  });

  test("サインアップページへのリンクが表示されている", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "こちら" })).toBeInTheDocument();
  });

  test("エラーが時にメールアドレスまたはパスワードが正しくありませんを表示", async () => {
    const user = userEvent.setup();

    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: "エラー" } as AuthError,
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "ログイン" }));

    expect(
      screen.getByText("メールアドレスまたはパスワードが正しくありません"),
    ).toBeInTheDocument();
  });
});
