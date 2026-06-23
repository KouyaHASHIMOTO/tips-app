import { useState } from "react";
import { Button } from "../../components/atoms/button/Button";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

interface LoginPageProps {
  onSubmit?: () => void;
}

export const LoginPage = ({ onSubmit }: LoginPageProps) => {
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const loginUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: mailAddress,
      password: password,
    });

    if (error) {
      console.error(error);
      setErrorMessage("メールアドレスまたはパスワードが正しくありません");
      return;
    }

    onSubmit?.();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="bg-card p-8 rounded-xl border border-border w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-text-main">
          ログイン
        </h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
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
            type="password"
            className="border border-border rounded-lg p-2 outline-none w-full focus:border-accent transition-colors"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">ログイン</Button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </form>
        <p className="text-center text-sm text-text-sub mt-4">
          アカウントをお持ちでない方は
          <Link to="/signup" className="text-accent hover:underline ml-1">
            こちら
          </Link>
        </p>
      </div>
    </div>
  );
};
