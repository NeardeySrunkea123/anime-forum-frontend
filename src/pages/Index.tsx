import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageSquare,
  List,
  TrendingUp,
  Sparkles,
  PlayCircle,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import heroBanner from "@/assets/hero-banner.png";
import AnimeCard from "@/components/AnimeCard";
import TopicCard from "@/components/TopicCard";
import animeBookGif from "@/assets/anime-book.gif";
import streamingBanner from "@/assets/streaming.png";
import { useEffect, useMemo, useState } from "react";

type Anime = {
  id: number;
  uuid: string | null;
  title: string;
  description: string;
  image_url: string;
  large_image_url?: string;
  status: string;
  release_date?: string;
};

type Thread = {
  id: number;
  forum_id: number;
  user_id: number;
  title: string;
  slug: string;
  content: string;
  views: number;
  is_pinned: boolean;
  is_locked: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  anime_uuid: string | null;
  author_username: string;
  author_avatar?: string;
  anime_title?: string;
  forum_name: string;
  post_count: string;
  like_count?: string;
};

const Index = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [animeLoading, setAnimeLoading] = useState(true);
  const [threadLoading, setThreadLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/anime`);
        const result = await res.json();

        if (result.success) {
          setAnimeList(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      } finally {
        setAnimeLoading(false);
      }
    };

    const fetchThreads = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/threads`);
        const result = await res.json();

        if (result.success) {
          setThreads(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch threads:", error);
      } finally {
        setThreadLoading(false);
      }
    };

    fetchAnime();
    fetchThreads();
  }, []);

  const hotTopics = useMemo(() => {
    return [...threads]
      .sort((a, b) => {
        const aLikes = Number(a.like_count || 0);
        const bLikes = Number(b.like_count || 0);
        const aReplies = Number(a.post_count || 0);
        const bReplies = Number(b.post_count || 0);

        // sort by views first, then likes, then replies
        if (b.views !== a.views) return b.views - a.views;
        if (bLikes !== aLikes) return bLikes - aLikes;
        return bReplies - aReplies;
      })
      .slice(0, 5);
  }, [threads]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[380px] overflow-hidden">
        <img
          src={heroBanner}
          alt="AniVerse anime forum banner"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative container mx-auto flex h-full flex-col justify-end px-4 pb-12">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="gradient-text font-display text-4xl font-extrabold md:text-5xl">
              AniVerse
            </h1>
          </div>
          <p className="mb-6 max-w-md text-base text-muted-foreground">
            Your cozy community for anime discussion, reviews, and discovery.
          </p>
          <div className="flex gap-3">
            <Link
              to="/anime"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:brightness-105"
            >
              <List className="h-4 w-4" /> Browse Anime
            </Link>
            <Link
              to="/forum"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/5"
            >
              <MessageSquare className="h-4 w-4" /> Join Forum
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Anime */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" /> Trending Anime
          </h2>
          <Link
            to="/anime"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {animeLoading ? (
          <p className="text-sm text-muted-foreground">Loading anime...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {animeList.slice(0, 5).map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}
      </section>

      {/* Hot Topics */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <MessageSquare className="h-5 w-5 text-secondary" /> Hot Topics
          </h2>
          <Link
            to="/forum"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {threadLoading ? (
          <p className="text-sm text-muted-foreground">Loading topics...</p>
        ) : hotTopics.length === 0 ? (
          <p className="text-sm text-muted-foreground">No topics yet.</p>
        ) : (
          <div className="space-y-4">
            {hotTopics.map((thread) => (
              <TopicCard
                key={thread.id}
                id={thread.id}
                title={thread.title}
                author={thread.author_username}
                category={thread.forum_name}
                replies={Number(thread.post_count)}
                views={thread.views}
                likes={Number(thread.like_count || 0)}
                createdAt={thread.created_at}
              />
            ))}
          </div>
        )}
      </section>


      {/* Connected Services */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <Sparkles className="h-5 w-5 text-primary" /> Explore More
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Jump into connected anime experiences across our platform.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Anime Book */}
          <Link
            to="/anime-book"
            className="group relative block overflow-hidden rounded-3xl border border-border shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={animeBookGif}
              alt="Anime Book"
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="mb-3 inline-flex w-fit rounded-2xl bg-white/15 p-3 text-white backdrop-blur-sm">
                <BookOpen className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-2xl font-bold text-white">Anime Book</h3>
              <p className="mb-4 max-w-md text-sm leading-6 text-white/85">
                Read manga, light novels, character guides, and anime-related
                book content in one place.
              </p>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                Open Anime Book <ExternalLink className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* Streaming Anime */}
          <Link
            to="/streaming"
            className="group relative block overflow-hidden rounded-3xl border border-border shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={streamingBanner}
              alt="Streaming Anime"
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="mb-3 inline-flex w-fit rounded-2xl bg-white/15 p-3 text-white backdrop-blur-sm">
                <PlayCircle className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-2xl font-bold text-white">
                Streaming Anime
              </h3>
              <p className="mb-4 max-w-md text-sm leading-6 text-white/85">
                Watch episodes, trailers, and featured clips while staying
                connected to discussions from the community.
              </p>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                Open Streaming <ExternalLink className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};


export default Index;
