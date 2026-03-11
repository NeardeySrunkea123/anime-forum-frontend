import { apiFetch } from "./api";

export async function getPostsByThread(threadId) {
  return apiFetch(`/api/threads/${threadId}/posts`);
}

export async function createPost(payload) {
  return apiFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function likePost(postId, userId) {
  return apiFetch(`/api/posts/${postId}/like`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}

export async function unlikePost(postId, userId) {
  return apiFetch(`/api/posts/${postId}/like`, {
    method: "DELETE",
    body: JSON.stringify({ user_id: userId }),
  });
}