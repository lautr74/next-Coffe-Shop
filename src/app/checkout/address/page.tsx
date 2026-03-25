"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import AddressForm from "../../../components/AddressForm";
import { Loader2, MapPin, Plus, Check } from "lucide-react";

export default function CheckoutAddressPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await api.get("/address");
        setAddresses(data);
        if (data.length === 0) {
          setShowForm(true);
        }
      } catch (err) {
        console.error("Error cargando direcciones");
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleSelectAddress = (addressId: string) => {
    router.push(`/checkout/payment?addressId=${addressId}`);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );

  return (
    <main className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-foreground font-medium">Direccion</span>
          </div>
          <div className="w-12 h-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-muted-foreground">Pago</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-foreground mb-2">
            Direccion de Envio
          </h1>
          <p className="text-muted-foreground">
            Selecciona donde quieres recibir tu pedido
          </p>
        </div>

        {addresses.length > 0 && !showForm ? (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <button
                key={addr.id}
                onClick={() => handleSelectAddress(addr.id)}
                className="w-full p-5 bg-card border border-border rounded-2xl text-left hover:border-primary transition-all group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-primary">
                        {addr.title}
                      </span>
                      <p className="text-foreground font-medium mt-1">
                        {addr.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {addr.city}, {addr.state} - {addr.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-border group-hover:border-primary flex items-center justify-center transition-colors">
                    <Check className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </button>
            ))}

            <button
              onClick={() => setShowForm(true)}
              className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Anadir otra direccion
            </button>
          </div>
        ) : (
          <div className="bg-card border border-border p-8 rounded-2xl">
            {addresses.length === 0 && (
              <p className="text-muted-foreground mb-6 text-center">
                Anade una direccion de envio para continuar
              </p>
            )}
            <AddressForm
              onSuccess={(newAddr) => {
                router.push(`/checkout/payment?addressId=${newAddr.id}`);
              }}
            />
            {addresses.length > 0 && (
              <button
                onClick={() => setShowForm(false)}
                className="mt-6 w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancelar y volver a la lista
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
