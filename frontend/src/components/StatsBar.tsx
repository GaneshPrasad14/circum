import { Users, Building, MapPin } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const iconMap = {
  Users,
  Building,
  MapPin
};

const StatsBar = () => {
  const [stats, setStats] = useState<any[]>([
    { icon: "Users", number: "2000+", label: "HAPPY PATIENTS" },
    { icon: "Building", number: "100+", label: "HOSPITALS" },
    { icon: "MapPin", number: "10+", label: "CITIES" },
  ]);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent('home');
      if (data && data.statsBar && data.statsBar.items) {
        setStats(data.statsBar.items);
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = (iconMap as any)[stat.icon] || Users;
            return (
              <RevealOnScroll
                key={idx}
                animation="scale-in"
                delay={idx * 100}
                className="h-full"
              >
                <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 hover:shadow-lg hover:scale-105 transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-heading font-bold text-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm font-heading font-semibold text-muted-foreground tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
