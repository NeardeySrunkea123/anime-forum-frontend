const API_BASE_URL = "http://152.42.220.220";

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export type AuthResponse = {
  success: boolean;
  token?: string;
  user?: AuthUser;
  data?: AuthUser;
  message?: string;
};

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
}

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Register failed");
  }

  return result;
}

export async function validateToken(token: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/validate`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Token invalid");
  }

  return result;
}

export function saveAuth(token: string, user: {
  id: number;
  username: string;
  email: string;
  role: string;
}) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("auth-changed"));
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("auth-changed"));
}

export function getStoredToken() {
  return localStorage.getItem("token");
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}