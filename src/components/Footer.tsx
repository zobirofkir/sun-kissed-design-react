
import { ThemeToggle } from "@/components/ThemeToggle";

export function Footer() {
  return (
    <footer className="bg-muted/50 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#" className="inline-block mb-4">
              <span className="font-bold text-2xl text-gradient">SolairePro</span>
            </a>
            <p className="text-foreground/70 max-w-md mb-6">
              Protecting your skin with advanced formulas and natural ingredients,
              because your skin deserves the best care today and every day.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-foreground/70">
                <span className="font-semibold text-foreground">Email:</span>{" "}
                info@solairepro.com
              </li>
              <li className="text-foreground/70">
                <span className="font-semibold text-foreground">Phone:</span>{" "}
                +1 (555) 123-4567
              </li>
              <li className="text-foreground/70">
                <span className="font-semibold text-foreground">Address:</span>{" "}
                123 Sunshine Blvd, <br /> Coastal City, CS 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 text-center text-sm text-foreground/60">
          <p>© 2025 SolairePro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
