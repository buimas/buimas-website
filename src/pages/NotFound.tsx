import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-24 text-center">
      <Helmet>
        <title>Page Not Found</title>
        <meta name="robots" content="noindex" />
    </Helmet>
      <p className="text-8xl font-bold leading-none text-ink-200 md:text-9xl">404</p>
      <h1 className="mt-6 text-3xl font-semibold text-ink-900 md:text-4xl">Page not found</h1>
      <p className="mt-4 max-w-md text-ink-500">
        The page you're looking for doesn't exist or may have moved. Let's get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="rounded-full bg-ink-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-ink-800">
          Back to home
        </Link>
        <Link to="/hire-talent" className="rounded-full border border-ink-200 px-6 py-3 text-sm font-medium text-ink-900 transition hover:border-ink-900 hover:bg-ink-50">
          Start a project
        </Link>
      </div>
    </main>
  )
}

export default NotFound