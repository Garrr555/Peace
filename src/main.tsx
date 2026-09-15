import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ToastContainer position="top-right" theme="colored" autoClose={2000} />
    <App />
  </BrowserRouter>,
);
