import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Post, { ProjectRedirect } from "./pages/Post.jsx";
import Work from "./pages/Work.jsx";

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey) {
  void import("posthog-js").then(({ default: posthog }) => {
    posthog.init(posthogKey, {
      api_host:
        import.meta.env.VITE_POSTHOG_HOST ||
        (import.meta.env.PROD ? "/ph" : "https://us.i.posthog.com"),
      ui_host: "https://us.posthog.com",
      defaults: "2026-08-30",
      person_profiles: "identified_only",
    });
  });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "work", element: <Work /> },
      { path: "blog/:slug", element: <Post /> },
      { path: "projects/:slug", element: <ProjectRedirect /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Analytics />
  </StrictMode>,
);
