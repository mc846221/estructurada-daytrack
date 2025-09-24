import { NavLink } from "react-router-dom";
import "./navbar.css"; // opcional si luego quieres estilos separados

export default function Navbar() {
  const cls = ({ isActive }) => (isActive ? "navlink active" : "navlink");
  return (
    <nav className="navbar">
      <div className="brand">DayTrack</div>
      <div className="links">
        <NavLink to="/" className={cls} end>Dashboard</NavLink>
        <NavLink to="/habits" className={cls}>Hábitos</NavLink>
        <NavLink to="/streaks" className={cls}>Rachas</NavLink>
        <NavLink to="/rewards" className={cls}>Logros</NavLink>
        <NavLink to="/reports" className={cls}>Reportes</NavLink>
        <NavLink to="/profile" className={cls}>Perfil</NavLink>
        <NavLink to="/settings" className={cls}>Ajustes</NavLink>
      </div>
    </nav>
  );
}
