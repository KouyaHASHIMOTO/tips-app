import { useEffect, useState } from "react";
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

  const [tagSearch, setTagSearch] = useState("");
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [trendTags, setTrendTags] = useState<{ name: string; count: number }[]>(
    [],
  );

  const fetchTrendTags = async () => {
    const { data, error } = await supabase.from("tip_tags").select(`
    *,
    tags (
      *
    )
  `);

    if (!data) return;

    const countMap = data.reduce(
      (acc, current) => {
        const name = current.tags?.name;
        if (!name) return acc;
        acc[name] = (acc[name] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // countMap を「件数が多い順に並んだタグの配列」に変換する
    const trendTags = Object.entries(countMap)
      // オブジェクトを [キー, 値] の配列に変換
      .map(([name, count]) => ({ name, count: count as number }))
      // 件数が多い順（降順）に並び替え
      .sort((a, b) => b.count - a.count);

    setTrendTags(trendTags);
  };

  const fetchTips = async () => {
    const { data, error } = await supabase
      .from("tips")
      .select(
        `*, likes(*),more_tips(*),profiles(*),tip_tags(tags(*)),bookmarks(*)`,
      )
      .order("created_at", { ascending: false });
    setTips(data ?? []);

    if (error) {
      console.error(error);
    }
  };
  console.log(tips);

  useEffect(() => {
    const load = async () => {
      await fetchTips();
    };

    load();
    fetchTrendTags();
  }, []);

  const createTip = async (
    title: string,
    content: string,
    category: Category,
    tags: string[],
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
    await fetchTips();
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

    await fetchTips();
  };

  const addBookmark = async (tipId: number, isBookmark: boolean) => {
    if (isBookmark) {
      const response = await supabase
        .from("bookmarks")
        .delete()
        .eq("tip_id", tipId)
        .eq("user_id", user.id);
    } else {
      const { error } = await supabase
        .from("bookmarks")
        .insert({ tip_id: tipId, user_id: user.id });
    }
    await fetchTips();
  };

  const addMoreTip = async (tipId: number, content: string) => {
    const { error } = await supabase
      .from("more_tips")
      .insert({ tip_id: tipId, user_id: user.id, content: content });
    if (error) {
      console.error(error);
    }
    await fetchTips();
  };

  const filteredTips =
    tagSearch !== ""
      ? tips
          .filter((tip) =>
            tip.tip_tags.some((tt) => tt.tags?.name.includes(tagSearch)),
          )
          .filter((tip) => {
            if (!selectedCategory) {
              return true;
            } else {
              return tip.category === selectedCategory;
            }
          })
      : selectedCategory !== null
        ? tips.filter((tip) => tip.category === selectedCategory)
        : tips;
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
