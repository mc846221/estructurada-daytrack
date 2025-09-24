// src/lib/id.js
export const uid = (p = "") =>
  `${p}${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`;
