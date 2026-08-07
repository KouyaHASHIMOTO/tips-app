import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { supabase } from "../../lib/supabase";
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
  const navigate = useNavigate();

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

  const fetchTips = useCallback(async () => {
    const { data, error } = await supabase
      .from("tips")
      .select(
        `*, likes(*),more_tips(*),profiles(*),bookmarks(*)`
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
        `*, likes(*), more_tips(*), profiles(*), bookmarks(*)`
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
    };

    load();
  }, [activeTab, fetchFollowingTips, fetchTips]);

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
    selectedCategory !== null
      ? sortedTips.filter((tip) => tip.category === selectedCategory)
      : sortedTips;

  return (
    <MainLayout
      rightPanel={
        <RightPanel
          onPostClick={() => navigate("/post")}
        />
      }
    >
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
