import { useEffect, useState, type FormEvent } from "react";
import { getCurrentUser, updateCurrentUser, type Customer } from "../services/user";
import { logoutUser } from "../services/auth";

export default function Dashboard() {
  const [user, setUser] = useState<Customer | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * Fetch the authenticated user's
   * information from the backend.
   */
  async function loadUser() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getCurrentUser();

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to retrieve your account."
        );
      }

      if (!data.user) {
        throw new Error(
          "User information was not returned."
        );
      }

      setUser(data.user);

      setName(data.user.name);
      setEmail(data.user.email);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to retrieve account information."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data =
        await updateCurrentUser(
          name,
          email
        );

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to update account."
        );
      }

      if (data.user) {
        setUser(data.user);

        setName(data.user.name);
        setEmail(data.user.email);
      }

      setSuccess(
        data.message ||
          "Account updated successfully."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update account."
      );
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    logoutUser();

    window.location.href =
      "/login";
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020812] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />

          <p className="mt-4 text-gray-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020812] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <p className="text-xl font-bold tracking-wide">
              WEBDEVV
            </p>

            <p className="text-sm text-gray-400">
              Customer Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* Welcome */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Welcome, {user?.name}
          </h1>

          <p className="mt-3 text-gray-400">
            Manage your WEBDEVV account
            information.
          </p>
        </div>

        {/* Notifications */}
        {success && (
          <div className="mb-6 rounded-lg border border-green-400/30 bg-green-400/10 p-4 text-sm text-green-400">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          {/* Account summary */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xl font-bold">
              Account Information
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Your information retrieved
              from the WEBDEVV database.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Account ID
                </p>

                <p className="mt-1 font-medium">
                  #{user?.id}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Full Name
                </p>

                <p className="mt-1 font-medium">
                  {user?.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Email
                </p>

                <p className="mt-1 break-all font-medium">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Account Created
                </p>

                <p className="mt-1 font-medium">
                  {user?.created_at
                    ? new Date(
                        user.created_at
                      ).toLocaleDateString(
                        "en-KE",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "—"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Last Updated
                </p>

                <p className="mt-1 font-medium">
                  {user?.updated_at
                    ? new Date(
                        user.updated_at
                      ).toLocaleDateString(
                        "en-KE",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Edit form */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-bold">
                Edit Account
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Update your account information.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    required
                    minLength={2}
                    maxLength={100}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-8 w-full rounded-lg bg-cyan-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
