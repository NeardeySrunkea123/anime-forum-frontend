import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PlayCircle, BookOpen, ExternalLink } from "lucide-react";
import type { Anime } from "../types/anime";
import AnimeThreadList from "../components/anime/AnimeThreadList";

type ThreadFormState = {
  forum_id: string;
  title: string;
  content: string;
};

type LoggedInUser = {
  id: number;
  username: string;
  email: string;
  role: string;
};

const AnimeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [threadRefreshKey, setThreadRefreshKey] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [form, setForm] = useState<ThreadFormState>({
    forum_id: "",
    title: "",
    content: "",
  });

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

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const res = await fetch(`http://188.166.184.64/api/anime/${id}`);
        const result = await res.json();

        if (result.success) {
          setAnime(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch anime detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const makeSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loggedInUser) {
      alert("Please login first to create a thread.");
      navigate("/");
      return;
    }

    if (!anime) return;

    if (!anime.uuid) {
      alert("This anime is not linked yet.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        forum_id: form.forum_id,
        user_id: loggedInUser.id,
        anime_uuid: anime.uuid,
        title: form.title,
        slug: makeSlug(form.title),
        content: form.content,
      };

      const res = await fetch(`http://188.166.184.64/api/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setToast({
          message: "Thread created successfully!",
          type: "success",
        });
        setForm({
          forum_id: "",
          title: "",
          content: "",
        });
        setShowForm(false);
        setThreadRefreshKey((prev) => prev + 1);
      } else {
        setToast({
          message: data.error || "Failed to create thread",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setToast({
        message: "Something went wrong",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-10">Loading...</div>;
  }

  if (!anime) {
    return <div className="container mx-auto px-4 py-10">Anime not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Top section */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="grid gap-8 p-6 md:grid-cols-[280px_1fr]">
          <div>
            <img
              src={anime.large_image_url || anime.image_url}
              alt={anime.title}
              className="h-full w-full rounded-2xl object-cover shadow-md"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {anime.status || "Unknown"}
                </span>

                {anime.release_date && (
                  <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {new Date(anime.release_date).toLocaleDateString()}
                  </span>
                )}
              </div>

              <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                {anime.title}
              </h1>

              <p className="max-w-3xl leading-7 text-muted-foreground">
                {anime.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  if (!loggedInUser) {
                    setShowLoginModal(true);
                    return;
                  }
                  setShowForm((prev) => !prev);
                }}
                className="inline-flex items-center rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:brightness-105"
              >
                {showForm ? "Cancel" : "Post Thread"}
              </button>
              {showLoginModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Login Required
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      You need to login before creating a thread.
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => setShowLoginModal(false)}
                        className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-100"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={() => navigate("/login")}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:brightness-105"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick action cards */}
        <div className="grid gap-4 border-t border-border bg-muted/20 p-6 md:grid-cols-2">
          <Link
            to={`http://206.189.38.230/anime/${anime.id}`}
            className="group relative block overflow-hidden rounded-3xl border border-border shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={anime.large_image_url || anime.image_url}
              alt={`${anime.title} streaming`}
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-pink-950/40 to-black/10" />

            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <div className="mb-3 inline-flex w-fit rounded-2xl bg-white/15 p-3 text-white backdrop-blur-sm">
                <PlayCircle className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-2xl font-bold text-white">
                Watch Streaming
              </h3>
              <p className="mb-4 text-sm leading-6 text-white/85">
                Watch episodes, trailers, and highlights from{" "}
                <span className="font-semibold">{anime.title}</span>.
              </p>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                Open Streaming <ExternalLink className="h-4 w-4" />
              </div>
            </div>
          </Link>

          <Link
            to={`http://159.223.76.78/books/${anime.id}`}
            className="group block rounded-3xl border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-violet-400 hover:shadow-xl"
          >
            <div className="flex h-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="mb-3 inline-flex rounded-2xl bg-violet-500/10 p-3 text-violet-500">
                  <BookOpen className="h-6 w-6" />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  Buy Book / Manga
                </h3>
                <p className="mb-4 text-sm leading-6 text-muted-foreground">
                  Explore manga, novels, and collectibles inspired by{" "}
                  <span className="font-semibold text-foreground">
                    {anime.title}
                  </span>
                  .
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-semibold text-violet-500">
                  Open Anime Book <ExternalLink className="h-4 w-4" />
                </div>
              </div>

              <div className="shrink-0">
                <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                  <img
                    src={anime.image_url}
                    alt={`${anime.title} book`}
                    className="h-36 w-24 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Thread form */}
      {showForm && loggedInUser && (
        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Create Thread for {anime.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Start a discussion about this anime.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">Forum</label>
              <select
                name="forum_id"
                value={form.forum_id}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-pink-400"
              >
                <option value="">Select forum</option>
                <option value="1">General Discussion</option>
                <option value="2">Reviews</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Title</label>
              <input
                name="title"
                placeholder="Enter your thread title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-pink-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Content</label>
              <textarea
                name="content"
                placeholder="Write your post here..."
                value={form.content}
                onChange={handleChange}
                required
                rows={6}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-pink-400"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Posting..." : "Create Thread"}
            </button>
          </form>
        </div>
      )}

      {/* Threads */}
      {anime.uuid && (
        <AnimeThreadList animeUuid={anime.uuid} refreshKey={threadRefreshKey} />
      )}
    </div>
  );
};

export default AnimeDetailPage;
