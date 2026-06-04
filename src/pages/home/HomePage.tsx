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
        count: number;
      }[];
    }[]
  >([]);

  const fetchTips = async () => {
    const { data, error } = await supabase
      .from("tips")
      .select(`*, likes(count)`);
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
      console.error(error);
      return;
    }

    await fetchTips();
  };

  return (
    <MainLayout>
      <TipForm onSubmit={createTip} />
      <TipList tips={tips} onLike={addLike} />
    </MainLayout>
  );
};
