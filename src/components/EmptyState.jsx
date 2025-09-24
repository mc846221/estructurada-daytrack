export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {action}
    </div>
  );
}
