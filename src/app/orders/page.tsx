"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Package, Loader2 } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders");
        setOrders(data);
      } catch (err) {
        console.error("Error al cargar pedidos");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Cargando tus pedidos...</p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
            Mis Pedidos
          </h1>
          <p className="text-muted-foreground">
            Historial de todas tus compras
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-foreground font-serif text-xl mb-2">
              Sin pedidos todavia
            </p>
            <p className="text-muted-foreground">
              Cuando realices tu primera compra, aparecera aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-muted p-5 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Pedido
                    </p>
                    <p className="text-foreground text-sm font-mono">
                      #{order.id.slice(0, 8)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Fecha
                    </p>
                    <p className="text-foreground text-sm">
                      {format(new Date(order.createdAt), "d 'de' MMMM, yyyy", {
                        locale: es,
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Estado
                    </p>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        order.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-accent/30 text-accent-foreground"
                      }`}
                    >
                      {order.status === "PAID" ? "Pagado" : order.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Total
                    </p>
                    <p className="text-primary font-serif text-lg">
                      {order.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-5 space-y-4">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="w-14 h-14 bg-muted rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {item.product.images?.[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-serif text-primary/30">
                            {item.product.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="px-5 py-4 bg-muted/50 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Direccion de envio
                  </p>
                  <p className="text-foreground text-sm">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.zipCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
