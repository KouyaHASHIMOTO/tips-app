import { NavLink } from "react-router-dom";

const baseClass = "px-4 py-2 rounded-xl w-full block transition-colors";

export const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-14 h-full w-64 bg-cream border-r-[3px] border-brown p-4 flex flex-col gap-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-bold text-brown bg-paper border-2 border-dashed border-brown`
            : `${baseClass} text-brown-soft hover:text-brown`
        }
      >
        ホーム
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-bold text-brown bg-paper border-2 border-dashed border-brown`
            : `${baseClass} text-brown-soft hover:text-brown`
        }
      >
        マイページ
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-bold text-brown bg-paper border-2 border-dashed border-brown`
            : `${baseClass} text-brown-soft hover:text-brown`
        }
      >
        設定
      </NavLink>
    </nav>
  );
};
