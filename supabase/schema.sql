create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  created_at timestamptz not null default now()
);

create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  os_name text,
  browser text,
  cpu_name text,
  gpu_name text,
  ram_gb int,
  storage_gb int,
  resolution text,
  logical_cores int,
  detected_device_memory numeric,
  is_current boolean default false,
  created_at timestamptz not null default now(),
  last_used_at timestamptz not null default now()
);

create table if not exists public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  genres text[] not null default '{}',
  custom_genre text,
  modes text[] not null default '{}',
  free_to_play_only boolean not null default false,
  low_storage_only boolean not null default false,
  indie_only boolean not null default false,
  story_focused boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  steam_app_id bigint,
  title text not null,
  genres text[] not null default '{}',
  tags text[] not null default '{}',
  image text,
  short_description text,
  is_free boolean not null default false,
  rating numeric,
  min_cpu_tier int,
  min_gpu_tier int,
  min_ram_gb int,
  min_storage_gb int,
  rec_cpu_tier int,
  rec_gpu_tier int,
  rec_ram_gb int,
  rec_storage_gb int,
  created_at timestamptz not null default now()
);

create table if not exists public.recommendation_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_id uuid references public.devices(id) on delete set null,
  game_id uuid references public.games(id) on delete set null,
  compatibility_score numeric,
  preference_score numeric,
  final_score numeric,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_id uuid references public.devices(id) on delete set null,
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.devices enable row level security;
alter table public.user_preferences enable row level security;
alter table public.recommendation_logs enable row level security;
alter table public.chat_logs enable row level security;

create policy "profiles are owned by user" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "devices are owned by user" on public.devices for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "prefs are owned by user" on public.user_preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "recommendations are owned by user" on public.recommendation_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "chat logs are owned by user" on public.chat_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
