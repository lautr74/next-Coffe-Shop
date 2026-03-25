"use client";
import { useEffect, useState, Suspense } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { stripePromise } from "../../../lib/stripe-client";
import { CheckoutForm } from "../../../components/CheckoutForm";
import api from "../../../lib/api";
import { Loader2, CreditCard, Check } from "lucide-react";

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
        console.error("Error en el pago:", err.message);
      }
    };

    fetchPaymentIntent();
  }, [addressId]);

  return (
    <main className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-lg mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-medium">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-muted-foreground">Direccion</span>
          </div>
          <div className="w-12 h-px bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-foreground font-medium">Pago</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-foreground mb-2">
            Finalizar Pedido
          </h1>
          <p className="text-muted-foreground">
            Introduce tus datos de pago para completar la compra
          </p>
        </div>

        {/* Payment Form */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Pago Seguro</p>
              <p className="text-sm text-muted-foreground">
                Procesado por Stripe
              </p>
            </div>
          </div>

          {clientSecret ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">
                Preparando pasarela de pago...
              </p>
            </div>
          )}
        </div>

        {/* Security Note */}
        <p className="text-center text-muted-foreground text-xs mt-6">
          Tus datos estan protegidos con encriptacion SSL de 256 bits
        </p>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
