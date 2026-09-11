create extension if not exists pgcrypto;

create type public.contact_status as enum ('NEW','CONTACTED','IN_PROGRESS','CONVERTED','CLOSED');

create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  status public.contact_status not null default 'NEW',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiries_status_idx on public.contact_enquiries(status);
create index if not exists enquiries_created_at_idx on public.contact_enquiries(created_at desc);

create or replace function public.set_contact_enquiry_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_contact_enquiry_updated_at on public.contact_enquiries;
create trigger set_contact_enquiry_updated_at
before update on public.contact_enquiries
for each row execute procedure public.set_contact_enquiry_updated_at();

alter table public.contact_enquiries enable row level security;
