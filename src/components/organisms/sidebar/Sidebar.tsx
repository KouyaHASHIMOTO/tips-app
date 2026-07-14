import { NavLink, Link, useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../../../constants/categories";
import logo from "../../../assets/logo.png";
import { Home, User, Bookmark, Settings } from "lucide-react";
import { CATEGORY_COLORS } from "../../../constants/categoryColors";

const baseClass =
  "px-4 py-2 rounded-lg w-full flex items-center gap-2 transition-colors";
const categoryClass = "text-sm"; // カテゴリだけに足す追加クラス

export const Sidebar = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <nav className="fixed left-0 top-14 h-full w-64 bg-surface border-r border-border p-4 flex flex-col gap-2 overflow-y-auto">
      {/* ロゴ画像。高さを揃えて、リンク一覧との間に余白を入れる */}
      <img
        src={logo}
        alt="Tipps"
        className="h-13 w-auto self-start px-2 mb-2"
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

      <div className="mt-4 mb-1 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
        カテゴリ
      </div>

      {CATEGORIES.map((cat) => (
        <Link
          key={cat}
          to={`/?category=${encodeURIComponent(cat)}`}
          className={
            currentCategory === cat
              ? `${baseClass} ${categoryClass} font-medium text-accent bg-accent-light`
              : `${baseClass} ${categoryClass} text-text-sub hover:text-text-main hover:bg-border`
          }
        >
          <span
            data-testid={`category-dot-${cat}`}
            className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[cat]}`}
          />
          {cat}
        </Link>
      ))}
    </nav>
  );
};
