export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://eu.chat-img.sintra.ai/a22f1cae-a17d-413b-a1f1-e79178fd63af/80499e5d-6ccb-4fed-b34a-5fac69d07df8/image.png?w=1184&h=864"
          alt="Analiza gruntów - nowoczesne narzędzia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b4332]/90 via-[#1b4332]/70 to-[#1b4332]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 bg-[#95d5b2] rounded-full" />
            <span className="text-white/90 text-sm font-medium">LandVise</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Profesjonalna analiza
            <br />
            <span className="text-[#95d5b2]">gruntów inwestycyjnych</span>
            <br />
            i wsparcie w transakcji
          </h1>

          <p className="text-base text-white/70 leading-relaxed mb-10 max-w-xl">
            Pomagamy inwestorom prywatnym, funduszom i firmom deweloperskim
            podejmować świadome decyzje o zakupie gruntów. Dzięki ponad
            15-letniemu doświadczeniu w analizie i przygotowaniu nieruchomości
            do transakcji, wiemy, co naprawdę decyduje o sukcesie inwestycji.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#wycena"
              className="inline-flex items-center justify-center bg-[#2d6a4f] hover:bg-[#40916c] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-base"
            >
              Wyślij zapytanie o wycenę
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#konsultacja"
              className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 text-base"
            >
              Umów bezpłatną konsultację
            </a>
          </div>

          <div className="flex flex-wrap gap-8 lg:gap-12 mt-16 pt-8 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-white/60 text-sm mt-1">Lat doświadczenia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-white/60 text-sm mt-1">Poziomy analizy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">✓ / ✗</div>
              <div className="text-white/60 text-sm mt-1">Konkretna rekomendacja</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">A→Z</div>
              <div className="text-white/60 text-sm mt-1">Od analizy do transakcji</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
