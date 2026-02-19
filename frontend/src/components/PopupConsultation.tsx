import { useState, useEffect } from "react";
import { X, Phone, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PopupConsultation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    useEffect(() => {
        // Show popup initially after 15 seconds
        const initialTimer = setTimeout(() => {
            setIsOpen(true);
        }, 15000);

        return () => clearTimeout(initialTimer);
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Show again after 2 minutes (120000 ms)
        setTimeout(() => {
            setIsOpen(true);
        }, 120000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !mobile) {
            alert("Please fill in all fields");
            return;
        }

        // Create WhatsApp message
        const message = `Hi, I'm ${name}. I saw the popup on your website and want to book a consultation for circumcision treatment. My mobile number is ${mobile}.`;
        const whatsappUrl = `https://wa.me/918939779903?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');

        // Close popup and reset form
        setIsOpen(false);
        setName("");
        setMobile("");

        // Show again after 5 minutes if they submitted (optional, maybe less annoying if they booked)
        setTimeout(() => {
            setIsOpen(true);
        }, 300000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border-2 border-primary/20 shadow-2xl p-0 overflow-hidden gap-0">

                {/* Decorative Header Background */}
                <div className="bg-gradient-to-r from-primary to-secondary p-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

                    <DialogTitle className="text-2xl font-heading font-bold text-white relative z-10">
                        Free Doctor Consultation
                    </DialogTitle>
                    <p className="text-white/90 text-sm mt-2 relative z-10">
                        Get expert advice on laser circumcision instantly!
                    </p>
                    {/* Close button override for better styling */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="pl-10 h-12 border-border focus:border-primary rounded-xl"
                            />
                        </div>

                        <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Mobile Number"
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="pl-10 h-12 border-border focus:border-primary rounded-xl"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-white font-heading font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            <span className="flex items-center gap-2">
                                Get Call Back
                                <Send className="w-4 h-4" />
                            </span>
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                            * 100% Private & Confidential
                        </p>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PopupConsultation;
