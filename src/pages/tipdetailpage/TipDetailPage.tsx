import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useParams } from "react-router-dom";

export const TipDetailPage = () => {
  const [tip, setTip] = useState<{
    id: number;
    title: string;
    user_id: string;
    content: string;
    created_at: string;
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
  } | null>(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchTip = async () => {
      const { data, error } = await supabase
        .from("tips")
        .select(`*,more_tips (*),profiles (*)`)
        .eq("id", id)
        .single();

      console.log(data);

      if (error) {
        console.error(error);
        return;
      }

      setTip(data);
    };
    fetchTip();
  }, [id]);

  return <div></div>;
};
