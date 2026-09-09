create extension if not exists pgcrypto;

create type public.user_role as enum ('SUPER_ADMIN','ADMIN','STAFF','CLIENT');
create type public.invoice_status as enum ('DRAFT','SENT','PAID','OVERDUE','CANCELLED');
create type public.payment_status as enum ('PENDING','SUCCESS','FAILED','REFUNDED');
create type public.contact_status as enum ('NEW','CONTACTED','IN_PROGRESS','CONVERTED','CLOSED');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  role public.user_role not null default 'CLIENT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null,
  description text not null, price numeric(12,2), image_url text, active boolean not null default true,
  sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(), client_id uuid references public.profiles(id) on delete set null,
  title text not null, slug text unique not null, description text not null, image_url text,
  category text, featured boolean not null default false, published boolean not null default true,
  sort_order integer not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(), name text not null, description text, price numeric(12,2) not null,
  features jsonb not null default '[]'::jsonb, active boolean not null default true, sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(), client_name text not null, company text, content text not null,
  rating integer not null default 5 check (rating between 1 and 5), avatar_url text,
  published boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.contact_enquiries (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text,
  service text not null, message text not null, status public.contact_status not null default 'NEW',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(), client_id uuid not null references public.profiles(id) on delete cascade,
  invoice_number text unique not null, amount numeric(12,2) not null check (amount >= 0), status public.invoice_status not null default 'DRAFT',
  due_date date, description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(), invoice_id uuid not null references public.invoices(id) on delete cascade,
  client_id uuid not null references public.profiles(id) on delete cascade, amount numeric(12,2) not null check (amount > 0),
  method text not null, reference text, status public.payment_status not null default 'SUCCESS',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(), owner_id uuid references public.profiles(id) on delete set null,
  public_id text unique not null, url text not null, resource_type text not null default 'image',
  folder text, bytes bigint, format text, created_at timestamptz not null default now()
);

create index if not exists projects_client_idx on public.projects(client_id);
create index if not exists invoices_client_idx on public.invoices(client_id);
create index if not exists payments_client_idx on public.payments(client_id);
create index if not exists enquiries_status_idx on public.contact_enquiries(status);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, role) values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), 'CLIENT') on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
do $$ declare t text; begin foreach t in array array['profiles','services','projects','pricing_plans','testimonials','contact_enquiries','invoices','payments'] loop execute format('drop trigger if exists set_updated_at on public.%I', t); execute format('create trigger set_updated_at before update on public.%I for each row execute procedure public.set_updated_at()', t); end loop; end $$;

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_enquiries enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.media_assets enable row level security;

create policy "public read active services" on public.services for select using (active = true);
create policy "public read published projects" on public.projects for select using (published = true);
create policy "public read active pricing" on public.pricing_plans for select using (active = true);
create policy "public read published testimonials" on public.testimonials for select using (published = true);
create policy "users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "clients read own projects" on public.projects for select using (client_id = auth.uid() or published = true);
create policy "clients read own invoices" on public.invoices for select using (client_id = auth.uid());
create policy "clients read own payments" on public.payments for select using (client_id = auth.uid());
