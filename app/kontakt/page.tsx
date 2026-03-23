import type { Metadata } from "next";
import ContactPageClient from "./contact-page-client";

export const metadata: Metadata = {
  title: "Kontakt | LandVise",
  description: "Wyślij zapytanie o wycenę lub umów bezpłatną konsultację. Skontaktuj się z zespołem LandVise.",
};

export default function KontaktPage() {
  return <ContactPageClient />;
}
