# Frontend refactor
Replace the original MyPortfolio/client directory with this client directory. Keep the original backend and .env. Run npm ci in client (Node 22.12+), then npm run dev from the original project root with backend dependencies installed, or run npm run dev in client and start the backend separately.

Public URL: /Portfolio-Project/ . Admin URL: /Portfolio-Project/admin/signin . Use an existing admin account or the original backend create-admin script. Legacy signin/dashboard URLs redirect. Public signup is removed from the UI because backend signup creates ordinary users.

Public pages use the original static data; backend GET endpoints require authentication, so admin edits cannot automatically appear for anonymous visitors without backend changes. No credentials or admin tokens are exposed to visitors. Contact is now read-only; the old form only saved to localStorage and never sent a message. Admin contacts CRUD remains.

Only client files are included. Existing API endpoints and server authorization remain unchanged.
