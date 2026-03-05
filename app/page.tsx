import Hero from "@/components/hero";
import Services from "@/components/services";
import QuoteRequest from "@/components/quote-request";
import Cooperation from "@/components/cooperation";
import ConsultationForm from "@/components/consultation-form";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <QuoteRequest />
      <Cooperation />
      <ConsultationForm />
      <ContactSection />
    </>
  );
}
