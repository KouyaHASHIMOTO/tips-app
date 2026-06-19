import { Header } from "../organisms/header/Header";
import { Sidebar } from "../organisms/sidebar/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <div className="flex pt-14">
        <Sidebar />
        <main className="ml-64 flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};
