
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function Newsletter() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay <span className="text-gradient">Protected</span>
            </h2>
            <p className="text-foreground/80">
              Subscribe to receive skincare tips, product updates, and exclusive offers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow"
              required
            />
            <Button type="submit" className="md:flex-shrink-0">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
