import { render, screen } from "@testing-library/react";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";

const tips = [
  {
    id: "1",
    userName: "山田太郎",
    content: "Tips1",
    likeCount: 5,
  },
  {
    id: "2",
    userName: "佐藤花子",
    content: "Tips2",
    likeCount: 5,
  },
];
describe("HomePage", () => {
  test("TipListが表示されている", () => {
    render(
      <MainLayout>
        <TipList tips={tips} />
      </MainLayout>
    );
    expect(screen.getByText("山田太郎")).toBeInTheDocument();
    expect(screen.getByText("Tips1")).toBeInTheDocument();
    expect(screen.getByText("佐藤花子")).toBeInTheDocument();
    expect(screen.getByText("Tips2")).toBeInTheDocument();
  });
});
