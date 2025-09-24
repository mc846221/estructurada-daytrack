// src/pages/Habits.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import Page from "../components/Page";

export default function Habits() {
  const { data, loading, addHabit, removeHabit, updateHabit } = useData();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState("");

  if (loading) return <Page title="Hábitos">Cargando...</Page>;

  // Crear hábito
  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addHabit({ name });
    setName("");
  };

  // Actualizar hábito
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editName.trim()) return;
    updateHabit(editing, { name: editName });
    setEditing(null);
    setEditName("");
  };

  return (
    <Page title="Hábitos">
      {/* Formulario agregar */}
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          placeholder="Nuevo hábito"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn">
          Agregar
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setName("")}
        >
          Cancelar
        </button>
      </form>

      {/* Lista de hábitos */}
      <div className="grid">
        {data.habits.map((h) => (
          <div key={h.id} className="card">
            {editing === h.id ? (
              // Formulario de edición
              <form onSubmit={handleUpdate} style={{ display: "flex", gap: 8 }}>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn btn-ok">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setEditing(null)}
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                {/* Nombre del hábito como Link al detalle */}
                <div className="title">
                  <Link
                    to={`/habits/${h.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {h.icon ?? "✅"} {h.name}
                  </Link>
                </div>
                <div className="muted">Creado: {h.createdAt}</div>
                <div className="row end" style={{ marginTop: 10 }}>
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      setEditing(h.id);
                      setEditName(h.name);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeHabit(h.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Estado vacío */}
      {data.habits.length === 0 && (
        <div className="empty" style={{ marginTop: 16 }}>
          Aún no tienes hábitos. ¡Crea el primero!
        </div>
      )}
    </Page>
  );
}
