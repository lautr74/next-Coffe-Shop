"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
      <div className="text-center py-20 text-zinc-500">
        Cargando tu historial...
      </div>
    );

  return (
    <main className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-white mb-8">Mis Pedidos</h1>

      {orders.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
          <p className="text-zinc-500">Aún no has realizado ninguna compra.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Cabecera de la Orden */}
              <div className="bg-zinc-800/50 p-4 sm:p-6 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                    Pedido ID
                  </p>
                  <p className="text-white text-sm font-mono">
                    {order.id.slice(0, 8)}...
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                    Fecha
                  </p>
                  <p className="text-white text-sm">
                    {format(new Date(order.createdAt), "d 'de' MMMM, yyyy", {
                      locale: es,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                    Estado
                  </p>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      order.status === "PAID"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-orange-500/10 text-orange-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                    Total
                  </p>
                  <p className="text-orange-500 font-bold text-lg">
                    {order.totalAmount}€
                  </p>
                </div>
              </div>

              {/* Lista de Productos */}
              <div className="p-6 space-y-4">
                {order.items.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="w-16 h-16 bg-black rounded-xl flex-shrink-0 overflow-hidden border border-zinc-800">
                      {item.product.images?.[0] && (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-zinc-500">
                        Cantidad: {item.quantity} • {item.price}€ / unidad
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dirección de Envío */}
              <div className="px-6 py-4 bg-black/30 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">
                  Enviado a:
                </p>
                <p className="text-zinc-400 text-sm">
                  {order.address.street}, {order.address.city},{" "}
                  {order.address.zipCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
