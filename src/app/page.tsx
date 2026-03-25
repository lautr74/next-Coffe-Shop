import Link from "next/link";
import { Coffee, Leaf, Award, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6 font-mono">
            Cafe de Especialidad
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-8 leading-tight text-balance">
            El arte del cafe,
            <br />
            <span className="text-primary">en cada taza</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Seleccionamos los mejores granos de origen unico, tostados
            artesanalmente para ofrecerte una experiencia sensorial unica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300"
            >
              Explorar Cafes
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center justify-center gap-3 bg-card border border-border text-foreground px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-muted transition-all duration-300"
            >
              Mis Pedidos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-mono">
              Nuestra Filosofia
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground text-balance">
              Comprometidos con la excelencia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Coffee className="w-8 h-8" />}
              title="Origen Unico"
              description="Trabajamos directamente con productores de las mejores regiones cafetaleras del mundo."
            />
            <FeatureCard
              icon={<Leaf className="w-8 h-8" />}
              title="Tueste Artesanal"
              description="Cada lote es tostado a mano en pequenas cantidades para garantizar la frescura."
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Calidad Premium"
              description="Solo seleccionamos granos con puntuacion superior a 85 en la escala SCA."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6 text-balance">
            Comienza tu viaje sensorial
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Descubre nuestra seleccion de cafes de especialidad y encuentra tu
            perfil de sabor favorito.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full text-sm font-medium tracking-wide hover:bg-primary/90 transition-all duration-300"
          >
            Ver Catalogo Completo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <TrustItem number="1,200+" label="Clientes Satisfechos" />
            <TrustItem number="15+" label="Origenes Unicos" />
            <TrustItem number="4.9" label="Valoracion Media" />
            <TrustItem number="48h" label="Envio Express" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-8 rounded-2xl border border-border text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function TrustItem({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-serif text-primary mb-2">
        {number}
      </p>
      <p className="text-sm text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}
