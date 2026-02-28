import { Link, useLocation } from "react-router-dom";
import { MessageSquare, List, Home, Search, Sparkles } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/anime", label: "Anime", icon: List },
  { to: "/forum", label: "Forum", icon: MessageSquare },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-xl font-display font-extrabold gradient-text tracking-tight">
            AniVerse
          </span>
        </Link>

        <div className="flex items-center gap-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to ||
              (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <button className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
          <Search className="w-4.5 h-4.5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
