const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  error?: Record<
    string,
    string[]
  >;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const response = await fetch(
    `${API_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  return response.json();
}

export async function loginUser(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const response = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    }
  )
  return response.json();
}

export function saveAuth(
  token: string,
  user: User
) {
  localStorage.setItem('webdevv_token',token);

  localStorage.setItem('webdevv_user', JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem('webdevv_token');
}

export function getUser(): User | null {
  const user =
    localStorage.getItem('webdevv_user');

  if (!user) {
    return null
  }

  try {
    return JSON.parse(user);
  } catch {
    return null
  }
}

export function logoutUser() {
  localStorage.removeItem('webdevv_token');

  localStorage.removeItem('webdevv_user')
}

export function isAuthenticated() {
  return Boolean(getToken())
}
