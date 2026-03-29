// src/pages/Login.jsx
import { useState } from "react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { data } = useData();
  const navigate = useNavigate();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = data.users?.find(
      (u) =>
        (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
        u.password === password
    );
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="card">
        <label>Usuario o correo</label>
        <input
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="btn" type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
}
