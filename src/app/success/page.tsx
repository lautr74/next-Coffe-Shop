// src/app/orders/success/page.tsx
"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function SuccessPage() {
  const { clearLocalCart, cart, loading } = useCart();

  useEffect(() => {
    if (loading || cart.length === 0) return;

    clearLocalCart();
  }, [cart.length, clearLocalCart, loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-2">¡Pago Realizado!</h1>
        <p className="text-zinc-400 mb-8">
          Tu pedido ha sido procesado correctamente. En breve recibirás un email
          de confirmación.
        </p>
        <Link
          href="/dashboard" // O a tu historial de pedidos
          className="bg-orange-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all"
        >
          Ir a mis pedidos
        </Link>
      </div>
    </div>
  );
}
