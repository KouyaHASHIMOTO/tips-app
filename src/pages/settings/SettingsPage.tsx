import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import { MainLayout } from "../../components/templates/MainLayout";
import { Button } from "../../components/atoms/button/Button";
import { useNavigate } from "react-router-dom";

interface SettingsPageProps {
  user: User;
}

export const SettingsPage = ({ user }: SettingsPageProps) => {
  const navigate = useNavigate();

  // 選択した画像のプレビューURL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // 完了メッセージのstate
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("user_id", user.id)
        .single();

      if (data?.avatar_url) {
        setPreviewUrl(data.avatar_url);
      }
    };
    fetchProfile();
  }, [user.id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(user.id, file, { upsert: true });

    if (error) {
      console.error(error);
    } else {
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(user.id);

      //タイムスタンプを追加してキャッシュを回避
      const urlWithTimestamp = `${urlData.publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: urlWithTimestamp })
        .eq("user_id", user.id);

      if (!updateError) {
        setSuccessMessage("プロフィール画像を変更しました！");
      }
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

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    navigate("/login");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-base p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl border border-border p-6">
            <h1 className="text-xl font-bold mb-6 text-text-main">設定</h1>
            <div className="border-b border-border pb-6">
              <h2 className="text-lg font-semibold mb-4 text-text-main">
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
                  <span className="text-2xl font-bold text-text-muted">?</span>
                )}
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                >
                  画像を選択
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  data-testid="avatar-input"
                  onChange={(e) => {
                    handleFileSelect(e);
                    handleImageUpload(e);
                  }}
                />
              </div>
              {successMessage && (
                <p className="text-accent text-sm mt-2">{successMessage}</p>
              )}
            </div>
            <div className="pt-6">
              <h2 className="text-lg font-semibold mb-4 text-text-main">
                アカウント
              </h2>
              <Button onClick={signOut} variant="primary">
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
