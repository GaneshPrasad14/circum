import { Phone, CheckCircle2, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingForm from "./BookingForm";
import doctorImg from "@/assets/doctor-hero-removebg-preview.png";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const iconMap = {
  Award,
  CheckCircle2,
  Shield,
  Phone
};

const HeroSection = () => {
  const [content, setContent] = useState<any>({
    heading: "Best Doctors for<br /><span class=\"text-secondary bg-clip-text\">Circumcision</span> in Chennai",
    subheading: "Advanced Laser Treatment • Same Day Discharge • Minimal Pain • Quick Recovery",
    trustBadge: "Trusted by 2000+ Patients"
  });

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getPageContent('home');
      if (data) {
        if (data.hero) {
          setContent((prev: any) => ({
            ...prev,
            ...data.hero
          }));
        }
        if (data.stats) {
          setContent((prev: any) => ({
            ...prev,
            stats: data.stats
          }));
        }
      }
    };
    fetchContent();
  }, []);

  return (
    <section className="bg-hero text-hero-foreground relative overflow-hidden min-h-[600px] lg:min-h-[650px]">
      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/50 to-transparent opacity-50" />

      {/* Animated floating circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-success/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10 h-full flex items-center">
        {/* Doctor Image Centered - Desktop Only */}
        <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-100 transition-all duration-500">
          <img
            src={doctorImg}
            alt="Expert Doctor"
            className="h-[650px] object-contain drop-shadow-2xl"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full relative z-10">
          {/* Left side - Content */}
          <div className="relative z-10 space-y-8 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-success/20 backdrop-blur-sm border border-success/30 rounded-full px-4 py-2 animate-fade-in mx-auto lg:mx-0">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-success-foreground">{content.trustBadge}</span>
            </div>

            {/* Main heading with enhanced typography */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-tight animate-fade-in text-shadow-lg" dangerouslySetInnerHTML={{ __html: content.heading }}>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-hero-foreground/90 font-body max-w-xl animate-fade-in leading-relaxed mx-auto lg:mx-0" style={{ animationDelay: '200ms' }}>
              {content.subheading}
            </p>

            {/* Premium stat badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(content.stats?.items || [
                { icon: "Award", text: "10+ Years", subtext: "Experience" },
                { icon: "CheckCircle2", text: "2000+", subtext: "Happy Patients" },
                { icon: "Shield", text: "10+", subtext: "Expert Doctors" }
              ]).map((item: any, idx: number) => {
                const IconComponent = (iconMap as any)[item.icon] || Shield;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 group animate-slide-in"
                    style={{ animationDelay: `${300 + idx * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl font-heading font-bold">{item.text}</div>
                      <div className="text-sm opacity-80">{item.subtext}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced CTA button */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-8 py-7 text-lg font-heading font-bold gap-3 shadow-2xl hover:shadow-secondary/50 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                asChild
              >
                <a href="https://wa.me/918939779903?text=Hi, I want to talk to an expert about circumcision treatment" target="_blank" rel="noopener noreferrer">
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Phone className="w-6 h-6 animate-pulse" />
                  <span className="relative z-10">Talk to an Expert for Free</span>
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-primary bg-white hover:bg-white/90 hover:border-white rounded-full px-8 py-7 text-lg font-heading font-semibold hover:scale-105 transition-all duration-300"
              >
                Book Appointment
              </Button>
            </div>

            {/* Trust indicators - Desktop Only */}
            <div className="hidden lg:flex items-center gap-6 pt-4 animate-fade-in justify-center lg:justify-start flex-wrap" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">100% Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">Insurance Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">EMI Available</span>
              </div>
            </div>
          </div>

          {/* Right side - Booking Form */}
          <div className="relative z-20 flex flex-col items-center lg:items-end w-full">
            {/* Doctor Image - Mobile Only (Block element above form) */}
            <div className="lg:hidden w-full flex justify-center -mb-24 z-10 relative">
              <img
                src={doctorImg}
                alt="Expert Doctor"
                className="h-[400px] object-contain drop-shadow-2xl"
              />
            </div>

            <div className="relative z-30 w-full max-w-[380px]">
              <BookingForm />
            </div>

            {/* Trust indicators - Mobile Only (Below Form) */}
            <div className="flex lg:hidden items-center gap-4 pt-8 animate-fade-in justify-center flex-wrap" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">100% Safe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">Insurance Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="text-sm font-medium">EMI Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
