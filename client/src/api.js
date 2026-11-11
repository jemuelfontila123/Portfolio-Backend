// Change this one value to point at your backend.
export const API_BASE_URL = "http://localhost:5000/api";

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

// Takes the sign-in response { status, token, data: { id, name, email, role } }
// and stores the token and user (including role) in localStorage.
export const saveSession = (response) => {
  saveAuth({
    token: response.token,
    user: {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role,
    },
  });
};

export const getUser = () => getAuth()?.user || null;
export const getRole = () => getUser()?.role || null;
export const isAdmin = () => getRole() === "admin";

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
    const error = new Error(data.message || "Incorrect username or passsword.");
    error.fieldErrors = data.errors;
    throw error;
  }

  return data;
};

/**
 * True only if a JWT is stored and has not expired.
 * (Decodes the payload only to read `exp`; the server still verifies the signature.)
 */
export const isAuthenticated = () => {
  const token = getAuth()?.token;
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// Full CRUD for one resource, always sends the Bearer token.
const createResourceApi = (resource) => ({
  list: async () => {
    const data = await request(`/${resource}`, { auth: true });
    return Array.isArray(data) ? data : data.data || data.items || [];
  },
  create: (body) => request(`/${resource}`, { method: "POST", body, auth: true }),
  update: (id, body) => request(`/${resource}/${id}`, { method: "PATCH", body, auth: true }),
  remove: (id) => request(`/${resource}/${id}`, { method: "DELETE", auth: true }),
  removeAll: () => request(`/${resource}`, { method: "DELETE", auth: true }),
});

export const projectsApi = createResourceApi("projects");
export const qualificationsApi = createResourceApi("qualifications");
export const contactsApi = createResourceApi("contacts");

// Routes (made up - rename to match your backend)
export const api = {
  signUp: (payload) => request("/auth/signup", { method: "POST", body: payload }),
  signIn: (payload) => request("/auth/signin", { method: "POST", body: payload }),
  createContact: (payload) => request("/contacts", { method: "POST", body: payload }),
  createQualification: (payload) =>
    request("/qualifications", { method: "POST", body: payload, auth: true }),
  createProject: (payload) => request("/projects", { method: "POST", body: payload, auth: true }),
};