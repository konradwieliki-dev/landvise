"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ContactPageClient() {
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [consultStatus, setConsultStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuoteStatus("loading");

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

      await supabase.from("leads").insert({
        type: "wycena",
        ...payload,
      });

      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "wycena", ...payload }),
      });

      if (response.ok) {
        setQuoteStatus("success");
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_type: "form_submit_wycena",
            page: window.location.pathname,
            session_id: sessionStorage.getItem("lv_sid") || "",
            metadata: { level: payload.level },
          }),
        });
        (e.target as HTMLFormElement).reset();
      } else {
        setQuoteStatus("error");
      }
    } catch {
      setQuoteStatus("error");
    }
  };

  const handleConsultSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConsultStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      topic: formData.get("client_type") as string,
      location: formData.get("location") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_RAILWAY_API ||
          "https://alluring-encouragement-production.up.railway.app/public/lead_v3",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: payload.email,
            name: payload.name,
            details: `--- BEZPŁATNA KONSULTACJA ---\nTyp klienta: ${payload.topic}\nLokalizacja: ${payload.location}\nOpis projektu: ${payload.message}`,
            knowledge_profile_id:
              process.env.NEXT_PUBLIC_KNOWLEDGE_PROFILE_ID ||
              "fa68e85f-4d1a-4dc7-a42e-f0cf543a4bd6",
          }),
        }
      );

      await supabase.from("leads").insert({
        type: "konsultacja",
        ...payload,
      });

      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "konsultacja", ...payload }),
      });

      if (response.ok) {
        setConsultStatus("success");
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event_type: "form_submit_konsultacja",
            page: window.location.pathname,
            session_id: sessionStorage.getItem("lv_sid") || "",
          }),
        });
        (e.target as HTMLFormElement).reset();
      } else {
        setConsultStatus("error");
      }
    } catch {
      setConsultStatus("error");
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "kontakt", ...payload }),
      });
      setContactStatus("success");
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "form_submit_kontakt",
          page: window.location.pathname,
          session_id: sessionStorage.getItem("lv_sid") || "",
        }),
      });
      (e.target as HTMLFormElement).reset();
    } catch {
      setContactStatus("error");
    }
  };

  return (
    <div id="kontakt" className="pb-20">
      {/* Sekcja A: Formularz wyceny */}
      <section className="bg-[#fafaf9] pt-12 pb-12 lg:pt-16 lg:pb-16">
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
                      <a href="mailto:kontakt@landvise.pl" className="text-[#2d6a4f] font-medium hover:underline">
                        kontakt@landvise.pl
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
                onSubmit={handleQuoteSubmit}
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
                        <option value="Poziom 1 – Wstępna identyfikacja kluczowych ryzyk">
                          Poziom nr 1
                        </option>
                        <option value="Poziom 2 – Audyt Wykonalności">
                          Poziom nr 2
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
                    disabled={quoteStatus === "loading"}
                    className="w-full bg-[#2d6a4f] hover:bg-[#40916c] text-white font-semibold py-4 rounded-lg transition-all duration-200 disabled:opacity-50 text-base"
                  >
                    {quoteStatus === "loading" ? "Wysyłanie..." : "Wyślij zapytanie o wycenę"}
                  </button>

                  {quoteStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 text-sm font-medium">
                        Dziękujemy! Wycenę otrzymasz w ciągu 24 godzin.
                      </p>
                    </div>
                  )}

                  {quoteStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 text-sm font-medium">
                        Coś poszło nie tak. Spróbuj ponownie lub napisz na kontakt@landvise.pl
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja B: Formularz konsultacji */}
      <section className="relative pt-12 pb-12 lg:pt-16 lg:pb-16">
        <div className="absolute inset-0">
          <img
            src="/konsultacja.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1b4332]/85" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="text-[#95d5b2] text-sm font-semibold uppercase tracking-wider">
                Bezpłatna konsultacja
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 tracking-tight">
                Gotowi na mądrą
                <br />
                decyzję inwestycyjną?
              </h2>
              <p className="text-white/70 mt-4 text-lg leading-relaxed">
                Umów bezpłatną 30-minutową konsultację.
                <br />
                Omówimy Twój projekt i sprawdzimy, jak możemy Ci pomóc.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#95d5b2] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Bez zobowiązań</p>
                    <p className="text-white/60 text-sm">Konsultacja jest bezpłatna i niezobowiązująca</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#95d5b2] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-white/90 text-sm font-medium">30 minut</p>
                    <p className="text-white/60 text-sm">Krótka, konkretna rozmowa o Twoim projekcie</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#95d5b2] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Poufność</p>
                    <p className="text-white/60 text-sm">Wszystkie informacje traktujemy jako poufne</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <form
                onSubmit={handleConsultSubmit}
                className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl"
              >
                <h3 className="text-xl font-bold text-[#1c1917] mb-6">
                  Formularz konsultacji
                </h3>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="consult-name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Imię i nazwisko
                      </label>
                      <input
                        type="text"
                        id="consult-name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                        placeholder="Jan Kowalski"
                      />
                    </div>
                    <div>
                      <label htmlFor="consult-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        id="consult-email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                        placeholder="jan@firma.pl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="consult-client-type" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Typ klienta
                    </label>
                    <select
                      id="consult-client-type"
                      name="client_type"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                    >
                      <option value="Inwestor prywatny">Inwestor prywatny</option>
                      <option value="Firma deweloperska">Firma deweloperska</option>
                      <option value="Fundusz inwestycyjny">Fundusz inwestycyjny</option>
                      <option value="Inny">Inny</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="consult-location" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Lokalizacja działki (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      id="consult-location"
                      name="location"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                      placeholder="np. Warszawa, gmina Piaseczno"
                    />
                  </div>

                  <div>
                    <label htmlFor="consult-message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Opis projektu (opcjonalnie)
                    </label>
                    <textarea
                      id="consult-message"
                      name="message"
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm resize-none"
                      placeholder="Opisz krótko, czego dotyczy Twój projekt..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={consultStatus === "loading"}
                    className="w-full bg-[#2d6a4f] hover:bg-[#40916c] text-white font-semibold py-4 rounded-lg transition-all duration-200 disabled:opacity-50 text-base"
                  >
                    {consultStatus === "loading" ? "Wysyłanie..." : "Umów bezpłatną konsultację"}
                  </button>

                  {consultStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 text-sm font-medium">
                        Dziękujemy! Skontaktujemy się w ciągu 24 godzin, aby umówić termin.
                      </p>
                    </div>
                  )}

                  {consultStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 text-sm font-medium">
                        Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sekcja C: Kontakt */}
      <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left - info */}
            <div>
              <span className="text-[#2d6a4f] text-sm font-semibold uppercase tracking-wider">
                Kontakt
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1c1917] mt-3 tracking-tight">
                Porozmawiajmy o
                <br />
                <span className="text-[#2d6a4f]">Twoim projekcie</span>
              </h2>
              <p className="text-neutral-600 mt-4 text-lg leading-relaxed">
                Masz pytania lub chcesz omówić szczegóły projektu?
                <br />
                Skontaktuj się bezpośrednio.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2d6a4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-0.5">Email</p>
                    <a href="mailto:kontakt@landvise.pl" className="text-[#2d6a4f] hover:underline text-sm font-medium">
                      kontakt@landvise.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2d6a4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-0.5">Telefon</p>
                    <a href="tel:+48507183806" className="text-[#2d6a4f] hover:underline text-sm font-medium">
                      +48 507 183 806
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2d6a4f]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-0.5">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/company/landviseadvisory/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2d6a4f] hover:underline text-sm font-medium"
                    >
                      LandVise Advisory
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - form */}
            <div>
              <form
                onSubmit={handleContactSubmit}
                className="bg-[#fafaf9] rounded-2xl p-8 lg:p-10 border border-neutral-100"
              >
                <h3 className="text-xl font-bold text-[#1c1917] mb-6">
                  Napisz do nas
                </h3>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                      placeholder="Jan Kowalski"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                      placeholder="jan@firma.pl"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Wiadomość
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm resize-none"
                      placeholder="W czym możemy pomóc?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactStatus === "loading"}
                    className="w-full bg-[#2d6a4f] hover:bg-[#40916c] text-white font-semibold py-4 rounded-lg transition-all duration-200 disabled:opacity-50 text-base"
                  >
                    {contactStatus === "loading" ? "Wysyłanie..." : "Wyślij wiadomość"}
                  </button>

                  {contactStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 text-sm font-medium">
                        Dziękujemy! Odpowiemy najszybciej jak to możliwe.
                      </p>
                    </div>
                  )}

                  {contactStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 text-sm font-medium">
                        Coś poszło nie tak. Napisz bezpośrednio na kontakt@landvise.pl
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
