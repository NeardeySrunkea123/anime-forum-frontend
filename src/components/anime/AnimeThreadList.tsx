import { useEffect, useState } from "react";
import type { Thread } from "../../types/thread";
import ThreadCard from "../thread/ThreadCard";

type Props = {
  animeUuid: string;
  refreshKey?: number;
};

export default function AnimeThreadList({ animeUuid, refreshKey = 0 }: Props) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://152.42.177.225/api/threads?anime_uuid=${animeUuid}`,
        );
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

    if (animeUuid) {
      fetchThreads();
    }
  }, [animeUuid, refreshKey]);

  return (
    <section className="mt-12">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">
            Discussion Threads
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Join conversations from other anime fans.
          </p>
        </div>

        <div className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600">
          {threads.length} thread{threads.length !== 1 ? "s" : ""}
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
          Loading discussions...
        </div>
      ) : threads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500">
          No threads yet. Be the first to start a discussion.
        </div>
      ) : (
        <div className="space-y-4">
          {threads.map((thread) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
        </div>
      )}
    </section>
  );
}
