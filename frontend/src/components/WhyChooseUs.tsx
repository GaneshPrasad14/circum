import { ShieldCheck, FileText, Car, HeartPulse } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const iconMap = {
  ShieldCheck,
  FileText,
  Car,
  HeartPulse
};

const WhyChooseUs = () => {
  const [content, setContent] = useState<any>({
    title: "Why Circumcare?",
    items: [
      { icon: "ShieldCheck", text: "All Insurances covered" },
      { icon: "FileText", text: "Complete paperwork assistance by Circumcare" },
      { icon: "Car", text: "Free pick up & drop available" },
      { icon: "HeartPulse", text: "Post Surgery Follow Ups" },
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent('home');
      if (data && data.whyChooseUs) {
        setContent((prev: any) => ({
          ...prev,
          ...data.whyChooseUs
        }));
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">
            {content.title}
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(content.items || []).map((r: any, i: number) => {
            const IconComponent = (iconMap as any)[r.icon] || ShieldCheck;
            return (
              <RevealOnScroll key={i} delay={i * 100} animation="slide-in">
                <div
                  className="flex items-center gap-4 p-5 rounded-xl border border-border bg-gradient-to-br from-background to-muted/30 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-body text-foreground font-medium">{r.text}</p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
