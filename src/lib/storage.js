// src/lib/storage.js
const KEY = "daytrack:data";

export async function loadData() {
  const cached = localStorage.getItem(KEY);
  if (cached) return JSON.parse(cached);

  // Primera carga: leer seed.json
  const res = await fetch("/src/data/seed.json");
  const data = await res.json();
  localStorage.setItem(KEY, JSON.stringify(data));
  return data;
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function resetData() {
  localStorage.removeItem(KEY);
}

export function patchData(mutator) {
  const data = JSON.parse(localStorage.getItem(KEY));
  const next = mutator(structuredClone(data));
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
