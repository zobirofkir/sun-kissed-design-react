
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6 animate-fade-in [animation-delay:200ms]">
          <div className="inline-block">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary/10 text-secondary">
              New Formula
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Advanced Protection for Your{" "}
            <span className="text-gradient">Skin's Future</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-lg">
            Our dermatologist-approved sunscreen provides superior UVA/UVB protection
            while nourishing your skin with natural ingredients.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="lg" className="rounded-full">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Learn More
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden"
                >
                  <span className="text-xs font-medium">🙂</span>
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">
              <span className="text-primary font-bold">500+</span> happy customers
            </p>
          </div>
        </div>
        
        <div className="relative flex justify-center animate-fade-in [animation-delay:600ms]">
          <div className="relative w-64 h-64 md:w-80 md:h-80 animate-float">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white to-white/70 dark:from-white/10 dark:to-white/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
                <span className="text-6xl md:text-7xl">🧴</span>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-4 right-12 glass-card px-4 py-2 animate-fade-in [animation-delay:1200ms]">
            <p className="text-sm font-medium">SPF 50+ Protection</p>
          </div>
          
          <div className="absolute top-12 -left-4 glass-card px-4 py-2 animate-fade-in [animation-delay:1400ms]">
            <p className="text-sm font-medium">100% Reef Safe</p>
          </div>
        </div>
      </div>
    </section>
  );
}
