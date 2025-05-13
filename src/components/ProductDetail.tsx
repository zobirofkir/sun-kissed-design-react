import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

// Import or define the products data
const products = [
  {
    id: 1,
    name: "Daily Defense SPF 50",
    description: "Everyday face sunscreen with antioxidants",
    price: "$24.99",
    badge: "Best Seller",
    imageUrl: "https://santepara.ma/wp-content/uploads/2023/08/Creme-Spf50-50ml-3282779402781-avene.jpg",
    details: {
      brand: "Crème Solaire",
      category: "Face Sunscreen",
      stock: 15,
      spf: "SPF 50",
      size: "50ml",
      ingredients: "Zinc Oxide, Titanium Dioxide, Vitamin E, Green Tea Extract",
      skinType: "All Skin Types",
      waterResistant: "No",
      application: "Apply liberally 15 minutes before sun exposure. Reapply every 2 hours."
    }
  },
  {
    id: 2,
    name: "Sport Shield SPF 70",
    description: "Water-resistant formula for active lifestyles",
    price: "$29.99",
    badge: "New",
    imageUrl: "https://dermalliances.com/cdn/shop/files/Shooting_1.jpg?v=1717882948&width=1445",
    details: {
      brand: "Crème Solaire",
      category: "Sport Sunscreen",
      stock: 20,
      spf: "SPF 70",
      size: "100ml",
      ingredients: "Avobenzone, Homosalate, Octisalate, Octocrylene",
      skinType: "All Skin Types",
      waterResistant: "Yes (80 minutes)",
      application: "Apply liberally 15 minutes before sun exposure. Reapply after 80 minutes of swimming or sweating."
    }
  },
  {
    id: 3,
    name: "Sensitive Skin SPF 30",
    description: "Fragrance-free formula for sensitive skin",
    price: "$22.99",
    badge: "",
    imageUrl: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/28/112895/1.jpg?0425",
    details: {
      brand: "Crème Solaire",
      category: "Sensitive Skin",
      stock: 8,
      spf: "SPF 30",
      size: "75ml",
      ingredients: "Zinc Oxide, Titanium Dioxide, Aloe Vera, Chamomile Extract",
      skinType: "Sensitive",
      waterResistant: "No",
      application: "Apply liberally 15 minutes before sun exposure. Reapply every 2 hours."
    }
  },
  {
    id: 4,
    name: "Hydrating SPF 40",
    description: "Moisturizing sunscreen with hyaluronic acid",
    price: "$27.99",
    badge: "",
    imageUrl: "https://www.everythingbio.ma/wp-content/uploads/2024/02/ecran-solaire.jpg",
    details: {
      brand: "Crème Solaire",
      category: "Moisturizing Sunscreen",
      stock: 12,
      spf: "SPF 40",
      size: "50ml",
      ingredients: "Zinc Oxide, Hyaluronic Acid, Ceramides, Vitamin E",
      skinType: "Dry to Normal",
      waterResistant: "No",
      application: "Apply liberally 15 minutes before sun exposure. Reapply every 2 hours."
    }
  },
  {
    id: 5,
    name: "Tinted SPF 35",
    description: "Light coverage with mineral protection",
    price: "$26.99",
    badge: "Popular",
    imageUrl: "https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/62/667685/1.jpg?6325",
    details: {
      brand: "Crème Solaire",
      category: "Tinted Sunscreen",
      stock: 10,
      spf: "SPF 35",
      size: "40ml",
      ingredients: "Iron Oxides, Zinc Oxide, Titanium Dioxide, Vitamin C",
      skinType: "All Skin Types",
      waterResistant: "Yes (40 minutes)",
      application: "Apply liberally 15 minutes before sun exposure. Reapply every 2 hours or after swimming."
    }
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<typeof products[number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      try {
        const productId = parseInt(id as string);
        const foundProduct = products.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setLoading(false);
        } else {
          setError("Product not found");
          setLoading(false);
        }
      } catch (err) {
        setError("Error loading product");
        setLoading(false);
      }
    }, 500); 
  }, [id]);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (loading) {
    return (
      <div className="container py-20">
        <div className="flex justify-center items-center h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20">
        <Card className="p-10 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
          <p className="mb-6">We couldn't find the product you're looking for.</p>
          <a href="/products">
            <Button>Return to Products</Button>
          </a>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20">
        <Card className="p-10 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">We couldn't find the product you're looking for.</p>
          <a href="/products">
            <Button>Return to Products</Button>
          </a>
        </Card>
      </div>
    );
  }

  return (
    <>
      <section>
          <Navbar />
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-[500px] object-contain rounded-lg shadow-lg"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {product.badge && (
                <span className="inline-block bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {product.badge}
                </span>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <p className="text-2xl font-bold">{product.price}</p>
              <p className="text-foreground/70">{product.description}</p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 py-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1 text-lg border-r hover:bg-muted transition"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1 text-lg border-l hover:bg-muted transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1" size="lg">
                  Add to Cart
                </Button>
                <Button className="flex-1" size="lg" variant="outline">
                  Buy Now
                </Button>
              </div>

              {/* Product Details */}
              <div className="pt-8 border-t mt-8">
                <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Brand</span>
                    <span className="font-medium">{product.details.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Category</span>
                    <span className="font-medium">{product.details.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">SPF</span>
                    <span className="font-medium">{product.details.spf}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Size</span>
                    <span className="font-medium">{product.details.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Skin Type</span>
                    <span className="font-medium">{product.details.skinType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Water Resistant</span>
                    <span className="font-medium">{product.details.waterResistant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Stock</span>
                    <span className="font-medium">{product.details.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <p className="text-foreground/70">{product.details.ingredients}</p>
              </div>

              {/* Application */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2">How to Apply</h3>
                <p className="text-foreground/70">{product.details.application}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
          <Footer />
      </section>
    </>
  );
};

export default ProductDetail;