
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: "✨",
    title: "Non-Greasy Formula",
    description:
      "Lightweight formula that absorbs quickly without leaving a greasy residue on your skin.",
  },
  {
    icon: "🌿",
    title: "Natural Ingredients",
    description:
      "Made with plant-based ingredients that nourish and protect your skin while blocking harmful UV rays.",
  },
  {
    icon: "💧",
    title: "Water Resistant",
    description:
      "Stays effective for up to 80 minutes of swimming or sweating, keeping you protected during activities.",
  },
  {
    icon: "🌊",
    title: "Reef Safe",
    description:
      "Our formula is free from chemicals known to harm coral reefs and marine ecosystems.",
  },
  {
    icon: "👶",
    title: "Gentle for All Skin",
    description:
      "Dermatologist-tested formula suitable for all skin types, even sensitive and acne-prone skin.",
  },
  {
    icon: "🔬",
    title: "Clinically Proven",
    description:
      "Scientific testing confirms our broad-spectrum protection against UVA and UVB rays.",
  },
];

export function Features() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = cardsRef.current?.querySelectorAll(".feature-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section-padding bg-muted/50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Our <span className="text-gradient">Crème Solaire</span> Stands Out
          </h2>
          <p className="text-foreground/80">
            We've perfected our formula to provide the best protection while caring for
            your skin and the environment.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card opacity-0 border-none glass-card [animation-delay:calc(200ms*var(--index))]"
              style={{ "--index": index } as React.CSSProperties}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
