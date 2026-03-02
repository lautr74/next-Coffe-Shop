"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api"; // Tu instancia de axios

interface AddressFormProps {
  onSuccess: (newAddr: any) => void;
}

export default function NewAddressPage({ onSuccess }: AddressFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Mi Casa",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "España",
    isDefault: false,
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/address", formData);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-white mb-8">Nueva Dirección</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-zinc-900 p-8 rounded-3xl border border-zinc-800"
      >
        <div>
          <label className="block text-sm text-zinc-500 mb-1">
            Nombre de la dirección (ej: Oficina)
          </label>
          <input
            type="text"
            className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white focus:border-orange-500 outline-none"
            placeholder="Mi Casa"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-500 mb-1">
            Calle y número
          </label>
          <input
            required
            type="text"
            className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white focus:border-orange-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-500 mb-1">Ciudad</label>
            <input
              required
              type="text"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white focus:border-orange-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-500 mb-1">
              Provincia / Estado
            </label>
            <input
              required
              type="text"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white focus:border-orange-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-500 mb-1">
              Código Postal (zipCode)
            </label>
            <input
              required
              type="text"
              className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white focus:border-orange-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
            />
          </div>
          <div className="flex items-center pt-6">
            <input
              type="checkbox"
              id="isDefault"
              className="w-5 h-5 accent-orange-500"
              onChange={(e) =>
                setFormData({ ...formData, isDefault: e.target.checked })
              }
            />
            <label htmlFor="isDefault" className="ml-2 text-sm text-zinc-400">
              Dirección principal
            </label>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 rounded-2xl transition-all mt-4 disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Guardar Dirección"}
        </button>
      </form>
    </main>
  );
}
