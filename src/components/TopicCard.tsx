import { Link } from "react-router-dom";
import { MessageSquare, Eye } from "lucide-react";

type Props = {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  likes?: number;
  createdAt: string;
};

function formatTimeAgo(dateString: string) {
  const now = new Date();
  const created = new Date(dateString);
  const diffMs = now.getTime() - created.getTime();

  const minutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(diffMs / 1000 / 60 / 60);
  const days = Math.floor(diffMs / 1000 / 60 / 60 / 24);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function TopicCard({
  id,
  title,
  author,
  category,
  replies,
  views,
  likes = 0,
  createdAt,
}: Props) {
  return (
    <Link
      to={`/threads/${id}`}
      className="block rounded-3xl border border-border bg-card px-5 py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-pink-400 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {category}
            </span>
          </div>

          <h3 className="truncate text-lg font-semibold text-foreground">
            {title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>by {author}</span>
            <span className="inline-flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4" />
              {replies}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {views}
            </span>
          </div>
        </div>

        <div className="shrink-0 pt-1 text-sm text-muted-foreground">
          {formatTimeAgo(createdAt)}
        </div>
      </div>
    </Link>
  );
}
