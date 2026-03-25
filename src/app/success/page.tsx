"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const { clearLocalCart, cart, loading } = useCart();

  useEffect(() => {
    if (loading || cart.length === 0) return;
    clearLocalCart();
  }, [cart.length, clearLocalCart, loading]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="bg-card border border-border p-10 rounded-2xl text-center max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-serif text-foreground mb-3">
          Pedido Confirmado
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Tu pedido ha sido procesado correctamente. En breve recibiras un email
          con los detalles de tu compra.
        </p>
        <Link
          href="/orders"
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Ver mis pedidos
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
