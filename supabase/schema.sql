-- Enable extensions
create extension if not exists "uuid-ossp";

-- ─── Tables ───────────────────────────────────────────────────────────────────

create table if not exists public.dashboard_stats (
  id int primary key default 1,
  active_clients int not null default 0,
  active_projects int not null default 0,
  revenue numeric not null default 0,
  tasks_done int not null default 0,
  total_tasks int not null default 0,
  clients_growth text not null default '',
  projects_growth text not null default '',
  revenue_growth text not null default '',
  tasks_growth text not null default '',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into public.dashboard_stats (id) values (1) on conflict (id) do nothing;

create table if not exists public.dashboard_projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  client text not null default '',
  status text not null default 'On Track',
  due_date date,
  progress int not null default 0 check (progress >= 0 and progress <= 100),
  notes text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.dashboard_activities (
  id uuid primary key default uuid_generate_v4(),
  text text not null,
  time_label text not null default '',
  type text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── RLS ──────────────────────────────────────────────────────────────────────

alter table public.dashboard_stats enable row level security;
alter table public.dashboard_projects enable row level security;
alter table public.dashboard_activities enable row level security;

-- Drop policies if they exist (safe to re-run)
drop policy if exists "public read stats"      on public.dashboard_stats;
drop policy if exists "public read projects"   on public.dashboard_projects;
drop policy if exists "public read activities" on public.dashboard_activities;
drop policy if exists "admin write stats"      on public.dashboard_stats;
drop policy if exists "admin write projects"   on public.dashboard_projects;
drop policy if exists "admin write activities" on public.dashboard_activities;

-- Public read
create policy "public read stats"
  on public.dashboard_stats for select using (true);

create policy "public read projects"
  on public.dashboard_projects for select using (true);

create policy "public read activities"
  on public.dashboard_activities for select using (true);

-- Admin-only write (email match via JWT)
create policy "admin write stats"
  on public.dashboard_stats
  for all
  using      (auth.jwt() ->> 'email' = 'lisgraphix17@gmail.com')
  with check (auth.jwt() ->> 'email' = 'lisgraphix17@gmail.com');

create policy "admin write projects"
  on public.dashboard_projects
  for all
  using      (auth.jwt() ->> 'email' = 'lisgraphix17@gmail.com')
  with check (auth.jwt() ->> 'email' = 'lisgraphix17@gmail.com');

create policy "admin write activities"
  on public.dashboard_activities
  for all
  using      (auth.jwt() ->> 'email' = 'lisgraphix17@gmail.com')
  with check (auth.jwt() ->> 'email' = 'lisgraphix17@gmail.com');
