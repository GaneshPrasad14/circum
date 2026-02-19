import { ShieldCheck, Feather, Umbrella, Sun, IndianRupee } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { useEffect, useState } from "react";
import { getPageContent } from "@/services/contentApi";

const iconMap = {
    ShieldCheck,
    Feather,
    Umbrella,
    Sun,
    IndianRupee
};

const KeyFeatures = () => {
    const [features, setFeatures] = useState<any[]>([
        { icon: "ShieldCheck", title: "USFDA <br />Approved <br />Procedures", badge: "Certified" },
        { icon: "Feather", title: "Minimal <br />Pain" },
        { icon: "Umbrella", title: "Insurance <br />Paperwork <br />Support" }, // Custom logic for icon overlay
        { icon: "Sun", title: "Day Care <br />Procedure", overlayText: "1" }
    ]);

    useEffect(() => {
        const fetchContent = async () => {
            const data = await getPageContent('home');
            if (data && data.features && data.features.items) {
                setFeatures(data.features.items);
            }
        };
        fetchContent();
    }, []);

    const renderFeature = (item: any, index: number) => {
        const IconComponent = (iconMap as any)[item.icon] || ShieldCheck;
        const delay = index * 100;

        // Base classes for each position to maintain the original design
        const styles = [
            {
                bg: "border-primary/30 group-hover:border-primary",
                iconColor: "text-primary",
                isBorder: true
            },
            {
                bg: "bg-red-50 group-hover:bg-red-100",
                iconColor: "text-red-500",
                isBorder: false
            },
            {
                bg: "bg-blue-50 group-hover:bg-blue-100",
                iconColor: "text-blue-600",
                isBorder: false
            },
            {
                bg: "bg-amber-50 group-hover:bg-amber-100",
                iconColor: "text-amber-500",
                isBorder: false
            }
        ];

        const style = styles[index] || styles[0];

        return (
            <RevealOnScroll key={index} delay={delay} className="flex flex-col items-center text-center group">
                <div className="relative mb-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 ${style.isBorder ? 'border-4 border-dashed' : ''} ${style.bg}`}>
                        <IconComponent className={`w-10 h-10 ${style.iconColor}`} />

                        {/* Specific overlays based on index/original design */}
                        {index === 0 && item.badge && (
                            <div className="absolute -bottom-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                {item.badge}
                            </div>
                        )}

                        {index === 2 && (
                            <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm border border-blue-100">
                                <IndianRupee className="w-3 h-3 text-blue-600" />
                            </div>
                        )}

                        {index === 3 && item.overlayText && (
                            <span className="absolute font-bold text-amber-600 text-xl font-heading">{item.overlayText}</span>
                        )}
                    </div>
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground leading-tight" dangerouslySetInnerHTML={{ __html: item.title }} />
            </RevealOnScroll>
        );
    };

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {features.map((item, index) => renderFeature(item, index))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
