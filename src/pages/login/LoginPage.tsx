import { useState } from "react";
import { Button } from "../../components/atoms/button/Button";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  onSubmit?: () => void;
}

export const LoginPage = ({ onSubmit }: LoginPageProps) => {
  const [mailAddress, setMailAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const loginUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: mailAddress,
      password: password,
    });

    if (error) {
      console.error(error);
      return;
    }

    onSubmit?.();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>
        <div className="flex flex-col gap-4">
          <input
            placeholder="メールアドレス"
            className="border border-gray-300 rounded p-2 outline-none"
            type="email"
            value={mailAddress}
            onChange={(e) => setMailAddress(e.target.value)}
          />
          <input
            placeholder="パスワード"
            type="password"
            className="border border-gray-300 rounded p-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={loginUser}>ログイン</Button>
        </div>
      </div>
    </div>
  );
};
