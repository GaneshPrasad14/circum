import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";
import RevealOnScroll from "./RevealOnScroll";

const BookingSection = () => {
  return (
    <section id="booking-section" className="py-12 bg-section-alt">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <RevealOnScroll animation="slide-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                Book a Doctor Appointment
              </h2>
              <p className="text-muted-foreground font-body mb-6 text-lg">
                Get expert consultation from our experienced circumcision specialists.
                We provide the most advanced laser treatment at affordable cost.
              </p>
              <Button
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full gap-2 font-heading font-semibold text-lg py-6 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="https://wa.me/918939779903?text=Hi, I want to talk to an expert about circumcision treatment" target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" />
                  Talk to an Expert for Free
                </a>
              </Button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll animation="scale-in" delay={200}>
            <div className="w-full max-w-md mx-auto">
              <BookingForm />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
