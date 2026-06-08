import { useState } from "react";
import { Button } from "../../components/atoms/button/Button";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

interface SignUpPageProps {
  onSubmit?: () => void;
}

export const SignUpPage = ({ onSubmit }: SignUpPageProps) => {
  const [userName, setUserName] = useState("");

  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: mailAddress,
      password: password,
    });

    if (error) {
      console.error(error);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ user_id: data.user?.id, user_name: userName });

    if (profileError) {
      console.error(profileError);
      return;
    }

    onSubmit?.();
    navigate("/"); // ホームへ遷移
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">サインアップ</h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            createUser();
          }}
        >
          <input
            placeholder="ユーザー名"
            className="border border-gray-300 rounded p-2 outline-none"
            id="userName"
            name="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            placeholder="メールアドレス"
            className="border border-gray-300 rounded p-2 outline-none"
            id="email"
            name="email"
            type="email"
            value={mailAddress}
            onChange={(e) => setMailAddress(e.target.value)}
          />
          <input
            placeholder="パスワード"
            id="password"
            name="password"
            type="password"
            className="border border-gray-300 rounded p-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">サインアップ</Button>
        </form>
      </div>
    </div>
  );
};
