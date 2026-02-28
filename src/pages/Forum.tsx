import { useState } from "react";
import { Plus } from "lucide-react";
import TopicCard from "@/components/TopicCard";
import { forumTopics } from "@/data/mockData";

const categories = ["All", "General", "Discussion", "Fun", "Recommendations", "Manga"];

const ForumPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const filtered = activeCategory === "All"
    ? forumTopics
    : forumTopics.filter((t) => t.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-display font-extrabold gradient-text">Forum</h1>
        <button
          onClick={() => setShowNewTopic(!showNewTopic)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-105 transition-all shadow-[var(--shadow-soft)]"
        >
          <Plus className="w-4 h-4" /> New Topic
        </button>
      </div>
      <p className="text-muted-foreground text-sm mb-8">Discuss anime, share theories, and connect with fans.</p>

      {showNewTopic && (
        <div className="glass rounded-2xl p-5 mb-6">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Topic title..."
            className="w-full bg-muted/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:border-primary/50 focus:outline-none mb-3"
          />
          <textarea
            placeholder="What do you want to discuss?"
            rows={3}
            className="w-full bg-muted/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:border-primary/50 focus:outline-none mb-3 resize-none"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowNewTopic(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full">
              Cancel
            </button>
            <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-105 shadow-[var(--shadow-soft)]">
              Post Topic
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-1.5 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === c
                ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {sorted.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
