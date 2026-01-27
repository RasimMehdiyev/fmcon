// localstorage
import {getToken, setToken, clearToken} from "./localStorage.js";


const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

async function apiFetch(path, { method = "GET", body, auth = true } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = getToken();
    if (!token) throw new Error("NOT_AUTHENTICATED");
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 || res.status === 403) throw new Error("NOT_AUTHENTICATED");

  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP_${res.status}: ${text.slice(0, 400)}`);

  if (!text.trim()) return null;
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("INVALID_JSON");
  }
}


export async function fetchFailures() {
  const token = getToken();

  if (!token) throw new Error("NOT_AUTHENTICATED");

  const res = await fetch(`${API_BASE}/api/failures`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();

  if (res.status === 401) {
    throw new Error("NOT_AUTHENTICATED");
  }

  if (!res.ok) {
    throw new Error(`GET /api/failures failed: ${res.status} ${text.slice(0, 200)}`);
  }

  return JSON.parse(text);
}

export async function fetchMyFailures() {
  const token = getToken();
  if (!token) throw new Error("NOT_AUTHENTICATED");
  const res = await fetch(`${API_BASE}/api/me/failures`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await res.text();
  if (res.status === 401) {
    throw new Error("NOT_AUTHENTICATED");
  }
  if (!res.ok) {
    throw new Error(`GET /api/me/failures failed: ${res.status} ${text.slice(0, 200)}`);
  }
  return JSON.parse(text);
}

export async function fetchFailureById(id) {
  const token = getToken();

  if (!token) throw new Error("NOT_AUTHENTICATED");
  const res = await fetch(`${API_BASE}/api/failure/${id}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await res.text();
  if (res.status === 401) {
    throw new Error("NOT_AUTHENTICATED");
  }
  if (!res.ok) {
    throw new Error(`GET /api/failure/${id} failed: ${res.status} ${text.slice(0, 200)}`);
  }
  return JSON.parse(text);
}


// create a new failure for the current user
export function createFailure(payload) {
  return apiFetch("/api/failures", { method: "POST", body: payload, auth: true });
}

// update a failure (for later edit modal)
export function updateFailure(id, patch) {
  return apiFetch(`/api/failures/${id}`, { method: "PATCH", body: patch, auth: true });
}

export function deleteFailure(id) {
  return apiFetch(`/api/failures/${id}`, { method: "DELETE", auth: true });
}


export async function fetchFailuresWithStats({ min = 1, max = 5 } = {}) {
  const res = await fetch(`${API_BASE}/failures/with-ratings-and-stats?min=${min}&max=${max}`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}

export async function fetchFailureWithStatsById(id, { min = 1, max = 5 } = {}) {
  const res = await fetch(
    `${API_BASE}/failure/${id}/with-ratings-and-stats?min=${min}&max=${max}`,
    { credentials: "include", headers: { Accept: "application/json" } }
  );

  if (!res.ok) throw new Error(`Failed to fetch failure ${id}`);
  return res.json();
}

export async function fetchUserFailuresWithRatings(userId) {
// /user/{id}/failures/with-ratings
// get current user id

  let userID = 1; // default to user 1 for now

  const res = await fetch(`${API_BASE}/user/${userID}/failures/with-ratings`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET /user/${userID}/failures/with-ratings failed: ${res.status} ${text}`);
  }
  return res.json();
}


// export async function createFailure(payload) {
//   const res = await fetch(`${API_BASE}/failure`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`POST /failure failed: ${res.status} ${text}`);
//   }
//   return res.json();
// }

