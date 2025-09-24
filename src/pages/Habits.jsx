// src/pages/Habits.jsx
import { useState } from "react";
import { useData } from "../context/DataContext";
import Page from "../components/Page";

export default function Habits() {
  const { data, loading, addHabit, removeHabit } = useData();
  const [name, setName] = useState("");

  if (loading) return <Page title="Hábitos">Cargando...</Page>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    addHabit({ name: n });   // puedes añadir más campos: icon, color, etc.
    setName("");
  };

  return (
    <Page
      title="Hábitos"
      actions={
        <button className="btn" onClick={handleSubmit}>
          + Nuevo
        </button>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Nombre del hábito"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn">Agregar</button>
        <button type="button" className="btn btn-ghost" onClick={() => setName("")}>
          Cancelar
        </button>
      </form>

      <div className="grid">
        {data.habits.map((h) => (
          <div key={h.id} className="card">
            <div className="title">{h.icon ?? "✅"} {h.name}</div>
            <div className="muted">Creado: {h.createdAt}</div>
            <div className="row end" style={{ marginTop: 10 }}>
              <button className="btn btn-danger" onClick={() => removeHabit(h.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {data.habits.length === 0 && (
        <div className="empty" style={{ marginTop: 16 }}>
          Aún no tienes hábitos. ¡Crea el primero!
        </div>
      )}
    </Page>
  );
}
