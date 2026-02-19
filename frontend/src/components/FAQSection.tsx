import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const defaultFaqs = [
  {
    q: "Does Insurance cover Circumcision?",
    a: "Yes, most health insurance plans cover circumcision surgery. Circumcare accepts all major insurance providers and helps with complete paperwork assistance.",
  },
  {
    q: "Are there any side effects of Circumcision?",
    a: "Laser circumcision ensures no risk of infection, haemorrhage, or other common side effects associated with conventional circumcision.",
  },
  {
    q: "Are Laser & Stapler Circumcision Treatment costly?",
    a: "At Circumcare we provide the most advanced laser treatment at affordable cost. We also provide cashless claims option (0% interest EMI) which becomes even more affordable.",
  },
  {
    q: "What is the recovery time after Circumcision?",
    a: "Circumcision is a day care procedure. You can go home same day after couple of hours. You can return to normal work routine in 24 hours.",
  },
  {
    q: "Is Circumcision performed under local anaesthesia?",
    a: "Both normal circumcision and laser circumcision is performed under local, regional or general anaesthesia. No overnight hospital stay is required for circumcision.",
  },
  {
    q: "Intercourse after Circumcision procedure?",
    a: "Wait for at least three weeks is advised after the procedure.",
  },
];

const FAQSection = () => {
  const [faqs, setFaqs] = useState<any[]>(defaultFaqs);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent('home');
      if (data && data.faq && data.faq.items) {
        setFaqs(data.faq.items);
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <RevealOnScroll>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8 text-center">FAQ</h2>
        </RevealOnScroll>
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <RevealOnScroll key={i} delay={i * 100} animation="fade-in">
                <AccordionItem value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-heading font-medium text-foreground">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </RevealOnScroll>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
