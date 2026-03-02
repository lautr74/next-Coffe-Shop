import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black">
      {/* --- HERO SECTION --- */}
      <main className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        {/* Un pequeño badge estilo terminal */}
        <div className="mb-6 px-3 py-1 border border-zinc-800 rounded-full bg-zinc-900/50 text-xs font-mono text-zinc-500 animate-pulse">
          v1.0.0-stable // arch-linux-user
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          CÓDIGO & <br />
          <span className="text-orange-500">HARDWARE.</span>
        </h1>

        <p className="max-w-xl text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
          Tu e-commerce construido desde el kernel hasta la UI. Rendimiento
          puro, estética minimalista y pagos seguros.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Link
            href="/shop"
            className="flex-1 bg-white text-black font-bold py-4 rounded-2xl hover:bg-orange-500 transition-all duration-300 text-center"
          >
            Explorar Tienda
          </Link>
          <Link
            href="/orders"
            className="flex-1 bg-zinc-900 border border-zinc-800 text-white font-bold py-4 rounded-2xl hover:border-zinc-600 transition-all text-center"
          >
            Mis Pedidos
          </Link>
        </div>
      </main>

      {/* --- FEATURES / SPECS --- */}
      <section className="max-w-6xl mx-auto py-20 px-6 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-orange-500 font-mono mb-2">
              01. STACK MODERNO
            </h3>
            <p className="text-zinc-500 text-sm">
              Next.js 14, TypeScript y Express. Velocidad de respuesta
              instantánea en cada interacción.
            </p>
          </div>

          <div>
            <h3 className="text-orange-500 font-mono mb-2">
              02. SEGURIDAD TOTAL
            </h3>
            <p className="text-zinc-500 text-sm">
              Integración nativa con Stripe Webhooks. Tus transacciones están
              blindadas.
            </p>
          </div>

          <div>
            <h3 className="text-orange-500 font-mono mb-2">
              03. ARCH PHILOSOPHY
            </h3>
            <p className="text-zinc-500 text-sm">
              Keep It Simple, Stupid (KISS). Sin distracciones, solo lo que
              necesitas para tu setup.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 text-center border-t border-zinc-900">
        <p className="text-zinc-700 text-xs font-mono uppercase tracking-widest">
          Build with ❤️ by a JS/TS Developer on Hyprland
        </p>
      </footer>
    </div>
  );
}
