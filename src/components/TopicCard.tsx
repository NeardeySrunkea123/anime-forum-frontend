import { MessageSquare, Eye, Pin } from "lucide-react";
import { Link } from "react-router-dom";
import type { ForumTopic } from "@/data/mockData";

interface TopicCardProps {
  topic: ForumTopic;
}

const categoryColors: Record<string, string> = {
  General: "bg-sky/15 text-sky",
  Discussion: "bg-primary/10 text-primary",
  Fun: "bg-peach/20 text-peach",
  Recommendations: "bg-lavender/15 text-lavender",
  Manga: "bg-mint/15 text-mint",
};

const TopicCard = ({ topic }: TopicCardProps) => {
  return (
    <Link
      to={`/forum/${topic.id}`}
      className="block p-4 rounded-2xl bg-card border border-border/40 hover:border-primary/30 transition-all duration-200 hover:shadow-[var(--shadow-soft)] group"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">{topic.avatar}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {topic.pinned && <Pin className="w-3 h-3 text-primary flex-shrink-0" />}
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${categoryColors[topic.category] || "bg-muted text-muted-foreground"}`}>
              {topic.category}
            </span>
          </div>

          <h3 className="font-display font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
            {topic.title}
          </h3>

          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="font-medium">by {topic.author}</span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> {topic.replies}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {topic.views}
            </span>
            <span className="ml-auto text-muted-foreground/70">{topic.lastActivity}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
