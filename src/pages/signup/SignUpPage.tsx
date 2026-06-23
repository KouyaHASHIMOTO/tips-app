import { useState } from "react";
import { Button } from "../../components/atoms/button/Button";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

interface SignUpPageProps {
  onSubmit?: () => void;
}

export const SignUpPage = ({ onSubmit }: SignUpPageProps) => {
  const [userName, setUserName] = useState("");

  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const createUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: mailAddress,
      password: password,
    });

    if (error) {
      console.error(error);
      if (error.code === "user_already_exists") {
        setErrorMessage("このメールアドレスは既に使用されています");
      } else if (error.code === "weak_password") {
        setErrorMessage("パスワードは6文字以上で入力してください");
      } else {
        setErrorMessage("アカウントの作成に失敗しました");
      }
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
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="bg-card p-8 rounded-xl border border-border w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-text-main">
          サインアップ
        </h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            createUser();
          }}
        >
          <input
            placeholder="ユーザー名"
            className="border border-border rounded-lg p-2 outline-none w-full focus:border-accent transition-colors"
            id="userName"
            name="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            placeholder="メールアドレス"
            className="border border-border rounded-lg p-2 outline-none w-full focus:border-accent transition-colors"
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
            className="border border-border rounded-lg p-2 outline-none w-full focus:border-accent transition-colors"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">サインアップ</Button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </form>
        <p className="text-center text-sm text-text-sub mt-4">
          アカウントをお持ちの方は
          <Link to="/login" className="text-accent hover:underline ml-1">
            こちら
          </Link>
        </p>
      </div>
    </div>
  );
};
