-- Tabela: leads
-- Uruchom w Supabase > SQL Editor

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
  status text default 'new' check (status in ('new', 'contacted', 'closed'))
);

-- Row Level Security
alter table public.leads enable row level security;

-- Pozwól na INSERT bez autoryzacji (formularz publiczny)
create policy "Enable insert for all users" on public.leads
  for insert with check (true);

-- Opcjonalnie: pozwól na SELECT tylko zalogowanym (dashboard)
-- create policy "Enable select for authenticated users" on public.leads
--   for select using (auth.role() = 'authenticated');
