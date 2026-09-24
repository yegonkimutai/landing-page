import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  createContent,
  deleteContent,
  getContent,
  updateContent,
} from "../services/content";

import {
  getUser,
  logoutUser,
} from "../services/auth";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  content_type: string;
  status: "Published" | "Draft";
  created_at: string;
  updated_at: string;
}

interface FormData {
  title: string;
  description: string;
  content_type: string;
  status: "Published" | "Draft";
}

const emptyForm: FormData = {
  title: "",
  description: "",
  content_type: "General",
  status: "Published",
};

export default function ContentManager() {
  const [content, setContent] =
    useState<ContentItem[]>([]);

  const [formData, setFormData] =
    useState<FormData>(emptyForm);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const user = getUser();

  async function loadContent() {
    try {
      setLoading(true);
      setError("");

      const data = await getContent();

      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to load content."
        );
      }

      setContent(data.content);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to load content."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContent();
  }, []);

  function openCreateForm() {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
    setError("");
    setSuccess("");
  }

  function openEditForm(
    item: ContentItem
  ) {
    setEditingId(item.id);

    setFormData({
      title: item.title,
      description: item.description,
      content_type: item.content_type,
      status: item.status,
    });

    setShowForm(true);
    setError("");
    setSuccess("");
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      let data;

      if (editingId !== null) {
        data = await updateContent(
          editingId,
          formData
        );
      } else {
        data = await createContent(
          formData
        );
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to save content."
        );
      }

      setSuccess(
        editingId !== null
          ? "Content updated successfully."
          : "Content created successfully."
      );

      closeForm();

      await loadContent();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save content."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(
    id: number
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this content?"
      );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const data =
        await deleteContent(id);

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to delete content."
        );
      }

      setSuccess(
        "Content deleted successfully."
      );

      await loadContent();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete content."
      );
    }
  }

  function handleLogout() {
    logoutUser();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-[#020812] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div>
            <p className="text-xl font-bold">
              VOLTDX
            </p>

            <p className="text-sm text-gray-400">
              Content Management
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {user?.name}
              </p>

              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:bg-white/5"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Website Content
            </h1>

            <p className="mt-2 text-gray-400">
              Add, edit and manage website content.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            + Add Content
          </button>
        </div>

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

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editingId !== null
                  ? "Edit Content"
                  : "Add Content"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Title
                </label>

                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  required
                  maxLength={200}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-400"
                  placeholder="Content title"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Content Type
                </label>

                <select
                  value={
                    formData.content_type
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content_type:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 outline-none focus:border-cyan-400"
                >
                  <option value="General">
                    General
                  </option>

                  <option value="Service">
                    Service
                  </option>

                  <option value="Portfolio">
                    Portfolio
                  </option>

                  <option value="About">
                    About
                  </option>

                  <option value="Announcement">
                    Announcement
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <textarea
                value={
                  formData.description
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target.value,
                  })
                }
                required
                rows={5}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-400"
                placeholder="Enter content description"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status:
                      e.target.value as
                        | "Published"
                        | "Draft",
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-[#07111f] px-4 py-3 outline-none focus:border-cyan-400"
              >
                <option value="Published">
                  Published
                </option>

                <option value="Draft">
                  Draft
                </option>
              </select>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-white/10 px-5 py-3 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : editingId !== null
                  ? "Update Content"
                  : "Save Content"}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-hidden rounded-2xl border border-white/10">
          {loading ? (
            <div className="p-10 text-center text-gray-400">
              Loading content...
            </div>
          ) : content.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-400">
                No content items found.
              </p>

              <button
                onClick={openCreateForm}
                className="mt-4 text-cyan-400 hover:text-cyan-300"
              >
                Add your first content item
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="border-b border-white/10 bg-white/[0.03]">
                  <tr>
                    <th className="px-5 py-4 text-left text-sm font-medium text-gray-400">
                      Title
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-medium text-gray-400">
                      Type
                    </th>

                    <th className="px-5 py-4 text-left text-sm font-medium text-gray-400">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-sm font-medium text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {content.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-5 py-5">
                        <p className="font-medium">
                          {item.title}
                        </p>

                        <p className="mt-1 max-w-md truncate text-sm text-gray-500">
                          {item.description}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-400">
                        {item.content_type}
                      </td>

                      <td className="px-5 py-5">
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs">
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() =>
                              openEditForm(
                                item
                              )
                            }
                            className="rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:bg-white/5"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                            className="rounded-lg border border-red-400/20 px-3 py-2 text-sm text-red-400 transition hover:bg-red-400/10"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
