export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold tracking-tight mb-4">
              Land<span className="text-[#40916c]">Vise</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Profesjonalna analiza gruntów inwestycyjnych. Pomagamy podejmować
              świadome decyzje o zakupie nieruchomości.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
              Nawigacja
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#uslugi" className="text-white/50 hover:text-[#40916c] text-sm transition-colors">
                  Usługi
                </a>
              </li>
              <li>
                <a href="#wycena" className="text-white/50 hover:text-[#40916c] text-sm transition-colors">
                  Wycena
                </a>
              </li>
              <li>
                <a href="#wspolpraca" className="text-white/50 hover:text-[#40916c] text-sm transition-colors">
                  Współpraca
                </a>
              </li>
              <li>
                <a href="#konsultacja" className="text-white/50 hover:text-[#40916c] text-sm transition-colors">
                  Konsultacja
                </a>
              </li>
              <li>
                <a href="#kontakt" className="text-white/50 hover:text-[#40916c] text-sm transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
              Kontakt
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:kontakt@landvise.com" className="text-white/50 hover:text-[#40916c] text-sm transition-colors">
                  kontakt@landvise.com
                </a>
              </li>
              <li>
                <a href="tel:+48000000000" className="text-white/50 hover:text-[#40916c] text-sm transition-colors">
                  +48 000 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2026 LandVise. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Polityka prywatności
            </a>
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Regulamin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
