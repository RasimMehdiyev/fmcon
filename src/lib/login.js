const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function apiLogin(uuid, password) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ uuid, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error ?? "Login failed");
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("newApiToken", data.token);
  }

  return data.token;
}
