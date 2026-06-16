import React from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

const root = document.getElementById("root")!

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

if (root.childElementCount === 0) {
  createRoot(root).render(app)
} else {
  hydrateRoot(root, app)
}