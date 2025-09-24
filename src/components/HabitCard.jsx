import { Link } from "react-router-dom";

export default function HabitCard({ habit, onDelete }) {
  return (
    <div className="card">
      <div className="row">
        <div className="pill" style={{ background: habit.color }}>{habit.icon}</div>
        <div>
          <div className="title">{habit.name}</div>
          <div className="muted">Creado: {habit.createdAt}</div>
        </div>
      </div>
      <div className="row end">
        <Link className="ghost" to={`/habits/${habit.id}`}>Abrir</Link>
        <button className="danger" onClick={() => onDelete(habit.id)}>Eliminar</button>
      </div>
    </div>
  );
}
