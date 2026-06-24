import { render, screen } from "@testing-library/react";
import { TipCard } from "./TipCard";
import userEvent from "@testing-library/user-event";

describe("TipCard", () => {
  test("タイトルが表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="1"
        userName="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
      />,
    );
    expect(screen.getByText("Tipタイトル")).toBeInTheDocument();
  });
  test("ユーザー名が表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="1"
        userName="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
      />,
    );
    expect(screen.getByText("ユーザー名")).toBeInTheDocument();
  });
  test("投稿内容が表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="1"
        userName="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
      />,
    );
    expect(screen.getByText("投稿内容")).toBeInTheDocument();
  });
  test("いいね数が表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="1"
        userName="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
        likeCount={5}
        isLiked={true}
      />,
    );
    expect(screen.getByText(/❤️ 5/)).toBeInTheDocument();
  });
  test("isLiked=true のとき ❤️ が表示される", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="1"
        userName="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
        likeCount={5}
        isLiked={true}
      />,
    );
    expect(screen.getByText(/❤️/)).toBeInTheDocument();
  });
  test("isLiked=false のとき 🤍 が表示される", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="1"
        userName="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
        likeCount={5}
        isLiked={false}
      />,
    );
    expect(screen.getByText(/🤍/)).toBeInTheDocument();
  });
  test("いいねボタンをクリックするとonLike関数が呼ばれる", async () => {
    const user = userEvent.setup();
    const onLike = vi.fn();
    render(
      <TipCard
        title="Tipタイトル"
        user_id="1"
        userName="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
        onLike={onLike}
        isLiked={true}
      />,
    );
    await user.click(screen.getByRole("button", { name: /❤️/ }));

    expect(onLike).toHaveBeenCalled();
  });

  test("投稿日時が表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="1"
        userName="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
      />,
    );
    expect(screen.getByText("2026/5/28")).toBeInTheDocument();
  });

  test("カテゴリタグが表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="1"
        userName="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
        category="料理"
      />,
    );
    expect(screen.getByText("料理")).toBeInTheDocument();
  });
});
