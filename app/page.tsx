import Hero from "@/components/hero";
import Services from "@/components/services";
import Experience from "@/components/experience";
import Cooperation from "@/components/cooperation";
import ContactPageClient from "./kontakt/contact-page-client";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Experience />
      <Cooperation />
      <ContactPageClient />
    </>
  );
}
