import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Thread, Post } from "../types/thread";
import CommentForm from "../components/thread/CommentForm";
import CommentList from "../components/thread/CommentList";

type LoggedInUser = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export default function ThreadDetailPage() {
  const { id } = useParams();
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");

    if (rawUser) {
      try {
        const parsedUser = JSON.parse(rawUser);
        setLoggedInUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const fetchThread = async () => {
    const res = await fetch(`http://188.166.184.64/api/threads/${id}`);
    const result = await res.json();

    if (result.success) {
      setThread(result.data);
    }
  };

  const fetchPosts = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const res = await fetch(
      `http://188.166.184.64/api/threads/${id}/posts?user_id=${user.id}`,
    );
    const result = await res.json();

    if (result.success) {
      setPosts(result.data);
    }
  };

  const loadAll = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchThread(), fetchPosts()]);
    } catch (error) {
      console.error("Failed to load thread:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadAll();
    }
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-10">Loading...</div>;
  }

  if (!thread) {
    return (
      <div className="container mx-auto px-4 py-10">Thread not found.</div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 rounded-2xl border bg-card p-6 shadow-sm">
        <p className="mb-2 text-sm text-muted-foreground">
          {thread.forum_name} • {thread.anime_title}
        </p>

        <h1 className="mb-3 text-3xl font-bold">{thread.title}</h1>

        <p className="mb-4 text-sm text-muted-foreground">
          By {thread.author_username}
        </p>

        <p className="leading-7">{thread.content}</p>
      </div>

      <div className="mb-6">
        <CommentForm
          threadId={thread.id}
          onSuccess={fetchPosts}
          userId={loggedInUser?.id ?? null}
        />
      </div>

      <CommentList posts={posts} onRefresh={fetchPosts} />
    </div>
  );
}
