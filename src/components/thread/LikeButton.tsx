import { Link, useNavigate } from "react-router-dom";

type Props = {
  postId: number;
  liked: boolean;
  onRefresh: () => void;
};

export default function LikeButton({ postId, liked, onRefresh }: Props) {
  const navigate = useNavigate();
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const userId = user?.id;

  const handleClick = async () => {
    if (!userId) return;

    try {
      if (liked) {
        await fetch(
          `http://localhost:3003/api/posts/${postId}/like/${userId}`,
          {
            method: "DELETE",
          },
        );
      } else {
        await fetch(`http://localhost:3003/api/posts/${postId}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });
      }

      onRefresh();
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  // If not logged in
  if (!userId) {
    return <button onClick={() => navigate("/login")}>🤍 Like</button>;
  }

  return (
    <button
      onClick={handleClick}
      className="text-sm font-medium transition hover:scale-105"
    >
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
