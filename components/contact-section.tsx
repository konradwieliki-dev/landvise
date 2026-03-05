export default function ContactSection() {
  return (
    <section id="kontakt" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-[#2d6a4f] text-sm font-semibold uppercase tracking-wider">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1c1917] mt-3 tracking-tight">
            Napisz do nas
          </h2>
          <p className="text-neutral-600 mt-4 text-lg leading-relaxed">
            Masz pytania? Chętnie odpowiemy na każde z nich.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 rounded-2xl bg-[#fafaf9] border border-neutral-100">
            <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#2d6a4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#1c1917] mb-2">Email</h3>
            <a href="mailto:kontakt@landvise.com" className="text-[#2d6a4f] hover:underline text-sm">
              kontakt@landvise.com
            </a>
          </div>

          <div className="text-center p-8 rounded-2xl bg-[#fafaf9] border border-neutral-100">
            <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#2d6a4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#1c1917] mb-2">Telefon</h3>
            <a href="tel:+48000000000" className="text-[#2d6a4f] hover:underline text-sm">
              +48 000 000 000
            </a>
          </div>

          <div className="text-center p-8 rounded-2xl bg-[#fafaf9] border border-neutral-100">
            <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#2d6a4f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#1c1917] mb-2">Lokalizacja</h3>
            <p className="text-neutral-500 text-sm">
              Polska — działamy na terenie całego kraju
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
