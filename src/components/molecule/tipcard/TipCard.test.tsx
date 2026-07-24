import { render, screen } from "@testing-library/react";
import { TipCard } from "./TipCard";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

describe("TipCard", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("タイトルが表示されている", () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("Tipタイトル")).toBeInTheDocument();
  });
  test("ユーザー名が表示されている", () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("ユーザー名")).toBeInTheDocument();
  });
  test("投稿内容が表示されている", () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("投稿内容")).toBeInTheDocument();
  });
  test("いいね数が表示されている", () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
          likeCount={5}
          isLiked={true}
        />
      </MemoryRouter>,
    );
    const likeButton = screen.getByRole("button", { name: /5/ });
    expect(likeButton).toBeInTheDocument();
  });
  test("isLiked=true のとき ハートが塗りつぶされる", () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
          likeCount={5}
          isLiked={true}
        />
      </MemoryRouter>,
    );

    const likeButton = screen.getByTestId("like-button");
    const heartIcon = likeButton.querySelector("svg");

    expect(heartIcon).toHaveAttribute("fill", "currentColor");
  });
  test("isLiked=false のとき ハートが塗りつぶされない", () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
          likeCount={5}
          isLiked={false}
        />
      </MemoryRouter>,
    );

    const likeButton = screen.getByTestId("like-button");
    const heartIcon = likeButton.querySelector("svg");

    expect(heartIcon).toHaveAttribute("fill", "none");
  });
  test("いいねボタンをクリックするとonLike関数が呼ばれる", async () => {
    const user = userEvent.setup();
    const onLike = vi.fn();
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
          onLike={onLike}
          isLiked={true}
        />
      </MemoryRouter>,
    );
    await user.click(screen.getByTestId("like-button"));

    expect(onLike).toHaveBeenCalled();
  });

  test("投稿日時が表示されている", () => {
    vi.setSystemTime(new Date("2026-06-30T12:00:00"));

    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T12:00:00"
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("2026/5/28")).toBeInTheDocument();
  });

  test("カテゴリタグが表示されている", () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
          category="テクノロジー"
        />
      </MemoryRouter>,
    );
    expect(screen.getByText("テクノロジー")).toBeInTheDocument();
  });
  test("isBookmark=true のとき ブックマークアイコンが塗りつぶされる", () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
          likeCount={5}
          isBookmark={true}
        />
      </MemoryRouter>,
    );
    const bookmarkButton = screen.getByTestId("bookmark-button");
    const bookmarkIcon = bookmarkButton.querySelector("svg");

    expect(bookmarkIcon).toHaveAttribute("fill", "currentColor");
  });
  test("isBookmark=false のとき ブックマークアイコンが塗りつぶされない", () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
          likeCount={5}
          isBookmark={false}
        />
      </MemoryRouter>,
    );
    const bookmarkButton = screen.getByTestId("bookmark-button");
    const bookmarkIcon = bookmarkButton.querySelector("svg");

    expect(bookmarkIcon).toHaveAttribute("fill", "none");
  });
  test("保存ボタンをクリックするとonBookmark関数が呼ばれる", async () => {
    const user = userEvent.setup();
    const onBookmark = vi.fn();
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
          onBookmark={onBookmark}
          isBookmark={false}
        />
      </MemoryRouter>,
    );
    await user.click(screen.getByTestId("bookmark-button"));

    expect(onBookmark).toHaveBeenCalled();
  });

  test("自分の投稿の場合、いいねボタンがクリックできない", async () => {
    render(
      <MemoryRouter>
        <TipCard
          title="Tipタイトル"
          user_id="1"
          userName="ユーザー名"
          content="投稿内容"
          created_at="2026-05-28T07:32:56.062504+00:00"
          likeCount={5}
          isBookmark={false}
          userId={"1"}
        />
      </MemoryRouter>,
    );
    const likeButton = screen.getByTestId("like-button");
    expect(likeButton).toBeDisabled();
  });
});
