import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { UserPage } from "./UserPage";

const mockUser = { id: "abc123" } as unknown as User;

const mockTips = vi.hoisted(() => {
  const TEST_USER_ID = "test-user-id-00000000-0000-0000-0000-000000000001";
  const TEST_CREATED_AT = "2026-01-01T00:00:00.000000+00:00";
  return [
    {
      id: 1,
      content: "user_idの一致する投稿です",
      user_id: "abc123",
      created_at: TEST_CREATED_AT,
      title: "テスト１",
      category: "スポーツ",
    },
    {
      id: 2,
      content: "user_idの一致しない投稿です",
      user_id: TEST_USER_ID,
      created_at: TEST_CREATED_AT,
      title: "テスト２",
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
            eq: vi.fn().mockImplementation((column, userId) => {
              return {
                order: vi.fn().mockResolvedValue({
                  data: mockTips.filter((tip) => tip.user_id === userId),
                  error: null,
                }),
              };
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
  test("user_idが一致する投稿が表示されている", async () => {
    render(
      // 最初にアクセスするURLを指定する
      <MemoryRouter initialEntries={["/users/abc123"]}>
        <Routes>
          {/* :userId が実際のURLの値に置き換わる */}
          <Route path="/users/:userId" element={<UserPage user={mockUser} />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      await screen.findByText("user_idの一致する投稿です"),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("user_idの一致しない投稿です"),
    ).not.toBeInTheDocument();
  });
});
