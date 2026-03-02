"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import AddressForm from "../../../components/AddressForm"; // Extraemos el form a un componente

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
        // 💡 Si no tiene direcciones, activamos el formulario automáticamente
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
    // Guardamos la dirección elegida (puede ser en un Context o por URL)
    router.push(`/checkout/payment?addressId=${addressId}`);
  };

  if (loading) return <div className="text-white p-10">Cargando...</div>;

  return (
    <main className="max-w-2xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-white mb-8">Dirección de Envío</h1>

      {addresses.length > 0 && !showForm ? (
        <div className="space-y-4">
          <p className="text-zinc-400">
            Selecciona una dirección para el envío:
          </p>
          {addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => handleSelectAddress(addr.id)}
              className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer hover:border-orange-500 transition-all group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold uppercase text-orange-500">
                    {addr.title}
                  </span>
                  <p className="text-white font-medium">{addr.street}</p>
                  <p className="text-sm text-zinc-500">
                    {addr.city}, {addr.state} - {addr.zipCode}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full border border-zinc-700 group-hover:border-orange-500 flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowForm(true)}
            className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-2xl text-zinc-500 hover:text-white hover:border-zinc-600 transition-all"
          >
            + Añadir otra dirección
          </button>
        </div>
      ) : (
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <p className="text-zinc-400 mb-6">
            No tienes direcciones guardadas. Por favor, añade una:
          </p>
          <AddressForm
            onSuccess={(newAddr) => {
              router.push(`/checkout/payment?addressId=${newAddr.id}`);
            }}
          />
          {addresses.length > 0 && (
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-sm text-zinc-500 hover:text-white"
            >
              Cancelar y volver a la lista
            </button>
          )}
        </div>
      )}
    </main>
  );
}
