export default function Page({ title, actions, children }) {
  return (
    <div className="container">
      <header className="row" style={{ justifyContent: "space-between", margin: "18px 0" }}>
        <h1 className="section-title">{title}</h1>
        <div>{actions}</div>
      </header>
      {children}
    </div>
  );
}
