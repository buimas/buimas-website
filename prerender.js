import fs from "node:fs"
import path from "node:path"
import { render } from "./dist-server/entry-server.js"

// Every route to turn into static HTML (skip the "*" 404 — it's handled at runtime)
const routes = ["/", "/about", "/hire-talent", "/privacy"]

const template = fs.readFileSync("dist/index.html", "utf-8")

for (const url of routes) {
  const appHtml = render(url)
  const html = template.replace("<!--app-html-->", appHtml)
  const filePath = url === "/" ? "dist/index.html" : `dist${url}/index.html`
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, html)
  console.log("prerendered", filePath)
}