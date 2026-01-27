const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

import { getToken } from "./localStorage.js";

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

export function fetchMyProfile() {
    return apiFetch("/api/me/profile", { method: "GET", auth: true });
}

export function updateMyProfile(patch) {
    // Use PATCH for partial updates
    return apiFetch("/api/me/profile", { method: "PATCH", body: patch, auth: true });
}
