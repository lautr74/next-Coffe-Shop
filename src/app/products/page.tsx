"use client";
import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import api from "../../lib/api";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../types/product";
import { Loader2 } from "lucide-react";

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
        setError("Respuesta invalida del servidor al cargar productos.");
        setLoading(false);
      })
      .catch((err) => {
        if (isAxiosError<{ message?: string; error?: string }>(err)) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.error ||
              "No se pudieron cargar los productos."
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Cargando nuestra seleccion...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="bg-card border border-border rounded-2xl p-8 text-center max-w-md">
          <p className="text-foreground font-serif text-xl mb-2">
            Error al cargar
          </p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono">
            Nuestra Coleccion
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            Cafes de Especialidad
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Seleccionamos los mejores granos de origen unico, tostados con
            precision para resaltar sus notas unicas.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              No hay productos disponibles en este momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
