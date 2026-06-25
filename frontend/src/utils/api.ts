// In production, require VITE_API_BASE_URL. Only fallback to 127.0.0.1 in local dev.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://127.0.0.1:8000" : "");
