"use client";

import { useState } from "react";
import { isAxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Petición al backend de Express
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      console.log("Login exitoso:", res.data);
    } catch (err: unknown) {
      if (isAxiosError<{ error?: string }>(err)) {
        setError(err.response?.data?.error || "Error al iniciar sesión");
      } else {
        setError("Error al iniciar sesión");
      }
      console.error("Error en login:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-lg border border-zinc-800"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-orange-500">
          Bienvenido de nuevo
        </h1>

        {error && (
          <p className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:border-orange-500 outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:border-orange-500 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 rounded transition"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
