import { Star } from "lucide-react";
import type { Anime } from "@/data/mockData";

interface AnimeCardProps {
  anime: Anime;
}

const statusColors: Record<string, string> = {
  Airing: "bg-mint/20 text-mint",
  Completed: "bg-primary/10 text-primary",
  Upcoming: "bg-lavender/20 text-lavender",
};

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 card-hover">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-1.5 ${statusColors[anime.status]}`}>
          {anime.status}
        </span>
        <h3 className="font-display font-bold text-foreground text-sm leading-tight mb-1 line-clamp-2">
          {anime.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5 text-primary font-medium">
            <Star className="w-3 h-3 fill-primary" />
            {anime.rating}
          </span>
          <span className="text-border">•</span>
          <span>{anime.episodes} eps</span>
        </div>
        <div className="flex gap-1 mt-1.5 flex-wrap">
          {anime.genre.slice(0, 2).map((g) => (
            <span key={g} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted/80 text-muted-foreground font-medium">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
