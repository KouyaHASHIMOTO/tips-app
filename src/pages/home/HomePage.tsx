import { useCallback, useEffect, useState } from "react";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { supabase } from "../../lib/supabase";
import { TipForm } from "../../components/molecule/tipform/TipForm";
import type { User } from "@supabase/supabase-js";
import { type Category } from "../../constants/categories";
import { useSearchParams } from "react-router-dom";
import { RightPanel } from "../../components/organisms/rightpanel/RightPanel";

interface HomePageProps {
  user: User;
}

export const HomePage = ({ user }: HomePageProps) => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") as Category | null;

  const [tips, setTips] = useState<
    {
      id: number;
      title: string;
      user_id: string;
      content: string;
      created_at: string;
      category: Category;
      likes: {
        id: number;
        tip_id: number;
        user_id: string;
      }[];
      more_tips: {
        id: number;
        tip_id: number;
        user_id: string;
        content: string;
        created_at: string;
      }[];

      tip_tags: {
        tags: {
          name: string;
        } | null;
      }[];
      profiles: {
        id: number;
        tip_id: number;
        user_name: string;
        avatar_url: string;
        created_at: string;
      } | null;
      bookmarks: {
        id: number;
        tip_id: number;
        user_id: string;
        created_at: string;
      }[];
    }[]
  >([]);

  const [activeTab, setActiveTab] = useState<
    "following" | "new" | "popular" | "saved"
  >("new");

  const [tagSearch, setTagSearch] = useState("");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [trendTags, setTrendTags] = useState<{ name: string; count: number }[]>(
    []
  );

  const fetchTrendTags = async () => {
    const { data, error } = await supabase.from("tip_tags").select(`
    *,
    tags (
      *
    )
  `);

    if (error) {
      console.error(error);
      return;
    }

    if (!data) return;

    const countMap = data.reduce((acc, current) => {
      const name = current.tags?.name;
      if (!name) return acc;
      acc[name] = (acc[name] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // countMap を「件数が多い順に並んだタグの配列」に変換する
    const trendTags = Object.entries(countMap)
      // オブジェクトを [キー, 値] の配列に変換
      .map(([name, count]) => ({ name, count: count as number }))
      // 件数が多い順（降順）に並び替え
      .sort((a, b) => b.count - a.count);

    setTrendTags(trendTags);
  };

  const fetchTips = useCallback(async () => {
    const { data, error } = await supabase
      .from("tips")
      .select(
        `*, likes(*),more_tips(*),profiles(*),tip_tags(tags(*)),bookmarks(*)`
      )
      .order("created_at", { ascending: false });
    setTips(data ?? []);

    if (error) {
      console.error(error);
    }
  }, []);

  //フォロー中の投稿一覧
  const fetchFollowingTips = useCallback(async () => {
    const { data: followingUsers } = await supabase
      .from("follows")
      .select("following_id")
      .eq("follower_id", user.id);

    const followingIds = followingUsers?.map((follow) => follow.following_id);

    const { data } = await supabase
      .from("tips")
      .select(
        `*, likes(*), more_tips(*), profiles(*), tip_tags(tags(*)), bookmarks(*)`
      )
      .in("user_id", followingIds ?? [])
      .order("created_at", { ascending: false });

    setTips(data ?? []);
  }, [user.id]);

  const refetchTips = async () => {
    if (activeTab === "following") {
      await fetchFollowingTips();
    } else {
      await fetchTips();
    }
  };

  useEffect(() => {
    const load = async () => {
      if (activeTab === "following") {
        await fetchFollowingTips();
      } else {
        await fetchTips();
      }
      await fetchTrendTags();
    };

    load();
  }, [activeTab, fetchFollowingTips, fetchTips]);

  const createTip = async (
    title: string,
    content: string,
    category: Category,
    tags: string[]
  ) => {
    // まずTipを保存
    const { data: tip, error } = await supabase
      .from("tips")
      .insert({ title, content, category, user_id: user.id })
      .select()
      .single();

    if (error || !tip) {
      console.error(error);
      return;
    }

    // タグが1つ以上あれば保存する
    if (tags.length > 0) {
      for (const tagName of tags) {
        // ① tagsテーブルにタグを登録（同じ名前がすでにあればそのまま取得）
        const { data: tag, error: tagError } = await supabase
          .from("tags")
          .upsert({ name: tagName }, { onConflict: "name" })
          .select()
          .single();

        if (tagError || !tag) continue;

        // ② tip_tagsテーブルに対応を保存
        await supabase
          .from("tip_tags")
          .insert({ tip_id: tip.id, tag_id: tag.id });
      }
    }
    setIsPostModalOpen(false);
    await refetchTips();
    await fetchTrendTags();
  };

  const addLike = async (tipId: number, isLiked: boolean) => {
    if (isLiked) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("tip_id", tipId)
        .eq("user_id", user.id);
      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from("likes").insert({
        tip_id: tipId,
        user_id: user.id,
      });
      if (error) {
        if (error.code === "23505") return;
        console.error(error);
        return;
      }
    }

    await refetchTips();
  };

  const addBookmark = async (tipId: number, isBookmark: boolean) => {
    if (isBookmark) {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("tip_id", tipId)
        .eq("user_id", user.id);

      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("bookmarks")
        .insert({ tip_id: tipId, user_id: user.id });

      if (error) {
        console.error(error);
        return;
      }
    }

    await refetchTips();
  };

  const addMoreTip = async (tipId: number, content: string) => {
    const { error } = await supabase
      .from("more_tips")
      .insert({ tip_id: tipId, user_id: user.id, content: content });
    if (error) {
      console.error(error);
    }
    await refetchTips();
  };

  // activeTabに応じて並び替えたTip一覧
  const sortedTips =
    activeTab === "popular"
      ? [...tips].sort((a, b) => b.likes.length - a.likes.length)
      : activeTab === "saved"
      ? [...tips].sort((a, b) => b.bookmarks.length - a.bookmarks.length)
      : tips;

  const filteredTips =
    tagSearch !== ""
      ? sortedTips
          .filter((tip) =>
            tip.tip_tags.some((tt) => tt.tags?.name.includes(tagSearch))
          )
          .filter((tip) => {
            if (!selectedCategory) {
              return true;
            } else {
              return tip.category === selectedCategory;
            }
          })
      : selectedCategory !== null
      ? sortedTips.filter((tip) => tip.category === selectedCategory)
      : sortedTips;
  return (
    <MainLayout
      rightPanel={
        <RightPanel
          trendTags={trendTags}
          onTagSearch={(tag) => setTagSearch(tag)}
          onPostClick={() => setIsPostModalOpen(true)}
        />
      }
    >
      {/* 投稿モーダル */}
      {isPostModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={() => setIsPostModalOpen(false)}
        >
          <div
            className="bg-card rounded-xl p-6 w-full max-w-lg mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-text-main">Tipを投稿する</h2>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="text-text-muted hover:text-text-main"
              >
                ✕
              </button>
            </div>
            <TipForm onSubmit={createTip} />
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("new")}
          className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "new"
              ? "bg-accent text-white"
              : "text-text-sub hover:bg-border"
          }`}
        >
          新着
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "following"
              ? "bg-accent text-white"
              : "text-text-sub hover:bg-border"
          }`}
        >
          フォロー中
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "popular"
              ? "bg-accent text-white"
              : "text-text-sub hover:bg-border"
          }`}
        >
          人気
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === "saved"
              ? "bg-accent text-white"
              : "text-text-sub hover:bg-border"
          }`}
        >
          保存数
        </button>
      </div>
      <TipList
        tips={filteredTips}
        onLike={addLike}
        onBookmark={addBookmark}
        onMoreTip={addMoreTip}
        userId={user.id}
      />
    </MainLayout>
  );
};
