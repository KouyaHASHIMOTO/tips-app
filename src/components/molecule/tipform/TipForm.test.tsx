import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TipForm } from "./TipForm";

describe("TipForm", () => {
  test("テキストエリアが表示されている", () => {
    render(<TipForm />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  test("テキストエリアに入力できる", async () => {
    const user = userEvent.setup();
    render(<TipForm />);
    const input = screen.getByRole("textbox");
    await user.type(input, "Tips内容");

    expect(input).toHaveValue("Tips内容");
  });
  test("投稿ボタンが表示されている", () => {
    render(<TipForm />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("投稿ボタンをクリックできる", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    render(<TipForm onSubmit={handleSubmit} />);
    await user.click(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalled();
  });
  test("280文字を超えると投稿ボタンが無効になる", async () => {
    const user = userEvent.setup();
    const longText = "あ".repeat(281);
    render(<TipForm />);
    const input = screen.getByRole("textbox");
    // まずテキストエリアをクリックしてフォーカスする
    await user.click(input);
    // その後貼り付ける
    await user.paste(longText);

    expect(screen.getByRole("button", { name: "投稿" })).toBeDisabled();
  });
});
