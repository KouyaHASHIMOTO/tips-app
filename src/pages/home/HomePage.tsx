import { useEffect, useState } from "react";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { supabase } from "../../lib/supabase";
import { TipForm } from "../../components/molecule/tipform/TipForm";

export const HomePage = () => {
  const [tips, setTips] = useState<
    {
      id: number;
      title: string;
      user_id: string;
      content: string;
      created_at: string;
    }[]
  >([]);
  useEffect(() => {
    const fetchTips = async () => {
      const { data, error } = await supabase.from("tips").select();
      setTips(data ?? []);

      if (error) {
        console.error(error);
      }
    };
    fetchTips();
  }, []);

  const createTip = async (title: string, content: string) => {
    const { error } = await supabase.from("tips").insert({
      title: title,
      user_id: "testユーザー",
      content: content,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <TipForm onSubmit={createTip} />
      <TipList tips={tips} />
    </MainLayout>
  );
};
