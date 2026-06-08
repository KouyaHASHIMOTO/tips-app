import { render, screen } from "@testing-library/react";
import { ProfilePage } from "./ProfilePage";
import type { User } from "@supabase/supabase-js";

describe("ProfilePage", () => {
  test("メールアドレスが表示されている", () => {
    const mockUser = { email: "test@gmail.com" } as unknown as User;
    render(<ProfilePage user={mockUser} />);
    expect(screen.getByText("test@gmail.com")).toBeInTheDocument();
  });
  test("自分の投稿一覧が表示されている", () => {
    const mockUser = { email: "test@gmail.com" } as unknown as User;

    render(<ProfilePage user={mockUser} />);
    expect(screen.getByText("自分の投稿")).toBeInTheDocument();
  });
});
