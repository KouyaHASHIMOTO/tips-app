import { Sidebar } from "../organisms/sidebar/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const MainLayout = ({ children, rightPanel }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-base flex justify-center">
      <div className="flex w-full max-w-[1120px] min-h-screen">
        <Sidebar />
        <main className="flex-1 min-h-screen flex justify-center border-r border-border">
          <div className="w-full max-w-xl p-6">{children}</div>
        </main>
        {rightPanel && (
          <aside className="sticky top-0 h-screen w-72 shrink-0 bg-card border-l border-border p-4 overflow-y-auto">
            {rightPanel}
          </aside>
        )}
      </div>
    </div>
  );
};
