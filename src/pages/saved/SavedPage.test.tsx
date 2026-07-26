import { render, screen } from "@testing-library/react";
import { SavedPage } from "./SavedPage";
import type { User } from "@supabase/supabase-js";
import { MemoryRouter } from "react-router-dom";

const mockUser = { id: "1" } as unknown as User;

const mockTips = vi.hoisted(() => {
  const TEST_USER_ID = "test-user-id-00000000-0000-0000-0000-000000000001";
  const TEST_CREATED_AT = "2026-01-01T00:00:00.000000+00:00";
  return [
    {
      id: 1,
      content: "テスト投稿１（ブックマーク済み）",
      user_id: TEST_USER_ID,
      created_at: TEST_CREATED_AT,
      title: "テストタイトル１",
      category: "テクノロジー" as const,
      likes: [
        {
          id: 1,
          tip_id: 1,
          user_id: TEST_USER_ID,
        },
      ],
      more_tips: [],
      profiles: {
        id: 1,
        user_id: TEST_USER_ID,
        user_name: "テストユーザー",
        avatar_url: "https://example.com/test-avatar.png",
        created_at: TEST_CREATED_AT,
      },
      tip_tags: [
        {
          tags: {
            id: 1,
            name: "テストタグ",
            created_at: TEST_CREATED_AT,
          },
        },
      ],
      bookmarks: [
        {
          id: 1,
          tip_id: 1,
          user_id: TEST_USER_ID,
          created_at: TEST_CREATED_AT,
        },
      ],
    },
    {
      id: 2,
      content: "テスト投稿２（ブックマークなし）",
      user_id: TEST_USER_ID,
      created_at: TEST_CREATED_AT,
      title: "テストタイトル２",
      category: "雑学" as const,
      likes: [
        {
          id: 2,
          tip_id: 2,
          user_id: TEST_USER_ID,
        },
      ],
      more_tips: [],
      profiles: {
        id: 1,
        user_id: TEST_USER_ID,
        user_name: "テストユーザー",
        avatar_url: "https://example.com/test-avatar.png",
        created_at: TEST_CREATED_AT,
      },
      tip_tags: [
        {
          tags: {
            id: 1,
            name: "テストタグ",
            created_at: TEST_CREATED_AT,
          },
        },
      ],
      bookmarks: [],
    },
  ];
});

vi.mock("../../lib/supabase", () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: mockTips,
          error: null,
        }),
      }),
      insert: vi.fn().mockResolvedValue({ error: null }),
      delete: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null }),
        }),
      }),
    }),
  },
}));

describe("SavePage", () => {
  test("保存している投稿のみが表示されている", async () => {
    render(
      <MemoryRouter>
        <SavedPage user={mockUser} />
      </MemoryRouter>
    );
    expect(
      await screen.findByText("テスト投稿１（ブックマーク済み）")
    ).toBeInTheDocument();
  });
});
