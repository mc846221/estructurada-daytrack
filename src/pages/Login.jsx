import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validación básica de email
  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Por favor ingresa un correo válido con '@'.");
      return;
    }

    if (!password.trim()) {
      alert("Por favor ingresa tu contraseña.");
      return;
    }

    // Simulación login
    login(email);
    navigate("/");
  };

  return (
    <div className="card">
      <h2 className="title">Iniciar Sesión</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Entrar
        </button>
      </form>

      {/* Botón para registrar un nuevo usuario */}
      <div style={{ marginTop: "16px" }}>
        <button
          className="btn btn-ghost"
          onClick={() => navigate("/users")}
        >
          Registrar nuevo usuario
        </button>
      </div>
    </div>
  );
}
