import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";
import { MainLayout } from "../../components/templates/MainLayout";
import { Avatar } from "../../components/atoms/avatar/Avatar";
import type { Category } from "../../constants/categories";
import { TipList } from "../../components/organisms/tiplist/TipList";
import { FollowButton } from "../../components/atoms/followbutton/FollowButton";

interface UserPageProps {
  user: User;
}

export const UserPage = ({ user }: UserPageProps) => {
  const params = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const [myTips, setMyTips] = useState<
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
      bookmarks: {
        id: number;
        tip_id: number;
        user_id: string;
        created_at: string;
      }[];
    }[]
  >([]);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // params.userIdが変わったときだけ関数を作り直す
  const fetchMyTips = useCallback(async () => {
    const { data, error } = await supabase
      .from("tips")
      .select(
        `*, likes(*),more_tips(*),profiles(*),tip_tags(tags(*)),bookmarks(*)`
      )
      .eq("user_id", params.userId)
      .order("created_at", { ascending: false });

    setMyTips(data ?? []);

    if (error) {
      console.error(error);
    }
  }, [params.userId]); // params.userIdが変わったら関数を作り直す

  useEffect(() => {
    const load = async () => {
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
      const fetchFollowStatus = async () => {
        const { data } = await supabase
          .from("follows")
          .select("id")
          .eq("follower_id", user.id)
          .eq("following_id", params.userId)
          .maybeSingle();

        setIsFollowing(!!data);
      };
      await fetchMyTips();
      await fetchProfile();
      await fetchFollowStatus();
    };
    load();
  }, [fetchMyTips, params.userId]);

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

    await fetchMyTips();
  };

  const addFollows = async (isFollowing: boolean) => {
    if (isFollowing) {
      // アンフォロー
      await supabase
        .from("follows")
        .delete()
        .eq("following_id", params.userId)
        .eq("follower_id", user.id);
    } else {
      // フォロー
      await supabase.from("follows").insert({
        follower_id: user.id,
        following_id: params.userId,
      });
    }
    setIsFollowing(!isFollowing);
  };

  const addBookmark = async (tipId: number, isBookmark: boolean) => {
    if (isBookmark) {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("tip_id", tipId)
        .eq("user_id", user.id);
      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("bookmarks")
        .insert({ tip_id: tipId, user_id: user.id });
      if (error) {
        console.error(error);
        return;
      }
    }
    await fetchMyTips();
  };

  const addMoreTip = async (tipId: number, content: string) => {
    const { error } = await supabase
      .from("more_tips")
      .insert({ tip_id: tipId, user_id: user.id, content: content });
    if (error) {
      console.error(error);
      return;
    }
    await fetchMyTips();
  };

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
              {user.id !== params.userId && (
                <FollowButton
                  isFollowing={isFollowing}
                  onClick={() => addFollows(isFollowing)}
                />
              )}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4 text-text-main">投稿一覧</h2>
            {myTips.length === 0 ? (
              <p className="text-text-sub text-center py-4">投稿がありません</p>
            ) : (
              <TipList
                tips={myTips}
                userId={user.id}
                onLike={addLike}
                onBookmark={addBookmark}
                onMoreTip={addMoreTip}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
