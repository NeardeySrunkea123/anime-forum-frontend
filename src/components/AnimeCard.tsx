import { Link } from "react-router-dom";
import type { Anime } from "../types/anime";

type Props = {
  anime: Anime;
};

const AnimeCard = ({ anime }: Props) => {
  return (
    <Link
      to={`/anime/${anime.id}`}
      className="block rounded-xl overflow-hidden border bg-card hover:shadow-md transition"
    >
      <img
        src={anime.image_url}
        alt={anime.title}
        className="w-full aspect-[3/4] object-cover"
      />

      <div className="p-3">
        <h3 className="font-semibold line-clamp-1">{anime.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {anime.description}
        </p>
      </div>
    </Link>
  );
};

export default AnimeCard;
