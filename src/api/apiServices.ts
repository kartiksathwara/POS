const BASE_URL = "http://localhost:5000/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  role: "admin" | "user";
  name: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};