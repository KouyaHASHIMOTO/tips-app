import { useEffect, useState } from "react";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { supabase } from "../../lib/supabase";

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

  return (
    <MainLayout>
      <TipList tips={tips} />
    </MainLayout>
  );
};
