export default function Services() {
  return (
    <section id="uslugi" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-[#2d6a4f] text-sm font-semibold uppercase tracking-wider">
            Analiza Nieruchomości
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1c1917] mt-3 tracking-tight">
            Trzy poziomy analizy.
            <br />
            <span className="text-[#2d6a4f]">Jeden cel: pewność decyzji.</span>
          </h2>
          <p className="text-neutral-600 mt-4 text-lg leading-relaxed">
            Każda inwestycja zaczyna się od gruntu. Wybierz poziom analizy
            dopasowany do etapu Twojego projektu.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Poziom 1 */}
          <div className="relative rounded-2xl p-8 bg-[#fafaf9] border border-neutral-200 hover:shadow-lg hover:border-[#2d6a4f]/30 transition-all duration-300 flex flex-col">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2d6a4f] mb-2">
              Poziom 1
            </div>
            <h3 className="text-xl font-bold text-[#1c1917] tracking-tight mb-4">
              Wstępna identyfikacja kluczowych ryzyk
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-grow">
              Wstępna ocena ryzyk inwestycyjnych, które mogą zablokować Twój
              projekt. Zanim zaangażujesz większy budżet – sprawdź, czy warto
              iść dalej.
            </p>
            <div className="text-sm text-neutral-500 mb-8">
              Realizacja: 3–5 dni
            </div>
            <a
              href="#wycena"
              className="block text-center font-semibold py-3.5 rounded-lg bg-[#2d6a4f] text-white hover:bg-[#40916c] transition-all duration-200 text-sm mt-auto"
            >
              Zapytaj o wycenę
            </a>
          </div>

          {/* Poziom 2 - Rekomendowany */}
          <div className="relative rounded-2xl p-8 bg-[#1b4332] text-white ring-2 ring-[#2d6a4f] shadow-xl scale-[1.02] transition-all duration-300 flex flex-col">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-[#2d6a4f] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full whitespace-nowrap">
                Rekomendowany
              </span>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#95d5b2] mb-2">
              Poziom 2
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-4">
              Audyt Wykonalności
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6 flex-grow">
              Kompleksowa analiza wykonalności inwestycji. Sprawdzamy MPZP,
              warunki zabudowy, media, dostęp do drogi, ograniczenia prawne
              i środowiskowe. Dostajesz konkretną rekomendację: kupować czy nie.
            </p>
            <div className="text-sm text-white/50 mb-8">Realizacja: 7–14 dni</div>
            <a
              href="#wycena"
              className="block text-center font-semibold py-3.5 rounded-lg bg-white text-[#1b4332] hover:bg-[#95d5b2] transition-all duration-200 text-sm mt-auto"
            >
              Zapytaj o wycenę
            </a>
          </div>

          {/* Poziom 3 */}
          <div className="relative rounded-2xl p-8 bg-[#fafaf9] border border-neutral-200 hover:shadow-lg hover:border-[#2d6a4f]/30 transition-all duration-300 flex flex-col">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2d6a4f] mb-2">
              Poziom 3
            </div>
            <h3 className="text-xl font-bold text-[#1c1917] tracking-tight mb-4">
              Pełne Due Diligence
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-grow">
              Pełny audyt prawny, techniczny i finansowy gruntu. Dla
              inwestorów instytucjonalnych i projektów wymagających najwyższego
              poziomu weryfikacji przed transakcją.
            </p>
            <div className="text-sm text-neutral-500 mb-8">
              Realizacja: 21–30 dni
            </div>
            <a
              href="#wycena"
              className="block text-center font-semibold py-3.5 rounded-lg bg-[#2d6a4f] text-white hover:bg-[#40916c] transition-all duration-200 text-sm mt-auto"
            >
              Zapytaj o wycenę
            </a>
          </div>

          {/* Wsparcie transakcyjne */}
          <div className="relative rounded-2xl p-8 bg-[#fafaf9] border border-neutral-200 hover:shadow-lg hover:border-[#2d6a4f]/30 transition-all duration-300 flex flex-col">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2d6a4f] mb-2">
              Dodatkowo
            </div>
            <h3 className="text-xl font-bold text-[#1c1917] tracking-tight mb-4">
              Wsparcie Transakcyjne
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6 flex-grow">
              Towarzyszymy Ci od analizy aż do podpisania umowy. Negocjacje,
              koordynacja prawna, kontakt z notariuszem – obsługujemy cały
              proces zakupu.
            </p>
            <div className="text-sm text-neutral-500 mb-8">
              Wycena indywidualna
            </div>
            <a
              href="#konsultacja"
              className="block text-center font-semibold py-3.5 rounded-lg border border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white transition-all duration-200 text-sm mt-auto"
            >
              Umów konsultację
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
