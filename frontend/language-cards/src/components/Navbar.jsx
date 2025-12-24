import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useThemeStore } from "../store/themeStore";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { user, signOut } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    signOut();
    setOpen(false);
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="navbar bg-base-100 shadow-sm px-4 fixed top-0 left-0 right-0 z-50"
    >
      {/* LEFT */}
      <div className="navbar-start">
        <Link to="/" className="text-lg font-bold ml-2">
          {user ? `Olá, ${user.name}` : "WordGame"}
        </Link>
      </div>

      {/* CENTER (DESKTOP MENU) */}
      {user && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game">Jogar</Link>
            </li>
            <li>
              <Link to="/ranking">Ranking</Link>
            </li>
            <li>
              <Link to="/history">Histórico</Link>
            </li>
            <li>
              <Link to="/settings">Configurações</Link>
            </li>
          </ul>
        </div>
      )}

      {/* RIGHT */}
      <div className="navbar-end gap-1">
        {/* DESKTOP AUTH */}
        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-error hidden lg:flex"
          >
            Sair
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        )}

        {/* MOBILE MENU */}
        {user && (
          <div className="dropdown dropdown-end lg:hidden">
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => setOpen((prev) => !prev)}
            >
              ☰
            </button>

            <ul
              className={`menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ${
                open ? "block" : "hidden"
              }`}
            >
              <li>
                <Link to="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/game" onClick={() => setOpen(false)}>
                  Jogar
                </Link>
              </li>
              <li>
                <Link to="/ranking" onClick={() => setOpen(false)}>
                  Ranking
                </Link>
              </li>
              <li>
                <Link to="/history" onClick={() => setOpen(false)}>
                  Histórico
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={() => setOpen(false)}>
                  Configurações
                </Link>
              </li>

              <li className="mt-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-error btn-outline w-full"
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
