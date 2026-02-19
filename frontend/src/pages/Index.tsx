import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";

import BenefitsSection from "@/components/BenefitsSection";
import DontDelay from "@/components/DontDelay";
import WhyChooseUs from "@/components/WhyChooseUs";
import CostSection from "@/components/CostSection";
import BookingSection from "@/components/BookingSection";
import ComparisonTable from "@/components/ComparisonTable";
import InfoSection from "@/components/InfoSection";
import InsuranceSection from "@/components/InsuranceSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingButtons from "@/components/FloatingButtons";
import PatientJourney from "@/components/PatientJourney";

import PopupConsultation from "@/components/PopupConsultation";

import KeyFeatures from "@/components/KeyFeatures";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PopupConsultation />
      <Header />
      <HeroSection />
      <KeyFeatures />
      <StatsBar />
      <PatientJourney />

      <BenefitsSection />
      <DontDelay />
      <WhyChooseUs />
      <CostSection />
      <BookingSection />
      <ComparisonTable />
      <InfoSection />
      <InsuranceSection />
      <FAQSection />
      <Footer />
      <MobileStickyBar />
      <ScrollToTop />
      <FloatingButtons />
      {/* Bottom padding on mobile for sticky bar */}
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default Index;
