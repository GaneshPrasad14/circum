import { Check } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const DontDelay = () => {
  const [content, setContent] = useState<any>({
    title: "Don't Delay Laser Circumcision Treatment",
    items: [
      "Get Rid of All Penis Foreskin Issues",
      "No Issues in Intercourse after Procedure",
      "Fertility is Not Affected",
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent('home');
      if (data && data.dontDelay) {
        setContent((prev: any) => ({
          ...prev,
          ...data.dontDelay
        }));
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll>
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-center md:text-left">
            {content.title}
          </h2>
        </RevealOnScroll>

        <ul className="space-y-4 max-w-2xl mx-auto md:mx-0">
          {(content.items || []).map((item: string, i: number) => (
            <RevealOnScroll key={i} delay={i * 100} animation="fade-in">
              <li className="flex items-center gap-4 font-body text-lg bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:bg-white/15 transition-colors duration-300 border border-white/10">
                <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shrink-0 shadow-lg">
                  <Check className="w-5 h-5 text-white font-bold" />
                </div>
                <span>{item}</span>
              </li>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DontDelay;
