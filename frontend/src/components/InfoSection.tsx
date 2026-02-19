import { AlertCircle } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const InfoSection = () => {
  const [content, setContent] = useState<any>({
    whatIsTitle: "What is Circumcision?",
    whatIsText: "Circumcision is the surgical removal of the foreskin, i.e., the skin covering the head of the penis. It is very beneficial. It helps improve penile health and hygiene, as it becomes easier to clean and wash the penis.",
    whenToConsultTitle: "When to Consult a Doctor?",
    whenToConsultItems: [
      "Unable to Retract Foreskin",
      "Tight or Crack Foreskin",
      "White ring around head of penis",
      "Foul Smell, Lack of Sensitivity, Swelling and Redness",
      "Pain in penis while having Intercourse",
    ],
    reasonsTitle: "Reasons to do Circumcision",
    reasonsItems: [
      "Decreased risk of penile cancer and penis diseases",
      "Decreased risk of urinary tract infections",
      "Decreased risk of sexually transmitted infections",
      "Easier hygiene: Circumcision makes it simpler to wash the penis",
    ]
  });

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent('home');
      if (data && data.info) {
        setContent((prev: any) => ({
          ...prev,
          ...data.info
        }));
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 space-y-10">
        <RevealOnScroll animation="slide-in">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">{content.whatIsTitle}</h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              {content.whatIsText}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll animation="slide-in" delay={200}>
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">{content.whenToConsultTitle}</h2>
            <ul className="space-y-3">
              {(content.whenToConsultItems || []).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll animation="slide-in" delay={400}>
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">{content.reasonsTitle}</h2>
            <ul className="space-y-3">
              {(content.reasonsItems || []).map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default InfoSection;
