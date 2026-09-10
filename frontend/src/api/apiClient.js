/**
 * Centralized API Client configuration for Hamara Saathi
 * Automatically detects VITE_API_BASE_URL environment variable with fallback to localhost.
 */

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/+$/, "");

/**
 * Helper to build full asset URL (e.g. uploaded documents, avatars)
 * @param {string} path 
 * @returns {string}
 */
export function getMediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("blob:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}

/**
 * Standard fetch wrapper with baseURL, credentials, and JSON parsing defaults.
 * @param {string} endpoint - API path (e.g., '/api/login') or absolute URL
 * @param {RequestInit} [options] - Standard fetch options
 * @returns {Promise<Response>}
 */
export async function apiFetch(endpoint, options = {}) {
  const url = endpoint.startsWith("http://") || endpoint.startsWith("https://")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const defaultHeaders = {};

  // Only set Content-Type if body is not FormData (browser sets boundary automatically)
  if (options.body && !(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  };

  return fetch(url, config);
}

/**
 * Convenience API helper methods
 */
export const api = {
  get: (endpoint, options = {}) => apiFetch(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options = {}) =>
    apiFetch(endpoint, {
      ...options,
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body)
    }),
  put: (endpoint, body, options = {}) =>
    apiFetch(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body)
    }),
  delete: (endpoint, options = {}) => apiFetch(endpoint, { ...options, method: "DELETE" })
};

export default api;
