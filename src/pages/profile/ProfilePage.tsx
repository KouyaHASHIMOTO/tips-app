import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { MainLayout } from "../../components/templates/MainLayout";

interface ProfilePageProps {
  user: User;
}

export const ProfilePage = ({ user }: ProfilePageProps) => {
  const [myTips, setMyTips] = useState<
    {
      id: number;
      title: string;
      user_id: string;
      content: string;
      created_at: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchMyTips = async () => {
      const { data, error } = await supabase
        .from("tips")
        .select()
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setMyTips(data ?? []);

      if (error) {
        console.error(error);
      }
    };

    fetchMyTips();
  }, [user.id]);
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {user.email?.[0].toUpperCase() ?? "?"}
              </div>
              <div>
                <p className="text-gray-500 text-sm">メールアドレス</p>
                <p className="font-semibold">
                  {user.email ?? "メールアドレスが未設定"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">自分の投稿</h2>
            {myTips.length === 0 ? (
              <p className="text-gray-500 text-center py-4">投稿がありません</p>
            ) : (
              myTips.map((tip) => (
                <div
                  key={tip.id}
                  className="border-b border-gray-200 py-4 last:border-none"
                >
                  <p className="font-semibold">{tip.title}</p>
                  <p className="text-gray-600 text-sm mt-1">{tip.content}</p>
                  <p className="text-gray-400 text-xs mt-2">
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
