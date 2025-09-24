// src/pages/Rewards.jsx
import Page from "../components/Page";
import { useData } from "../context/DataContext";

export default function Rewards() {
  const { data, loading } = useData();
  if (loading) return <Page title="Logros">Cargando...</Page>;

  // Logros obtenidos por el usuario
  const earned = data.badges.filter((b) => data.user.badges.includes(b.id));

  // Logros no obtenidos aún
  const locked = data.badges.filter((b) => !data.user.badges.includes(b.id));

  return (
    <Page title="Logros">
      <h2>Mis logros</h2>
      <div className="grid">
        {earned.map((b) => (
          <div key={b.id} className="card">
            <div className="big">{b.icon}</div>
            <div className="title">{b.name}</div>
            <div className="muted">{b.desc}</div>
          </div>
        ))}
        {earned.length === 0 && (
          <div className="empty">Aún no has ganado logros</div>
        )}
      </div>

      <h2 style={{ marginTop: 32 }}>Bloqueados</h2>
      <div className="grid">
        {locked.map((b) => (
          <div key={b.id} className="card muted">
            <div className="big">🔒</div>
            <div className="title">{b.name}</div>
            <div className="muted">{b.desc}</div>
          </div>
        ))}
        {locked.length === 0 && (
          <div className="empty">¡Ya desbloqueaste todos los logros!</div>
        )}
      </div>
    </Page>
  );
}
