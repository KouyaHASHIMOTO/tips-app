import type { User } from "@supabase/supabase-js";

interface ProfilePageProps {
  user: User;
}

export const ProfilePage = ({ user }: ProfilePageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div>
              <p className="text-gray-500 text-sm">メールアドレス</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">自分の投稿</h2>
        </div>
      </div>
    </div>
  );
};
