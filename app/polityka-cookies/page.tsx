import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka cookies | LandVise",
  description:
    "Polityka cookies serwisu LandVise — informacje o plikach cookies i technologiach śledzących.",
};

export default function PolitykaCookies() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight mb-2">
          Polityka cookies
        </h1>
        <p className="text-sm text-neutral-400 mb-12">
          Ostatnia aktualizacja: 13 marca 2026 r.
        </p>

        <div className="prose prose-neutral max-w-none text-[#44403c] leading-relaxed space-y-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1c1917] [&_h2]:tracking-tight [&_h2]:mb-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#1c1917] [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-sm [&_p]:text-sm">

          <div>
            <h2>1. Czym są pliki cookies?</h2>
            <p>
              Pliki cookies (tzw.&nbsp;&bdquo;ciasteczka&rdquo;) to niewielkie pliki
              tekstowe, które są zapisywane na Twoim urządzeniu (komputerze, tablecie,
              smartfonie) podczas odwiedzania stron internetowych. Służą one do
              zapewnienia prawidłowego działania serwisu, zapamiętywania preferencji
              oraz zbierania danych analitycznych.
            </p>
          </div>

          <div>
            <h2>2. Kto jest administratorem cookies?</h2>
            <p>
              Administratorem plików cookies zamieszczanych w&nbsp;serwisie landvise.pl
              jest LandVise. Kontakt:{" "}
              <a
                href="mailto:kontakt@landvise.pl"
                className="text-[#2d6a4f] hover:underline"
              >
                kontakt@landvise.pl
              </a>.
            </p>
          </div>

          <div>
            <h2>3. Jakich cookies używamy</h2>

            <h3>Cookies niezbędne (techniczne)</h3>
            <p>
              Zapewniają prawidłowe działanie serwisu. Nie wymagają zgody użytkownika,
              ponieważ są konieczne do świadczenia usługi. Obejmują m.in.:
            </p>
            <ul>
              <li>cookies sesyjne utrzymujące stan formularzy,</li>
              <li>cookies zabezpieczające przed atakami CSRF,</li>
              <li>cookies zapamiętujące preferencje dotyczące zgód na cookies.</li>
            </ul>

            <h3>Cookies analityczne</h3>
            <p>
              Pozwalają nam analizować sposób korzystania z&nbsp;serwisu w&nbsp;celu
              poprawy jego jakości i&nbsp;funkcjonalności. Korzystamy z&nbsp;narzędzia
              Google Analytics, które zbiera zanonimizowane dane o:
            </p>
            <ul>
              <li>liczbie odwiedzin i&nbsp;unikalnych użytkowników,</li>
              <li>źródłach ruchu (np.&nbsp;wyszukiwarka, link bezpośredni),</li>
              <li>odwiedzanych podstronach i&nbsp;czasie spędzonym na stronie,</li>
              <li>typie urządzenia, przeglądarki i&nbsp;systemu operacyjnego.</li>
            </ul>
            <p>
              Adres IP jest anonimizowany przed zapisaniem, dzięki czemu Google
              Analytics nie przechowuje pełnych adresów IP użytkowników.
            </p>
          </div>

          <div>
            <h2>4. Okres przechowywania cookies</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-neutral-50 text-left">
                    <th className="px-4 py-3 font-semibold text-[#1c1917] border-b border-neutral-200">
                      Rodzaj
                    </th>
                    <th className="px-4 py-3 font-semibold text-[#1c1917] border-b border-neutral-200">
                      Czas przechowywania
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neutral-100">
                    <td className="px-4 py-3">Cookies sesyjne</td>
                    <td className="px-4 py-3">Do zamknięcia przeglądarki</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="px-4 py-3">Cookies zgód (preferencje)</td>
                    <td className="px-4 py-3">12 miesięcy</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Google Analytics (_ga, _gid)</td>
                    <td className="px-4 py-3">do 26 miesięcy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2>5. Podstawa prawna</h2>
            <p>
              Cookies niezbędne są stosowane na podstawie art.&nbsp;6 ust.&nbsp;1 lit.&nbsp;f
              RODO (prawnie uzasadniony interes administratora &mdash; zapewnienie
              prawidłowego działania serwisu).
            </p>
            <p>
              Cookies analityczne są stosowane na podstawie Twojej zgody (art.&nbsp;6
              ust.&nbsp;1 lit.&nbsp;a RODO), wyrażonej za pośrednictwem banera cookies
              wyświetlanego przy pierwszej wizycie na stronie.
            </p>
          </div>

          <div>
            <h2>6. Zarządzanie cookies</h2>
            <p>
              Możesz w&nbsp;każdej chwili zmienić ustawienia dotyczące plików cookies.
              Masz następujące możliwości:
            </p>

            <h3>W ustawieniach przeglądarki</h3>
            <p>
              Każda przeglądarka pozwala na zarządzanie plikami cookies. Możesz
              blokować cookies, usuwać istniejące lub ustawiać powiadomienia przed ich
              zapisaniem. Instrukcje znajdziesz w&nbsp;dokumentacji Twojej przeglądarki:
            </p>
            <ul>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2d6a4f] hover:underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/pl/kb/ciasteczka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2d6a4f] hover:underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2d6a4f] hover:underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/pl-pl/microsoft-edge/usuwanie-plik%C3%B3w-cookie-w-przegl%C4%85darce-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2d6a4f] hover:underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h3>Rezygnacja z Google Analytics</h3>
            <p>
              Możesz zrezygnować ze śledzenia przez Google Analytics, instalując
              oficjalny{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2d6a4f] hover:underline"
              >
                dodatek do przeglądarki blokujący Google Analytics
              </a>.
            </p>
          </div>

          <div>
            <h2>7. Cookies podmiotów trzecich</h2>
            <p>
              W&nbsp;serwisie landvise.pl mogą być stosowane cookies podmiotów trzecich,
              w&nbsp;szczególności Google LLC (Google Analytics). Podmioty te mogą
              przetwarzać dane zgodnie z&nbsp;własnymi politykami prywatności. Więcej
              informacji:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2d6a4f] hover:underline"
              >
                Polityka prywatności Google
              </a>.
            </p>
          </div>

          <div>
            <h2>8. Wpływ wyłączenia cookies</h2>
            <p>
              Wyłączenie lub ograniczenie plików cookies może spowodować, że niektóre
              funkcje serwisu nie będą działać prawidłowo, np.&nbsp;formularze mogą nie
              zapamiętywać wprowadzonych danych.
            </p>
          </div>

          <div>
            <h2>9. Powiązane dokumenty</h2>
            <p>
              Zachęcamy do zapoznania się z&nbsp;naszą{" "}
              <a
                href="/polityka-prywatnosci"
                className="text-[#2d6a4f] hover:underline"
              >
                Polityką prywatności
              </a>
              , która zawiera szczegółowe informacje o&nbsp;przetwarzaniu danych
              osobowych w&nbsp;serwisie landvise.pl.
            </p>
          </div>

          <div>
            <h2>10. Zmiany polityki cookies</h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzania zmian w&nbsp;niniejszej
              Polityce cookies. Aktualna wersja jest zawsze dostępna pod adresem:{" "}
              <a
                href="/polityka-cookies"
                className="text-[#2d6a4f] hover:underline"
              >
                landvise.pl/polityka-cookies
              </a>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
