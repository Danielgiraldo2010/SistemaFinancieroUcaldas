import type { VercelRequest, VercelResponse } from "@vercel/node";

const BACKEND_URL = process.env.VITE_BACKEND_URL?.replace(/\/$/, "");

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const pathFromQuery = req.query.path;
    const path = Array.isArray(pathFromQuery)
      ? pathFromQuery[0]
      : pathFromQuery ?? req.url ?? "/";
    const normalizedPath = String(path).replace(/^\//, "");
    const target = `${BACKEND_URL}/${normalizedPath}`;

    // If this is a GET for an auth SPA route, serve the SPA index.html
    // so navigation to /login, /register, etc. doesn't get proxied as GET to backend.
    const spaAuthRoutes = ["login", "register", "forgotPassword", "refresh"];
    if (req.method === "GET" && spaAuthRoutes.includes(normalizedPath)) {
      try {
        const host = String(req.headers["x-forwarded-host"] || req.headers.host || "");
        const proto = String(req.headers["x-forwarded-proto"] || "https");
        const indexUrl = `${proto}://${host}/index.html`;
        const indexResp = await fetch(indexUrl);
        const indexText = await indexResp.text();
        res.setHeader("Content-Type", "text/html");
        res.status(200).send(indexText);
        return;
      } catch (err) {
        // If serving index fails, fall through to proxy behavior below
      }
    }

    const headers: Record<string, string> = {};
    Object.entries(req.headers).forEach(([key, value]) => {
      if (!["host", "connection", "content-length"].includes(key.toLowerCase()) && value) {
        headers[key] = String(value);
      }
    });

    const response = await fetch(target, {
      method: req.method ?? "GET",
      headers,
      body: req.method !== "GET" && req.method !== "HEAD" && req.body
        ? JSON.stringify(req.body)
        : undefined,
    });

    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") {
        res.setHeader(key, value);
      }
    });

    // Asegurar que Content-Type incluya charset=utf-8 para caracteres acentuados
    const contentType = response.headers.get("content-type");
    if (contentType && !contentType.includes("charset")) {
      res.setHeader("Content-Type", `${contentType}; charset=utf-8`);
    }

    res.status(response.status).send(await response.text());
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Proxy error" });
  }
};
