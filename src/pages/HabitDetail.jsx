// src/pages/HabitDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import Page from "../components/Page";
import { useData } from "../context/DataContext";

export default function HabitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, toggleHabitForDate } = useData();

  if (loading) return <Page title="Detalle">Cargando...</Page>;

  const habit = data.habits.find((h) => h.id === id);
  if (!habit) return <Page title="No encontrado">Hábito no existe</Page>;

  const today = new Date().toISOString().slice(0, 10);
  const doneToday = data.habitLogs.some(
    (l) => l.habitId === id && l.date === today && l.done
  );

  return (
    <Page
      title={habit.name}
      actions={
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      }
    >
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row">
          <div className="pill" style={{ background: habit.color }}>
            {habit.icon}
          </div>
          <div>
            <div className="title">{habit.name}</div>
            <div className="muted">{habit.notes || "Sin notas"}</div>
          </div>
        </div>

        <button
          className={`btn ${doneToday ? "btn-ok" : ""}`}
          onClick={() => toggleHabitForDate(habit.id, today)}
          style={{ marginTop: 12 }}
        >
          {doneToday ? "✅ Marcado hoy" : "Marcar como hecho hoy"}
        </button>
      </div>

      {/* Historial del hábito */}
      <h3 style={{ marginTop: 24 }}>Historial</h3>
      <ul>
        {data.habitLogs
          .filter((l) => l.habitId === habit.id)
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((l) => (
            <li key={l.id}>
              {l.date} → {l.done ? "✔️ Hecho" : "❌ No hecho"}
            </li>
          ))}
      </ul>
    </Page>
  );
}
