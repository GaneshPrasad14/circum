import { Star, Phone, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const doctors = [
  { name: "Dr. M. Senthil Kumar", rating: 4.7, experience: "20 Years", city: "Chennai" },
  { name: "Dr. Prabhakar Padmanabhan", rating: 4.7, experience: "14 Years", city: "Chennai" },
  { name: "Dr. Gowtham Pandiaraj", rating: 4.8, experience: "11 Years", city: "Chennai" },
  { name: "Dr. Abilash M", rating: 4.6, experience: "11 Years", city: "Chennai" },
];

const DoctorsSection = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
          Our Experienced Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doc, i) => (
            <div
              key={i}
              className="border border-border rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden group"
            >
              {/* Gradient accent border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-2xl font-heading font-bold text-primary-foreground shrink-0 shadow-lg">
                {doc.name.split(" ").pop()?.[0]}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                  <Award className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-heading font-semibold text-foreground">{doc.name}</h4>
                  <span className="flex items-center gap-1 text-secondary text-sm font-semibold bg-secondary/10 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-secondary" />
                    {doc.rating}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-medium">Circumcision Specialist</p>
                <p className="text-sm text-muted-foreground">{doc.experience} Experience • {doc.city}</p>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto relative z-10">
                <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-1 hover:scale-105 transition-transform" asChild>
                  <a href="tel:8939779903"><Phone className="w-3 h-3" />Contact</a>
                </Button>
                <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-transform">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
