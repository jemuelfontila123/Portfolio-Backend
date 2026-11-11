// Change this one value to point at your backend.
export const API_BASE_URL = "http://localhost:3000/api";

const AUTH_KEY = "auth";

export const saveAuth = (auth) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
};

export const getAuth = () => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};

/**
 * Small fetch wrapper.
 * - Sends/receives JSON
 * - Adds the Bearer token when `auth` is true
 * - Throws an Error with `message` and optional `fieldErrors`
 *   (expects the backend to reply { message, errors: { field: "msg" } })
 */
export const request = async (path, { method = "GET", body, auth = false } = {}) => {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getAuth()?.token;
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Unable to reach the server. Please try again.");
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong. Please try again.");
    error.fieldErrors = data.errors;
    throw error;
  }

  return data;
};

// Routes (made up - rename to match your backend)
export const api = {
  signUp: (payload) => request("/auth/signup", { method: "POST", body: payload }),
  signIn: (payload) => request("/auth/signin", { method: "POST", body: payload }),
  createContact: (payload) => request("/contacts", { method: "POST", body: payload }),
  createQualification: (payload) =>
    request("/qualifications", { method: "POST", body: payload, auth: true }),
  createProject: (payload) => request("/projects", { method: "POST", body: payload, auth: true }),
};
