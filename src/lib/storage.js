// src/lib/storage.js
import seed from "../data/seed.json";

const KEY = "daytrack:data";

// 🔹 Cargar datos (si no hay nada en localStorage, usar seed.json)
export async function loadData() {
  const cached = localStorage.getItem(KEY);
  if (cached) return JSON.parse(cached);

  // Primera carga → usar semilla importada
  localStorage.setItem(KEY, JSON.stringify(seed));
  return seed;
}

// 🔹 Guardar datos
export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// 🔹 Resetear datos (volver a semilla)
export function resetData() {
  localStorage.removeItem(KEY);
  localStorage.setItem(KEY, JSON.stringify(seed));
}

// 🔹 patchData: aplicar cambios con un mutador
export function patchData(mutator) {
  const data = JSON.parse(localStorage.getItem(KEY)) || seed;
  const next = mutator(structuredClone(data));
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
