import { createContext, useContext, useState } from "react";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  // Simulación simple: si hay user => logged in
  const [user, setUser] = useState(null);

  const login = (emailOrUser) => {
    // En un caso real validarías; aquí acepta cualquier string
    const fake = { id: "u_1", name: emailOrUser || "User", email: emailOrUser };
    setUser(fake);
  };

  const logout = () => setUser(null);

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
