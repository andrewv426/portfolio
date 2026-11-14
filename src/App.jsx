import { Outlet, ScrollRestoration } from "react-router-dom";

function App() {
  return (
    <main className="shell">
      <article className="frame">
        <Outlet />
      </article>
      <ScrollRestoration />
    </main>
  );
}

export default App;
