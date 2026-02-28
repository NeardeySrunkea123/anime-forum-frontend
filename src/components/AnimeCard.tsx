import { Star } from "lucide-react";
import type { Anime } from "@/data/mockData";

interface AnimeCardProps {
  anime: Anime;
}

const statusColors: Record<string, string> = {
  Airing: "bg-primary/20 text-primary",
  Completed: "bg-secondary/20 text-secondary",
  Upcoming: "bg-accent/20 text-accent",
};

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--shadow-neon)]">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${statusColors[anime.status]}`}>
          {anime.status}
        </span>
        <h3 className="font-display font-bold text-foreground text-sm leading-tight mb-1 line-clamp-2">
          {anime.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 text-primary">
            <Star className="w-3 h-3 fill-primary" />
            {anime.rating}
          </span>
          <span>•</span>
          <span>{anime.episodes} eps</span>
        </div>
        <div className="flex gap-1 mt-2 flex-wrap">
          {anime.genre.slice(0, 2).map((g) => (
            <span key={g} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
