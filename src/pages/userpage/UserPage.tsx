import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";
import { MainLayout } from "../../components/templates/MainLayout";
import { Avatar } from "../../components/atoms/avatar/Avatar";

interface UserPageProps {
  user: User;
}

export const UserPage = ({ user }: UserPageProps) => {
  const params = useParams();

  const [myTips, setMyTips] = useState<
    {
      id: number;
      title: string;
      user_id: string;
      content: string;
      created_at: string;
    }[]
  >([]);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyTips = async () => {
      const { data, error } = await supabase
        .from("tips")
        .select()
        .eq("user_id", params.userId)
        .order("created_at", { ascending: false });

      console.log(data);

      setMyTips(data ?? []);

      if (error) {
        console.error(error);
      }
    };

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("avatar_url,user_name")
        .eq("user_id", params.userId)
        .single();

      if (data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }

      if (data?.user_name) {
        setUserName(data.user_name);
      }
    };

    fetchMyTips();
    fetchProfile();
  }, [params.userId]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-base p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar src={avatarUrl ?? ""} alt={userName ?? ""} />
              <div>
                <p className="text-text-sub text-sm">ユーザー名</p>
                <p className="font-semibold text-text-main">
                  {userName ?? "ユーザー名未設定"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4 text-text-main">投稿一覧</h2>
            {myTips.length === 0 ? (
              <p className="text-text-sub text-center py-4">投稿がありません</p>
            ) : (
              myTips.map((tip) => (
                <div
                  key={tip.id}
                  className="border-b border-border py-4 last:border-none"
                >
                  <p className="font-semibold text-text-main">{tip.title}</p>
                  <p className="text-text-sub text-sm mt-1">{tip.content}</p>
                  <p className="text-text-muted text-xs mt-2">
                    {new Date(tip.created_at).toLocaleDateString("ja-JP")}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
