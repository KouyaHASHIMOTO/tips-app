import { render, screen } from "@testing-library/react";
import { SavedPage } from "./SavedPage";
import type { User } from "@supabase/supabase-js";

const mockUser = { id: "1" } as unknown as User;

const tips = vi.hoisted(() => [
  {
    id: 34,
    content: "サッカー日本敗戦",
    user_id: "b4d471fd-eaf7-4158-9489-89bffed933c3",
    created_at: "2026-06-30T13:34:24.618179+00:00",
    title: "サッカー",
    category: "スポーツ" as const,
    likes: [
      {
        id: 38,
        tip_id: 34,
        user_id: "b4d471fd-eaf7-4158-9489-89bffed933c3",
      },
    ],
    more_tips: [],
    profiles: {
      id: 1,
      user_id: "b4d471fd-eaf7-4158-9489-89bffed933c3",
      user_name: "てるぼう",
      avatar_url:
        "https://taslyhlvaoakfzhzcufe.supabase.co/storage/v1/object/public/avatars/b4d471fd-eaf7-4158-9489-89bffed933c3?t=1781075273877",
      created_at: "2026-06-08T08:13:52.074827+00:00",
    },
    tip_tags: [
      {
        tags: {
          id: 1,
          name: "サッカー",
          created_at: "2026-06-25T03:13:47.071676+00:00",
        },
      },
    ],
    bookmarks: [
      {
        id: 5,
        tip_id: 34,
        user_id: "b4d471fd-eaf7-4158-9489-89bffed933c3",
        created_at: "2026-07-01T08:03:07.353339+00:00",
      },
    ],
  },
  {
    id: 35,
    content: "サッカー応援",
    user_id: "b4d471fd-eaf7-4158-9489-89bffed933c3",
    created_at: "2026-06-30T13:57:50.626357+00:00",
    title: "サッカー",
    category: "スポーツ" as const,
    likes: [
      {
        id: 40,
        tip_id: 35,
        user_id: "b4d471fd-eaf7-4158-9489-89bffed933c3",
      },
    ],
    more_tips: [],
    profiles: {
      id: 1,
      user_id: "b4d471fd-eaf7-4158-9489-89bffed933c3",
      user_name: "てるぼう",
      avatar_url:
        "https://taslyhlvaoakfzhzcufe.supabase.co/storage/v1/object/public/avatars/b4d471fd-eaf7-4158-9489-89bffed933c3?t=1781075273877",
      created_at: "2026-06-08T08:13:52.074827+00:00",
    },
    tip_tags: [
      {
        tags: {
          id: 1,
          name: "サッカー",
          created_at: "2026-06-25T03:13:47.071676+00:00",
        },
      },
    ],
    bookmarks: [],
  },
]);

vi.mock("../../lib/supabase", () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: tips,
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
    render(<SavedPage user={mockUser} />);
    expect(await screen.findByText("サッカー日本敗戦")).toBeInTheDocument();
  });
});
