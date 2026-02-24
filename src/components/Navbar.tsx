"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-zinc-950 border-b border-zinc-800 text-white">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl font-bold tracking-tighter hover:text-orange-500 transition"
      >
        COFFEE<span className="text-orange-500">SHOP</span>
      </Link>

      {/* Enlaces y Auth */}
      <div className="flex items-center gap-6">
        <Link
          href="/products"
          className="text-sm hover:text-orange-400 transition"
        >
          Productos
        </Link>

        <Link href="/cart" className="relative group p-2">
          <ShoppingBag className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />

          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-black animate-in zoom-in duration-300">
              {totalItems}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-zinc-400">Bienvenido,</span>
              <span className="text-sm font-medium text-orange-400">
                {user.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="bg-zinc-800 hover:bg-red-900/30 hover:text-red-500 px-3 py-1.5 rounded-md text-xs font-semibold border border-zinc-700 transition-all"
            >
              Salir
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-1.5 rounded-md text-sm font-bold transition"
          >
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}
