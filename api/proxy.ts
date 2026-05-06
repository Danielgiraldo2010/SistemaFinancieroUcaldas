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

    res.status(response.status).send(await response.text());
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Proxy error" });
  }
};
