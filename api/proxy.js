export const config = { runtime: "edge" };

export default async function handler(req) {
  const url = new URL(req.url);
  const backend = process.env.VITE_BACKEND_URL;
  const target = `${backend}${url.pathname.replace("/api-proxy", "")}${url.search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");

  const response = await fetch(target, {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : req.body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
