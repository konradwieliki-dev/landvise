# LandVise — Instrukcje dla Claude Code

## Stack
- **Framework**: Next.js 14 (App Router)
- **Język**: TypeScript
- **Style**: Tailwind CSS
- **Hosting**: Vercel
- **Baza danych**: Supabase (leads, kontakty)
- **Formularze**: wysyłka do Railway API + zapis w Supabase

## Struktura projektu

```
landvise/
├── app/
│   ├── layout.tsx         # Root layout z Header i Footer
│   ├── page.tsx           # Strona główna
│   └── globals.css        # Style globalne
├── components/
│   ├── header.tsx         # Nawigacja
│   ├── hero.tsx           # Sekcja hero z tłem
│   ├── services.tsx       # 3 poziomy analizy + wsparcie transakcyjne
│   ├── quote-request.tsx  # Formularz wyceny (client)
│   ├── cooperation.tsx    # Kroki współpracy
│   ├── consultation-form.tsx # Formularz konsultacji (client)
│   ├── contact-section.tsx   # Dane kontaktowe
│   └── footer.tsx         # Stopka
├── lib/
│   └── supabase.ts        # Klient Supabase
└── CLAUDE.md
```

## Zadania do wykonania

### 1. Inicjalizacja projektu
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"
npm install @supabase/supabase-js
```

### 2. Zmienne środowiskowe
Utwórz plik `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<twój_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<twój_anon_key>
NEXT_PUBLIC_RAILWAY_API=https://alluring-encouragement-production.up.railway.app/public/lead_v3
NEXT_PUBLIC_KNOWLEDGE_PROFILE_ID=fa68e85f-4d1a-4dc7-a42e-f0cf543a4bd6
```

### 3. Supabase — migracja tabeli leads
Uruchom w Supabase SQL Editor:
```sql
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  email text not null,
  type text not null check (type in ('wycena', 'konsultacja')),
  level text,
  property_type text,
  plot_number text,
  location text,
  area text,
  message text,
  topic text,
  status text default 'new'
);

alter table public.leads enable row level security;

create policy "Enable insert for all" on public.leads
  for insert with check (true);
```

### 4. lib/supabase.ts
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 5. Paleta kolorów (Tailwind)
Główne kolory projektu:
- `#1b4332` — ciemny zielony (bg hero, sekcja konsultacji)
- `#2d6a4f` — zielony główny (CTA, akcenty)
- `#40916c` — zielony hover
- `#95d5b2` — jasny miętowy (akcenty na ciemnym tle)
- `#1c1917` — prawie czarny (nagłówki)
- `#fafaf9` — bardzo jasny szary (tła sekcji)

### 6. Deploy na Vercel
```bash
npx vercel --prod
```
Dodaj zmienne środowiskowe w panelu Vercel (Settings → Environment Variables).

## Zasady kodowania
- Komponenty serwerowe domyślnie, `"use client"` tylko gdy potrzebne (formularze, interaktywność)
- Formularze: najpierw wysyłaj do Railway API, potem zapisuj w Supabase
- Obrazy: używaj `next/image` gdzie możliwe
- Wszystkie teksty po polsku
- Nie zmieniaj kolorów ani treści bez wyraźnej prośby
