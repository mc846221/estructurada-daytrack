import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Page from "../components/Page";

export default function Login() {
  const { login } = useAuth();
  const [id, setId] = useState("");

  return (
    <Page title="Iniciar sesión">
      <form
        className="card"
        onSubmit={(e) => {
          e.preventDefault();
          login(id || "usuario");
        }}
      >
        <label>Usuario o correo</label>
        <input value={id} onChange={(e) => setId(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
    </Page>
  );
}
