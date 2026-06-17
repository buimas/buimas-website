import fs from "node:fs"
import path from "node:path"
import { render } from "./dist-server/entry-server.js"

const routes = ["/", "/about", "/hire-talent", "/privacy"]
const template = fs.readFileSync("dist/index.html", "utf-8")

for (const url of routes) {
  const { html, head } = render(url)
  const out = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html)
  const filePath = url === "/" ? "dist/index.html" : `dist${url}/index.html`
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, out)
  console.log("prerendered", filePath)
}