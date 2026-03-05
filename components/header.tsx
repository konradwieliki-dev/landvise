"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#uslugi", label: "Usługi" },
    { href: "#wycena", label: "Wycena" },
    { href: "#wspolpraca", label: "Współpraca" },
    { href: "#konsultacja", label: "Konsultacja" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`text-xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-[#1c1917]" : "text-white"
            }`}
          >
            Land<span className="text-[#40916c]">Vise</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#2d6a4f] ${
                  scrolled ? "text-neutral-600" : "text-white/80"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#konsultacja"
            className={`hidden lg:inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              scrolled
                ? "bg-[#2d6a4f] text-white hover:bg-[#40916c]"
                : "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
            }`}
          >
            Bezpłatna konsultacja
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 ${scrolled ? "text-[#1c1917]" : "text-white"}`}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:text-[#2d6a4f]"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-3">
              <a
                href="#konsultacja"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-[#2d6a4f] text-white font-semibold py-3 rounded-lg text-sm hover:bg-[#40916c] transition-colors"
              >
                Bezpłatna konsultacja
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
