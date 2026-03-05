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
        "Przeprowadzamy kompleksową analizę gruntu na wybranym poziomie szczegółowości.",
    },
    {
      number: "04",
      title: "Raport i rekomendacja",
      subtitle: null,
      description:
        "Otrzymujesz przejrzysty raport z konkretną rekomendacją: kupować czy nie kupować.",
    },
  ];

  return (
    <section id="wspolpraca" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-[#2d6a4f] text-sm font-semibold uppercase tracking-wider">
            Proces
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1c1917] mt-3 tracking-tight">
            Jak wygląda nasza
            <br />
            <span className="text-[#2d6a4f]">współpraca?</span>
          </h2>
          <p className="text-neutral-600 mt-4 text-lg leading-relaxed">
            Przejrzysty proces od pierwszego kontaktu do finalnej rekomendacji.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
