"use client";

import Link from "next/link";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";

const registerSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 letras"),
  email: z.string().email("Introduce un email válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[a-z]/, "Debe tener al menos una minúscula")
    .regex(/[0-9]/, "Debe tener al menos un número"),
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
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-2xl">
        <h1 className="text-2xl font-bold mb-2 text-center text-orange-500">
          Crea tu cuenta
        </h1>
        <p className="text-zinc-400 text-sm text-center mb-6">
          Únete a la mejor experiencia de café
        </p>

        {error && (
          <p className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-xs">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1 font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 focus:border-orange-500 outline-none transition text-sm"
              {...register("name")}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1 font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 focus:border-orange-500 outline-none transition text-sm"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-1 font-bold">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 focus:border-orange-500 outline-none transition text-sm"
              {...register("password")}
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-black py-3 rounded uppercase tracking-widest text-xs transition-transform active:scale-95 disabled:opacity-70"
          >
            {isSubmitting ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-orange-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
