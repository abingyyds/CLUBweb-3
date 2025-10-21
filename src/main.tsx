import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppKitProvider } from "./components/AppkitProvider";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppKitProvider>
      <App />
      <Toaster richColors />
    </AppKitProvider>
  </StrictMode>
);
