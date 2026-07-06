import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { UserPage } from "./UserPage";

const mockUser = { id: "1" } as unknown as User;

const mockTips = vi.hoisted(() => {
  const TEST_USER_ID = "test-user-id-00000000-0000-0000-0000-000000000001";
  const TEST_CREATED_AT = "2026-01-01T00:00:00.000000+00:00";
  return [
    {
      id: 35,
      content: "サッカー応援",
      user_id: "b4d471fd-eaf7-4158-9489-89bffed933c3",
      created_at: "2026-06-30T13:57:50.626357+00:00",
      title: "サッカー",
      category: "スポーツ",
    },
    {
      id: 35,
      content: "サッカー応援",
      user_id: "b4d471fd-eaf7-4158-9489-89bffed933c3",
      created_at: "2026-06-30T13:57:50.626357+00:00",
      title: "サッカー",
      category: "スポーツ",
    },
  ];
});

vi.mock("../../lib/supabase", () => ({
  supabase: {
    from: vi.fn().mockImplementation((table) => {
      if (table === "tips") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              order: vi.fn().mockResolvedValue({
                data: mockTips,
                error: null,
              }),
            }),
          }),
        };
      }
      if (table === "profiles") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { avatar_url: "...", user_name: "..." },
                error: null,
              }),
            }),
          }),
        };
      }
    }),
  },
}));

describe("UserPage", () => {
  test("投稿が表示されている", async () => {
    render(
      // 最初にアクセスするURLを指定する
      <MemoryRouter initialEntries={["/users/abc123"]}>
        <Routes>
          {/* :userId が実際のURLの値に置き換わる */}
          <Route path="/users/:userId" element={<UserPage user={mockUser} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("サッカー日本敗戦")).toBeInTheDocument();
  });
});
