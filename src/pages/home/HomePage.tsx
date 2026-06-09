import { useEffect, useState } from "react";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { supabase } from "../../lib/supabase";
import { TipForm } from "../../components/molecule/tipform/TipForm";
import type { User } from "@supabase/supabase-js";

interface HomePageProps {
  user: User;
}

export const HomePage = ({ user }: HomePageProps) => {
  const [tips, setTips] = useState<
    {
      id: number;
      title: string;
      user_id: string;
      content: string;
      created_at: string;
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
    }[]
  >([]);

  const fetchTips = async () => {
    const { data, error } = await supabase
      .from("tips")
      .select(`*, likes(*),more_tips(*),profiles(*)`)
      .order("created_at", { ascending: false });
    setTips(data ?? []);

    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchTips();
    };
    load();
  }, []);

  const createTip = async (title: string, content: string) => {
    const { error } = await supabase.from("tips").insert({
      title: title,
      user_id: user.id,
      content: content,
    });

    if (error) {
      console.error(error);
      return;
    }

    await fetchTips();
  };

  const addLike = async (tipId: number) => {
    const { error } = await supabase.from("likes").insert({
      tip_id: tipId,
      user_id: user.id,
    });
    if (error) {
      if (error.code === "23505") return;
      console.error(error);
      return;
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

  return (
    <MainLayout>
      <TipForm onSubmit={createTip} />
      <TipList
        tips={tips}
        onLike={addLike}
        onMoreTip={addMoreTip}
        userId={user.id}
      />
    </MainLayout>
  );
};
