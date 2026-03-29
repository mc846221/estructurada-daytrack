// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar sesión al inicio
  useEffect(() => {
    const stored = localStorage.getItem("daytrack:user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Login
  const login = (emailOrUser, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("daytrack:usuarios")) || [];

    const found = storedUsers.find(
      (u) =>
        (u.email === emailOrUser || u.username === emailOrUser) &&
        u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem("daytrack:user", JSON.stringify(found));
      return { ok: true, user: found };
    }

    return { ok: false, msg: "Usuario o contraseña incorrectos" };
  };

  // Registro
  const register = (newUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("daytrack:usuarios")) || [];

    if (storedUsers.find((u) => u.email === newUser.email || u.username === newUser.username)) {
      return { ok: false, msg: "El correo o usuario ya existe" };
    }

    const userToSave = {
      id: `u_${Date.now()}`,
      ...newUser,
    };

    const updated = [...storedUsers, userToSave];
    localStorage.setItem("daytrack:usuarios", JSON.stringify(updated));

    setUser(userToSave);
    localStorage.setItem("daytrack:user", JSON.stringify(userToSave));

    return { ok: true, user: userToSave };
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("daytrack:user");
  };

  return (
    <AuthCtx.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
