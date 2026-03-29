// src/context/DataContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { loadData, saveData, patchData } from "../lib/storage";
import { uid } from "../lib/id";

const DataCtx = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const d = await loadData();
      // inicializamos users si no existe
      if (!d.users) d.users = [];
      setData(d);
      setLoading(false);
    })();
  }, []);

  // función para guardar cambios y refrescar estado
  const persist = (next) => {
    setData(next);
    saveData(next);
  };

  // === CRUD de hábitos ===
  const addHabit = (partial) =>
    persist(
      patchData((d) => {
        d.habits.push({
          id: uid("h_"),
          name: partial.name,
          icon: partial.icon || "✅",
          color: partial.color || "#6C63FF",
          schedule: partial.schedule?.length ? partial.schedule : ["daily"],
          notes: partial.notes || "",
          createdAt: new Date().toISOString().slice(0, 10),
          active: true,
          // 👇 campos necesarios para Dashboard
          progress: partial.progress || 0,
          goal: partial.goal || 30,
          streak: partial.streak || 0,
          category: partial.category || "",
        });
        return d;
      })
    );

  const removeHabit = (id) =>
    persist(
      patchData((d) => {
        d.habits = d.habits.filter((h) => h.id !== id);
        d.habitLogs = d.habitLogs.filter((l) => l.habitId !== id);
        return d;
      })
    );

  const updateHabit = (id, changes) =>
    persist(
      patchData((d) => {
        const h = d.habits.find((h) => h.id === id);
        if (h) Object.assign(h, changes);
        return d;
      })
    );

  const toggleHabitForDate = (habitId, dateISO) =>
    persist(
      patchData((d) => {
        const e = d.habitLogs.find(
          (l) => l.habitId === habitId && l.date === dateISO
        );
        if (e) e.done = !e.done;
        else
          d.habitLogs.push({
            id: uid("hl_"),
            habitId,
            date: dateISO,
            done: true,
          });
        return d;
      })
    );

  // === CRUD de usuarios ===
  const addUser = (partial) =>
    persist(
      patchData((d) => {
        d.users = d.users || [];
        d.users.push({
          id: uid("u_"),
          fullName: partial.fullName,
          email: partial.email,
          username: partial.username,
          password: partial.password, // ⚠️ demo, no cifrado
        });
        return d;
      })
    );

  const updateUser = (id, changes) =>
    persist(
      patchData((d) => {
        const u = d.users.find((u) => u.id === id);
        if (u) Object.assign(u, changes);
        return d;
      })
    );

  const removeUser = (id) =>
    persist(
      patchData((d) => {
        d.users = d.users.filter((u) => u.id !== id);
        return d;
      })
    );

  const value = {
    data,
    loading,
    // hábitos
    addHabit,
    removeHabit,
    updateHabit,
    toggleHabitForDate,
    // usuarios
    users: data?.users || [], // 👈 ahora expuesto en el contexto
    addUser,
    updateUser,
    removeUser,
  };

  return <DataCtx.Provider value={value}>{children}</DataCtx.Provider>;
}

export const useData = () => useContext(DataCtx);
