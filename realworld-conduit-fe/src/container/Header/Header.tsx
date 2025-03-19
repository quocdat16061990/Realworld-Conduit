import path from "@/constants/path";
import { AppContext } from "@/core/context/AppContext";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AppContext);

  const menus = isAuthenticated
    ? [
        { id: 1, path: path.home, label: "Home" },
        { id: 2, path: path.article, label: "New Article" },
        { id: 3, path: path.profile, label: "Profile" },
      ]
    : [
        { id: 1, path: path.home, label: "Home" },
        { id: 2, path: path.signIn, label: "Sign In" },
        { id: 3, path: path.signUp, label: "Sign Up" },
      ];

  return (
    <div className="flex justify-between items-center max-w-[1440px] mx-auto">
      <Link className="text-[#5CB85C] text-2xl font-bold" to={path.home}>
        Conduit
      </Link>
      <ul className="flex gap-x-4 items-center">
        {menus.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.id}>
              <Link
                className={`text-xl py-3 px-2 ${
                  isActive ? "text-[#5CB85C] font-bold" : "text-gray-400"
                }`}
                to={item.path}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
