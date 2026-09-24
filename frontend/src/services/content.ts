import { getToken } from "./auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = getToken();

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getContent() {
  const response =
    await authenticatedFetch(
      `${API_URL}/api/content`
    );

  return response.json();
}

export async function createContent(
  content: {
    title: string;
    description: string;
    content_type: string;
    status: "Published" | "Draft";
  }
) {
  const response =
    await authenticatedFetch(
      `${API_URL}/api/content`,
      {
        method: "POST",
        body: JSON.stringify(content),
      }
    );

  return response.json();
}

export async function updateContent(
  id: number,
  content: {
    title: string;
    description: string;
    content_type: string;
    status: "Published" | "Draft";
  }
) {
  const response =
    await authenticatedFetch(
      `${API_URL}/api/content/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(content),
      }
    );

  return response.json();
}

export async function deleteContent(
  id: number
) {
  const response =
    await authenticatedFetch(
      `${API_URL}/api/content/${id}`,
      {
        method: "DELETE",
      }
    );

  return response.json();
}
