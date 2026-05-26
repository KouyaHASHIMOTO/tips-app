import { useEffect } from "react";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { supabase } from "../../lib/supabase";

export const HomePage = () => {
  useEffect(() => {
    const { data, error } = await supabase.from("tips").select();
  }, []);

  return (
    <MainLayout>
      <TipList tips={data} />
    </MainLayout>
  );
};
