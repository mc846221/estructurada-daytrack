import { useState } from "react";

export default function HabitForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    icon: initial.icon || "✅",
    color: initial.color || "#6C63FF",
    schedule: initial.schedule || ["daily"],
    notes: initial.notes || ""
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="card"
    >
      <label>Nombre</label>
      <input required value={form.name} onChange={(e) => set("name", e.target.value)} />
      <label>Ícono (emoji)</label>
      <input value={form.icon} onChange={(e) => set("icon", e.target.value)} />
      <label>Color</label>
      <input type="color" value={form.color} onChange={(e) => set("color", e.target.value)} />
      <label>Frecuencia</label>
      <select
        value={form.schedule[0]}
        onChange={(e) => set("schedule", [e.target.value])}
      >
        <option value="daily">Diario</option>
        <option value="weekdays">Lunes–Viernes</option>
        <option value="weekends">Fines de semana</option>
      </select>
      <label>Notas</label>
      <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} />
      <div className="row">
        <button type="submit">Guardar</button>
        {onCancel && (
          <button type="button" className="ghost" onClick={onCancel}>Cancelar</button>
        )}
      </div>
    </form>
  );
}
