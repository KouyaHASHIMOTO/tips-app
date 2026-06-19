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
    <header className="fixed top-0 left-0 right-0 h-14 bg-cream border-b-[3px] border-brown flex items-center justify-between px-4 z-50">
      <h1 className="text-xl font-bold text-brown">Tips</h1>
      <Button onClick={signOut}>ログアウト</Button>
    </header>
  );
};
