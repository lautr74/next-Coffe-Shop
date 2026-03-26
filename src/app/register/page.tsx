"use client";

import Link from "next/link";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";
import { Loader2 } from "lucide-react";

const registerSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 letras"),
  email: z.string().email("Introduce un email valido"),
  password: z
    .string()
    .min(8, "La contrasena debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayuscula")
    .regex(/[a-z]/, "Debe tener al menos una minuscula")
    .regex(/[0-9]/, "Debe tener al menos un numero"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: RegisterFormData) => {
    setError("");

    try {
      const res = await api.post("/auth/register", formData);
      login(res.data.token, res.data.user);
    } catch (err: unknown) {
      if (isAxiosError<{ error?: string }>(err)) {
        setError(err.response?.data?.error || "Error al crear la cuenta");
      } else {
        setError("Error al crear la cuenta");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif text-foreground mb-2">
            Crear Cuenta
          </h1>
          <p className="text-muted-foreground">
            Unete y descubre el mejor cafe de especialidad
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm text-foreground mb-2 font-medium">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                {...register("name")}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                {...register("email")}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2 font-medium">
                Contrasena
              </label>
              <input
                type="password"
                placeholder="Min. 8 caracteres"
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                {...register("password")}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Iniciar sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
