import React, { useState } from "react";
import { useData } from "../context/DataContext";

export default function Dashboard() {
  const { data, loading } = useData();
  const [tab, setTab] = useState("habits"); // controla qué tab está activo

  if (loading) return <div>Cargando...</div>;

  // métricas principales
  const totalCompletados = data.habits.filter(h => h.progress >= 100).length;
  const rachaMaxima = Math.max(...data.streaks.map(s => s.best), 0);
  const completadosHoy = data.habits.length; // simulado

  return (
    <div className="container">
      {/* Encabezado */}
      <header className="row end" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 className="brand">DayTrack</h2>
          <p>Construye hábitos extraordinarios, día a día</p>
        </div>
        <div>
          <p>¡Perfecto! ¡Completaste todo!</p>
          <button className="btn">+ Nuevo Hábito</button>
        </div>
      </header>

      {/* Métricas */}
      <div className="metrics">
        <div className="metric brand">✅ {completadosHoy}/{data.habits.length} completados hoy</div>
        <div className="metric danger">🔥 Racha máxima: {rachaMaxima} días</div>
        <div className="metric ok">🏆 {totalCompletados} hábitos completados</div>
      </div>

      {/* Opciones de navegación */}
      <div className="tabs">
        <div
          className={`tab ${tab === "habits" ? "active" : ""}`}
          onClick={() => setTab("habits")}
        >
          📅 Mis Hábitos
        </div>
        <div
          className={`tab ${tab === "logros" ? "active" : ""}`}
          onClick={() => setTab("logros")}
        >
          🏆 Logros
        </div>
        <div
          className={`tab ${tab === "stats" ? "active" : ""}`}
          onClick={() => setTab("stats")}
        >
          📊 Estadísticas
        </div>
      </div>

      {/* Contenido dinámico */}
      {tab === "habits" && (
        <div className="grid">
          {data.habits.map(h => (
            <div key={h.id} className="card">
              <h3>{h.icon} {h.name}</h3>
              <p className="subtitle">{h.notes}</p>
              <p>🔥 {h.streak} días consecutivos</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${h.progress}%` }}></div>
              </div>
              <p>{h.progress}%</p>
            </div>
          ))}
        </div>
      )}

      {tab === "logros" && (
        <div>
          <h3>Medallas Ganadas</h3>
          <div className="grid">
            {data.badges.slice(0, 2).map(b => (
              <div key={b.id} className="card">
                <h4>{b.icon} {b.name}</h4>
                <p className="subtitle">{b.desc}</p>
                <span className="pill">¡Ganada!</span>
              </div>
            ))}
          </div>

          <h3>Próximas Medallas</h3>
          <div className="grid">
            {data.badges.slice(2).map(b => (
              <div key={b.id} className="card">
                <h4>{b.icon} {b.name}</h4>
                <p className="subtitle">{b.desc}</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "70%" }}></div>
                </div>
                <p>Progreso</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "stats" && (
        <div className="grid">
          <div className="card">
            <h4>🔥 Racha Actual</h4>
            <p className="big">{data.user.streak}</p>
          </div>
          <div className="card">
            <h4>🏆 Récord Personal</h4>
            <p className="big">{rachaMaxima}</p>
          </div>
          <div className="card">
            <h4>✅ Total Completados</h4>
            <p className="big">{totalCompletados}</p>
          </div>
        </div>
      )}
    </div>
  );
}
