import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TipForm } from "./TipForm";

describe("TipForm", () => {
  test("テキストエリアが表示されている", () => {
    render(<TipForm />);
    expect(
      screen.getByPlaceholderText("タイトルを入力..."),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("豆知識を共有しよう..."),
    ).toBeInTheDocument();
  });
  test("テキストエリアに入力できる", async () => {
    const user = userEvent.setup();
    render(<TipForm />);

    const inputTitle = screen.getByPlaceholderText("タイトルを入力...");
    await user.type(inputTitle, "Tipタイトル");

    const inputContent = screen.getByPlaceholderText("豆知識を共有しよう...");
    await user.type(inputContent, "Tip内容");

    expect(inputTitle).toHaveValue("Tipタイトル");
    expect(inputContent).toHaveValue("Tip内容");
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
    const input = screen.getByPlaceholderText("豆知識を共有しよう...");
    // まずテキストエリアをクリックしてフォーカスする
    await user.click(input);
    // その後貼り付ける
    await user.paste(longText);

    expect(screen.getByRole("button", { name: "投稿" })).toBeDisabled();
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
      screen.getByPlaceholderText("タイトルを入力..."),
      "タイトル",
    );
    await user.type(
      screen.getByPlaceholderText("豆知識を共有しよう..."),
      "内容",
    );
    await user.selectOptions(screen.getByRole("combobox"), "料理");
    await user.click(screen.getByRole("button", { name: "投稿" }));

    expect(handleSubmit).toHaveBeenCalledWith("タイトル", "内容", "料理", []);
  });

  test("タグ入力欄が表示されている", () => {
    render(<TipForm />);
    expect(
      screen.getByPlaceholderText("タグを入力（例：サッカー）"),
    ).toBeInTheDocument();
  });

  test("タグを入力して投稿するとonSubmitにタグが渡される", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TipForm onSubmit={handleSubmit} />);

    await user.type(
      screen.getByPlaceholderText("タイトルを入力..."),
      "タイトル",
    );
    await user.type(
      screen.getByPlaceholderText("豆知識を共有しよう..."),
      "内容",
    );
    await user.type(
      screen.getByPlaceholderText("タグを入力（例：サッカー）"),
      "サッカー",
    );
    await user.click(screen.getByRole("button", { name: "投稿" }));

    expect(handleSubmit).toHaveBeenCalledWith("タイトル", "内容", "その他", [
      "サッカー",
    ]);
  });
});
