// src/pages/Users.jsx
import { useState } from "react";
import { useData } from "../context/DataContext";

export default function Users() {
  const { data, loading, addUser, updateUser, removeUser } = useData();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);

  if (loading) return <div>Cargando...</div>;
  const { users = [] } = data;

  // validación de correo
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(form.email)) {
      alert("Por favor ingresa un correo válido.");
      return;
    }

    if (editingId) {
      updateUser(editingId, form);
    } else {
      addUser(form);
    }
    setForm({ fullName: "", email: "", username: "", password: "" });
    setEditingId(null);
  };

  return (
    <div className="container">
      <h2 className="brand">👤 Gestión de Usuarios</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 24 }}>
        <label>Nombre completo</label>
        <input
          required
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          placeholder="Ej: Juan Pérez"
        />

        <label>Correo electrónico</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="ejemplo@correo.com"
        />

        <label>Nombre de usuario</label>
        <input
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="juanperez"
        />

        <label>Contraseña</label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="••••••••"
        />

        <div className="row end" style={{ marginTop: 12, gap: "10px" }}>
          <button type="submit" className="btn">
            {editingId ? "Actualizar" : "Registrar"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setForm({ fullName: "", email: "", username: "", password: "" });
                setEditingId(null);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla de usuarios */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Usuario</th>
              <th className="center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>{u.username}</td>
                <td className="center">
                  <button
                    className="btn-ghost"
                    onClick={() => {
                      setForm(u);
                      setEditingId(u.id);
                    }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => removeUser(u.id)}
                  >
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="muted center">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
