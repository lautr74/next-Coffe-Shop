"use client";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { stripePromise } from "../../../lib/stripe-client";
import { CheckoutForm } from "../../../components/CheckoutForm";
import api from "../../../lib/api";

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();
  const addressId = useSearchParams().get("addressId");

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await api.post("/payment", {
          addressId: addressId,
        });

        console.log("📦 Respuesta del servidor recibida:", response.status);
        console.log("🔑 Datos recibidos:", response.data);

        if (response.data && response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
          console.log("✅ Client Secret configurado correctamente.");
        } else {
          console.warn(
            "⚠️ La respuesta no contiene un clientSecret:",
            response.data,
          );
        }
      } catch (err: any) {
        // Diferenciamos si es un error de respuesta del servidor o de red
        if (err.response) {
          console.error("❌ Error del servidor (Backend):", {
            status: err.response.status,
            data: err.response.data,
          });
        } else if (err.request) {
          console.error(
            "❌ No se recibió respuesta del servidor (Network Error):",
            err.request,
          );
        } else {
          console.error("❌ Error al configurar la petición:", err.message);
        }
      }
    };

    fetchPaymentIntent();
  }, []);
  const appearance = {
    theme: "night",
    variables: {
      colorPrimary: "#f97316", // El naranja de tu tema
      colorBackground: "#18181b", // zinc-900
    },
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold text-white mb-8">Finalizar Pedido</h1>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <div className="text-white">Cargando pasarela de pago...</div>
      )}
    </div>
  );
}
