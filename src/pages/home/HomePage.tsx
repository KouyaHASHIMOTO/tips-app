import { useEffect, useState } from "react";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { MainLayout } from "../../components/templates/MainLayout";
import { supabase } from "../../lib/supabase";
import { TipForm } from "../../components/molecule/tipform/TipForm";
import type { User } from "@supabase/supabase-js";
import { CATEGORIES, type Category } from "../../constants/categories";

interface HomePageProps {
  user: User;
}

export const HomePage = ({ user }: HomePageProps) => {
  const [tips, setTips] = useState<
    {
      id: number;
      title: string;
      user_id: string;
      content: string;
      created_at: string;
      category: Category;
      likes: {
        id: number;
        tip_id: number;
        user_id: string;
      }[];
      more_tips: {
        id: number;
        tip_id: number;
        user_id: string;
        content: string;
        created_at: string;
      }[];

      tip_tags: {
        tags: {
          name: string;
        } | null;
      }[];
      profiles: {
        id: number;
        tip_id: number;
        user_name: string;
        avatar_url: string;
        created_at: string;
      } | null;
    }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "すべて">(
    "すべて",
  );

  const [tagSearch, setTagSearch] = useState("");

  const fetchTips = async () => {
    const { data, error } = await supabase
      .from("tips")
      .select(`*, likes(*),more_tips(*),profiles(*),tip_tags(tags(*))`)
      .order("created_at", { ascending: false });
    setTips(data ?? []);

    console.log(data);

    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchTips();
    };
    load();
  }, []);

  const createTip = async (
    title: string,
    content: string,
    category: Category,
    tags: string[],
  ) => {
    // まずTipを保存
    const { data: tip, error } = await supabase
      .from("tips")
      .insert({ title, content, category, user_id: user.id })
      .select()
      .single();

    if (error || !tip) {
      console.error(error);
      return;
    }

    // タグが1つ以上あれば保存する
    if (tags.length > 0) {
      for (const tagName of tags) {
        // ① tagsテーブルにタグを登録（同じ名前がすでにあればそのまま取得）
        const { data: tag, error: tagError } = await supabase
          .from("tags")
          .upsert({ name: tagName }, { onConflict: "name" })
          .select()
          .single();

        if (tagError || !tag) continue;

        // ② tip_tagsテーブルに対応を保存
        await supabase
          .from("tip_tags")
          .insert({ tip_id: tip.id, tag_id: tag.id });
      }
    }

    await fetchTips();
  };

  const addLike = async (tipId: number, isLiked: boolean) => {
    if (isLiked) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("tip_id", tipId)
        .eq("user_id", user.id);
      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from("likes").insert({
        tip_id: tipId,
        user_id: user.id,
      });
      if (error) {
        if (error.code === "23505") return;
        console.error(error);
        return;
      }
    }

    await fetchTips();
  };

  const addMoreTip = async (tipId: number, content: string) => {
    const { error } = await supabase
      .from("more_tips")
      .insert({ tip_id: tipId, user_id: user.id, content: content });
    if (error) {
      console.error(error);
    }
    await fetchTips();
  };

  // 変更後
  const filteredTips =
    selectedCategory === "すべて"
      ? tips
      : tips.filter((tip) => tip.category === selectedCategory);

  return (
    <MainLayout>
      <TipForm onSubmit={createTip} />
      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value as Category | "すべて")
        }
        className="mb-4 p-2 border border-border rounded-lg text-text-main bg-card outline-none"
        data-testid="category-filter"
      >
        <option value="すべて">すべて</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <TipList
        tips={filteredTips}
        onLike={addLike}
        onMoreTip={addMoreTip}
        userId={user.id}
      />
    </MainLayout>
  );
};
