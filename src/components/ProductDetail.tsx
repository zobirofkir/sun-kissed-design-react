import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { products } from "@/data/products-data";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<typeof products[number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    orderQuantity: 1
  });
  const [totalPrice, setTotalPrice] = useState("");

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
  
  /**
   * Update total price when product or quantity changes
   */
  useEffect(() => {
    if (product) {
      setTotalPrice(calculateTotalPrice(formData.orderQuantity));
    }
  }, [product, formData.orderQuantity]);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /**
     * Here you would handle the order submission
     */
    console.log("Order submitted:", { ...formData, product: product?.name });
    alert("Order placed successfully!");
    setIsModalOpen(false);
  };
  
  /**
   * Calculate total price based on quantity
   */
  const calculateTotalPrice = (qty: number) => {
    if (!product) return "";
    /**
     * Extract the numeric value from the price string (assuming format like "$29.99")
     */
    const priceValue = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    const total = priceValue * qty;
    
    /**
     * Format the total with the same currency symbol as the original price
     */
    const currencySymbol = product.price.match(/[^0-9.]/g)?.[0] || "$";
    return `${currencySymbol}${total.toFixed(2)}`;
  };
  
  const openOrderModal = () => {
    setFormData(prev => ({
      ...prev,
      orderQuantity: quantity
    }));
    setIsModalOpen(true);
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1" size="lg" onClick={openOrderModal}>
                  Buy Now
                </Button>
              </div>
              
              {/* Cash on Delivery Modal */}
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-md md:max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Cash on Delivery</DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleOrderSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-medium">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="John Doe" 
                          value={formData.name} 
                          onChange={handleInputChange}
                          className="border-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          value={formData.email} 
                          onChange={handleInputChange}
                          className="border-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="font-medium">Phone Number</Label>
                        <Input 
                          id="phoneNumber" 
                          name="phoneNumber" 
                          placeholder="+1 (555) 123-4567" 
                          value={formData.phoneNumber} 
                          onChange={handleInputChange}
                          className="border-primary/20 focus:border-primary"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="orderQuantity" className="font-medium">Quantity</Label>
                        <div className="flex items-center border rounded-md">
                          <button 
                            type="button"
                            onClick={() => {
                              const newQuantity = Math.max(1, formData.orderQuantity - 1);
                              setFormData(prev => ({...prev, orderQuantity: newQuantity}));
                              setTotalPrice(calculateTotalPrice(newQuantity));
                            }}
                            className="px-3 py-1 text-lg border-r hover:bg-muted transition"
                            disabled={formData.orderQuantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 flex-1 text-center">{formData.orderQuantity}</span>
                          <button 
                            type="button"
                            onClick={() => {
                              const newQuantity = formData.orderQuantity + 1;
                              setFormData(prev => ({...prev, orderQuantity: newQuantity}));
                              setTotalPrice(calculateTotalPrice(newQuantity));
                            }}
                            className="px-3 py-1 text-lg border-l hover:bg-muted transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="font-medium">Delivery Address</Label>
                      <Textarea 
                        id="address" 
                        name="address" 
                        placeholder="Enter your full delivery address" 
                        value={formData.address} 
                        onChange={handleInputChange}
                        className="min-h-[100px] border-primary/20 focus:border-primary"
                        required
                      />
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg mt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Product:</span>
                        <span>{product.name}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium">Price:</span>
                        <span>{product.price}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium">Quantity:</span>
                        <span>{formData.orderQuantity}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium">Total:</span>
                        <span className="text-lg font-bold">{totalPrice}</span>
                      </div>
                    </div>
                    
                    <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-0 pt-4">
                      <DialogClose asChild>
                        <Button type="button" variant="outline" className="sm:mr-2">Cancel</Button>
                      </DialogClose>
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                      >
                        Place Order
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

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