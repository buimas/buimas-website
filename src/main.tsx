import React from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import App from "./App"
import "./index.css"

const root = document.getElementById("root")!

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

if (root.childElementCount === 0) {
  createRoot(root).render(app)
} else {
  hydrateRoot(root, app)
}