import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import type { Category } from "../../constants/categories";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { SavedRightPanel } from "../../components/organisms/savedrightpanel/SavedRightPanel";

interface SavedPageProps {
  user: User;
}

export const SavedPage = ({ user }: SavedPageProps) => {
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

      profiles: {
        id: number;
        user_id: string;
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

  const fetchSavedTips = async () => {
    const { data, error } = await supabase
      .from("tips")
      .select(
        "*, likes(*),more_tips(*),profiles(*), bookmarks!inner(*)",
      )
      .eq("bookmarks.user_id", user.id);

    setTips(data ?? []);
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

    await fetchSavedTips();
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
    await fetchSavedTips();
  };

  const addMoreTip = async (tipId: number, content: string) => {
    const { error } = await supabase
      .from("more_tips")
      .insert({ tip_id: tipId, user_id: user.id, content: content });
    if (error) {
      console.error(error);
    }
    await fetchSavedTips();
  };

  const categoryCounts: { category: Category; count: number }[] =
    Object.entries(
      tips.reduce(
        (acc, tip) => {
          acc[tip.category] = (acc[tip.category] ?? 0) + 1;
          return acc;
        },
        {} as Record<Category, number>,
      ),
    ).map(([category, count]) => ({
      category: category as Category,
      count: count as number,
    }));

  useEffect(() => {
    const load = async () => {
      await fetchSavedTips();
    };
    load();
  }, []);
  return (
    <MainLayout
      rightPanel={<SavedRightPanel categoryCounts={categoryCounts} />}
    >
      {/* ページヘッダー */}
      <div className="flex items-center gap-2 mb-6">
        <Bookmark size={20} className="text-accent" />
        <h2 className="text-lg font-bold text-text-main">保存済み</h2>
      </div>

      {tips.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="bg-accent-light rounded-full p-5">
            <Bookmark size={28} className="text-accent" />
          </div>
          <p className="text-text-main font-medium">保存したTipがありません</p>
          <p className="text-sm text-text-muted">
            気になるTipを保存してあとで読み返しましょう
          </p>
        </div>
      ) : (
        <TipList
          tips={tips}
          onLike={addLike}
          onBookmark={addBookmark}
          onMoreTip={addMoreTip}
          userId={user.id}
        />
      )}
    </MainLayout>
  );
};
