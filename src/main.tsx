import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      console.log("[FahrVerse] SW registered:", reg.scope);

      // Check for updates every 60s
      setInterval(() => reg.update(), 60_000);
    } catch (err) {
      console.warn("[FahrVerse] SW registration failed:", err);
    }
  });
}
