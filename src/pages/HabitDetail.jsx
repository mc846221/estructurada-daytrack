import { useParams } from "react-router-dom";
import Page from "../components/Page";
import { useData } from "../context/DataContext";

export default function HabitDetail() {
  const { id } = useParams();
  const { data, loading, toggleHabitForDate } = useData();
  if (loading) return <Page title="Detalle">Cargando...</Page>;

  const habit = data.habits.find((h) => h.id === id);
  if (!habit) return <Page title="No encontrado">Hábito no existe</Page>;

  const today = new Date().toISOString().slice(0, 10);
  const doneToday = data.habitLogs.some((l) => l.habitId === id && l.date === today && l.done);

  return (
    <Page title={habit.name}>
      <div className="card">
        <div className="row">
          <div className="pill" style={{ background: habit.color }}>{habit.icon}</div>
          <div>
            <div className="title">{habit.name}</div>
            <div className="muted">{habit.notes || "Sin notas"}</div>
          </div>
        </div>
        <button onClick={() => toggleHabitForDate(habit.id, today)}>
          {doneToday ? "Desmarcar hoy" : "Marcar hoy"}
        </button>
      </div>
    </Page>
  );
}
