"use client";
import { useState } from "react";
import api from "../lib/api";
import { Loader2 } from "lucide-react";

interface AddressFormProps {
  onSuccess: (newAddr: any) => void;
}

export default function AddressForm({ onSuccess }: AddressFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Mi Casa",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Espana",
    isDefault: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/address", formData);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      console.error(err);
      alert("Error al guardar la direccion");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    "w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-foreground mb-2 font-medium">
          Nombre de la direccion
        </label>
        <input
          type="text"
          className={inputStyles}
          placeholder="Ej: Mi Casa, Oficina..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm text-foreground mb-2 font-medium">
          Calle y numero
        </label>
        <input
          required
          type="text"
          className={inputStyles}
          placeholder="Calle Mayor, 15"
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-foreground mb-2 font-medium">
            Ciudad
          </label>
          <input
            required
            type="text"
            className={inputStyles}
            placeholder="Madrid"
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm text-foreground mb-2 font-medium">
            Provincia
          </label>
          <input
            required
            type="text"
            className={inputStyles}
            placeholder="Madrid"
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-foreground mb-2 font-medium">
            Codigo Postal
          </label>
          <input
            required
            type="text"
            className={inputStyles}
            placeholder="28001"
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
          />
        </div>
        <div className="flex items-center pt-8">
          <input
            type="checkbox"
            id="isDefault"
            className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            onChange={(e) =>
              setFormData({ ...formData, isDefault: e.target.checked })
            }
          />
          <label
            htmlFor="isDefault"
            className="ml-3 text-sm text-muted-foreground"
          >
            Direccion principal
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Guardando...
          </>
        ) : (
          "Guardar Direccion"
        )}
      </button>
    </form>
  );
}
