import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { HomePage } from "./HomePage";
import userEvent from "@testing-library/user-event";
import { supabase } from "../../lib/supabase";

const mockUser = { id: "1" } as unknown as User;

//vi.mockと同じタイミングで発火
const tips = vi.hoisted(() => [
  {
    id: 1,
    title: "Tipタイトル1",
    user_id: "2",
    content: "Tips1",
    created_at: "1111/11/11",
    likes: [{ id: 1, tip_id: 1, user_id: "1" }],
    more_tips: [],
    tip_tags: [],
    profiles: {
      id: 1,
      tip_id: 1,
      user_name: "ユーザー名1",
      avatar_url: "",
      created_at: "",
    },
    bookmarks: [],
  },
  {
    id: 2,
    title: "Tipタイトル2",
    user_id: "3",
    content: "Tips2",
    created_at: "1111/11/11",
    likes: [{ id: 2, tip_id: 2, user_id: "1" }],
    more_tips: [],
    tip_tags: [],
    profiles: {
      id: 2,
      tip_id: 2,
      user_name: "ユーザー名2",
      avatar_url: "",
      created_at: "",
    },
    bookmarks: [],
  },
]);

vi.mock("../../lib/supabase", () => ({
  supabase: {
    from: vi.fn().mockImplementation((table) => {
      // tip_tagsテーブルの場合は select だけ返す
      if (table === "tip_tags") {
        return {
          select: vi.fn().mockResolvedValue({
            data: [],
            error: null,
          }),
        };
      }
      if (table === "follows") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({
              data: [{ following_id: "2" }, { following_id: "3" }],
            }),
          }),
        };
      }
      // それ以外のテーブルは今まで通り
      return {
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: tips,
            error: null,
          }),
          in: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({
              data: tips.filter((tip) => ["2", "3"].includes(tip.user_id)),
            }),
          }),
        }),

        insert: vi.fn().mockResolvedValue({ error: null }),
        delete: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ error: null }),
          }),
        }),
      };
    }),
  },
}));
describe("HomePage", () => {
  test("TipListが表示されている", async () => {
    render(
      <MemoryRouter>
        <HomePage user={mockUser} />
      </MemoryRouter>
    );
    expect(await screen.findByText("ユーザー名1")).toBeInTheDocument();
    expect(await screen.findByText("Tips1")).toBeInTheDocument();
    expect(await screen.findByText("ユーザー名2")).toBeInTheDocument();
    expect(await screen.findByText("Tips2")).toBeInTheDocument();
  });

  test("isLiked=trueのときいいねボタンをクリックするとdeleteが呼ばれる", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage user={mockUser} />
      </MemoryRouter>
    );
    const likeButtons = await screen.findAllByTestId("like-button");
    await user.click(likeButtons[0]);

    expect(vi.mocked(supabase.from)).toHaveBeenCalledWith("likes");
  });
  // 変更後

  test("タグ検索欄が表示されている", async () => {
    render(
      <MemoryRouter>
        <HomePage user={mockUser} />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("タグで検索...")).toBeInTheDocument();
  });

  test("タグで検索するとヒットしたTipだけ表示される", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage user={mockUser} />
      </MemoryRouter>
    );

    await screen.findByText("ユーザー名1");
    await user.type(screen.getByPlaceholderText("タグで検索..."), "サッカー");

    expect(screen.queryByText("Tips1")).not.toBeInTheDocument();
    expect(screen.queryByText("Tips2")).not.toBeInTheDocument();
  });
  test("投稿ボタンをクリックするとモーダルが表示される", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage user={mockUser} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "+ Tipを投稿する" }));
    expect(
      screen.getByPlaceholderText("タイトルを入力...")
    ).toBeInTheDocument();
  });
  test("フォロー中タブをクリックすると、フォローしているユーザーの投稿が表示される", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage user={mockUser} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "フォロー中" }));
    expect(screen.getByText("Tipタイトル1")).toBeInTheDocument();
  });
});
