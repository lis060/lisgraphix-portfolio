import { supabase, isSupabaseConfigured } from './supabase';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DashboardStats {
  id: number;
  active_clients: number;
  active_projects: number;
  revenue: number; // GHS
  tasks_done: number;
  total_tasks: number;
  clients_growth: string;
  projects_growth: string;
  revenue_growth: string;
  tasks_growth: string;
  updated_at?: string;
}

export interface DashboardProject {
  id: string;
  name: string;
  client: string;
  status: 'On Track' | 'In Review' | 'Starting' | 'Delayed' | 'Completed';
  due_date: string | null;
  progress: number;
  notes?: string | null;
  sort_order?: number;
  created_at?: string;
}

export interface DashboardActivity {
  id: string;
  text: string;
  time_label: string;
  type?: string | null;
  sort_order?: number;
  created_at?: string;
}

// ─── Defaults (fallback when Supabase is unconfigured or returns empty) ───────

export const DEFAULT_STATS: DashboardStats = {
  id: 1,
  active_clients: 12,
  active_projects: 8,
  revenue: 48500,
  tasks_done: 143,
  total_tasks: 164,
  clients_growth: '+3 this month',
  projects_growth: '2 due this week',
  revenue_growth: '+12% vs last month',
  tasks_growth: '143 of 164 tasks',
};

export const DEFAULT_PROJECTS: DashboardProject[] = [
  {
    id: 'default-1',
    name: 'IronFit Ghana Rebrand',
    client: 'IronFit Ghana',
    progress: 85,
    status: 'On Track',
    due_date: 'Apr 22',
  },
  {
    id: 'default-2',
    name: 'PayKwik Dashboard v2',
    client: 'PayKwik Technologies',
    progress: 62,
    status: 'On Track',
    due_date: 'May 1',
  },
  {
    id: 'default-3',
    name: 'Kente Kitchen Website',
    client: 'Kente Kitchen',
    progress: 40,
    status: 'In Review',
    due_date: 'May 10',
  },
  {
    id: 'default-4',
    name: 'Nhyira Fashion App',
    client: 'Nhyira Fashion',
    progress: 20,
    status: 'Starting',
    due_date: 'May 28',
  },
];

export const DEFAULT_ACTIVITIES: DashboardActivity[] = [
  {
    id: 'act-1',
    text: 'New booking from Emmanuel Darko (PayKwik)',
    time_label: '2h ago',
    type: 'booking',
  },
  {
    id: 'act-2',
    text: 'IronFit Ghana — Milestone 3 approved',
    time_label: '5h ago',
    type: 'milestone',
  },
  {
    id: 'act-3',
    text: 'Invoice #INV-041 paid — GHS 2,500',
    time_label: '1d ago',
    type: 'payment',
  },
  {
    id: 'act-4',
    text: 'Sharp Cuts case study published',
    time_label: '2d ago',
    type: 'publish',
  },
  {
    id: 'act-5',
    text: 'New lead from contact form — Kente Kitchen',
    time_label: '3d ago',
    type: 'lead',
  },
  {
    id: 'act-6',
    text: 'Nhyira Fashion — project kickoff call scheduled',
    time_label: '4d ago',
    type: 'meeting',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function assertConfigured(): void {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.',
    );
  }
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export async function fetchStats(): Promise<DashboardStats> {
  assertConfigured();
  const { data, error } = await supabase
    .from('dashboard_stats')
    .select('*')
    .eq('id', 1)
    .single();
  if (error) throw new Error(error.message);
  return data as DashboardStats;
}

export async function updateStats(
  partial: Partial<Omit<DashboardStats, 'id' | 'updated_at'>>,
): Promise<DashboardStats> {
  assertConfigured();
  const { data, error } = await supabase
    .from('dashboard_stats')
    .update({ ...partial, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as DashboardStats;
}

// ─── Projects ─────────────────────────────────────────────────────────────────

export async function fetchProjects(): Promise<DashboardProject[]> {
  assertConfigured();
  const { data, error } = await supabase
    .from('dashboard_projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as DashboardProject[];
}

export async function createProject(
  p: Omit<DashboardProject, 'id' | 'created_at'>,
): Promise<DashboardProject> {
  assertConfigured();
  const { data, error } = await supabase
    .from('dashboard_projects')
    .insert(p)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as DashboardProject;
}

export async function updateProject(
  id: string,
  p: Partial<Omit<DashboardProject, 'id' | 'created_at'>>,
): Promise<DashboardProject> {
  assertConfigured();
  const { data, error } = await supabase
    .from('dashboard_projects')
    .update(p)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as DashboardProject;
}

export async function deleteProject(id: string): Promise<void> {
  assertConfigured();
  const { error } = await supabase.from('dashboard_projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ─── Activities ───────────────────────────────────────────────────────────────

export async function fetchActivities(): Promise<DashboardActivity[]> {
  assertConfigured();
  const { data, error } = await supabase
    .from('dashboard_activities')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as DashboardActivity[];
}

export async function createActivity(
  a: Omit<DashboardActivity, 'id' | 'created_at'>,
): Promise<DashboardActivity> {
  assertConfigured();
  const { data, error } = await supabase
    .from('dashboard_activities')
    .insert(a)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as DashboardActivity;
}

export async function updateActivity(
  id: string,
  a: Partial<Omit<DashboardActivity, 'id' | 'created_at'>>,
): Promise<DashboardActivity> {
  assertConfigured();
  const { data, error } = await supabase
    .from('dashboard_activities')
    .update(a)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as DashboardActivity;
}

export async function deleteActivity(id: string): Promise<void> {
  assertConfigured();
  const { error } = await supabase.from('dashboard_activities').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
