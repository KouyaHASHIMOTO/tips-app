import { render, screen } from "@testing-library/react";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { MemoryRouter } from "react-router-dom";

const tips = [
  {
    id: 1,
    title: "Tipタイトル",
    user_id: "1",
    content: "Tips1",
    created_at: "1111/11/11",
    likes: [{ id: 1, tip_id: 1, user_id: "1" }],
    more_tips: [],
    profiles: {
      id: 1,
      tip_id: 1,
      user_name: "ユーザー名1",
      avatar_url: "",
      created_at: "",
    },
  },
  {
    id: 2,
    title: "Tipタイトル",
    user_id: "1",
    content: "Tips2",
    created_at: "1111/11/11",
    likes: [{ id: 2, tip_id: 2, user_id: "1" }],
    more_tips: [],
    profiles: {
      id: 2,
      tip_id: 2,
      user_name: "ユーザー名2",
      avatar_url: "",
      created_at: "",
    },
  },
];
describe("HomePage", () => {
  test("TipListが表示されている", () => {
    render(
      <MemoryRouter>
        <MainLayout>
          <TipList tips={tips} userId="1" />
        </MainLayout>
      </MemoryRouter>,
    );
    expect(screen.getByText("ユーザー名1")).toBeInTheDocument();
    expect(screen.getByText("Tips1")).toBeInTheDocument();
    expect(screen.getByText("ユーザー名2")).toBeInTheDocument();
    expect(screen.getByText("Tips2")).toBeInTheDocument();
  });
});
