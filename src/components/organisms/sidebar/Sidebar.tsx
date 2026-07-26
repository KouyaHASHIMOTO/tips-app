import { NavLink, Link, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../../constants/categories";
import { CATEGORY_COLORS } from "../../../constants/categoryColors";
import logo from "../../../assets/logo.png";
import { Home, User, Bookmark, Settings } from "lucide-react";

const baseClass =
  "px-4 py-2 rounded-lg w-full flex items-center gap-2 transition-colors";

export const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <nav className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-surface border-r border-border p-4 flex flex-col gap-2 overflow-y-auto">
      <img
        src={logo}
        alt="Tipps"
        className="h-15 w-auto self-start px-2 mb-2"
      />

      <Link
        to="/"
        className={
          currentCategory === null && window.location.pathname === "/"
            ? `${baseClass} font-medium text-accent bg-accent-light`
            : `${baseClass} text-text-sub hover:text-text-main hover:bg-border`
        }
      >
        <Home size={18} />
        ホーム
      </Link>

      <NavLink
        to="/saved"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-medium text-accent bg-accent-light`
            : `${baseClass} text-text-sub hover:text-text-main hover:bg-border`
        }
      >
        <Bookmark size={18} />
        保存済み
      </NavLink>

      <div className="mt-3">
        <span className="px-4 text-xs text-text-muted">カテゴリ</span>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            to={`/?category=${encodeURIComponent(cat)}`}
            className={
              currentCategory === cat
                ? `${baseClass}  font-medium text-accent bg-accent-light`
                : `${baseClass}  text-text-sub hover:text-text-main hover:bg-border`
            }
          >
            <span
              data-testid={`category-dot-${cat}`}
              className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[cat]}`}
            />
            {cat}
          </Link>
        ))}
      </div>

      {/* mt-auto で、ここから下を常にSidebarの一番下に押しやる */}
      <div className="mt-auto flex flex-col gap-2">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${baseClass} font-medium text-accent bg-accent-light`
              : `${baseClass} text-text-sub hover:text-text-main hover:bg-border`
          }
        >
          <User size={18} />
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
          <Settings size={18} />
          設定
        </NavLink>
      </div>
    </nav>
  );
};
