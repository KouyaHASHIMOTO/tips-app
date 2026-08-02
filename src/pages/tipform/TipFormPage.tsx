// src/pages/tipform/TipFormPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Upload } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { MainLayout } from "../../components/templates/MainLayout";
import { TipForm } from "../../components/molecule/tipform/TipForm";
import type { Category } from "../../constants/categories";

interface TipFormPageProps {
  user: User;
}

export const TipFormPage = ({ user }: TipFormPageProps) => {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("tip-images")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("tip-images")
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  };

  const createTip = async (
    title: string,
    content: string,
    category: Category,
    tags: string[],
    points: string[]
  ) => {
    const imageUrl = imageFile ? await uploadImage(imageFile) : null;

    const { data: tip, error } = await supabase
      .from("tips")
      .insert({
        title,
        content,
        category,
        user_id: user.id,
        image_url: imageUrl,
        points,
      })
      .select()
      .single();

    if (error || !tip) {
      console.error(error);
      return;
    }

    if (tags.length > 0) {
      for (const tagName of tags) {
        const { data: tag, error: tagError } = await supabase
          .from("tags")
          .upsert({ name: tagName }, { onConflict: "name" })
          .select()
          .single();

        if (tagError || !tag) continue;

        await supabase
          .from("tip_tags")
          .insert({ tip_id: tip.id, tag_id: tag.id });
      }
    }

    setIsSubmitted(true);
    setTimeout(() => navigate("/"), 1500);
  };

  const coverImagePanel = (
    <div>
      <p className="text-sm font-medium text-text-main mb-2">
        カバー画像（任意）
      </p>
      <label
        htmlFor="cover-image-upload"
        className="cursor-pointer flex flex-col items-center justify-center gap-1 border-2 border-dashed border-border rounded-xl h-48 hover:border-accent transition-colors overflow-hidden"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="プレビュー"
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <Upload className="size-5 text-text-muted mb-1" />
            <span className="text-sm text-text-sub">画像をアップロード</span>
            <span className="text-xs text-text-muted">
              またはドラッグ&ドロップ
            </span>
            <span className="text-xs text-text-muted mt-1">
              推奨サイズ 1200×650px
            </span>
          </>
        )}
      </label>
      <input
        id="cover-image-upload"
        type="file"
        accept="image/*"
        data-testid="cover-image-input"
        className="hidden"
        onChange={handleImageSelect}
      />
    </div>
  );

  return (
    <MainLayout rightPanel={coverImagePanel}>
      <div className="py-6">
        {/* ページヘッダー */}
        <div className="mb-6">
          <h1 className="text-lg font-bold text-text-main">
            新しいTippsを投稿する
          </h1>
          <p className="text-xs text-text-muted">
            あなたの「知ってよかった」をシェアしましょう。
          </p>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="bg-accent-light rounded-full p-4">
              <Lightbulb className="size-6 text-accent" />
            </div>
            <p className="text-text-main font-medium">投稿が完了しました！</p>
            <p className="text-sm text-text-muted">ホームに戻ります...</p>
          </div>
        ) : (
          <TipForm onSubmit={createTip} />
        )}
      </div>
    </MainLayout>
  );
};
