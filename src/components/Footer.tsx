import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-serif text-foreground tracking-tight">
                Artisan<span className="text-primary">Coffee</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Cafe de especialidad tostado artesanalmente. Seleccionamos los
              mejores granos para ofrecerte una experiencia unica.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:info@artisancoffee.com"
                className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="text-foreground font-serif text-lg mb-6">Tienda</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Todos los cafes
                </Link>
              </li>
              <li>
                <Link
                  href="/products?origin=colombia"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Origen Colombia
                </Link>
              </li>
              <li>
                <Link
                  href="/products?origin=ethiopia"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Origen Etiopia
                </Link>
              </li>
              <li>
                <Link
                  href="/products?type=blend"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blends
                </Link>
              </li>
            </ul>
          </div>

          {/* Cuenta */}
          <div>
            <h4 className="text-foreground font-serif text-lg mb-6">
              Mi Cuenta
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/orders"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Carrito
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Iniciar Sesion
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Crear Cuenta
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-foreground font-serif text-lg mb-6">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>info@artisancoffee.com</li>
              <li>+34 912 345 678</li>
              <li>
                Lunes a Viernes
                <br />
                9:00 - 18:00
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            2026 Artisan Coffee. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terminos
            </Link>
            <Link href="/shipping" className="hover:text-foreground">
              Envios
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
