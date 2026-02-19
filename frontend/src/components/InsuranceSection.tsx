import { ShieldCheck, Eye, FileText, CreditCard } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const items = [
  { icon: ShieldCheck, text: "All Insurances covered" },
  { icon: Eye, text: "No Hidden Charges" },
  { icon: FileText, text: "Complete Paperwork Assistance" },
  { icon: CreditCard, text: "Cashless Insurance Facility" },
];

const InsuranceSection = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-hero to-hero/90 text-hero-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll>
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
            Hassle-Free Insurance Approval
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 100} animation="scale-in">
              <div
                className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 h-full justify-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-secondary" />
                </div>
                <p className="font-heading font-medium text-sm leading-snug">{item.text}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsuranceSection;
