import Link from "next/link";
import { Github, Twitter, Instagram, Cpu } from "lucide-react"; // npm install lucide-react

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Columna 1: Brand & Tech */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Cpu size={20} className="text-black" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">
                Código & <span className="text-orange-500">HW</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Hardware curado y merchandising para desarrolladores que viven en
              la terminal. Built on Arch Linux, optimized for your workflow.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-zinc-600 hover:text-orange-500 transition-colors"
              >
                <Github size={20} />
              </Link>
              <Link
                href="#"
                className="text-zinc-600 hover:text-orange-500 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-zinc-600 hover:text-orange-500 transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Columna 2: Shop */}
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-[0.2em] mb-6">
              Tienda
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=hardware"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  Hardware
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=merch"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  Merchandising
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=setup"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  Setup Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Cuenta */}
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-[0.2em] mb-6">
              Usuario
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  href="/orders"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  Mis Pedidos
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  Configuración
                </Link>
              </li>
              <li>
                <Link
                  href="/address"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  Direcciones
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  Soporte Técnico
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Status (El toque Arch) */}
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-[0.2em] mb-6">
              Sistema
            </h4>
            <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-mono text-zinc-400">
                  SERVER STATUS: OPTIMAL
                </span>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 space-y-1">
                <p>Uptime: 99.9%</p>
                <p>Kernel: 6.7.4-arch1-1</p>
                <p>Location: localhost:3000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
            © 2026 CODIGO & HARDWARE — ALL RIGHTS RESERVED
          </p>
          <div className="flex gap-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-zinc-400">
              Privacidad
            </Link>
            <Link href="/terms" className="hover:text-zinc-400">
              Términos
            </Link>
            <Link href="/cookies" className="hover:text-zinc-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
