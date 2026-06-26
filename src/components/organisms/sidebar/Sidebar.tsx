import { NavLink, Link, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../../constants/categories";

const baseClass = "px-4 py-2 rounded-lg w-full block transition-colors";

export const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <nav className="fixed left-0 top-14 h-full w-64 bg-surface border-r border-border p-4 flex flex-col gap-2 overflow-y-auto">
      <Link
        to="/"
        className={
          currentCategory === null && window.location.pathname === "/"
            ? `${baseClass} font-medium text-accent bg-accent-light`
            : `${baseClass} text-text-sub hover:text-text-main hover:bg-border`
        }
      >
        ホーム
      </Link>
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
        <Link
          key={cat}
          to={`/?category=${encodeURIComponent(cat)}`}
          className={
            currentCategory === cat
              ? `${baseClass} font-medium text-accent bg-accent-light`
              : `${baseClass} text-text-sub hover:text-text-main hover:bg-border`
          }
        >
          {cat}
        </Link>
      ))}
    </nav>
  );
};
