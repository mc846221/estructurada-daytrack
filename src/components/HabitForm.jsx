// src/components/HabitForm.jsx
import { useState } from "react";

export default function HabitForm({ initial = {}, onSubmit, onCancel = () => {} }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    icon: initial.icon || "✅",
    category: initial.category || "",
    schedule: initial.schedule || ["daily"],
    notes: initial.notes || "",
    goal: initial.goal || 30,
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{
        position: "relative",
        padding: "24px",
        borderRadius: "16px",
        background: "#fff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      {/* Botón cerrar (X) */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onCancel}
        className="btn-ghost"
        style={{
          position: "absolute",
          right: 12,
          top: 12,
          fontSize: "18px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
          fontSize: "1.3rem",
          fontWeight: "700",
          color: "#5b21b6",
        }}
      >
        Crear Nuevo Hábito
      </h2>

      {/* Nombre */}
      <label style={{ fontWeight: 600, marginBottom: "6px" }}>Nombre del hábito</label>
      <input
        required
        placeholder="Ej: Leer 30 minutos"
        value={form.name}
        onChange={(e) => set("name", e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #e2d4f5",
          marginBottom: "16px",
          width: "100%",
        }}
      />

      {/* Descripción */}
      <label style={{ fontWeight: 600, marginBottom: "6px" }}>Descripción</label>
      <textarea
        placeholder="Describe tu hábito..."
        value={form.notes}
        onChange={(e) => set("notes", e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #e2d4f5",
          marginBottom: "16px",
          width: "100%",
          minHeight: "70px",
        }}
      />

      {/* Categoría */}
      <label style={{ fontWeight: 600, marginBottom: "6px" }}>Categoría</label>
      <select
        required
        value={form.category}
        onChange={(e) => set("category", e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #e2d4f5",
          marginBottom: "16px",
          width: "100%",
        }}
      >
        <option value="">Selecciona una categoría</option>
        <option value="Salud">Salud</option>
        <option value="Ejercicio">Ejercicio</option>
        <option value="Lectura">Lectura</option>
        <option value="Productividad">Productividad</option>
        <option value="Mindfulness">Mindfulness</option>
        <option value="Aprendizaje">Aprendizaje</option>
        <option value="Social">Social</option>
        <option value="Creatividad">Creatividad</option>
      </select>

      {/* Objetivo */}
      <label style={{ fontWeight: 600, marginBottom: "6px" }}>Objetivo (días)</label>
      <input
        type="number"
        min="1"
        value={form.goal}
        onChange={(e) => set("goal", Number(e.target.value))}
        style={{
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #e2d4f5",
          marginBottom: "16px",
          width: "100%",
        }}
      />

      {/* Ícono */}
      <label style={{ fontWeight: 600, marginBottom: "6px" }}>Ícono (emoji)</label>
      <input
        value={form.icon}
        onChange={(e) => set("icon", e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #e2d4f5",
          marginBottom: "20px",
          width: "100%",
        }}
      />

      {/* Botones */}
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <button
          type="button"
          className="btn-ghost"
          onClick={onCancel}
          style={{
            padding: "10px 18px",
            borderRadius: "12px",
            background: "#f3f0ff",
            color: "#5b21b6",
            fontWeight: "600",
            border: "1px solid #e2d4f5",
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn"
          style={{
            padding: "10px 18px",
            borderRadius: "12px",
            background: "#7c3aed",
            color: "#fff",
            fontWeight: "600",
            border: "none",
          }}
        >
          Crear Hábito
        </button>
      </div>
    </form>
  );
}
