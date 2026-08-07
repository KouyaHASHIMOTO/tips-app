import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TipForm } from "./TipForm";

describe("TipForm", () => {
  test("テキストエリアが表示されている", () => {
    render(<TipForm />);
    expect(
      screen.getByPlaceholderText(
        "例）織田信長は「楽市楽座」を全国で最初に実現した人だった",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("知識の背景や詳しい説明を書いてください..."),
    ).toBeInTheDocument();
  });

  test("テキストエリアに入力できる", async () => {
    const user = userEvent.setup();
    render(<TipForm />);

    const inputTitle = screen.getByPlaceholderText(
      "例）織田信長は「楽市楽座」を全国で最初に実現した人だった",
    );
    await user.type(inputTitle, "Tipタイトル");

    const inputContent = screen.getByPlaceholderText(
      "知識の背景や詳しい説明を書いてください...",
    );
    await user.type(inputContent, "Tip内容");

    expect(inputTitle).toHaveValue("Tipタイトル");
    expect(inputContent).toHaveValue("Tip内容");
  });

  test("投稿ボタンが表示されている", () => {
    render(<TipForm />);

    expect(
      screen.getByRole("button", { name: "投稿する" }),
    ).toBeInTheDocument();
  });

  test("必須項目が未入力のとき投稿ボタンは無効になっている", () => {
    render(<TipForm />);
    expect(screen.getByRole("button", { name: "投稿する" })).toBeDisabled();
  });

  test("5000文字を超えると投稿ボタンが無効になる", async () => {
    const user = userEvent.setup();
    const longText = "あ".repeat(5001);
    render(<TipForm />);
    const input = screen.getByPlaceholderText(
      "知識の背景や詳しい説明を書いてください...",
    );
    await user.click(input);
    await user.paste(longText);

    expect(screen.getByRole("button", { name: "投稿する" })).toBeDisabled();
  });

  test("カテゴリ選択欄が表示されている", () => {
    render(<TipForm />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("カテゴリを選択して投稿するとonSubmitにカテゴリが渡される", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TipForm onSubmit={handleSubmit} />);

    await user.type(
      screen.getByPlaceholderText(
        "例）織田信長は「楽市楽座」を全国で最初に実現した人だった",
      ),
      "タイトル",
    );
    await user.type(
      screen.getByPlaceholderText("知識の背景や詳しい説明を書いてください..."),
      "内容",
    );
    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "料理・グルメ" }));
    await user.click(screen.getByRole("button", { name: "投稿する" }));

    expect(handleSubmit).toHaveBeenCalledWith(
      "タイトル",
      "内容",
      "料理・グルメ",
      [],
      null,
    );
  });
});
