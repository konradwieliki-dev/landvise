import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Typy ───
type Period = "weekly" | "monthly" | "quarterly" | "yearly";

interface PeriodRange {
  current: { from: Date; to: Date; label: string };
  previous: { from: Date; to: Date; label: string };
}

interface ReportData {
  pageViews: number;
  uniqueSessions: number;
  raportDownloads: number;
  formWycena: number;
  formKonsultacja: number;
  formKontakt: number;
  totalLeads: number;
  topPages: { page: string; count: number }[];
  topSections: { section: string; count: number }[];
  dailyBreakdown: { date: string; dayLabel: string; count: number }[];
  peakHours: { hour: number; count: number }[];
}

// ─── Obliczanie zakresów dat ───

function getPeriodRange(period: Period): PeriodRange {
  const now = new Date();

  if (period === "weekly") {
    // Ostatni poniedziałek do niedzieli
    const lastMonday = new Date(now);
    lastMonday.setDate(now.getDate() - now.getDay() - 6); // pon poprz. tyg
    lastMonday.setHours(0, 0, 0, 0);
    const lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);
    lastSunday.setHours(23, 59, 59, 999);

    const prevMonday = new Date(lastMonday);
    prevMonday.setDate(lastMonday.getDate() - 7);
    const prevSunday = new Date(lastSunday);
    prevSunday.setDate(lastSunday.getDate() - 7);

    return {
      current: { from: lastMonday, to: lastSunday, label: formatRange(lastMonday, lastSunday) },
      previous: { from: prevMonday, to: prevSunday, label: formatRange(prevMonday, prevSunday) },
    };
  }

  if (period === "monthly") {
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastOfMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    const prevFirst = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    const prevLast = new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999);

    return {
      current: { from: firstOfMonth, to: lastOfMonth, label: formatMonth(firstOfMonth) },
      previous: { from: prevFirst, to: prevLast, label: formatMonth(prevFirst) },
    };
  }

  if (period === "quarterly") {
    const currentQ = Math.floor(now.getMonth() / 3);
    const qStart = new Date(now.getFullYear(), (currentQ - 1) * 3, 1);
    const qEnd = new Date(now.getFullYear(), currentQ * 3, 0, 23, 59, 59, 999);
    const prevQStart = new Date(now.getFullYear(), (currentQ - 2) * 3, 1);
    const prevQEnd = new Date(now.getFullYear(), (currentQ - 1) * 3, 0, 23, 59, 59, 999);

    return {
      current: { from: qStart, to: qEnd, label: `Q${currentQ} ${qStart.getFullYear()}` },
      previous: { from: prevQStart, to: prevQEnd, label: `Q${currentQ - 1 || 4} ${prevQStart.getFullYear()}` },
    };
  }

  // yearly
  const yearStart = new Date(now.getFullYear() - 1, 0, 1);
  const yearEnd = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
  const prevYearStart = new Date(now.getFullYear() - 2, 0, 1);
  const prevYearEnd = new Date(now.getFullYear() - 2, 11, 31, 23, 59, 59, 999);

  return {
    current: { from: yearStart, to: yearEnd, label: `${now.getFullYear() - 1}` },
    previous: { from: prevYearStart, to: prevYearEnd, label: `${now.getFullYear() - 2}` },
  };
}

function formatRange(from: Date, to: Date): string {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  return `${from.toLocaleDateString("pl-PL", opts)} – ${to.toLocaleDateString("pl-PL", opts)} ${to.getFullYear()}`;
}

function formatMonth(d: Date): string {
  return d.toLocaleDateString("pl-PL", { month: "long", year: "numeric" });
}

// ─── Pobieranie danych z Supabase ───

async function fetchReportData(from: Date, to: Date): Promise<ReportData> {
  const { data: events } = await supabase
    .from("analytics_events")
    .select("*")
    .gte("created_at", from.toISOString())
    .lte("created_at", to.toISOString());

  const rows = events || [];

  const pageViews = rows.filter((r) => r.event_type === "page_view").length;
  const uniqueSessions = new Set(rows.map((r) => r.session_id).filter(Boolean)).size;
  const raportDownloads = rows.filter((r) => r.event_type === "raport_download").length;
  const formWycena = rows.filter((r) => r.event_type === "form_submit_wycena").length;
  const formKonsultacja = rows.filter((r) => r.event_type === "form_submit_konsultacja").length;
  const formKontakt = rows.filter((r) => r.event_type === "form_submit_kontakt").length;
  const totalLeads = formWycena + formKonsultacja + formKontakt;

  // Top pages
  const pageCounts: Record<string, number> = {};
  rows.filter((r) => r.event_type === "page_view").forEach((r) => {
    pageCounts[r.page || "/"] = (pageCounts[r.page || "/"] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top sections
  const sectionCounts: Record<string, number> = {};
  rows.filter((r) => r.event_type === "section_click" && r.section).forEach((r) => {
    sectionCounts[r.section!] = (sectionCounts[r.section!] || 0) + 1;
  });
  const topSections = Object.entries(sectionCounts)
    .map(([section, count]) => ({ section, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Daily breakdown
  const dayCounts: Record<string, number> = {};
  const dayNames = ["Nd", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];
  rows.filter((r) => r.event_type === "page_view").forEach((r) => {
    const d = new Date(r.created_at);
    const key = d.toISOString().slice(0, 10);
    dayCounts[key] = (dayCounts[key] || 0) + 1;
  });
  const dailyBreakdown = Object.entries(dayCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => {
      const d = new Date(date);
      return { date, dayLabel: `${dayNames[d.getDay()]} ${d.getDate()}.${String(d.getMonth() + 1).padStart(2, "0")}`, count };
    });

  // Peak hours
  const hourCounts: Record<number, number> = {};
  rows.filter((r) => r.event_type === "page_view").forEach((r) => {
    const h = new Date(r.created_at).getHours();
    hourCounts[h] = (hourCounts[h] || 0) + 1;
  });
  const peakHours = Object.entries(hourCounts)
    .map(([hour, count]) => ({ hour: Number(hour), count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return {
    pageViews, uniqueSessions, raportDownloads, formWycena,
    formKonsultacja, formKontakt, totalLeads, topPages,
    topSections, dailyBreakdown, peakHours,
  };
}

// ─── Generowanie HTML emaila ───

function pctChange(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? '<span style="font-size:13px;font-weight:700;color:#16a34a;">nowy</span>' : '<span style="font-size:13px;font-weight:600;color:#9ca3af;">—</span>';
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct > 0) return `<span style="font-size:13px;font-weight:700;color:#16a34a;">&#9650; +${pct}%</span>`;
  if (pct < 0) return `<span style="font-size:13px;font-weight:700;color:#dc2626;">&#9660; ${pct}%</span>`;
  return '<span style="font-size:13px;font-weight:600;color:#9ca3af;">0%</span>';
}

function metricCard(value: number, label: string, change: string): string {
  return `
    <td width="25%" style="background:#fafaf9;border:1px solid #e5e7eb;border-radius:12px;padding:20px 16px;text-align:center;vertical-align:top;">
      <div style="font-size:32px;font-weight:800;color:#1b4332;letter-spacing:-1px;">${value}</div>
      <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#9ca3af;margin-top:4px;">${label}</div>
      <div style="margin-top:6px;">${change}</div>
    </td>
  `;
}

function buildReportHtml(
  period: Period,
  periodLabel: string,
  currentData: ReportData,
  previousData: ReportData,
  currentRange: string,
  previousRange: string,
): string {
  const periodLabels: Record<Period, string> = {
    weekly: "Raport tygodniowy",
    monthly: "Raport miesięczny",
    quarterly: "Raport kwartalny",
    yearly: "Raport roczny",
  };

  const periodCompareLabels: Record<Period, string> = {
    weekly: "ten vs poprzedni tydzień",
    monthly: "ten vs poprzedni miesiąc",
    quarterly: "ten vs poprzedni kwartał",
    yearly: "ten vs poprzedni rok",
  };

  const maxDaily = Math.max(...currentData.dailyBreakdown.map((d) => d.count), 1);

  // Sekcja 1: Dane z okresu
  const section1 = `
    <!-- Kluczowe metryki -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin-bottom:16px;">Kluczowe metryki</div>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:separate;border-spacing:8px 0;margin-bottom:32px;">
      <tr>
        ${metricCard(currentData.pageViews, "Odwiedziny", pctChange(currentData.pageViews, previousData.pageViews))}
        ${metricCard(currentData.uniqueSessions, "Unikalni", pctChange(currentData.uniqueSessions, previousData.uniqueSessions))}
        ${metricCard(currentData.raportDownloads, "Pobrania raportu", pctChange(currentData.raportDownloads, previousData.raportDownloads))}
        ${metricCard(currentData.totalLeads, "Leady łącznie", pctChange(currentData.totalLeads, previousData.totalLeads))}
      </tr>
    </table>

    <!-- Formularze -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin-bottom:16px;">Formularze</div>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fafaf9;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:32px;">
      <tr><td style="padding:16px 24px;border-bottom:1px solid #e5e7eb;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
          <td style="font-size:14px;color:#1c1917;font-weight:500;">Zapytania o wycenę</td>
          <td align="right"><span style="display:inline-block;background-color:#fef3c7;color:#92400e;font-size:13px;font-weight:700;padding:2px 12px;border-radius:6px;">${currentData.formWycena}</span></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:16px 24px;border-bottom:1px solid #e5e7eb;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
          <td style="font-size:14px;color:#1c1917;font-weight:500;">Prośby o konsultację</td>
          <td align="right"><span style="display:inline-block;background-color:#ede9fe;color:#5b21b6;font-size:13px;font-weight:700;padding:2px 12px;border-radius:6px;">${currentData.formKonsultacja}</span></td>
        </tr></table>
      </td></tr>
      <tr><td style="padding:16px 24px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
          <td style="font-size:14px;color:#1c1917;font-weight:500;">Pobrania raportu (z emailem)</td>
          <td align="right"><span style="display:inline-block;background-color:#f0fdf4;color:#2d6a4f;font-size:13px;font-weight:700;padding:2px 12px;border-radius:6px;">${currentData.raportDownloads}</span></td>
        </tr></table>
      </td></tr>
    </table>

    <!-- Najpopularniejsze sekcje -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin-bottom:16px;">Najpopularniejsze sekcje</div>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fafaf9;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:32px;">
      ${currentData.topSections.map((s, i) => `
        <tr><td style="padding:14px 24px;${i < currentData.topSections.length - 1 ? "border-bottom:1px solid #e5e7eb;" : ""}">
          <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
            <td width="24" style="font-size:14px;font-weight:700;color:#2d6a4f;">${i + 1}.</td>
            <td style="font-size:14px;color:#1c1917;font-weight:500;">${s.section}</td>
            <td align="right" style="font-size:14px;color:#6b7280;font-weight:600;">${s.count} <span style="font-size:11px;color:#9ca3af;">kliknięć</span></td>
          </tr></table>
        </td></tr>
      `).join("")}
    </table>

    <!-- Ruch wg dni -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin-bottom:16px;">Ruch wg dni</div>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fafaf9;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:32px;">
      <tr><td style="padding:20px 24px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#9ca3af;padding-bottom:12px;">Dzień</td>
            <td align="center" style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#9ca3af;padding-bottom:12px;">Odwiedziny</td>
            <td align="right" style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#9ca3af;padding-bottom:12px;">Wykres</td>
          </tr>
          ${currentData.dailyBreakdown.map((d) => `
            <tr>
              <td style="font-size:13px;color:#1c1917;padding:6px 0;">${d.dayLabel}</td>
              <td align="center" style="font-size:13px;color:#1c1917;font-weight:600;">${d.count}</td>
              <td align="right" style="padding:6px 0;">
                <div style="display:inline-block;width:${Math.round((d.count / maxDaily) * 120)}px;height:8px;background-color:#2d6a4f;border-radius:4px;"></div>
              </td>
            </tr>
          `).join("")}
        </table>
      </td></tr>
    </table>

    <!-- Szczytowe godziny -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin-bottom:16px;">Szczytowe godziny odwiedzin</div>
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fafaf9;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:32px;">
      <tr><td style="padding:20px 24px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
          ${currentData.peakHours.map((h, i) => `
            <td width="33%" style="text-align:center;padding:8px;${i < currentData.peakHours.length - 1 ? "border-right:1px solid #e5e7eb;" : ""}">
              <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#9ca3af;margin-bottom:6px;">#${i + 1}</div>
              <div style="font-size:20px;font-weight:800;color:#1b4332;">${String(h.hour).padStart(2, "0")}:00</div>
              <div style="font-size:12px;color:#6b7280;margin-top:2px;">${h.count} odwiedzin</div>
            </td>
          `).join("")}
        </tr></table>
      </td></tr>
    </table>
  `;

  // Sekcja 2: Porównanie
  function compRow(label: string, cur: number, prev: number, highlight = false): string {
    const bg = highlight ? "background:#f0fdf4;" : "";
    const fw = highlight ? "font-weight:700;" : "font-weight:500;";
    const fsz = highlight ? "font-size:16px;" : "font-size:14px;";
    return `
      <tr style="${bg}">
        <td style="padding:14px 24px;${highlight ? "" : "border-bottom:1px solid #e5e7eb;"}font-size:14px;color:${highlight ? "#1b4332" : "#1c1917"};${fw}" width="40%">${label}</td>
        <td align="center" style="padding:14px 12px;${highlight ? "" : "border-bottom:1px solid #e5e7eb;"}${fsz}color:${highlight ? "#1b4332" : "#1c1917"};font-weight:${highlight ? "800" : "700"};" width="20%">${cur}</td>
        <td align="center" style="padding:14px 12px;${highlight ? "" : "border-bottom:1px solid #e5e7eb;"}${fsz}color:#6b7280;font-weight:600;" width="20%">${prev}</td>
        <td align="center" style="padding:14px 12px;${highlight ? "" : "border-bottom:1px solid #e5e7eb;"}" width="20%">${pctChange(cur, prev)}</td>
      </tr>
    `;
  }

  const section2 = `
    <div style="border-top:3px solid #1b4332;margin:40px 0 32px 0;"></div>
    <div style="margin-bottom:28px;">
      <span style="display:inline-block;background-color:#e0f2fe;color:#0369a1;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;padding:6px 14px;border-radius:20px;border:1px solid #bae6fd;">
        Porównanie: ${periodCompareLabels[period]}
      </span>
    </div>

    <h2 style="margin:0 0 8px 0;font-size:20px;font-weight:700;color:#1c1917;letter-spacing:-0.3px;">
      ${currentRange} vs ${previousRange}
    </h2>
    <p style="margin:0 0 28px 0;font-size:14px;color:#6b7280;line-height:1.5;">
      Porównanie kluczowych metryk z poprzednim okresem.
    </p>

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#fafaf9;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:28px;">
      <tr><td style="padding:0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#1b4332;border-radius:12px 12px 0 0;">
          <tr>
            <td style="padding:14px 24px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#95d5b2;" width="40%">Metryka</td>
            <td align="center" style="padding:14px 12px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#95d5b2;" width="20%">Bieżący</td>
            <td align="center" style="padding:14px 12px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#95d5b2;" width="20%">Poprzedni</td>
            <td align="center" style="padding:14px 12px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:#95d5b2;" width="20%">Zmiana</td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          ${compRow("Odwiedziny", currentData.pageViews, previousData.pageViews)}
          ${compRow("Unikalni użytkownicy", currentData.uniqueSessions, previousData.uniqueSessions)}
          ${compRow("Pobrania raportu", currentData.raportDownloads, previousData.raportDownloads)}
          ${compRow("Zapytania o wycenę", currentData.formWycena, previousData.formWycena)}
          ${compRow("Prośby o konsultację", currentData.formKonsultacja, previousData.formKonsultacja)}
          ${compRow("Leady łącznie", currentData.totalLeads, previousData.totalLeads, true)}
        </table>
      </td></tr>
    </table>
  `;

  // Złożenie emaila
  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;background-color:#ffffff;">
  <div style="background-color:#1b4332;padding:32px 40px;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%">
      <tr>
        <td><div style="font-size:24px;font-weight:700;letter-spacing:-0.5px;color:#ffffff;">Land<span style="color:#40916c;">Vise</span></div></td>
        <td align="right"><span style="font-size:13px;color:#95d5b2;font-weight:500;">${periodLabels[period]}</span></td>
      </tr>
    </table>
  </div>
  <div style="height:4px;background:linear-gradient(90deg,#2d6a4f 0%,#40916c 50%,#95d5b2 100%);"></div>
  <div style="padding:40px;">
    <div style="margin-bottom:28px;">
      <span style="display:inline-block;background-color:#f0fdf4;color:#2d6a4f;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.8px;padding:6px 14px;border-radius:20px;border:1px solid #bbf7d0;">
        ${periodLabel}
      </span>
    </div>
    <h2 style="margin:0 0 8px 0;font-size:22px;font-weight:700;color:#1c1917;letter-spacing:-0.3px;">
      Podsumowanie aktywności na stronie
    </h2>
    <p style="margin:0 0 32px 0;font-size:15px;color:#6b7280;line-height:1.5;">
      Automatyczny raport z danych zebranych na landvise.pl.
    </p>
    ${section1}
    ${section2}
  </div>
  <div style="background-color:#fafaf9;border-top:1px solid #e5e7eb;padding:20px 40px;">
    <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
      Raport wygenerowany automatycznie ·
      <a href="https://landvise.pl" style="color:#2d6a4f;text-decoration:none;font-weight:500;">landvise.pl</a>
    </p>
  </div>
</div>
`;
}

// ─── Główny handler ───

// Obsługuje GET (testy ręczne) i POST (pg_net z Supabase)
export async function GET(request: Request) {
  return handleReport(request);
}

export async function POST(request: Request) {
  return handleReport(request);
}

async function handleReport(request: Request) {
  // Weryfikacja autoryzacji (pg_net z Supabase wysyła ten header)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const period = (searchParams.get("period") || "weekly") as Period;

  if (!["weekly", "monthly", "quarterly", "yearly"].includes(period)) {
    return NextResponse.json({ error: "invalid period" }, { status: 400 });
  }

  const range = getPeriodRange(period);
  const [currentData, previousData] = await Promise.all([
    fetchReportData(range.current.from, range.current.to),
    fetchReportData(range.previous.from, range.previous.to),
  ]);

  const periodLabels: Record<Period, string> = {
    weekly: "Raport tygodniowy",
    monthly: "Raport miesięczny",
    quarterly: "Raport kwartalny",
    yearly: "Raport roczny",
  };

  const subject = `LandVise — ${periodLabels[period]}: ${range.current.label}`;
  const html = buildReportHtml(period, range.current.label, currentData, previousData, range.current.label, range.previous.label);

  const { error } = await resend.emails.send({
    from: "LandVise <onboarding@resend.dev>",
    to: "kontakt@landvise.pl",
    subject,
    html,
  });

  if (error) {
    console.error("Report email error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ success: true, period, range: range.current.label });
}
