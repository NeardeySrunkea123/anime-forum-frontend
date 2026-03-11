import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  MessageSquare,
  List,
  Home,
  Sparkles,
  User,
  LogOut,
} from "lucide-react";
import { clearAuth } from "../lib/auth";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/anime", label: "Anime", icon: List },
  { to: "/forum", label: "Forum", icon: MessageSquare },
];

type UserType = {
  id: number;
  username: string;
  email: string;
  role: string;
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType | null>(null);
  const [open, setOpen] = useState(false);

  const loadUser = () => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      setUser(null);
      return;
    }

    try {
      setUser(JSON.parse(stored));
    } catch {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    loadUser();

    const handleAuthChanged = () => {
      loadUser();
    };

    window.addEventListener("auth-changed", handleAuthChanged);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChanged);
    };
  }, []);

  const handleLogout = () => {
    clearAuth();
    setOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/90 backdrop-blur-lg">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-1.5">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="gradient-text font-display text-xl font-extrabold tracking-tight">
            AniVerse
          </span>
        </Link>

        <div className="flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.to ||
              (item.to !== "/" && location.pathname.startsWith(item.to));

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="relative">
          {user ? (
            <>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full p-2 transition hover:bg-muted"
              >
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="hidden text-sm font-medium sm:block">
                  {user.username}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-muted"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:brightness-105"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
