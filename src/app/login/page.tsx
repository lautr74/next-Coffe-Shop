"use client";

import { useState } from "react";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
    } catch (err: unknown) {
      if (isAxiosError<{ error?: string }>(err)) {
        setError(err.response?.data?.error || "Error al iniciar sesion");
      } else {
        setError("Error al iniciar sesion");
      }
      console.error("Error en login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-foreground mb-2">
            Bienvenido
          </h1>
          <p className="text-muted-foreground">
            Inicia sesion para continuar con tu pedido
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl p-8 shadow-sm"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-foreground mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2 font-medium">
                Contrasena
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Tu contrasena"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Iniciar Sesion"
              )}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
