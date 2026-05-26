import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  test("Buttonにテキストが入っている", () => {
    render(<Button>ボタン</Button>);
    expect(screen.getByText("ボタン")).toBeInTheDocument();
  });
  test("Buttonをクリックすると関数が実行される", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>ボタン</Button>);
    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalled();
  });
});
