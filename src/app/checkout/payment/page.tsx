"use client";
import { useEffect, useState, Suspense } from "react"; // 1. Importa Suspense
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { stripePromise } from "../../../lib/stripe-client";
import { CheckoutForm } from "../../../components/CheckoutForm";
import api from "../../../lib/api";

// 2. Crea un componente interno para la lógica del checkout
function CheckoutContent() {
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await api.post("/payment", {
          addressId: addressId,
        });

        if (response.data && response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
        }
      } catch (err: any) {
        console.error("❌ Error en el pago:", err.message);
      }
    };

    fetchPaymentIntent();
  }, [addressId]); // Añadimos addressId como dependencia por seguridad

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

// 3. El export default solo envuelve al componente en Suspense
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto py-20 px-4 text-white">
          Cargando configuración...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
