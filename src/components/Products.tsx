import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    name: "Daily Defense SPF 50",
    description: "Everyday face sunscreen with antioxidants",
    price: "$24.99",
    badge: "Best Seller",
    imageUrl: "https://santepara.ma/wp-content/uploads/2023/08/Creme-Spf50-50ml-3282779402781-avene.jpg",
  },
  {
    id: 2,
    name: "Sport Shield SPF 70",
    description: "Water-resistant formula for active lifestyles",
    price: "$29.99",
    badge: "New",
    imageUrl: "https://dermalliances.com/cdn/shop/files/Shooting_1.jpg?v=1717882948&width=1445",
  },
  {
    id: 3,
    name: "Sensitive Skin SPF 30",
    description: "Fragrance-free formula for sensitive skin",
    price: "$22.99",
    badge: "",
    imageUrl: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/28/112895/1.jpg?0425",
  },
  {
    id: 4,
    name: "Hydrating SPF 40",
    description: "Moisturizing sunscreen with hyaluronic acid",
    price: "$27.99",
    badge: "",
    imageUrl: "https://www.everythingbio.ma/wp-content/uploads/2024/02/ecran-solaire.jpg",
  },
  {
    id: 5,
    name: "Tinted SPF 35",
    description: "Light coverage with mineral protection",
    price: "$26.99",
    badge: "Popular",
    imageUrl: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/62/667685/1.jpg?6325",
  },
];

export function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const productRefs = useRef<HTMLDivElement[]>([]);

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

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="products" className="section-padding">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient">Product</span> Range
          </h2>
          <p className="text-foreground/80">
            Discover our premium sunscreens designed for different skin types and
            activities.
          </p>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <div
              ref={(el) => {
                if (el) productRefs.current[i] = el;
              }}
              key={i}
              className="opacity-0 [animation-delay:calc(200ms*var(--index))]"
              style={{ "--index": i } as React.CSSProperties}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="md:hidden">
          <Carousel>
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={index}>
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="static transform-none mx-2" />
              <CarouselNext className="static transform-none mx-2" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof products[number] }) {
  return (
    <Card className="overflow-hidden h-full transition-transform hover:scale-[1.02] bg-card">
      <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-xl">{product.name}</h3>
            <p className="text-sm text-foreground/70">{product.description}</p>
          </div>
          <div className="text-lg font-bold">{product.price}</div>
        </div>
      </CardContent>
      <CardFooter>
      <a href={`/product/${product.id}`}>
        <Button className="w-full">
            Buy
        </Button>
      </a>
      </CardFooter>
    </Card>
  );
}
