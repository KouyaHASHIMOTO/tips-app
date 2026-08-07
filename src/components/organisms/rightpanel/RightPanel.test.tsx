import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RightPanel } from "./RightPanel";

describe("RightPanel", () => {
  test("投稿ボタンが表示されている", () => {
    render(
      <MemoryRouter>
        <RightPanel />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("button", { name: "+ Tipを投稿する" }),
    ).toBeInTheDocument();
  });
});
