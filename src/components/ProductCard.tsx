import { Product } from "../types/product";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const { addToCart } = useCart();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-orange-500 transition-all group">
      <div className="aspect-square bg-zinc-800 rounded-lg mb-4 overflow-hidden">
        {/* Aquí iría la imagen, por ahora un placeholder */}
        <div className="w-full h-full flex items-center justify-center text-zinc-600 group-hover:scale-110 transition-transform">
          ☕
        </div>
      </div>
      <h3 className="text-lg font-bold text-white">{product.name}</h3>
      <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
        {product.description}
      </p>
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2">
          Variantes disponibles
        </p>
        <div className="flex flex-wrap gap-2">
          {variants.map((variant) => (
            <span
              key={variant.id}
              className="text-xs font-medium text-zinc-200 bg-zinc-800 border border-zinc-700 rounded-full px-2 py-1"
            >
              {variant.weight}g • {variant.price}€
              <button
                onClick={() => {
                  addToCart(product.id, variant.id);
                }}
                className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-orange-500 transition-colors"
              >
                Añadir
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
