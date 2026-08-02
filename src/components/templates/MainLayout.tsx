import { Sidebar } from "../organisms/sidebar/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const MainLayout = ({ children, rightPanel }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex justify-center p-4 bg-white">
      <div className="flex w-full max-w-[1120px] min-h-screen rounded-2xl overflow-hidden shadow-sm">
        <Sidebar />
        <main className="flex-1 flex justify-center border-r border-border bg-white">
          <div className="w-full max-w-xl p-6">{children}</div>
        </main>
        {rightPanel && (
          <aside className="sticky top-0 h-screen w-72 shrink-0 bg-white border-l border-border p-4 overflow-y-auto">
            {rightPanel}
          </aside>
        )}
      </div>
    </div>
  );
};
