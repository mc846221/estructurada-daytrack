export default function HabitCard({
  title,
  desc,
  streak,
  progress,
  tag,
  color
}) {
  const safeColor = color || "#dbb6ee"; // fallback por si no se pasa color

  return (
    <div className="card habit-card">
      {/* Cabecera */}
      <div className="row space-between">
        <div>
          <div className="title">{title}</div>
          <div className="subtitle">{desc}</div>
        </div>
        <span
          className="pill"
          style={{ background: safeColor, color: "#fff" }}
        >
          {tag}
        </span>
      </div>

      {/* Racha */}
      <div className="row space-between" style={{ marginTop: 12 }}>
        <div className="muted">🔥 {streak} días consecutivos</div>
      </div>

      {/* Progreso */}
      <div className="habit-progress" style={{ marginTop: 12 }}>
        <span className="muted">Progreso del objetivo</span>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progress}%`, background: safeColor }}
          ></div>
        </div>
        <div className="muted">{progress}%</div>
      </div>
    </div>
  );
}
