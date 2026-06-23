import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import { Button } from "../../atoms/button/Button";

export const Header = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-card border-b border-border flex items-center justify-between px-6 z-50">
      <h1 className="text-xl font-bold text-text-main">Tipps</h1>
      <Button onClick={signOut} variant="primary">
        ログアウト
      </Button>
    </header>
  );
};
