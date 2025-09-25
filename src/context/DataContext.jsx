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

  const value = {
    data,
    loading,
    addHabit,
    removeHabit,
    updateHabit,
    toggleHabitForDate,
  };

  return <DataCtx.Provider value={value}>{children}</DataCtx.Provider>;
}

export const useData = () => useContext(DataCtx);
