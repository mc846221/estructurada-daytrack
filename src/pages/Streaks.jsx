// src/pages/Streaks.jsx
import Page from "../components/Page";
import { useData } from "../context/DataContext";

// 🔹 Calcular racha actual
function calcStreak(logs, habitId) {
  const sorted = logs
    .filter((l) => l.habitId === habitId && l.done)
    .map((l) => l.date)
    .sort((a, b) => b.localeCompare(a));

  if (sorted.length === 0) return 0;

  let streak = 0;
  let currentDate = new Date(sorted[0]);

  for (let d of sorted) {
    const logDate = new Date(d);
    if (logDate.toDateString() === currentDate.toDateString()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// 🔹 Calcular racha más larga (best streak)
function calcBestStreak(logs, habitId) {
  const sorted = logs
    .filter((l) => l.habitId === habitId && l.done)
    .map((l) => new Date(l.date))
    .sort((a, b) => a - b);

  let best = 0;
  let current = 0;
  let prevDate = null;

  for (let date of sorted) {
    if (prevDate) {
      const diff = (date - prevDate) / (1000 * 60 * 60 * 24); // diferencia en días
      if (diff === 1) {
        current++;
      } else {
        current = 1;
      }
    } else {
      current = 1;
    }
    if (current > best) best = current;
    prevDate = date;
  }
  return best;
}

export default function Streaks() {
  const { data, loading } = useData();
  if (loading) return <Page title="Rachas">Cargando...</Page>;

  return (
    <Page title="Rachas">
      <div className="grid">
        {data.habits.map((h) => {
          const currentStreak = calcStreak(data.habitLogs, h.id);
          const bestStreak = calcBestStreak(data.habitLogs, h.id);
          return (
            <div key={h.id} className="card">
              <div className="title">
                {h.icon} {h.name}
              </div>
              <div className="muted">Racha actual</div>
              <div className="big">{currentStreak} 🔥</div>
              <div className="muted" style={{ marginTop: 8 }}>
                Mejor racha: {bestStreak} días
              </div>
            </div>
          );
        })}
      </div>

      {data.habits.length === 0 && (
        <div className="empty" style={{ marginTop: 16 }}>
          No tienes hábitos aún. ¡Crea uno para empezar tus rachas!
        </div>
      )}
    </Page>
  );
}
