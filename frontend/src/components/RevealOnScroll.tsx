import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number; // Delay in ms
    threshold?: number; // 0 to 1
    animation?: "fade-in" | "slide-in" | "scale-in" | "blur-in";
}

const RevealOnScroll = ({
    children,
    className,
    delay = 0,
    threshold = 0.1,
    animation = "fade-in"
}: RevealOnScrollProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    const getAnimationClass = () => {
        switch (animation) {
            case "slide-in":
                return "translate-y-10 opacity-0";
            case "scale-in":
                return "scale-95 opacity-0";
            case "blur-in":
                return "blur-sm opacity-0";
            case "fade-in":
            default:
                return "opacity-0 translate-y-4";
        }
    };

    const getVisibleClass = () => {
        switch (animation) {
            case "slide-in":
                return "translate-y-0 opacity-100";
            case "scale-in":
                return "scale-100 opacity-100";
            case "blur-in":
                return "blur-0 opacity-100";
            case "fade-in":
            default:
                return "opacity-100 translate-y-0";
        }
    };

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-1000 ease-out",
                isVisible ? getVisibleClass() : getAnimationClass(),
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
