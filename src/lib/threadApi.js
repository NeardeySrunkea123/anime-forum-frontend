import { apiFetch } from "./api";

export async function getThreads() {
  return apiFetch("/api/threads");
}

export async function getThreadById(id) {
  return apiFetch(`/api/threads/${id}`);
}

export async function createThread(payload) {
  return apiFetch("/api/threads", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}