import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Save, Trash2, Plus, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/admin/ProtectedRoute';
import PageTransition from '../components/layout/PageTransition';
import {
  fetchStats,
  updateStats,
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  DEFAULT_STATS,
  DEFAULT_PROJECTS,
  DEFAULT_ACTIVITIES,
  type DashboardStats,
  type DashboardProject,
  type DashboardActivity,
} from '../lib/dashboardApi';

// ─── Toast ────────────────────────────────────────────────────────────────────

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl text-sm font-medium shadow-lg pointer-events-auto transition-all ${
            t.type === 'success'
              ? 'bg-green-500/20 border border-green-500/30 text-green-300'
              : 'bg-red-500/20 border border-red-500/30 text-red-300'
          }`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

// ─── Project Status Options ───────────────────────────────────────────────────

const STATUS_OPTIONS: DashboardProject['status'][] = [
  'On Track',
  'In Review',
  'Starting',
  'Delayed',
  'Completed',
];

// ─── Stats Tab ────────────────────────────────────────────────────────────────

function StatsTab({ addToast }: { addToast: (msg: string, type: 'success' | 'error') => void }) {
  const [stats, setStats] = useState<DashboardStats>(DEFAULT_STATS);
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((err: Error) => setLoadError(err.message))
      .finally(() => setLoadingData(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateStats({
        active_clients: stats.active_clients,
        active_projects: stats.active_projects,
        revenue: stats.revenue,
        tasks_done: stats.tasks_done,
        total_tasks: stats.total_tasks,
        clients_growth: stats.clients_growth,
        projects_growth: stats.projects_growth,
        revenue_growth: stats.revenue_growth,
        tasks_growth: stats.tasks_growth,
      });
      setStats(updated);
      addToast('Stats saved successfully!', 'success');
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to save stats', 'error');
    } finally {
      setSaving(false);
    }
  };

  const setField = <K extends keyof DashboardStats>(key: K, value: DashboardStats[K]) => {
    setStats((prev) => ({ ...prev, [key]: value }));
  };

  if (loadingData) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
        {loadError}
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Numeric fields */}
        {(
          [
            { key: 'active_clients', label: 'Active Clients' },
            { key: 'active_projects', label: 'Active Projects' },
            { key: 'revenue', label: 'Revenue (GHS)' },
            { key: 'tasks_done', label: 'Tasks Done' },
            { key: 'total_tasks', label: 'Total Tasks' },
          ] as { key: keyof DashboardStats; label: string }[]
        ).map(({ key, label }) => (
          <div key={key} className="space-y-1.5">
            <label className="text-xs text-muted font-medium uppercase tracking-wider">
              {label}
            </label>
            <input
              type="number"
              min={0}
              value={stats[key] as number}
              onChange={(e) => setField(key, Number(e.target.value) as DashboardStats[typeof key])}
              className="w-full px-4 py-3 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition"
            />
          </div>
        ))}
      </div>

      {/* Growth strings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(
          [
            { key: 'clients_growth', label: 'Clients Growth Text' },
            { key: 'projects_growth', label: 'Projects Growth Text' },
            { key: 'revenue_growth', label: 'Revenue Growth Text' },
            { key: 'tasks_growth', label: 'Tasks Growth Text' },
          ] as { key: keyof DashboardStats; label: string }[]
        ).map(({ key, label }) => (
          <div key={key} className="space-y-1.5">
            <label className="text-xs text-muted font-medium uppercase tracking-wider">
              {label}
            </label>
            <input
              type="text"
              value={stats[key] as string}
              onChange={(e) => setField(key, e.target.value as DashboardStats[typeof key])}
              className="w-full px-4 py-3 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink text-sm font-bold hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60"
      >
        <Save className="w-4 h-4" />
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  );
}

// ─── Projects Tab ─────────────────────────────────────────────────────────────

type NewProject = Omit<DashboardProject, 'id' | 'created_at'>;

const BLANK_PROJECT: NewProject = {
  name: '',
  client: '',
  status: 'On Track',
  due_date: null,
  progress: 0,
  notes: '',
  sort_order: 0,
};

function ProjectsTab({
  addToast,
}: {
  addToast: (msg: string, type: 'success' | 'error') => void;
}) {
  const [projects, setProjects] = useState<DashboardProject[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showNewRow, setShowNewRow] = useState(false);
  const [newProject, setNewProject] = useState<NewProject>(BLANK_PROJECT);
  const [addingSaving, setAddingSaving] = useState(false);

  const load = useCallback(() => {
    setLoadingData(true);
    fetchProjects()
      .then(setProjects)
      .catch((err: Error) => setLoadError(err.message))
      .finally(() => setLoadingData(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const setProjectField = (
    id: string,
    key: keyof DashboardProject,
    value: DashboardProject[typeof key],
  ) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: value } : p)),
    );
  };

  const handleSave = async (project: DashboardProject) => {
    setSavingId(project.id);
    try {
      await updateProject(project.id, {
        name: project.name,
        client: project.client,
        status: project.status,
        due_date: project.due_date,
        progress: project.progress,
        notes: project.notes,
        sort_order: project.sort_order,
      });
      addToast('Project saved!', 'success');
      load();
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to save project', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setDeletingId(id);
    try {
      await deleteProject(id);
      addToast('Project deleted.', 'success');
      load();
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to delete project', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingSaving(true);
    try {
      await createProject(newProject);
      addToast('Project added!', 'success');
      setNewProject(BLANK_PROJECT);
      setShowNewRow(false);
      load();
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to add project', 'error');
    } finally {
      setAddingSaving(false);
    }
  };

  if (loadingData) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
        {loadError}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add button */}
      {!showNewRow && (
        <button
          onClick={() => setShowNewRow(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-ink text-sm font-bold hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      )}

      {/* New project row */}
      {showNewRow && (
        <form
          onSubmit={handleAdd}
          className="p-5 rounded-2xl border border-gold/30 bg-charcoal/60 space-y-4"
        >
          <p className="text-gold text-xs font-semibold uppercase tracking-wider">New Project</p>
          <ProjectFields
            data={newProject}
            onChange={(key, val) =>
              setNewProject((prev) => ({ ...prev, [key]: val }))
            }
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={addingSaving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-ink text-sm font-bold hover:opacity-90 transition disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {addingSaving ? 'Adding…' : 'Add Project'}
            </button>
            <button
              type="button"
              onClick={() => { setShowNewRow(false); setNewProject(BLANK_PROJECT); }}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-muted text-sm hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Existing projects */}
      {projects.length === 0 && !showNewRow && (
        <p className="text-muted text-sm">No projects yet. Add one above.</p>
      )}
      {projects.map((project) => (
        <div
          key={project.id}
          className="p-5 rounded-2xl border border-white/10 bg-charcoal/60 space-y-4"
        >
          <ProjectFields
            data={project}
            onChange={(key, val) => setProjectField(project.id, key as keyof DashboardProject, val)}
          />
          <div className="flex gap-3">
            <button
              onClick={() => handleSave(project)}
              disabled={savingId === project.id}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold text-ink text-sm font-bold hover:opacity-90 transition disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              {savingId === project.id ? 'Saving…' : 'Save'}
            </button>
            <button
              onClick={() => handleDelete(project.id)}
              disabled={deletingId === project.id}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition disabled:opacity-60"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {deletingId === project.id ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Shared field group for project form
type ProjectFieldData = Omit<DashboardProject, 'id' | 'created_at'> & { id?: string };
function ProjectFields({
  data,
  onChange,
}: {
  data: ProjectFieldData;
  onChange: (key: string, value: string | number | null) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-1.5">
        <label className="text-xs text-muted uppercase tracking-wider">Project Name *</label>
        <input
          required
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-muted uppercase tracking-wider">Client</label>
        <input
          value={data.client}
          onChange={(e) => onChange('client', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-muted uppercase tracking-wider">Status</label>
        <select
          value={data.status}
          onChange={(e) => onChange('status', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-muted uppercase tracking-wider">Due Date</label>
        <input
          type="text"
          value={data.due_date ?? ''}
          onChange={(e) => onChange('due_date', e.target.value || null)}
          placeholder="e.g. Apr 22"
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-muted uppercase tracking-wider">Progress (0–100)</label>
        <input
          type="number"
          min={0}
          max={100}
          value={data.progress}
          onChange={(e) => onChange('progress', Number(e.target.value))}
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-muted uppercase tracking-wider">Sort Order</label>
        <input
          type="number"
          value={data.sort_order ?? 0}
          onChange={(e) => onChange('sort_order', Number(e.target.value))}
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
      <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
        <label className="text-xs text-muted uppercase tracking-wider">Notes</label>
        <input
          type="text"
          value={data.notes ?? ''}
          onChange={(e) => onChange('notes', e.target.value || null)}
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
    </div>
  );
}

// ─── Activities Tab ───────────────────────────────────────────────────────────

type NewActivity = Omit<DashboardActivity, 'id' | 'created_at'>;
const BLANK_ACTIVITY: NewActivity = { text: '', time_label: '', type: '', sort_order: 0 };

function ActivitiesTab({
  addToast,
}: {
  addToast: (msg: string, type: 'success' | 'error') => void;
}) {
  const [activities, setActivities] = useState<DashboardActivity[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showNewRow, setShowNewRow] = useState(false);
  const [newActivity, setNewActivity] = useState<NewActivity>(BLANK_ACTIVITY);
  const [addingSaving, setAddingSaving] = useState(false);

  const load = useCallback(() => {
    setLoadingData(true);
    fetchActivities()
      .then(setActivities)
      .catch((err: Error) => setLoadError(err.message))
      .finally(() => setLoadingData(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const setActivityField = (
    id: string,
    key: keyof DashboardActivity,
    value: DashboardActivity[typeof key],
  ) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [key]: value } : a)),
    );
  };

  const handleSave = async (activity: DashboardActivity) => {
    setSavingId(activity.id);
    try {
      await updateActivity(activity.id, {
        text: activity.text,
        time_label: activity.time_label,
        type: activity.type,
        sort_order: activity.sort_order,
      });
      addToast('Activity saved!', 'success');
      load();
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to save activity', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this activity?')) return;
    setDeletingId(id);
    try {
      await deleteActivity(id);
      addToast('Activity deleted.', 'success');
      load();
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to delete activity', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingSaving(true);
    try {
      await createActivity(newActivity);
      addToast('Activity added!', 'success');
      setNewActivity(BLANK_ACTIVITY);
      setShowNewRow(false);
      load();
    } catch (err: unknown) {
      addToast(err instanceof Error ? err.message : 'Failed to add activity', 'error');
    } finally {
      setAddingSaving(false);
    }
  };

  if (loadingData) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
        {loadError}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!showNewRow && (
        <button
          onClick={() => setShowNewRow(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-ink text-sm font-bold hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Add Activity
        </button>
      )}

      {showNewRow && (
        <form
          onSubmit={handleAdd}
          className="p-5 rounded-2xl border border-gold/30 bg-charcoal/60 space-y-4"
        >
          <p className="text-gold text-xs font-semibold uppercase tracking-wider">New Activity</p>
          <ActivityFields
            data={newActivity}
            onChange={(key, val) =>
              setNewActivity((prev) => ({ ...prev, [key]: val }))
            }
          />
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={addingSaving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-ink text-sm font-bold hover:opacity-90 transition disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {addingSaving ? 'Adding…' : 'Add Activity'}
            </button>
            <button
              type="button"
              onClick={() => { setShowNewRow(false); setNewActivity(BLANK_ACTIVITY); }}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-muted text-sm hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {activities.length === 0 && !showNewRow && (
        <p className="text-muted text-sm">No activities yet. Add one above.</p>
      )}
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="p-5 rounded-2xl border border-white/10 bg-charcoal/60 space-y-4"
        >
          <ActivityFields
            data={activity}
            onChange={(key, val) =>
              setActivityField(activity.id, key as keyof DashboardActivity, val)
            }
          />
          <div className="flex gap-3">
            <button
              onClick={() => handleSave(activity)}
              disabled={savingId === activity.id}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold text-ink text-sm font-bold hover:opacity-90 transition disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              {savingId === activity.id ? 'Saving…' : 'Save'}
            </button>
            <button
              onClick={() => handleDelete(activity.id)}
              disabled={deletingId === activity.id}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition disabled:opacity-60"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {deletingId === activity.id ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

type ActivityFieldData = Omit<DashboardActivity, 'id' | 'created_at'> & { id?: string };
function ActivityFields({
  data,
  onChange,
}: {
  data: ActivityFieldData;
  onChange: (key: string, value: string | number | null) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="space-y-1.5 sm:col-span-2">
        <label className="text-xs text-muted uppercase tracking-wider">Activity Text *</label>
        <input
          required
          value={data.text}
          onChange={(e) => onChange('text', e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-muted uppercase tracking-wider">Time Label *</label>
        <input
          required
          value={data.time_label}
          onChange={(e) => onChange('time_label', e.target.value)}
          placeholder="e.g. 2h ago"
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-muted uppercase tracking-wider">Type</label>
        <input
          value={data.type ?? ''}
          onChange={(e) => onChange('type', e.target.value || null)}
          placeholder="booking, payment…"
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs text-muted uppercase tracking-wider">Sort Order</label>
        <input
          type="number"
          value={data.sort_order ?? 0}
          onChange={(e) => onChange('sort_order', Number(e.target.value))}
          className="w-full px-3 py-2.5 rounded-xl bg-ink/60 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition"
        />
      </div>
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

type Tab = 'stats' | 'projects' | 'activities';

function AdminContent() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('stats');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'stats', label: 'Stats' },
    { key: 'projects', label: 'Projects' },
    { key: 'activities', label: 'Activities' },
  ];

  return (
    <div className="min-h-screen bg-ink">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-charcoal/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Lisgraphix
            </span>
            <span className="w-px h-4 bg-white/10" />
            <span className="text-white text-sm font-bold">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted text-xs hidden sm:block">{user?.email}</span>
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 text-muted text-xs hover:text-white transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Dashboard</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-muted text-xs hover:text-white hover:border-white/20 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="border-b border-white/10 bg-charcoal/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
                  activeTab === key
                    ? 'border-gold text-gold'
                    : 'border-transparent text-muted hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h2 className="text-white text-xl font-bold capitalize">
            {activeTab === 'stats' ? 'Dashboard Stats' : activeTab}
          </h2>
          <p className="text-muted text-sm mt-1">
            {activeTab === 'stats' && 'Edit the KPI numbers displayed on the public dashboard.'}
            {activeTab === 'projects' && 'Manage active project cards shown on the dashboard.'}
            {activeTab === 'activities' && 'Manage the recent activity feed.'}
          </p>
        </div>

        {activeTab === 'stats' && <StatsTab addToast={addToast} />}
        {activeTab === 'projects' && <ProjectsTab addToast={addToast} />}
        {activeTab === 'activities' && <ActivitiesTab addToast={addToast} />}
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  );
}

export default function Admin() {
  return (
    <>
      <Helmet>
        <title>Admin Panel | Lisgraphix</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <ProtectedRoute>
        <PageTransition>
          <AdminContent />
        </PageTransition>
      </ProtectedRoute>
    </>
  );
}
