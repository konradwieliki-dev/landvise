import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Wspólne elementy szablonu ───

const emailHeader = `
  <div style="background-color: #1b4332; padding: 32px 40px;">
    <div style="font-size: 24px; font-weight: 700; letter-spacing: -0.5px; color: #ffffff;">
      Land<span style="color: #40916c;">Vise</span>
    </div>
  </div>
  <div style="height: 4px; background: linear-gradient(90deg, #2d6a4f 0%, #40916c 50%, #95d5b2 100%);"></div>
`;

const emailFooter = `
  <div style="background-color: #fafaf9; border-top: 1px solid #e5e7eb; padding: 20px 40px;">
    <p style="margin: 0; font-size: 12px; color: #9ca3af; line-height: 1.5;">
      Wiadomość wygenerowana automatycznie przez formularz na
      <a href="https://landvise.pl" style="color: #2d6a4f; text-decoration: none; font-weight: 500;">landvise.pl</a>
    </p>
  </div>
`;

function emailRow(label: string, value: string, isLink = false, isBadge = false): string {
  let content: string;
  if (isBadge) {
    content = `<span style="display: inline-block; background-color: #1b4332; color: #ffffff; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 6px;">${value}</span>`;
  } else if (isLink) {
    content = `<a href="mailto:${value}" style="font-size: 15px; color: #2d6a4f; font-weight: 600; text-decoration: none;">${value}</a>`;
  } else {
    content = `<span style="font-size: 15px; color: #1c1917;">${value}</span>`;
  }
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
      <tr>
        <td width="140" valign="top" style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af; padding-top: ${isBadge ? "5" : "2"}px;">${label}</td>
        <td>${content}</td>
      </tr>
    </table>
  `;
}

function emailRowLast(label: string, value: string): string {
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td width="140" valign="top" style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #9ca3af; padding-top: 2px;">${label}</td>
        <td style="font-size: 15px; color: #1c1917; line-height: 1.5;">${value}</td>
      </tr>
    </table>
  `;
}

function wrapEmail(badge: string, badgeBg: string, badgeColor: string, badgeBorder: string, heading: string, subtitle: string, rows: string, hint: string): string {
  return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  ${emailHeader}
  <div style="padding: 40px;">
    <div style="margin-bottom: 24px;">
      <span style="display: inline-block; background-color: ${badgeBg}; color: ${badgeColor}; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; padding: 6px 14px; border-radius: 20px; border: 1px solid ${badgeBorder};">
        ${badge}
      </span>
    </div>
    <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #1c1917; letter-spacing: -0.3px;">
      ${heading}
    </h2>
    <p style="margin: 0 0 28px 0; font-size: 15px; color: #6b7280; line-height: 1.5;">
      ${subtitle}
    </p>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fafaf9; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 28px;">
      <tr><td style="padding: 24px;">
        ${rows}
      </td></tr>
    </table>
    <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
      ${hint}
    </p>
  </div>
  ${emailFooter}
</div>
`;
}

// ─── Szablony dla poszczególnych typów ───

function buildRaportDownloadHtml(email: string): string {
  const rows =
    emailRow("Adres e-mail", email, true) +
    emailRow("Pobrany raport", "Wstępna Identyfikacja Kluczowych Ryzyk") +
    emailRowLast("Poziom analizy", `<span style="display: inline-block; background-color: #1b4332; color: #ffffff; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 6px;">Poziom 1</span>`);

  return wrapEmail(
    "Pobranie raportu",
    "#f0fdf4", "#2d6a4f", "#bbf7d0",
    "Nowe pobranie przykładowego raportu",
    "Ktoś pobrał raport ze strony landvise.pl i podał swój adres e-mail.",
    rows,
    "Rozważ kontakt z tą osobą — pobranie raportu może oznaczać zainteresowanie analizą nieruchomości."
  );
}

function buildWycenaHtml(name: string, email: string, rest: Record<string, string>): string {
  const rows =
    emailRow("Imię i nazwisko", name) +
    emailRow("Adres e-mail", email, true) +
    emailRow("Poziom analizy", rest.level || "—", false, true) +
    emailRow("Typ nieruchomości", rest.property_type || "—") +
    emailRow("Numer działki", rest.plot_number || "—") +
    emailRow("Lokalizacja", rest.location || "—") +
    emailRow("Powierzchnia", rest.area || "—") +
    emailRowLast("Opis projektu", rest.message || "—");

  return wrapEmail(
    "Zapytanie o wycenę",
    "#fef3c7", "#92400e", "#fde68a",
    "Nowe zapytanie o wycenę analizy",
    "Klient wypełnił formularz zapytania o wycenę na stronie landvise.pl.",
    rows,
    "Klient oczekuje wyceny — odpowiedz jak najszybciej, aby nie stracić zainteresowania."
  );
}

function buildKonsultacjaHtml(name: string, email: string, rest: Record<string, string>): string {
  const rows =
    emailRow("Imię i nazwisko", name) +
    emailRow("Adres e-mail", email, true) +
    emailRow("Typ klienta", rest.topic || "—", false, true) +
    emailRow("Lokalizacja działki", rest.location || "—") +
    emailRowLast("Opis projektu", rest.message || "—");

  return wrapEmail(
    "Bezpłatna konsultacja",
    "#ede9fe", "#5b21b6", "#ddd6fe",
    "Nowa prośba o bezpłatną konsultację",
    "Klient wypełnił formularz bezpłatnej konsultacji na stronie landvise.pl.",
    rows,
    "Klient prosi o bezpłatną konsultację — skontaktuj się, aby umówić termin spotkania."
  );
}

// ─── Endpoint ───

export async function POST(request: Request) {
  const body = await request.json();
  const { type, name, email, ...rest } = body;

  let subject: string;
  let html: string;

  switch (type) {
    case "raport-download":
      subject = `Pobranie przykładowego raportu — ${email}`;
      html = buildRaportDownloadHtml(email);
      break;

    case "wycena":
      subject = `Nowe zapytanie o wycenę — ${name}`;
      html = buildWycenaHtml(name, email, rest);
      break;

    case "konsultacja":
      subject = `Nowa prośba o konsultację — ${name}`;
      html = buildKonsultacjaHtml(name, email, rest);
      break;

    default:
      subject = type === "kontakt"
        ? `Nowa wiadomość kontaktowa — ${name}`
        : `Nowa wiadomość — ${name}`;
      html = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1b4332;">${subject}</h2>
  <p><b>Imię i nazwisko:</b> ${name}</p>
  <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
  <p><b>Wiadomość:</b> ${rest.message || "—"}</p>
  <hr style="margin-top: 24px; border-color: #e5e7eb;" />
  <p style="color: #9ca3af; font-size: 12px;">Wiadomość wysłana z formularza na landvise.pl</p>
</div>
`;
      break;
  }

  const { error } = await resend.emails.send({
    from: "LandVise <kontakt@landvise.pl>",
    to: "kontakt@landvise.pl",
    subject,
    html,
    replyTo: email,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
