import { render, screen } from "@testing-library/react";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";

const tips = [
  {
    id: 1,
    title: "Tipタイトル",
    user_id: "gajklga",
    content: "Tips1",
    created_at: "1111/11/11",
  },
  {
    id: 2,
    title: "Tipタイトル",
    user_id: "32ljgla",
    content: "Tips2",
    created_at: "1111/11/11",
  },
];
describe("HomePage", () => {
  test("TipListが表示されている", () => {
    render(
      <MainLayout>
        <TipList tips={tips} />
      </MainLayout>
    );
    expect(screen.getByText("gajklga")).toBeInTheDocument();
    expect(screen.getByText("Tips1")).toBeInTheDocument();
    expect(screen.getByText("32ljgla")).toBeInTheDocument();
    expect(screen.getByText("Tips2")).toBeInTheDocument();
  });
});
