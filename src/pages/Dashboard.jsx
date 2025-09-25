// src/pages/Dashboard.jsx
import React, { useState } from "react";
import Modal from "react-modal"; 
import { useData } from "../context/DataContext";
import HabitForm from "../components/HabitForm"; 

// Necesario para accesibilidad
Modal.setAppElement("#root");

export default function Dashboard() {
  const { data, loading, addHabit } = useData();
  const [tab, setTab] = useState("habits");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <div>Cargando...</div>;
  if (!data) return <div>No hay datos disponibles.</div>;

  const { habits = [], streaks = [], badges = [], user = {} } = data;

  const totalCompletados = habits.filter(
    (h) => h.progress >= (h.goal || 1)
  ).length;
  const rachaMaxima =
    streaks.length > 0 ? Math.max(...streaks.map((s) => s.best)) : 0;
  const completadosHoy = habits.length;

  return (
    <div className="container">
      {/* Encabezado */}
      <header className="dashboard-header">
        <div className="header-left">
          <img
            src="/logo-daytrack.png.png"
            alt="DayTrack Logo"
            className="logo"
          />
          <div>
            <h2 className="brand">Construye hábitos extraordinarios, día a día</h2>
            <div className="metrics">
              <div className="metric brand">
                ✅ {completadosHoy}/{habits.length} completados hoy
              </div>
              <div className="metric danger">
                🔥 Racha máxima: {rachaMaxima} días
              </div>
              <div className="metric ok">
                🏆 {totalCompletados} hábitos completados
              </div>
            </div>
          </div>
        </div>

        <div className="header-right">
          <img
            src="/avatar-daytrack.png.png"
            alt="Mascota DayTrack"
            className="mascot"
          />
          <div className="status">¡Vas por buen camino!</div>
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            + Nuevo Hábito
          </button>
        </div>
      </header>

      {/* Modal con formulario */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Agregar nuevo hábito"
        style={{
          content: {
            maxWidth: "500px",
            margin: "auto",
            borderRadius: "16px",
            padding: "20px",
            background: "#fff",
            boxShadow: "0 8px 20px rgba(0,0,0,.25)",
          },
        }}
      >
        <h2 style={{ marginBottom: "16px" }}>Crear Nuevo Hábito</h2>
        <HabitForm
          onSubmit={(form) => {
            addHabit(form);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {/* Tabs de navegación */}
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
          className={`tab ${tab === "estadisticas" ? "active" : ""}`}
          onClick={() => setTab("estadisticas")}
        >
          📊 Estadísticas
        </div>
      </div>

      {/* Contenido dinámico */}
      {tab === "habits" && (
        <div className="grid">
          {habits.map((h) => (
            <div key={h.id} className="card">
              <h3>
                {h.icon} {h.name}
              </h3>
              <p className="subtitle">{h.notes}</p>
              {h.category && <span className="pill">{h.category}</span>}
              <p>🔥 {h.streak || 0} días consecutivos</p>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${
                      h.goal ? Math.min((h.progress / h.goal) * 100, 100) : 0
                    }%`,
                  }}
                ></div>
              </div>
              <p>
                {h.progress || 0}/{h.goal || 1}
              </p>
            </div>
          ))}
        </div>
      )}

      {tab === "logros" && (
        <div>
          <h3>🏅 Medallas Ganadas</h3>
          <div className="grid">
            {badges
              .filter((b) => b.earned)
              .map((b) => (
                <div key={b.id} className="card">
                  <h4>
                    {b.icon} {b.name}
                  </h4>
                  <p className="subtitle">{b.desc}</p>
                  <span className="pill">¡Ganada!</span>
                </div>
              ))}
          </div>

          <h3>⭐ Próximas Medallas</h3>
          <div className="grid">
            {badges
              .filter((b) => !b.earned)
              .map((b) => (
                <div key={b.id} className="card">
                  <h4>
                    {b.icon} {b.name}
                  </h4>
                  <p className="subtitle">{b.desc}</p>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${b.progress || 0}%` }}
                    ></div>
                  </div>
                  <p>{b.progress || 0}%</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {tab === "estadisticas" && (
        <div className="grid">
          <div className="card">
            <h4>🔥 Racha Actual</h4>
            <p className="big">{user.streak || 0}</p>
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
