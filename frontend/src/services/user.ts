import { getToken } from "./auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export interface Customer {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface UserResponse {
  success: boolean;
  message?: string;
  user?: Customer;
  errors?: Record<
    string,
    string[]
  >;
}

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

export async function getCurrentUser(): Promise<UserResponse> {
  const response =
    await authenticatedFetch(
      `${API_URL}/api/users/me`
    );

  return response.json();
}

export async function updateCurrentUser(
  name: string,
  email: string
): Promise<UserResponse> {
  const response =
    await authenticatedFetch(
      `${API_URL}/api/users/me`,
      {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
        }),
      }
    );

  return response.json();
}
