import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router"
import { HelmetProvider, type HelmetServerState } from "react-helmet-async"
import App from "./App"

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )

  const { helmet } = helmetContext
  const head = helmet
    ? helmet.title.toString() + helmet.meta.toString() + helmet.link.toString()
    : ""

  return { html, head }
}