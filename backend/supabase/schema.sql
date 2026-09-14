create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  status text not null default 'NEW' check (status in ('NEW', 'CONTACTED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED')),
  created_at timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists contacts_status_idx on public.contacts (status);

alter table public.contacts enable row level security;

-- The backend uses the Supabase service-role key, so no public INSERT/SELECT policy is required.
-- Never expose SUPABASE_SERVICE_ROLE_KEY in the frontend.
