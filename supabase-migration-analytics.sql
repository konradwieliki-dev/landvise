-- Tabela: analytics_events
create table public.analytics_events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  event_type text not null check (event_type in (
    'page_view',
    'section_click',
    'form_submit_wycena',
    'form_submit_konsultacja',
    'form_submit_kontakt',
    'raport_download'
  )),
  page text,              -- np. '/', '/kontakt', '/polityka-prywatnosci'
  section text,           -- np. 'uslugi', 'doswiadczenie', 'wspolpraca', 'kontakt'
  referrer text,          -- skąd przyszedł (document.referrer)
  user_agent text,
  session_id text,        -- losowy ID sesji (localStorage lub cookie)
  metadata jsonb default '{}'::jsonb
);

-- RLS: publiczny insert, brak select
alter table public.analytics_events enable row level security;

create policy "Enable insert for all users" on public.analytics_events
  for insert with check (true);

-- Indeksy dla szybkich zapytań raportowych
create index idx_analytics_created_at on public.analytics_events (created_at);
create index idx_analytics_event_type on public.analytics_events (event_type);
create index idx_analytics_page on public.analytics_events (page);
create index idx_analytics_section on public.analytics_events (section);
