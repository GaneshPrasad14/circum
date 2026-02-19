import { PiStethoscopeDuotone, PiHeadsetDuotone, PiSealCheckDuotone, PiShieldCheckDuotone, PiCreditCardDuotone, PiBedDuotone, PiAmbulanceDuotone, PiClipboardTextDuotone, PiBowlFoodDuotone, PiCalendarHeartDuotone } from "react-icons/pi";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const iconMap = {
    PiStethoscopeDuotone, PiHeadsetDuotone, PiSealCheckDuotone, PiShieldCheckDuotone, PiCreditCardDuotone, PiBedDuotone, PiAmbulanceDuotone, PiClipboardTextDuotone, PiBowlFoodDuotone, PiCalendarHeartDuotone
};

const defaultSteps = [
    { step: 1, icon: "PiStethoscopeDuotone", title: "Consultation With Doctors", desc: "Expert medical advice" },
    { step: 2, icon: "PiHeadsetDuotone", title: "24/7 Medical Care", desc: "Always here for you" },
    { step: 3, icon: "PiSealCheckDuotone", title: "USFDA Approved", desc: "Gold standard safety" },
    { step: 4, icon: "PiShieldCheckDuotone", title: "Insurance Accepted", desc: "All TPA covered" },
    { step: 5, icon: "PiCreditCardDuotone", title: "No Cost EMI", desc: "Easy payment options" },
    { step: 6, icon: "PiBedDuotone", title: "Short Stay Surgery", desc: "Advanced procedures" },
    { step: 7, icon: "PiAmbulanceDuotone", title: "Free Pickup & Drop", desc: "For surgery patients" },
    { step: 8, icon: "PiClipboardTextDuotone", title: "Easy Admission", desc: "Hassle-free process" },
    { step: 9, icon: "PiBowlFoodDuotone", title: "Diet Consultation", desc: "Pre & post surgery" },
    { step: 10, icon: "PiCalendarHeartDuotone", title: "Free Follow-up", desc: "Post-surgery care" },
];

const PatientJourney = () => {
    const [steps, setSteps] = useState<any[]>(defaultSteps);

    useEffect(() => {
        const fetchContent = async () => {
            const data = await getPageContent('home');
            if (data && data.journey && data.journey.items) {
                setSteps(data.journey.items);
            }
        };
        fetchContent();
    }, []);

    return (
        <section className="py-24 bg-gradient-to-b from-background to-secondary/5 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <RevealOnScroll>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-primary font-bold tracking-wider text-sm uppercase mb-3 block">Process</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                            Your Journey to <span className="text-primary">Recovery</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            We have streamlined every step of your treatment to ensure a seamless, comfortable, and stress-free experience.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {steps.map((item, i) => {
                        const IconComponent = (iconMap as any)[item.icon] || PiStethoscopeDuotone;
                        return (
                            <RevealOnScroll key={item.step} delay={i * 100} animation="scale-in" className="h-full">
                                <div className="group relative bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-2xl p-6 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 overflow-hidden">
                                    {/* Hover Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        {/* Step Badge */}
                                        <div className="absolute top-0 right-0 bg-secondary/10 text-secondary text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg border-b border-l border-secondary/10 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                            STEP {item.step}
                                        </div>

                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-border flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative">
                                            <div className="absolute inset-0 bg-primary/10 rounded-2xl transform rotate-6 scale-90 transition-transform duration-500 group-hover:rotate-12" />
                                            <IconComponent className="w-7 h-7 text-primary relative z-10" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="font-heading font-bold text-base text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {item.desc}
                                        </p>
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

export default PatientJourney;
