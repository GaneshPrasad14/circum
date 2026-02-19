import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Phone, Send } from "lucide-react";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !mobile) {
      alert("Please fill in all fields");
      return;
    }

    // Create WhatsApp message
    const message = `Hi, I'm ${name}. I want to book a consultation for circumcision treatment. My mobile number is ${mobile}.`;
    const whatsappUrl = `https://wa.me/918939779903?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Reset form
    setName("");
    setMobile("");
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl px-8 py-12 shadow-2xl border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-primary/20 h-full flex flex-col justify-center">
      {/* Header with gradient line */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-1.5 bg-gradient-to-b from-primary to-secondary rounded-full" />
          <h3 className="text-3xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
            Book Doctor <br />Consultation
          </h3>
        </div>
        <p className="text-base text-muted-foreground ml-5 font-medium">Get expert care today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name Input with Icon */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary transition-colors">
            <User className="w-5 h-5" />
          </div>
          <Input
            placeholder="Your Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-12 h-14 border-2 border-border focus:border-primary rounded-xl text-base font-body bg-background/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
          />
        </div>

        {/* Mobile Input with Icon */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 group-focus-within:text-primary transition-colors">
            <Phone className="w-5 h-5" />
          </div>
          <Input
            placeholder="Mobile Number *"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="pl-12 h-14 border-2 border-border focus:border-primary rounded-xl text-base font-body bg-background/50 transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
          />
        </div>

        {/* Premium Submit Button */}
        <Button
          type="submit"
          className="w-full h-16 bg-gradient-to-r from-secondary via-secondary to-secondary/90 text-white hover:from-secondary/90 hover:via-secondary hover:to-secondary font-heading font-bold text-xl rounded-xl shadow-lg hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative flex items-center justify-center gap-2">
            BOOK NOW
            <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </Button>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
            <span>100% Safe</span>
          </div>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span>Free Consultation</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
