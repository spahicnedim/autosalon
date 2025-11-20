export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function request(path: string, options: RequestInit = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  get: (path: string) => request(path),
  post: (path: string, body: any, isFormData = false) =>
    request(path, {
      method: "POST",
      body: isFormData ? body : JSON.stringify(body),
      headers: isFormData ? {} : { "Content-Type": "application/json" },
    }),
  put: (path: string, body: any, isFormData = false) =>
    request(path, {
      method: "PUT",
      body: isFormData ? body : JSON.stringify(body),
      headers: isFormData ? {} : { "Content-Type": "application/json" },
    }),
  delete: (path: string) => request(path, { method: "DELETE" }),
};
