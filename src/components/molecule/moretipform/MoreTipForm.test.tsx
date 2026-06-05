import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MoreTipForm } from "./MoreTipForm";

describe("MoreTipForm", () => {
  test("テキストエリアが表示されている", () => {
    render(<MoreTipForm />);

    expect(
      screen.getByPlaceholderText("MoreTipを入力してください")
    ).toBeInTheDocument();
  });
  test("テキストエリアに入力できる", async () => {
    const user = userEvent.setup();
    render(<MoreTipForm />);

    const inputContent =
      screen.getByPlaceholderText("MoreTipを入力してください");
    await user.type(inputContent, "MoreTip");

    expect(inputContent).toHaveValue("MoreTip");
  });
  test("投稿ボタンが表示されている", () => {
    render(<MoreTipForm />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("投稿ボタンをクリックできる", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();
    render(<MoreTipForm onSubmit={handleSubmit} />);
    await user.click(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
