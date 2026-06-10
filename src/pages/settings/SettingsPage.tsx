import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { useState } from "react";
import { MainLayout } from "../../components/templates/MainLayout";

interface SettingsPageProps {
  user: User;
}

export const SettingsPage = ({ user }: SettingsPageProps) => {
  // 選択した画像のプレビューURL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // 完了メッセージのstate
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

      // アップロード成功後
      setSuccessMessage("プロフィール画像を変更しました！");
    }
  };

  // ファイル選択時にプレビューを表示
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // FileReaderでプレビューURLを生成
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-6">設定</h1>
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold mb-4">
                プロフィールアイコンの変更
              </h2>
              <div className="flex items-center gap-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    className="w-16 h-16 rounded-full object-cover"
                    alt="プレビュー"
                  />
                ) : (
                  <span className="text-2xl font-bold">?</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm text-gray-500"
                  onChange={(e) => {
                    handleFileSelect(e);
                    handleImageUpload(e);
                  }}
                />
              </div>
              {successMessage && (
                <p className="text-green-500 text-sm mt-2">{successMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
