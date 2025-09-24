// src/components/Tabs.jsx
import { useState } from "react";

export default function Tabs() {
  const [active, setActive] = useState("habits");

  return (
    <div className="tabs">
      <div
        className={`tab ${active === "habits" ? "active" : ""}`}
        onClick={() => setActive("habits")}
      >
        📅 Mis Hábitos
      </div>
      <div
        className={`tab ${active === "logros" ? "active" : ""}`}
        onClick={() => setActive("logros")}
      >
        🏆 Logros
      </div>
      <div
        className={`tab ${active === "stats" ? "active" : ""}`}
        onClick={() => setActive("stats")}
      >
        📊 Estadísticas
      </div>
    </div>
  );
}
