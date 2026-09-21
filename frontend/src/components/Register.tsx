import { useState, SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, saveAuth } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data =
        await registerUser(
          name,
          email,
          password
        );

      if (!data.success) {
        setError(
          data.message ||
            "Registration failed."
        );

        return;
      }

      if (data.token && data.user) {
        saveAuth(
          data.token,
          data.user
        );

        navigate("/admin/content");
      }
    } catch {
      setError(
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020812] px-5 py-16 text-white">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-3 text-gray-400">
            Create your WEBDEVV account
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          {error && (
            <div className="mb-5 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                minLength={2}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                minLength={8}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="At least 8 characters"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-cyan-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
