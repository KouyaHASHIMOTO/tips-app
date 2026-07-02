import { useEffect, useState } from "react";
import type { Category } from "../../constants/categories";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

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
      .select("*, orchestral_sections!inner(name)")
      .eq("orchestral_sections.name", "woodwinds");

    setTips(data ?? []);
  };

  useEffect(() => {
    const load = async () => {
      await fetchSavedTips();
    };
    load();
  }, []);
  return <div></div>;
};
