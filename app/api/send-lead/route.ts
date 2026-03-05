import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { type, name, email, ...rest } = body;

  const isWycena = type === "wycena";
  const subject = isWycena
    ? `Nowe zapytanie o wycenę — ${name}`
    : `Nowa prośba o konsultację — ${name}`;

  const details = isWycena
    ? `
<b>Poziom analizy:</b> ${rest.level}<br/>
<b>Typ nieruchomości:</b> ${rest.property_type}<br/>
<b>Numer działki:</b> ${rest.plot_number || "—"}<br/>
<b>Lokalizacja:</b> ${rest.location}<br/>
<b>Powierzchnia:</b> ${rest.area || "—"}<br/>
<b>Opis projektu:</b> ${rest.message || "—"}
`
    : `
<b>Temat:</b> ${rest.topic}<br/>
<b>Wiadomość:</b> ${rest.message || "—"}
`;

  const html = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1b4332;">${subject}</h2>
  <p><b>Imię i nazwisko:</b> ${name}</p>
  <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
  ${details}
  <hr style="margin-top: 24px; border-color: #e5e7eb;" />
  <p style="color: #9ca3af; font-size: 12px;">Wiadomość wysłana z formularza na landvise.pl</p>
</div>
`;

  const { error } = await resend.emails.send({
    from: "LandVise <onboarding@resend.dev>",
    to: "kontakt@landvise.pl",
    subject,
    html,
    reply_to: email,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
