
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sophie L.",
    image: "👩🏻‍🦱",
    role: "Beach Enthusiast",
    text: "Finally found a sunscreen that doesn't leave my skin feeling greasy! I've been using the Daily Defense for my morning routine and it works perfectly under makeup.",
    rating: 5,
  },
  {
    name: "Michael T.",
    image: "👨🏽",
    role: "Trail Runner",
    text: "The Sport Shield is a game changer for outdoor activities. It stays on even during intense runs and doesn't sting my eyes when I sweat.",
    rating: 5,
  },
  {
    name: "Aisha K.",
    image: "👩🏾",
    role: "Dermatologist",
    text: "As someone who treats sun damage daily, I recommend this to my patients. The formulation provides excellent protection without irritating sensitive skin.",
    rating: 5,
  },
  {
    name: "James W.",
    image: "👨🏼‍🦰",
    role: "Surfer",
    text: "Love that this is reef safe! I can enjoy the ocean knowing I'm not harming the environment. The water resistance is seriously impressive.",
    rating: 4,
  },
];

export function Testimonials() {
  const testimonialRefs = useRef<HTMLDivElement[]>([]);

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

    testimonialRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      className="section-padding bg-gradient-to-b from-transparent to-muted/50"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-gradient">Customers</span> Say
          </h2>
          <p className="text-foreground/80">
            Real experiences from people who have made our sunscreen part of their daily
            routine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              ref={(el) => {
                if (el) testimonialRefs.current[i] = el;
              }}
              key={i}
              className="opacity-0 [animation-delay:calc(200ms*var(--index))]"
              style={{ "--index": i } as React.CSSProperties}
            >
              <Card className="h-full glass-card border-none">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/70">{testimonial.role}</p>
                      <div className="flex mt-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-secondary">
                            {i < testimonial.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <p className="italic text-foreground/90">"{testimonial.text}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
