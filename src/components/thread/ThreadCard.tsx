import { Link } from "react-router-dom";
import type { Thread } from "../../types/thread";

type Props = {
  thread: Thread;
};

const forumStyles: Record<string, { badge: string; icon: string }> = {
  General: {
    badge: "bg-sky-100 text-sky-700",
    icon: "📌",
  },
  Discussion: {
    badge: "bg-pink-100 text-pink-700",
    icon: "⚔️",
  },
  Reviews: {
    badge: "bg-violet-100 text-violet-700",
    icon: "👁️",
  },
  Fun: {
    badge: "bg-orange-100 text-orange-700",
    icon: "🎵",
  },
  Recommendations: {
    badge: "bg-emerald-100 text-emerald-700",
    icon: "🦊",
  },
};

function getForumStyle(name: string) {
  return (
    forumStyles[name] || {
      badge: "bg-zinc-100 text-zinc-700",
      icon: "💬",
    }
  );
}

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

export default function ThreadCard({ thread }: Props) {
  const forum = getForumStyle(thread.forum_name);

  return (
    <Link
      to={`/threads/${thread.id}`}
      className="block rounded-3xl border border-zinc-200 bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center text-2xl">
            {forum.icon}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {thread.is_pinned ? (
                <span className="text-xs text-pink-500">📍</span>
              ) : null}

              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${forum.badge}`}
              >
                {thread.forum_name}
              </span>
            </div>

            <h3 className="truncate text-lg font-semibold text-zinc-900">
              {thread.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
              <span>by {thread.author_username}</span>
              <span>💬 {thread.post_count ?? 0}</span>
              <span>👁 {thread.views ?? 0}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 pt-1 text-sm text-zinc-400">
          {formatTimeAgo(thread.created_at)}
        </div>
      </div>
    </Link>
  );
}
