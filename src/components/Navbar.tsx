import { Link, useLocation } from "react-router-dom";
import { MessageSquare, List, Home, Search } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/anime", label: "Anime List", icon: List },
  { to: "/forum", label: "Forum", icon: MessageSquare },
];

const Navbar = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-black gradient-text tracking-tight">
            AniVerse
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || 
              (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/15 text-primary neon-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
