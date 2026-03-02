"use client";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    loading,
  } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-black mb-4">TU CARRITO ESTÁ VACÍO</h2>
        <p className="text-zinc-500 mb-8 text-center">
          Parece que aún no has elegido tu café para hoy.
        </p>
        <Link
          href="/products"
          className="bg-orange-500 text-black px-8 py-3 rounded-full font-black hover:bg-orange-600 transition-all flex items-center gap-2"
        >
          <ArrowLeft size={20} /> VOLVER A LA TIENDA
        </Link>
      </div>
    );
  }

  const handleGoToCheckout = () => {
    if (cart.length === 0) return;
    router.push("/checkout/address");
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-10 tracking-tighter">
          TU <span className="text-orange-500">CARRITO</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LISTA DE PRODUCTOS (COL 1 y 2) */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                {/* Imagen del producto */}
                <div className="w-20 h-20 bg-zinc-800 rounded-xl flex items-center justify-center text-3xl">
                  ☕
                </div>

                {/* Info del producto */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.product.name}</h3>
                  <p className="text-zinc-500 text-sm mb-2">
                    {item.variant?.weight ?? "-"}
                  </p>
                  <p className="text-orange-500 font-bold">
                    {item.variant?.price ?? 0}€ / ud
                  </p>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center gap-3 bg-black rounded-lg p-1 border border-zinc-800">
                  <button
                    onClick={() => decreaseQuantity(item.variantId)}
                    className="p-1 hover:text-orange-500 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item.productId, item.variantId)}
                    className="p-1 hover:text-orange-500 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Botón borrar */}
                <button
                  onClick={() => removeFromCart(item.variantId)}
                  className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* RESUMEN DE COMPRA (COL 3) */}
          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6">RESUMEN</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>{totalPrice.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Envío</span>
                <span className="text-green-500 font-medium">Gratis</span>
              </div>
              <div className="border-t border-zinc-800 pt-4 flex justify-between text-2xl font-black">
                <span>TOTAL</span>
                <span className="text-orange-500">
                  {totalPrice.toFixed(2)}€
                </span>
              </div>
            </div>

            <button
              onClick={handleGoToCheckout}
              className="w-full bg-white text-black py-4 rounded-xl font-black hover:bg-orange-500 transition-all uppercase tracking-widest active:scale-95"
            >
              Tramitar Pedido
            </button>

            <p className="text-center text-zinc-600 text-xs mt-4">
              Impuestos incluidos. Pago seguro mediante SSL.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
