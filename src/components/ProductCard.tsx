"use client";

import { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Plus } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const { addToCart } = useCart();
  const { user } = useAuth();

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Image placeholder */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-serif text-primary/20">
            {product.name.charAt(0)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed">
          {product.description}
        </p>

        {/* Variants */}
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Selecciona tamano
          </p>
          <div className="flex flex-col gap-2">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="flex items-center justify-between p-3 bg-muted rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {variant.weight}g
                  </span>
                  <span className="text-sm text-primary font-semibold">
                    {variant.price}
                  </span>
                </div>
                {user && (
                  <button
                    onClick={() => {
                      addToCart(product.id, variant.id);
                    }}
                    className="flex items-center justify-center w-9 h-9 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                    aria-label={`Anadir ${product.name} ${variant.weight}g al carrito`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {!user && (
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Inicia sesion para comprar
          </p>
        )}
      </div>
    </div>
  );
}
