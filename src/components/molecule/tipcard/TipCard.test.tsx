import { render, screen } from "@testing-library/react";
import { TipCard } from "./TipCard";

describe("TipCard", () => {
  test("タイトルが表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="ユーザー名"
        content="投稿内容"
        created_at="1111/11/11"
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
        created_at="1111/11/11"
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
        created_at="1111/11/11"
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
        created_at="1111/11/11"
      />
    );
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });
  test("投稿日時が表示されている", () => {
    render(
      <TipCard
        title="Tipタイトル"
        user_id="ユーザー名"
        content="投稿内容"
        created_at="1111/11/11"
      />
    );
    expect(screen.getByText("1111/11/11")).toBeInTheDocument();
  });
});
