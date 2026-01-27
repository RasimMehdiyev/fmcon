const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
import { getToken } from "./localStorage.js";

/**
 * Centralized fetch helper:
 * - Adds Authorization when requested
 * - Parses JSON safely (handles empty/204)
 * - Standardizes NOT_AUTHENTICATED error
 */
async function apiFetch(path, { method = "GET", auth = true, headers = {}, body } = {}) {
  console.log("Api Fetch")
  const finalHeaders = {
    Accept: "application/json",
    ...headers,
  };

  if (auth) {
    const token = getToken();
    if (!token) throw new Error("NOT_AUTHENTICATED");
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  // Set JSON content type if body is present and caller did not override it
  if (body !== undefined && !finalHeaders["Content-Type"]) {
    finalHeaders["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: finalHeaders,
    body,
  });

  // Auth failures
  if (res.status === 401 || res.status === 403) {
    throw new Error("NOT_AUTHENTICATED");
  }

  // 204 No Content: return null
  if (res.status === 204) return null;

  const text = await res.text().catch(() => "");

  if (!res.ok) {
    throw new Error(`${method} ${path} failed: ${res.status} ${text.slice(0, 200)}`);
  }

  // If server returns empty body on 200, do not crash JSON.parse
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    // If server returned non-JSON by mistake, return raw text
    return text;
  }
}

/**
 * GET /api/ratings/{id}
 * Rating detail by rating id (admin/debug style)
 */
export async function fetchRatingById(id) {
  return apiFetch(`/api/ratings/${encodeURIComponent(id)}`, { auth: true });
}

/**
 * GET /api/ratings
 * List all ratings (admin/debug endpoint)
 */
export async function fetchRatings() {
  return apiFetch(`/api/ratings`, { auth: true });
}

/**
 * GET /api/me/ratings
 * Ratings of the current authenticated user (all failures)
 */
export async function fetchMyRatings() {
  console.log("Fetching")
  return apiFetch(`/api/me/ratings`, { auth: true });
}

/**
 * GET /api/failures/{failureId}/ratings
 * All users' ratings for one failure
 */
export async function fetchRatingsByFailure(failureId) {
  return apiFetch(`/api/failures/${encodeURIComponent(failureId)}/ratings`, { auth: true });
}

/**
 * GET /api/failures/{failureId}/ratings/stats
 * Aggregated stats for one failure
 */
export async function fetchFailureRatingStats(failureId) {
  return apiFetch(`/api/failures/${encodeURIComponent(failureId)}/ratings/stats`, { auth: true });
}

/**
 * GET /api/me/failures/{failureId}/rating
 * Current user's rating for one failure.
 * Returns:
 * - object when exists
 * - null when none (because endpoint returns 204)
 */
export async function fetchMyRatingForFailure(failureId) {
  return apiFetch(`/api/me/failures/${encodeURIComponent(failureId)}/rating`, { auth: true });
}

/**
 * POST /api/ratings/upsert  (only if you implement it server-side)
 * Upsert rating (create if missing, update if exists) for current user + failure.
 *
 * payload example:
 * {
 *   failure_id: 123,
 *   severity: 3,
 *   occurrence: 2,
 *   detectability: 4
 * }
 */
export async function upsertRating(payload) {
  const token = getToken();
  if (!token) throw new Error("NOT_AUTHENTICATED");

  const res = await fetch(`${API_BASE}/api/ratings/upsert`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  // ONLY treat actual auth failures as auth failures
  if (res.status === 401 || res.status === 403) {
    throw new Error("NOT_AUTHENTICATED");
  }

  // 204 is allowed (no content)
  if (res.status === 204) {
    return null;
  }

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`UPSERT_FAILED_${res.status}: ${text.slice(0, 200)}`);
  }

  // Allow empty body
  if (!text || !text.trim()) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    // Do NOT map this to auth
    throw new Error("INVALID_JSON_FROM_UPSERT");
  }
}

export async function fetchFailuresWithStats(){
  return apiFetch(`/api/ratings/stats/per-failure`, {auth: true})
}
// /api/ratings/stats/per-failure

export async function fetchIrr() {
  return apiFetch(`/api/ratings/irr`, { auth: true });
}