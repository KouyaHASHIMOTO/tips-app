import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../../../constants/categories";

const baseClass = "px-4 py-2 rounded-lg w-full block transition-colors";

export const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-14 h-full w-64 bg-surface border-r border-border p-4 flex flex-col gap-2 overflow-y-auto">
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

      <div className="mt-4 mb-1 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
        カテゴリ
      </div>

      {CATEGORIES.map((cat) => (
        <NavLink
          key={cat}
          to={`/?category=${encodeURIComponent(cat)}`}
          className={({ isActive }) =>
            isActive
              ? `${baseClass} font-medium text-accent bg-accent-light`
              : `${baseClass} text-text-sub hover:text-text-main hover:bg-border`
          }
        >
          {cat}
        </NavLink>
      ))}
    </nav>
  );
};
