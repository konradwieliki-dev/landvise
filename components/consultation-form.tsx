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
      topic: formData.get("topic") as string,
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
            details: `--- BEZPŁATNA KONSULTACJA ---\nTemat: ${payload.topic}\nWiadomość: ${payload.message}`,
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
    <section id="konsultacja" className="py-24 lg:py-32 bg-[#1b4332]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-[#95d5b2] text-sm font-semibold uppercase tracking-wider">
              Bezpłatna konsultacja
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 tracking-tight">
              Porozmawiajmy o
              <br />
              Twoim projekcie
            </h2>
            <p className="text-white/70 mt-4 text-lg leading-relaxed">
              Umów się na bezpłatną 30-minutową konsultację. Omówimy Twój
              projekt i doradzimy, jaki poziom analizy będzie dla Ciebie
              najlepszy.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Bez zobowiązań",
                "30 minut on-line lub telefonicznie",
                "Konkretne wskazówki już na spotkaniu",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#95d5b2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl"
            >
              <h3 className="text-xl font-bold text-[#1c1917] mb-6">
                Umów konsultację
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
                  <label htmlFor="consult-topic" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Temat konsultacji
                  </label>
                  <select
                    id="consult-topic"
                    name="topic"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:border-[#2d6a4f] focus:ring-2 focus:ring-[#2d6a4f]/20 outline-none transition-all text-sm"
                  >
                    <option value="Analiza gruntu">Analiza gruntu</option>
                    <option value="Due diligence">Due diligence</option>
                    <option value="Wsparcie transakcyjne">Wsparcie transakcyjne</option>
                    <option value="Inne">Inne</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="consult-message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Wiadomość (opcjonalnie)
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
