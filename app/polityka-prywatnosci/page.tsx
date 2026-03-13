import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności | LandVise",
  description:
    "Polityka prywatności serwisu LandVise — informacje o przetwarzaniu danych osobowych.",
};

export default function PolitykaPrywatnosci() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight mb-2">
          Polityka prywatności
        </h1>
        <p className="text-sm text-neutral-400 mb-12">
          Ostatnia aktualizacja: 13 marca 2026 r.
        </p>

        <div className="prose prose-neutral max-w-none text-[#44403c] leading-relaxed space-y-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1c1917] [&_h2]:tracking-tight [&_h2]:mb-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#1c1917] [&_h3]:mb-2 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-sm [&_p]:text-sm">

          <div>
            <h2>1. Administrator danych osobowych</h2>
            <p>
              Administratorem Twoich danych osobowych jest LandVise z&nbsp;siedzibą
              w&nbsp;Polsce (dalej: &bdquo;Administrator&rdquo;). W&nbsp;sprawach związanych
              z&nbsp;ochroną danych osobowych możesz skontaktować się z&nbsp;nami pod adresem
              e-mail:{" "}
              <a
                href="mailto:kontakt@landvise.pl"
                className="text-[#2d6a4f] hover:underline"
              >
                kontakt@landvise.pl
              </a>.
            </p>
          </div>

          <div>
            <h2>2. Jakie dane zbieramy</h2>
            <p>
              W&nbsp;ramach korzystania z&nbsp;serwisu landvise.pl możemy zbierać następujące
              dane:
            </p>
            <h3>Dane z formularza kontaktowego i wyceny</h3>
            <ul>
              <li>imię i nazwisko,</li>
              <li>adres e-mail,</li>
              <li>numer telefonu,</li>
              <li>nazwa firmy (opcjonalnie),</li>
              <li>treść wiadomości oraz szczegóły zapytania o wycenę.</li>
            </ul>
            <h3>Dane zbierane automatycznie (analityka)</h3>
            <ul>
              <li>adres IP (anonimizowany),</li>
              <li>typ i wersja przeglądarki,</li>
              <li>system operacyjny,</li>
              <li>źródło wejścia na stronę (referer),</li>
              <li>czas i data wizyty, odwiedzone podstrony.</li>
            </ul>
          </div>

          <div>
            <h2>3. Cele i podstawy przetwarzania</h2>
            <p>Twoje dane przetwarzamy w następujących celach:</p>
            <ul>
              <li>
                <strong>Realizacja zapytań</strong> &mdash; odpowiedź na wiadomości
                przesłane przez formularz kontaktowy lub formularz wyceny (art.&nbsp;6
                ust.&nbsp;1 lit.&nbsp;b RODO &mdash; wykonanie umowy lub podjęcie działań
                przed jej zawarciem).
              </li>
              <li>
                <strong>Analityka i ulepszanie serwisu</strong> &mdash; analiza ruchu na
                stronie za pomocą narzędzi analitycznych w&nbsp;celu poprawy jakości usług
                (art.&nbsp;6 ust.&nbsp;1 lit.&nbsp;f RODO &mdash; prawnie uzasadniony
                interes administratora).
              </li>
              <li>
                <strong>Obowiązki prawne</strong> &mdash; wypełnianie obowiązków wynikających
                z&nbsp;przepisów prawa, w&nbsp;tym przepisów podatkowych i&nbsp;rachunkowych
                (art.&nbsp;6 ust.&nbsp;1 lit.&nbsp;c RODO).
              </li>
            </ul>
          </div>

          <div>
            <h2>4. Okres przechowywania danych</h2>
            <p>
              Dane z&nbsp;formularzy kontaktowych przechowujemy przez okres niezbędny do
              obsługi zapytania, a&nbsp;następnie przez okres wynikający z&nbsp;obowiązków
              prawnych (do 5&nbsp;lat). Dane analityczne przechowywane są w&nbsp;formie
              zanonimizowanej przez okres do 26&nbsp;miesięcy.
            </p>
          </div>

          <div>
            <h2>5. Odbiorcy danych</h2>
            <p>Twoje dane mogą być przekazywane następującym kategoriom odbiorców:</p>
            <ul>
              <li>dostawcy usług hostingowych i&nbsp;IT,</li>
              <li>dostawcy narzędzi analitycznych (np.&nbsp;Google Analytics),</li>
              <li>dostawcy usług e-mail,</li>
              <li>
                organy publiczne &mdash; w&nbsp;przypadkach wymaganych przepisami prawa.
              </li>
            </ul>
            <p>
              Nie sprzedajemy Twoich danych osobowych podmiotom trzecim.
            </p>
          </div>

          <div>
            <h2>6. Przekazywanie danych poza EOG</h2>
            <p>
              W&nbsp;związku z&nbsp;korzystaniem z&nbsp;narzędzi analitycznych (Google
              Analytics) Twoje dane mogą być przekazywane do Stanów Zjednoczonych.
              Transfer odbywa się na podstawie standardowych klauzul umownych
              zatwierdzonych przez Komisję Europejską lub decyzji o&nbsp;adekwatności
              (EU-U.S. Data Privacy Framework).
            </p>
          </div>

          <div>
            <h2>7. Twoje prawa</h2>
            <p>
              Zgodnie z&nbsp;RODO przysługują Ci następujące prawa:
            </p>
            <ul>
              <li>prawo dostępu do swoich danych,</li>
              <li>prawo do sprostowania (poprawiania) danych,</li>
              <li>prawo do usunięcia danych (&bdquo;prawo do bycia zapomnianym&rdquo;),</li>
              <li>prawo do ograniczenia przetwarzania,</li>
              <li>prawo do przenoszenia danych,</li>
              <li>prawo do sprzeciwu wobec przetwarzania,</li>
              <li>
                prawo do cofnięcia zgody w&nbsp;dowolnym momencie (bez wpływu na zgodność
                z&nbsp;prawem przetwarzania dokonanego przed cofnięciem).
              </li>
            </ul>
            <p>
              W&nbsp;celu realizacji powyższych praw skontaktuj się z&nbsp;nami pod adresem:{" "}
              <a
                href="mailto:kontakt@landvise.pl"
                className="text-[#2d6a4f] hover:underline"
              >
                kontakt@landvise.pl
              </a>.
            </p>
            <p>
              Masz również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych
              Osobowych (ul.&nbsp;Stawki 2, 00-193 Warszawa).
            </p>
          </div>

          <div>
            <h2>8. Pliki cookies</h2>
            <p>
              Serwis landvise.pl wykorzystuje pliki cookies. Szczegółowe informacje
              dotyczące cookies znajdziesz w&nbsp;naszej{" "}
              <a
                href="/polityka-cookies"
                className="text-[#2d6a4f] hover:underline"
              >
                Polityce cookies
              </a>.
            </p>
          </div>

          <div>
            <h2>9. Zmiany polityki prywatności</h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzania zmian
              w&nbsp;niniejszej Polityce prywatności. O&nbsp;istotnych zmianach
              poinformujemy za pośrednictwem serwisu. Aktualna wersja polityki jest
              zawsze dostępna pod adresem:{" "}
              <a
                href="/polityka-prywatnosci"
                className="text-[#2d6a4f] hover:underline"
              >
                landvise.pl/polityka-prywatnosci
              </a>.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
