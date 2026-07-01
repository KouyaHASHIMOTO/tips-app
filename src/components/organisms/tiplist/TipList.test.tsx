import { render, screen } from "@testing-library/react";
import { TipList } from "./TipList";

const tips = [
  {
    id: 1,
    title: "Tipタイトル",
    user_id: "1",
    content: "Tips1",
    created_at: "1111/11/11",
    likes: [{ id: 1, tip_id: 1, user_id: "1" }],
    more_tips: [],
    tip_tags: [],
    profiles: {
      id: 1,
      tip_id: 1,
      user_name: "ユーザー名1",
      avatar_url: "",
      created_at: "",
    },
    bookmarks: [],
    category: "スポーツ" as const,
  },
  {
    id: 2,
    title: "Tipタイトル",
    user_id: "1",
    content: "Tips2",
    created_at: "1111/11/11",
    likes: [{ id: 2, tip_id: 2, user_id: "1" }],
    more_tips: [],
    tip_tags: [],
    profiles: {
      id: 2,
      tip_id: 2,
      user_name: "ユーザー名2",
      avatar_url: "",
      created_at: "",
    },
    bookmarks: [],
    category: "スポーツ" as const,
  },
];

describe("TipList", () => {
  test("カードが複数表示されている", () => {
    render(<TipList tips={tips} userId="1" />);
    expect(screen.getByText("ユーザー名1")).toBeInTheDocument();
    expect(screen.getByText("ユーザー名2")).toBeInTheDocument();
  });
});
