import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, List, TrendingUp } from "lucide-react";
import heroBanner from "@/assets/hero-banner.png";
import AnimeCard from "@/components/AnimeCard";
import TopicCard from "@/components/TopicCard";
import { animeList, forumTopics } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[420px] overflow-hidden">
        <img src={heroBanner} alt="AniVerse anime forum banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-6xl font-display font-black neon-text text-primary mb-3">
            AniVerse
          </h1>
          <p className="text-lg text-foreground/80 max-w-md mb-6">
            Your community for anime discussion, reviews, and discovery.
          </p>
          <div className="flex gap-3">
            <Link
              to="/anime"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition-all"
            >
              <List className="w-4 h-4" /> Browse Anime
            </Link>
            <Link
              to="/forum"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary/40 text-primary font-semibold text-sm hover:bg-primary/10 transition-all"
            >
              <MessageSquare className="w-4 h-4" /> Join Forum
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Anime */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Trending Anime
          </h2>
          <Link to="/anime" className="text-sm text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {animeList.slice(0, 5).map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>

      {/* Hot Topics */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-secondary" /> Hot Topics
          </h2>
          <Link to="/forum" className="text-sm text-primary flex items-center gap-1 hover:underline">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-2">
          {forumTopics.slice(0, 4).map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
