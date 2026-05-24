import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";

describe("ボタンテスト", () => {
  test("ボタンにテキストが入っている", () => {
    render(<Button>ボタン</Button>);
    expect(screen.getByText("ボタン")).toBeInTheDocument();
  });
  test("ボタンをクリックすると関数が実行される", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>ボタン</Button>);
    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalled();
  });
});
