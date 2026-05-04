import type { VercelRequest, VercelResponse } from "@vercel/node";

const BACKEND_URL = process.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error("VITE_BACKEND_URL environment variable is not set");
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const path = req.query.path as string | string[] | undefined;
    const pathStr = Array.isArray(path) ? path.join("/") : (path || "");

    const url = new URL(`${BACKEND_URL}/${pathStr}`);

    // Copy query parameters
    if (req.url?.includes("?")) {
      const searchParams = new URL(req.url, "http://localhost").searchParams;
      searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
      });
    }

    const headers = new Headers();
    
    // Copy necessary headers, excluding host
    Object.entries(req.headers).forEach(([key, value]) => {
      if (
        key.toLowerCase() !== "host" &&
        key.toLowerCase() !== "connection" &&
        key.toLowerCase() !== "content-length" &&
        value
      ) {
        headers.append(key, String(value));
      }
    });

    const response = await fetch(url.toString(), {
      method: req.method || "GET",
      headers,
      body: req.method !== "GET" && req.method !== "HEAD" && req.body 
        ? JSON.stringify(req.body) 
        : undefined,
    });

    // Copy response headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== "content-encoding") {
        responseHeaders[key] = value;
      }
    });

    res.status(response.status);
    Object.entries(responseHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({
      error: "Proxy error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
