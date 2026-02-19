import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/lo.png"
              alt="Circumcare Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <span className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight">
              Circumcare
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8 font-medium text-base">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="/blog" className="hover:text-primary transition-colors">Blog</a>
          </nav>
          <Button
            variant="default"
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <a href="tel:+918939779903">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <a href="tel:+918939779903" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Phone className="w-5 h-5" />
          </a>
          <button onClick={toggleMenu} className="text-foreground p-2">
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-2xl animate-in slide-in-from-top-5 duration-300">
          <nav className="flex flex-col p-6 gap-4 font-medium text-lg">
            <a
              href="/"
              className="py-3 px-4 hover:bg-muted rounded-lg transition-colors flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
              <span className="text-muted-foreground group-hover:text-primary">→</span>
            </a>
            <a
              href="/blog"
              className="py-3 px-4 hover:bg-muted rounded-lg transition-colors flex items-center justify-between group"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
              <span className="text-muted-foreground group-hover:text-primary">→</span>
            </a>
            <div className="pt-4 mt-2 border-t border-border">
              <Button className="w-full rounded-full gap-2 text-lg py-6" asChild>
                <a href="tel:+918939779903">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
