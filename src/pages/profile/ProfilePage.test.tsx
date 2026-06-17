import { render, screen } from "@testing-library/react";
import { ProfilePage } from "./ProfilePage";
import type { User } from "@supabase/supabase-js";
import { MemoryRouter } from "react-router-dom";
import { supabase } from "../../lib/supabase";

vi.mock("../../lib/supabase", () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: null,
          }),
          order: vi.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        }),
      }),
    }),
  },
}));

describe("ProfilePage", () => {
  const mockUser = { email: "test@gmail.com" } as unknown as User;

  test("メールアドレスが表示されている", () => {
    render(
      <MemoryRouter>
        <ProfilePage user={mockUser} />
      </MemoryRouter>,
    );

    expect(screen.getByText("test@gmail.com")).toBeInTheDocument();
  });
  test("自分の投稿一覧が表示されている", () => {
    render(
      <MemoryRouter>
        <ProfilePage user={mockUser} />
      </MemoryRouter>,
    );

    expect(screen.getByText("自分の投稿")).toBeInTheDocument();
  });
  test("avatar_urlがある場合はアバター画像が表示される", async () => {
    vi.mocked(
      supabase.from("").select("").eq("", "").single,
    ).mockResolvedValueOnce({
      data: { avatar_url: "https://example.com/avatar.jpg" },
      error: null,
      count: null,
      status: 200,
      statusText: "OK",
      success: true,
    });
    render(
      <MemoryRouter>
        <ProfilePage user={mockUser} />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("img")).toBeInTheDocument();
  });
});
