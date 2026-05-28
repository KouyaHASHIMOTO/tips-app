import { render, screen } from "@testing-library/react";
import { TipCard } from "./TipCard";

describe("TipCard", () => {
  test("タイトルが表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
      />
    );
    expect(screen.getByText("Tipタイトル")).toBeInTheDocument();
  });
  test("ユーザー名が表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
      />
    );
    expect(screen.getByText("ユーザー名")).toBeInTheDocument();
  });
  test("投稿内容が表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
      />
    );
    expect(screen.getByText("投稿内容")).toBeInTheDocument();
  });
  test("いいね数が表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
      />
    );
    expect(screen.getByText(/❤️ 5/)).toBeInTheDocument();
  });
  test("投稿日時が表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="ユーザー名"
        content="投稿内容"
        created_at="2026-05-28T07:32:56.062504+00:00"
      />
    );
    expect(screen.getByText("2026/5/28")).toBeInTheDocument();
  });
});
