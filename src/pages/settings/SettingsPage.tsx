import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

interface SettingsPageProps {
  user: User;
}

export const SettingsPage = ({ user }: SettingsPageProps) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`private/${user.id}`, file, {
        upsert: true,
      });
    if (error) {
      console.error(error);
    } else {
      // 画像URLを取得
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(`private/${user.id}`);

      //profilesテーブルのavatar_urlを更新
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: urlData.publicUrl })
        .eq("user_id", user.id);

      if (updateError) {
        console.error(updateError);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-6">設定</h1>
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold mb-4">
              プロフィールアイコンの変更
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                ?
              </div>
              <input
                type="file"
                accept="image/*"
                className="text-sm text-gray-500"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
