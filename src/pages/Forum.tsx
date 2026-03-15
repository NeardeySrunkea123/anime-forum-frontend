import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import { Plus } from "lucide-react";
import TopicCard from "@/components/TopicCard";

const categories = [
  "All",
  "General",
  "Discussion",
  "Fun",
  "Recommendations",
  "Manga",
];

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
};

const ForumPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const userId = 1; // replace later with logged-in user
  const defaultForumId = 1; // General

  const makeSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const fetchThreads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/threads`);
      const result = await res.json();

      if (result.success) {
        setThreads(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch threads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const filteredThreads = useMemo(() => {
    if (activeCategory === "All") return threads;

    return threads.filter(
      (thread) =>
        thread.forum_name?.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [threads, activeCategory]);

  const handlePostTopic = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTitle.trim() || !newContent.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    setPosting(true);

    try {
      // Forum page is general discussion, so no anime selected.
      // If your backend requires anime_uuid NOT NULL, you need either:
      // 1) choose a default anime_uuid, or
      // 2) change backend to allow general threads without anime.
      const payload = {
        forum_id: defaultForumId,
        user_id: userId,
        title: newTitle,
        slug: makeSlug(newTitle),
        content: newContent,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setNewTitle("");
        setNewContent("");
        setShowNewTopic(false);
        fetchThreads();
      } else {
        alert(result.error || "Failed to post topic");
      }
    } catch (error) {
      console.error("Failed to post topic:", error);
      alert("Something went wrong");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="gradient-text font-display text-3xl font-extrabold">
          Forum
        </h1>

        <button
          onClick={() => setShowNewTopic(!showNewTopic)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-all hover:brightness-105"
        >
          <Plus className="h-4 w-4" /> New Topic
        </button>
      </div>

      <p className="mb-8 text-sm text-muted-foreground">
        Discuss anime, share theories, and connect with fans.
      </p>

      {showNewTopic && (
        <form onSubmit={handlePostTopic} className="glass mb-6 rounded-2xl p-5">
          <input
            value={newTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTitle(e.target.value)
            }
            placeholder="Topic title..."
            className="mb-3 w-full rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
          />

          <textarea
            value={newContent}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNewContent(e.target.value)
            }
            placeholder="What do you want to discuss?"
            rows={3}
            className="mb-3 w-full resize-none rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowNewTopic(false)}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={posting}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:brightness-105 disabled:opacity-60"
            >
              {posting ? "Posting..." : "Post Topic"}
            </button>
          </div>
        </form>
      )}

      <div className="mb-6 flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              activeCategory === c
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
            Loading topics...
          </div>
        ) : filteredThreads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
            No topics found in this category.
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <TopicCard
              key={thread.id}
              id={thread.id}
              title={thread.title}
              author={thread.author_username}
              category={thread.forum_name}
              replies={Number(thread.post_count)}
              views={thread.views}
              createdAt={thread.created_at}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ForumPage;
