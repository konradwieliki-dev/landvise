export default function Cooperation() {
  const steps = [
    {
      number: "01",
      title: "Bezpłatna konsultacja",
      subtitle: "30 min on-line lub telefonicznie",
      description: "Omawiamy Twoje potrzeby, projekt i oczekiwania.",
    },
    {
      number: "02",
      title: "Oferta i wycena",
      subtitle: null,
      description:
        "Otrzymujesz szczegółową ofertę z zakresem prac, harmonogramem i ceną.",
    },
    {
      number: "03",
      title: "Analiza",
      subtitle: null,
      description:
        "Przeprowadzamy kompleksową analizę nieruchomości zgodnie z ustalonym zakresem.",
    },
    {
      number: "04",
      title: "Raport",
      subtitle: null,
      description:
        "Otrzymujesz szczegółowy raport z wnioskami i rekomendacjami.",
    },
    {
      number: "05",
      title: "Wsparcie po analizie",
      subtitle: null,
      description:
        "Omawiamy wyniki i odpowiadamy na wszystkie pytania. Jesteśmy dostępni, jeśli potrzebujesz omówienia wyników, dodatkowych wyjaśnień lub wsparcia w kolejnych krokach.",
    },
  ];

  return (
    <section id="wspolpraca" className="pt-12 pb-12 lg:pt-16 lg:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-[#2d6a4f] text-sm font-semibold uppercase tracking-wider">
            Proces
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1c1917] mt-3 tracking-tight">
            Jak wygląda <span className="text-[#2d6a4f]">współpraca</span>
          </h2>
          <p className="text-neutral-600 mt-4 text-lg leading-relaxed whitespace-nowrap">
            Przejrzysty, 5-etapowy proces. Od pierwszej rozmowy do gotowego raportu – wiesz dokładnie, czego się spodziewać.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-[#2d6a4f]/30 to-transparent z-0" />
              )}
              <div className="relative z-10">
                <div className="text-4xl font-bold text-[#2d6a4f]/15 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-[#1c1917] tracking-tight">
                  {step.title}
                </h3>
                {step.subtitle && (
                  <p className="text-[#2d6a4f] text-sm font-medium mt-1">
                    {step.subtitle}
                  </p>
                )}
                <p className="text-neutral-600 text-sm leading-relaxed mt-3">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
