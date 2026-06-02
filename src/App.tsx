import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/login/LoginPage";
import { SignUpPage } from "./pages/signup/SignUpPage";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import type { User } from "@supabase/supabase-js";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    load();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
