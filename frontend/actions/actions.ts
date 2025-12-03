export async function getCars() {
  const res = await fetch("http://autosalon_backend:4000/api/cars", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch cars");
  const json = await res.json();
  return json.data ?? [];
}

export async function getBrends() {
  const res = await fetch("http://autosalon_backend:4000/api/brend", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch brends");
  const json = await res.json();
  return json ?? [];
}

export async function getOprema() {
  const res = await fetch("http://autosalon_backend:4000/api/oprema");
  if (!res.ok) throw new Error("Failed to fetch oprema");
  const json = await res.json();
  return json ?? [];
}

export async function getKaroserija() {
  const res = await fetch("http://autosalon_backend:4000/api/karoserija");
  if (!res.ok) throw new Error("Failed to fetch karoserija");
  const json = await res.json();
  return json ?? [];
}
