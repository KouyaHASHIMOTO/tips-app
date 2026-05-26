import { render, screen } from "@testing-library/react";
import { TipCard } from "./TipCard";

describe("TipCard", () => {
  test("ユーザー名が表示されている", () => {
    render(<TipCard userName="ユーザー名" content="投稿内容" likeCount={5} />);
    expect(screen.getByText("ユーザー名")).toBeInTheDocument();
  });
  test("投稿内容が表示されている", () => {
    render(<TipCard userName="ユーザー名" content="投稿内容" likeCount={5} />);
    expect(screen.getByText("投稿内容")).toBeInTheDocument();
  });
  test("いいね数が表示されている", () => {
    render(<TipCard userName="ユーザー名" content="投稿内容" likeCount={5} />);
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });
});
