import { NavLink } from "react-router-dom";

const baseClass = "px-4 py-2 rounded-lg w-full block transition-colors";

export const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-14 h-full w-64 bg-surface border-r border-border p-4 flex flex-col gap-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-medium text-accent bg-accent-light`
            : `${baseClass} text-text-sub hover:text-text-main hover:bg-border`
        }
      >
        ホーム
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-medium text-accent bg-accent-light`
            : `${baseClass} text-text-sub hover:text-text-main hover:bg-border`
        }
      >
        マイページ
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-medium text-accent bg-accent-light`
            : `${baseClass} text-text-sub hover:text-text-main hover:bg-border`
        }
      >
        設定
      </NavLink>
    </nav>
  );
};
