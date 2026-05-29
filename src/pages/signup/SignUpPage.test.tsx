import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpPage } from "./SignUpPage";

describe("SignUpPage", () => {
  test("メールアドレス入力欄が表示されている", () => {
    render(<SignUpPage />);
    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
  });
  test("パスワード入力欄が表示されている", () => {
    render(<SignUpPage />);
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
  });
  test("サインアップボタンが表示されている", () => {
    render(<SignUpPage />);
    expect(
      screen.getByRole("button", { name: "サインアップ" })
    ).toBeInTheDocument();
  });
  test("サインアップボタンをクリックできる", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<SignUpPage onSubmit={handleSubmit} />);
    await user.click(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
