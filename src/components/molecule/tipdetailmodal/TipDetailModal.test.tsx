import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TipDetailModal } from "./TipDetailModal";

const mockTip = {
  id: 1,
  title: "テストタイトル",
  content: "テスト本文",
  created_at: "2026-05-28T07:32:56.062504+00:00",
  userName: "テストユーザー",
  avatarUrl: "",
  category: "料理" as const,
  likeCount: 5,
  isLiked: false,
  moreTips: [
    {
      id: 1,
      tip_id: 1,
      user_id: "1",
      content: "MoreTip本文",
      created_at: "2026-05-28T07:32:56.062504+00:00",
      userName: "MoreTipユーザー",
    },
  ],
};

describe("TipDetailModal", () => {
  test("タイトルが表示されている", () => {
    render(<TipDetailModal tip={mockTip} onClose={() => {}} />);
    expect(screen.getByText("テストタイトル")).toBeInTheDocument();
  });

  test("本文が表示されている", () => {
    render(<TipDetailModal tip={mockTip} onClose={() => {}} />);
    expect(screen.getByText("テスト本文")).toBeInTheDocument();
  });

  test("MoreTipが表示されている", () => {
    render(<TipDetailModal tip={mockTip} onClose={() => {}} />);
    expect(screen.getByText("MoreTip本文")).toBeInTheDocument();
  });

  test("閉じるボタンをクリックするとonCloseが呼ばれる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<TipDetailModal tip={mockTip} onClose={onClose} />);
    await user.click(screen.getByRole("button", { name: "閉じる" }));
    expect(onClose).toHaveBeenCalled();
  });

  test("背景をクリックするとonCloseが呼ばれる", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<TipDetailModal tip={mockTip} onClose={onClose} />);
    await user.click(screen.getByTestId("modal-overlay"));
    expect(onClose).toHaveBeenCalled();
  });
});
