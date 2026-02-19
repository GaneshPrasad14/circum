import { Zap, Eye, Clock, Home } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const iconMap = {
  Zap,
  Eye,
  Clock,
  Home
};

const BenefitsSection = () => {
  const [content, setContent] = useState<any>({
    title: "Benefits of Laser Circumcision",
    items: [
      { icon: "Zap", title: "Most Advanced Technology" },
      { icon: "Eye", title: "Barely Visible Scars" },
      { icon: "Clock", title: "10 Min Procedure" },
      { icon: "Home", title: "Same Day Discharge" },
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent('home');
      if (data && data.benefits) {
        setContent((prev: any) => ({
          ...prev,
          ...data.benefits
        }));
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-br from-section-alt to-background relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
            {content.title}
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(content.items || []).map((b: any, i: number) => {
            const IconComponent = (iconMap as any)[b.icon] || Zap;
            return (
              <RevealOnScroll key={i} delay={i * 100} animation="slide-in">
                <div
                  className="bg-background/60 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col items-center justify-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-secondary" />
                  </div>
                  <p className="font-heading font-semibold text-foreground text-sm leading-snug">{b.title}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
