import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/me")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });
    const { token, user } = res.data;
    // Clear any user-specific UI caches to avoid cross-user leakage
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const register = async (name, email, password, passwordConfirmation) => {
    const res = await api.post("/register", {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    const { token, user } = res.data;
    // Clear any user-specific UI caches on logout
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {}
    localStorage.removeItem("token");
    // Clear any user-specific UI caches on logout
    localStorage.removeItem("liked_posts");
    localStorage.removeItem("likes_overrides");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
