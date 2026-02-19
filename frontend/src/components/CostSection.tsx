import { DollarSign, Activity, Stethoscope, UserCheck } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const iconMap = {
  DollarSign,
  Activity,
  Stethoscope,
  UserCheck
};

const CostSection = () => {
  const [content, setContent] = useState<any>({
    title: "Cost of Circumcision Depends on:",
    items: [
      { icon: "Activity", text: "Technique used: Laser or Stapler Circumcision" },
      { icon: "DollarSign", text: "Severity of the Disease" },
      { icon: "Stethoscope", text: "Any other Pre-existing Medical Condition" },
      { icon: "UserCheck", text: "For best estimation - consultation by Doctor is required." },
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent('home');
      if (data && data.cost) {
        setContent((prev: any) => ({
          ...prev,
          ...data.cost
        }));
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="py-12 bg-section-alt">
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 text-center md:text-left">
            {content.title}
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto md:mx-0">
          {(content.items || []).map((item: any, i: number) => {
            const IconComponent = (iconMap as any)[item.icon] || Activity;
            return (
              <RevealOnScroll key={i} delay={i * 100} animation="slide-in">
                <div
                  className="flex items-start gap-4 p-5 bg-background rounded-xl border border-border hover:shadow-md transition-shadow duration-300 h-full"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-body leading-relaxed">{item.text}</span>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CostSection;
