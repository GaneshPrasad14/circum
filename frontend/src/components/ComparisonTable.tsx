import { Check, X } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const comparisons = [
  { aspect: "Technology", conventional: "OUTDATED", laser: "ADVANCED" },
  { aspect: "Pain", conventional: "High", laser: "Minimum" },
  { aspect: "Blood Loss", conventional: "High", laser: "Minimum" },
  { aspect: "Hospital Duration", conventional: "LONG", laser: "SHORT" },
  { aspect: "Quick Recovery", conventional: "No", laser: "Yes" },
  { aspect: "Cuts & Stitches", conventional: "High", laser: "Minimum" },
  { aspect: "Scars", conventional: "BIG", laser: "SMALL" },
  { aspect: "Follow Up", conventional: "REQUIRED", laser: "NOT REQUIRED" },
];

import { getPageContent } from "@/services/contentApi";
import { useEffect, useState } from "react";

const ComparisonTable = () => {
  const [content, setContent] = useState<any>({
    items: comparisons
  });

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent('home');
      if (data && data.comparison) {
        setContent((prev: any) => ({
          ...prev,
          ...data.comparison
        }));
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <RevealOnScroll>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-heading font-semibold text-sm">TREATMENT COMPARISON</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Laser Circumcision Treatment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See why advanced laser technology is the superior choice
            </p>
          </RevealOnScroll>
        </div>

        {/* Comparison Cards Container */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-12">
          {/* Conventional Card - Red Theme */}
          <RevealOnScroll animation="slide-in">
            <div className="bg-gradient-to-br from-destructive/5 to-background rounded-3xl border-2 border-destructive/20 p-8 relative overflow-hidden group hover:border-destructive/40 transition-all duration-500 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-heading font-bold text-foreground">Conventional</h3>
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                    <X className="w-6 h-6 text-destructive" />
                  </div>
                </div>

                <div className="space-y-3">
                  {(content.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-destructive/10">
                      <span className="font-body text-sm text-muted-foreground">{item.aspect}</span>
                      <span className="font-heading font-bold text-destructive text-sm">{item.conventional}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Laser Card - Green Theme */}
          <RevealOnScroll animation="slide-in" delay={200}>
            <div className="bg-gradient-to-br from-success/5 to-background rounded-3xl border-2 border-success/30 p-8 relative overflow-hidden group hover:border-success/50 hover:shadow-2xl hover:shadow-success/10 transition-all duration-500 h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full blur-2xl" />

              {/* Recommended Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-secondary to-secondary/90 text-white px-6 py-2 rounded-full text-xs font-heading font-bold shadow-lg rotate-12">
                RECOMMENDED
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-heading font-bold text-foreground">Laser</h3>
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-success" />
                  </div>
                </div>

                <div className="space-y-3">
                  {(content.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white/70 rounded-xl border border-success/20 hover:bg-success/5 transition-colors">
                      <span className="font-body text-sm text-muted-foreground">{item.aspect}</span>
                      <span className="font-heading font-bold text-success text-sm">{item.laser}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Bottom CTA */}
        <RevealOnScroll animation="scale-in" delay={300}>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary via-primary to-secondary text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-50" />

            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-heading font-bold mb-3">
                Choose Advanced Laser Treatment Today
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                Experience minimal pain, faster recovery, and superior outcomes with our state-of-the-art laser technology
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2">
                  <Check className="w-5 h-5" />
                  <span className="font-heading text-sm">Zero Pain</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2">
                  <Check className="w-5 h-5" />
                  <span className="font-heading text-sm">Quick Recovery</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2">
                  <Check className="w-5 h-5" />
                  <span className="font-heading text-sm">No Scars</span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ComparisonTable;
