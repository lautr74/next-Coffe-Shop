"use client";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import api from "../../lib/api";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setLoading(false);
          return;
        }
        setError("Respuesta inválida del servidor al cargar productos.");
        setLoading(false);
      })
      .catch((err) => {
        if (isAxiosError<{ message?: string; error?: string }>(err)) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "No se pudieron cargar los productos.",
          );
        } else {
          setError("No se pudieron cargar los productos.");
        }
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center p-20 text-orange-500">
        Cargando granos de café...
      </div>
    );

  if (error)
    return (
      <div className="text-center p-20 text-red-500">
        Error al cargar productos: {error}
      </div>
    );

  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">
          Nuestra <span className="text-orange-500">Selección</span>
        </h1>
        <p className="text-zinc-500 mb-10 text-lg">
          Café de especialidad tostado para programadores.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
