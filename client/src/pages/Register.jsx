import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, passwordConfirmation);
      navigate("/newsfeed");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 grid place-items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-gray-900 text-white grid place-items-center text-sm font-semibold">
            MS
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            It takes less than a minute
          </p>
        </div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          placeholder="Jane Doe"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700">
          Confirm password
        </label>
        <input
          type="password"
          name="password_confirmation"
          placeholder="••••••••"
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 mb-6"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-gray-900 text-white py-2.5 font-medium hover:bg-black transition-colors"
        >
          Create account
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-gray-900 underline underline-offset-4"
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
