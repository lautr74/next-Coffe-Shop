"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-serif text-foreground tracking-tight">
              Artisan<span className="text-primary">Coffee</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/products"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Productos
            </Link>
            <Link
              href="/orders"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Mis Pedidos
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground font-medium">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Entrar
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground font-medium py-2"
              >
                Productos
              </Link>
              <Link
                href="/orders"
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground font-medium py-2"
              >
                Mis Pedidos
              </Link>
              {user ? (
                <>
                  <div className="flex items-center gap-2 py-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-muted-foreground py-2"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-primary text-primary-foreground px-5 py-3 rounded-full text-sm font-medium text-center"
                >
                  Entrar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
