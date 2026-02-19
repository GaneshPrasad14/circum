import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileStickyBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-3 flex gap-3 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <Button
        className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-heading font-semibold gap-2"
        asChild
      >
        <a href="https://wa.me/918939779903?text=Hi, I want to book a consultation" target="_blank" rel="noopener noreferrer">
          <Phone className="w-4 h-4" />
          Call Now
        </a>
      </Button>
      <Button
        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold gap-2"
        onClick={() => document.querySelector('#booking-section')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <CalendarCheck className="w-4 h-4" />
        Book Now
      </Button>
    </div>
  );
};

export default MobileStickyBar;
