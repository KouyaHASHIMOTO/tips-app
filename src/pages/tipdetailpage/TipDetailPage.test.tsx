import { render, screen } from "@testing-library/react";
import { TipDetailPage } from "./TipDetailPage";

describe("TipDetailPage", () => {
  test("Tipの内容が表示されている", () => {
    render(<TipDetailPage />);

    expect(screen.getByText("Tipの内容です")).toBeInTheDocument();
  });

  test("MoreTipsの内容が表示されている", () => {
    render(<TipDetailPage />);

    expect(screen.getByText("MoreTipsの内容です")).toBeInTheDocument();
  });
});
