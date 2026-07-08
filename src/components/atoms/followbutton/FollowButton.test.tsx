import { render, screen } from "@testing-library/react";
import { FollowButton } from "./FollowButton";
import userEvent from "@testing-library/user-event";

describe("FollowButton", () => {
  test("ボタンに「フォロー」というテキストが表示されている", () => {
    render(<FollowButton />);
    expect(screen.getByText("フォロー")).toBeInTheDocument();
  });
  test("クリックすると関数が実行される", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<FollowButton onClick={handleClick} />);
    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });
  test("フォロー済みの場合「フォロー済み」というテキストが表示される", () => {
    render(<FollowButton isFollowing={true} />);
    expect(screen.getByText("フォロー済み")).toBeInTheDocument();
  });
});
