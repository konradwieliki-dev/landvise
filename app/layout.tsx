import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "LandVise | Profesjonalna Analiza Gruntów i Działek",
  description:
    "Kompleksowe audyty due diligence gruntów i analiza wykonalności inwestycji. Ponad 15 lat doświadczenia w analizie nieruchomości gruntowych. Bezpłatna konsultacja.",
  keywords: [
    "analiza gruntów",
    "due diligence",
    "analiza działek",
    "audyt nieruchomości",
    "analiza wykonalności inwestycji",
  ],
  openGraph: {
    title: "LandVise | Profesjonalna Analiza Gruntów i Działek",
    description:
      "Kompleksowe audyty due diligence gruntów i analiza wykonalności inwestycji.",
    type: "website",
    locale: "pl_PL",
    siteName: "LandVise",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
