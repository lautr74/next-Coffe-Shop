"use client";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-serif text-foreground mb-3">
            Tu carrito esta vacio
          </h2>
          <p className="text-muted-foreground mb-8 max-w-sm">
            Descubre nuestra seleccion de cafes de especialidad y encuentra tu
            favorito.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  const handleGoToCheckout = () => {
    if (cart.length === 0) return;
    router.push("/checkout/address");
  };

  return (
    <main className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
            Tu Carrito
          </h1>
          <p className="text-muted-foreground">
            {cart.length} {cart.length === 1 ? "producto" : "productos"} en tu
            carrito
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Products List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-card border border-border p-5 rounded-2xl"
              >
                {/* Product Image Placeholder */}
                <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-3xl font-serif text-primary/30">
                    {item.product.name.charAt(0)}
                  </span>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-foreground text-lg truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.variant?.weight ?? "-"}g
                  </p>
                  <p className="text-primary font-medium mt-1">
                    {item.variant?.price ?? 0}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
                  <button
                    onClick={() => decreaseQuantity(item.variantId)}
                    className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-card rounded-lg transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item.productId, item.variantId)}
                    className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-card rounded-lg transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.variantId)}
                  className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                  aria-label="Eliminar producto"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border p-6 rounded-2xl sticky top-28">
              <h2 className="font-serif text-xl text-foreground mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Envio</span>
                  <span className="text-green-600 font-medium">Gratis</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-foreground">
                  <span className="font-serif text-lg">Total</span>
                  <span className="font-serif text-xl text-primary">
                    {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoToCheckout}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Continuar con el Pedido
              </button>

              <p className="text-center text-muted-foreground text-xs mt-4">
                Impuestos incluidos. Pago seguro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
