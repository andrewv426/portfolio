import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Analytics />
    </>
  );
}

export default App;
