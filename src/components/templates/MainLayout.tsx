import { Header } from "../organisms/header/Header";
import { Sidebar } from "../organisms/sidebar/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const MainLayout = ({ children, rightPanel }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-base">
      <Header />
      <div className="flex pt-14">
        <Sidebar />
        <main className="ml-64 flex-1 p-4 mr-72">{children}</main>
        {rightPanel && (
          <aside className="fixed right-0 top-14 h-full w-72 bg-card border-l border-border p-4 overflow-y-auto">
            {rightPanel}
          </aside>
        )}
      </div>
    </div>
  );
};
