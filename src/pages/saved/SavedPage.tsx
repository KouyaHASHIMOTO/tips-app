import { useEffect, useState } from "react";
import type { Category } from "../../constants/categories";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { MemoryRouter } from "react-router-dom";

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

  const fetchSavedTips = async () => {
    const { data, error } = await supabase
      .from("tips")
      .select(
        "*, likes(*),more_tips(*),profiles(*),tip_tags(tags(*)), bookmarks!inner(*)"
      )
      .eq("bookmarks.user_id", user.id);

    console.log(data);

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

  useEffect(() => {
    const load = async () => {
      await fetchSavedTips();
    };
    load();
  }, []);
  return (
    <MemoryRouter>
      <MainLayout>
        <TipList
          tips={tips}
          onLike={addLike}
          onBookmark={addBookmark}
          onMoreTip={addMoreTip}
          userId={user.id}
        />
      </MainLayout>
    </MemoryRouter>
  );
};
