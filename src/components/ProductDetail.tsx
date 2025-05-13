import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { products } from "@/data/products-data";

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