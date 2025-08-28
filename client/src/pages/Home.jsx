import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gray-900 text-white grid place-items-center text-sm font-semibold">
              MS
            </div>
            <span className="text-gray-900 font-semibold">Mini‑Social</span>
          </div>
          <nav className="hidden sm:flex items-center gap-2">
            <Link
              to="/login"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              Register
            </Link>
          </nav>
        </header>

        <main className="grid md:grid-cols-2 items-center gap-10 pt-10">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Share moments. Stay connected.
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              A minimalist social feed built for focus. No distractions—just
              posts, comments, and conversations that matter.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-white text-sm font-medium shadow-sm hover:bg-black transition-colors"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-gray-900 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                I already have an account
              </Link>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              By continuing, you agree to our terms and privacy policy.
            </p>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-gray-200 to-gray-100" />
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="h-56 rounded-xl bg-gray-50 grid place-items-center text-gray-400">
                Clean, calm, and focused UI
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
