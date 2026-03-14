import type { Post } from "../../types/thread";
import LikeButton from "./LikeButton";

type Props = {
  posts: Post[];
  onRefresh: () => void;
};

export default function CommentList({ posts, onRefresh }: Props) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
        No replies yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="font-medium">{post.author_username}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </div>

            <div className="text-xs text-muted-foreground">
              {post.like_count} likes
            </div>
          </div>

          <p className="mb-4 text-sm leading-7">{post.content}</p>

          <LikeButton
            postId={post.id}
            onRefresh={onRefresh}
            liked={post.liked}
          />
        </div>
      ))}
    </div>
  );
}
