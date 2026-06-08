import { NavLink } from "react-router-dom";

const baseClass = "px-4 py-2 rounded-full w-full block";

export const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-14 h-full w-64 border-r border-gray-200 p-4 flex flex-col gap-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-bold text-blue-500`
            : `${baseClass} text-gray-500 hover:text-blue-500`
        }
      >
        ホーム
      </NavLink>
      <NavLink
        to="/tips"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-bold text-blue-500`
            : `${baseClass} text-gray-500 hover:text-blue-500`
        }
      >
        投稿
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? `${baseClass} font-bold text-blue-500`
            : `${baseClass} text-gray-500 hover:text-blue-500`
        }
      >
        設定
      </NavLink>
    </nav>
  );
};
