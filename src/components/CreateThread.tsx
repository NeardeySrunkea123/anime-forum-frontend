import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type FormState = {
  forum_id: string;
  title: string;
  content: string;
};

export default function ThreadsCreatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const animeUuid = searchParams.get("anime_uuid") || "";
  const animeTitle = searchParams.get("anime_title")
    ? decodeURIComponent(searchParams.get("anime_title") as string)
    : "";

  const [form, setForm] = useState<FormState>({
    forum_id: "1", // default forum, you can change
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);

  // TEMP: replace later with real auth
  const userId = 1;

  const makeSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canSubmit = useMemo(() => {
    return Boolean(
      animeUuid && form.forum_id && form.title.trim() && form.content.trim(),
    );
  }, [animeUuid, form]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!animeUuid) {
      alert(
        "Missing anime_uuid in URL. Please click Post Thread from an anime page.",
      );
      return;
    }

    setLoading(true);
    try {
      const payload = {
        forum_id: form.forum_id,
        user_id: userId,
        anime_uuid: animeUuid,
        title: form.title,
        slug: makeSlug(form.title),
        content: form.content,
      };

      const res = await fetch(`http://188.166.184.64//api/threads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        // go to thread detail after create (adjust route to yours)
        navigate(`/threads/${data.data.id}`);
      } else {
        alert(data.error || "Failed to create thread");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">
                Post a Thread
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Share a topic under the selected anime.
              </p>
            </div>

            {/* anime badge */}
            <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600">
              {animeTitle || "Selected Anime"}
            </div>
          </div>

          {!animeUuid && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              Missing <b>anime_uuid</b>. Please open an anime detail page and
              click “Post Thread”.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Forum
              </label>
              <select
                name="forum_id"
                value={form.forum_id}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
              >
                <option value="1">General Discussion</option>
                <option value="2">Reviews</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Write a clear title (e.g., Best fight scenes?)"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Content
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={7}
                placeholder="Write your thoughts…"
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Posting..." : "Post Thread"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
