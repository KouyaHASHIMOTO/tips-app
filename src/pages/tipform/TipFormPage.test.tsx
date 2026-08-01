import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import userEvent from "@testing-library/user-event";
import { supabase } from "../../lib/supabase";
import { TipFormPage } from "./TipFormPage";

const mockUser = { id: "1" } as unknown as User;

describe("TipForm", () => {
  test("「新しいTippsを投稿する」というタイトルが表示されている", () => {
    render(
      <MemoryRouter>
        <TipFormPage user={mockUser} />
      </MemoryRouter>
    );
    expect(screen.getByText("新しいTippsを投稿する")).toBeInTheDocument();
  });
});
