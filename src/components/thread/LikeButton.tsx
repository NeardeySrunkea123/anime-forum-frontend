import { useState } from "react";

type Props = {
  postId: number;
  onRefresh: () => void;
};

export default function LikeButton({ postId, onRefresh }: Props) {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  const userId = 1;

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://152.42.177.225/api/posts/${postId}/like`,
        {
          method: liked ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        },
      );

      const result = await res.json();

      if (result.success) {
        setLiked((prev) => !prev);
        onRefresh();
      } else {
        alert(result.error || "Failed to update like");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="rounded-lg border px-3 py-1 text-xs"
    >
      {loading ? "..." : liked ? "Unlike" : "Like"}
    </button>
  );
}
