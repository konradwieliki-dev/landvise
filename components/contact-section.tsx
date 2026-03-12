"use client";

import { useState } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

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
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="pt-12 pb-24 lg:pt-16 lg:pb-32 bg-white">
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
                  <span className="text-neutral-400 text-sm">Wkrótce</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - form */}
          <div>
            <form
              onSubmit={handleSubmit}
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
                  disabled={status === "loading"}
                  className="w-full bg-[#2d6a4f] hover:bg-[#40916c] text-white font-semibold py-4 rounded-lg transition-all duration-200 disabled:opacity-50 text-base"
                >
                  {status === "loading" ? "Wysyłanie..." : "Wyślij wiadomość"}
                </button>

                {status === "success" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm font-medium">
                      Dziękujemy! Odpowiemy najszybciej jak to możliwe.
                    </p>
                  </div>
                )}

                {status === "error" && (
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
  );
}
