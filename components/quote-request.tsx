"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function QuoteRequest() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      level: formData.get("level") as string,
      property_type: formData.get("property_type") as string,
      plot_number: formData.get("plot_number") as string,
      location: formData.get("location") as string,
      area: formData.get("area") as string,
      message: formData.get("message") as string,
    };

    try {
      // 1. Wyślij do Railway API
      const response = await fetch(
        process.env.NEXT_PUBLIC_RAILWAY_API ||
          "https://alluring-encouragement-production.up.railway.app/public/lead_v3",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: payload.email,
            name: payload.name,
            details: `--- ZAPYTANIE O WYCENĘ ---\nPoziom analizy: ${payload.level}\nTyp nieruchomości: ${payload.property_type}\nNumer działki: ${payload.plot_number}\nLokalizacja: ${payload.location}\nPowierzchnia: ${payload.area}\nOpis projektu: ${payload.message}`,
            knowledge_profile_id:
              process.env.NEXT_PUBLIC_KNOWLEDGE_PROFILE_ID ||
              "fa68e85f-4d1a-4dc7-a42e-f0cf543a4bd6",
          }),
        }
      );

      // 2. Zapisz w Supabase
      await supabase.from("leads").insert({
        type: "wycena",
        ...payload,
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="wycena" className="py-24 lg:py-32 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Info */}
          <div>
            <span className="text-[#2d6a4f] text-sm font-semibold uppercase tracking-wider">
              Wycena
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1c1917] mt-3 tracking-tight">
              Wyślij zapytanie o wycenę
            </h2>
            <p className="text-neutral-600 mt-4 text-lg leading-relaxed">
              Podaj podstawowe informacje o działce, a my przygotujemy dla
              Ciebie indywidualną wycenę analizy Poziomu 1 lub 2.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#2d6a4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#1c1917] font-semibold">Wycena w 24h</h3>
                  <p className="text-neutral-500 text-sm mt-1">
                    Odpowiadamy na zapytania w ciągu jednego dnia roboczego
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#2d6a4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#1c1917] font-semibold">Masz dokumenty?</h3>
                  <p className="text-neutral-500 text-sm mt-1">
                    Wyślij wypis z MPZP, mapę lub KW na{" "}
                    <a href="mailto:kontakt@landvise.com" className="text-[#2d6a4f] font-medium hover:underline">
                      kontakt@landvise.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#2d6a4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#1c1917] font-semibold">Bez zobowiązań</h3>
                  <p className="text-neutral-500 text-sm mt-1">
                    Wycena jest bezpłatna i niezobowiązująca
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-neutral-100"
            >
              <h3 className="text-xl font-bold text-[#1c1917] mb-6">
                Formularz wyceny
              </h3>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="quote-name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      id="quote-name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="quote-email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                      placeholder="jan@firma.pl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="quote-level" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Poziom analizy
                    </label>
                    <select
                      id="quote-level"
                      name="level"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                    >
                      <option value="Poziom 1 – Wstępna identyfikacja ryzyk">
                        Poziom 1 – Wstępna identyfikacja ryzyk
                      </option>
                      <option value="Poziom 2 – Audyt Wykonalności">
                        Poziom 2 – Audyt Wykonalności
                      </option>
                      <option value="Poziom 3 – Pełne Due Diligence">
                        Poziom 3 – Pełne Due Diligence
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quote-property-type" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Typ nieruchomości
                    </label>
                    <select
                      id="quote-property-type"
                      name="property_type"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                    >
                      <option value="Mieszkaniowa">Mieszkaniowa</option>
                      <option value="Komercyjna">Komercyjna</option>
                      <option value="Przemysłowa">Przemysłowa</option>
                      <option value="Mixed-use">Mixed-use</option>
                      <option value="Inna">Inna</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="quote-plot" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Numer działki (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      id="quote-plot"
                      name="plot_number"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                      placeholder="np. 123/4"
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-area" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Powierzchnia (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      id="quote-area"
                      name="area"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                      placeholder="np. 2,5 ha"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="quote-location" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Lokalizacja działki
                  </label>
                  <input
                    type="text"
                    id="quote-location"
                    name="location"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                    placeholder="np. Warszawa, ul. Przykładowa / gmina Piaseczno"
                  />
                </div>

                <div>
                  <label htmlFor="quote-message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Opis projektu (opcjonalnie)
                  </label>
                  <textarea
                    id="quote-message"
                    name="message"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm resize-none"
                    placeholder="Krótko opisz planowaną inwestycję..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#2d6a4f] hover:bg-[#40916c] text-white font-semibold py-4 rounded-lg transition-all duration-200 disabled:opacity-50 text-base"
                >
                  {status === "loading" ? "Wysyłanie..." : "Wyślij zapytanie o wycenę"}
                </button>

                {status === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm font-medium">
                      Dziękujemy! Wycenę otrzymasz w ciągu 24 godzin.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm font-medium">
                      Coś poszło nie tak. Spróbuj ponownie lub napisz na kontakt@landvise.com
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
