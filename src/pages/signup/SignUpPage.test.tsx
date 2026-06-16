import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpPage } from "./SignUpPage";
import { MemoryRouter } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { AuthError } from "@supabase/supabase-js";

// vi.mockでsupabaseをモックする
vi.mock("../../lib/supabase", () => ({
  supabase: {
    auth: {
      signUp: vi.fn().mockResolvedValue({ data: {}, error: null }),
    },

    from: vi.fn().mockReturnValue({
      insert: vi.fn().mockResolvedValue({ error: null }),
    }),
  },
}));

describe("SignUpPage", () => {
  test("既存のメルアドを使用した場合にエラーが出る", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: "エラー", code: "user_already_exists" } as AuthError,
    });

    render(
      <MemoryRouter>
        <SignUpPage onSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button"));

    expect(
      await screen.findByText("このメールアドレスは既に使用されています"),
    ).toBeInTheDocument();
  });
  test("パスワードが弱い場合にエラーが出る", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: "エラー", code: "weak_password" } as AuthError,
    });

    render(
      <MemoryRouter>
        <SignUpPage onSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button"));

    expect(
      await screen.findByText("パスワードは6文字以上で入力してください"),
    ).toBeInTheDocument();
  });
  test("ログインに失敗した時にエラーが出る", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: "エラー" } as AuthError,
    });

    render(
      <MemoryRouter>
        <SignUpPage onSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button"));

    expect(
      await screen.findByText("アカウントの作成に失敗しました"),
    ).toBeInTheDocument();
  });
  test("ユーザー名入力欄が表示されている", () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("ユーザー名")).toBeInTheDocument();
  });
  test("メールアドレス入力欄が表示されている", () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
  });
  test("パスワード入力欄が表示されている", () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
  });
  test("サインアップボタンが表示されている", () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("button", { name: "サインアップ" }),
    ).toBeInTheDocument();
  });
  test("サインアップボタンをクリックできる", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SignUpPage onSubmit={handleSubmit} />
      </MemoryRouter>,
    );
    await user.click(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalled();
  });

  test("ログインページへのリンクが表示されている", () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "こちら" })).toBeInTheDocument();
  });
});
