import { useState } from "react";
import AnimeCard from "@/components/AnimeCard";
import { animeList } from "@/data/mockData";

const filters = ["All", "Airing", "Completed", "Upcoming"];

const AnimeListPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? animeList
    : animeList.filter((a) => a.status === activeFilter);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-display font-extrabold mb-2 gradient-text">Anime List</h1>
      <p className="text-muted-foreground text-sm mb-8">Discover and track your favorite anime series.</p>

      <div className="flex gap-1.5 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              activeFilter === f
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filtered.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default AnimeListPage;
