"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      topic: formData.get("client_type") as string,
      location: formData.get("location") as string,
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
            details: `--- BEZPŁATNA KONSULTACJA ---\nTyp klienta: ${payload.topic}\nLokalizacja: ${payload.location}\nOpis projektu: ${payload.message}`,
            knowledge_profile_id:
              process.env.NEXT_PUBLIC_KNOWLEDGE_PROFILE_ID ||
              "fa68e85f-4d1a-4dc7-a42e-f0cf543a4bd6",
          }),
        }
      );

      // 2. Zapisz w Supabase
      await supabase.from("leads").insert({
        type: "konsultacja",
        ...payload,
      });

      // 3. Wyślij email powiadomienie
      await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "konsultacja", ...payload }),
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
    <section id="konsultacja" className="relative py-24 lg:py-32">
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
              onSubmit={handleSubmit}
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
                    Opis projektu
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
                  disabled={status === "loading"}
                  className="w-full bg-[#2d6a4f] hover:bg-[#40916c] text-white font-semibold py-4 rounded-lg transition-all duration-200 disabled:opacity-50 text-base"
                >
                  {status === "loading" ? "Wysyłanie..." : "Umów bezpłatną konsultację"}
                </button>

                {status === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm font-medium">
                      Dziękujemy! Skontaktujemy się w ciągu 24 godzin, aby umówić termin.
                    </p>
                  </div>
                )}

                {status === "error" && (
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
  );
}
