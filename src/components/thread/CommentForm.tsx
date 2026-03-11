import { useState, ChangeEvent, FormEvent } from "react";

type Props = {
  threadId: number;
  onSuccess: () => void;
};

export default function CommentForm({ threadId, onSuccess }: Props) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const userId = 1;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await fetch("http://localhost:3003/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thread_id: threadId,
          user_id: userId,
          content,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setContent("");
        onSuccess();
      } else {
        alert(result.error || "Failed to comment");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border bg-card p-5"
    >
      <h3 className="text-lg font-semibold">Reply to this thread</h3>

      <textarea
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        rows={5}
        required
        placeholder="Write your reply..."
        className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none"
      />

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-60"
      >
        {submitting ? "Posting..." : "Post Reply"}
      </button>
    </form>
  );
}
