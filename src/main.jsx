import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<About />} />
          <Route path="blog" element={<Navigate to="/" replace />} />
          <Route path="about" element={<Navigate to="/" replace />} />
          <Route path="experience" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="work/:slug" element={<Navigate to="/experience" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
