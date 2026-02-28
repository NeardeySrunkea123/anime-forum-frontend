import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, List, TrendingUp, Sparkles } from "lucide-react";
import heroBanner from "@/assets/hero-banner.png";
import AnimeCard from "@/components/AnimeCard";
import TopicCard from "@/components/TopicCard";
import { animeList, forumTopics } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[380px] overflow-hidden">
        <img src={heroBanner} alt="AniVerse anime forum banner" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-display font-extrabold gradient-text">
              AniVerse
            </h1>
          </div>
          <p className="text-base text-muted-foreground max-w-md mb-6">
            Your cozy community for anime discussion, reviews, and discovery.
          </p>
          <div className="flex gap-3">
            <Link
              to="/anime"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:brightness-105 transition-all shadow-[var(--shadow-soft)]"
            >
              <List className="w-4 h-4" /> Browse Anime
            </Link>
            <Link
              to="/forum"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/5 transition-all"
            >
              <MessageSquare className="w-4 h-4" /> Join Forum
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Anime */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-display font-bold flex items-center gap-2 text-foreground">
            <TrendingUp className="w-5 h-5 text-primary" /> Trending Anime
          </h2>
          <Link to="/anime" className="text-sm text-primary flex items-center gap-1 hover:underline font-medium">
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
          <h2 className="text-lg font-display font-bold flex items-center gap-2 text-foreground">
            <MessageSquare className="w-5 h-5 text-secondary" /> Hot Topics
          </h2>
          <Link to="/forum" className="text-sm text-primary flex items-center gap-1 hover:underline font-medium">
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
