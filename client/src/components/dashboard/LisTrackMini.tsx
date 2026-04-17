import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FolderKanban, DollarSign, CheckSquare, Activity } from 'lucide-react';
import Reveal from '../ui/Reveal';
import {
  fetchStats,
  fetchProjects,
  fetchActivities,
  DEFAULT_STATS,
  DEFAULT_PROJECTS,
  DEFAULT_ACTIVITIES,
  type DashboardStats,
  type DashboardProject,
  type DashboardActivity,
} from '../../lib/dashboardApi';

// ─── Status → colour mapping ─────────────────────────────────────────────────

const statusColors: Record<DashboardProject['status'], string> = {
  'On Track': 'bg-green-500/10 text-green-400',
  'In Review': 'bg-blue-500/10 text-blue-400',
  Starting: 'bg-orange-500/10 text-orange-400',
  Delayed: 'bg-red-500/10 text-red-400',
  Completed: 'bg-purple-500/10 text-purple-400',
};

const activityColors: Record<string, string> = {
  booking: 'bg-blue-500',
  milestone: 'bg-gold',
  payment: 'bg-green-500',
  publish: 'bg-purple-500',
  lead: 'bg-orange-500',
  meeting: 'bg-pink-500',
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-white/5 ${className}`} />;
}

// ─── KPI Cards ────────────────────────────────────────────────────────────────

interface KpiData {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change: string;
  color: string;
}

function buildKpis(stats: DashboardStats): KpiData[] {
  const tasksPct =
    stats.total_tasks > 0
      ? `${Math.round((stats.tasks_done / stats.total_tasks) * 100)}%`
      : '0%';
  return [
    {
      icon: Users,
      label: 'Active Clients',
      value: String(stats.active_clients),
      change: stats.clients_growth,
      color: 'text-blue-400',
    },
    {
      icon: FolderKanban,
      label: 'Active Projects',
      value: String(stats.active_projects),
      change: stats.projects_growth,
      color: 'text-purple-400',
    },
    {
      icon: DollarSign,
      label: 'Revenue (GHS)',
      value: stats.revenue.toLocaleString('en-GH'),
      change: stats.revenue_growth,
      color: 'text-gold',
    },
    {
      icon: CheckSquare,
      label: 'Tasks Done',
      value: tasksPct,
      change: stats.tasks_growth,
      color: 'text-green-400',
    },
  ];
}

export default function LisTrackMini() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<DashboardProject[] | null>(null);
  const [activities, setActivities] = useState<DashboardActivity[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchStats(), fetchProjects(), fetchActivities()])
      .then(([s, p, a]) => {
        if (cancelled) return;
        setStats(s);
        setProjects(p.length > 0 ? p : DEFAULT_PROJECTS);
        setActivities(a.length > 0 ? a : DEFAULT_ACTIVITIES);
      })
      .catch(() => {
        if (cancelled) return;
        // Silently fall back to defaults
        setStats(DEFAULT_STATS);
        setProjects(DEFAULT_PROJECTS);
        setActivities(DEFAULT_ACTIVITIES);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  const displayStats = stats ?? DEFAULT_STATS;
  const displayProjects = projects ?? DEFAULT_PROJECTS;
  const displayActivities = activities ?? DEFAULT_ACTIVITIES;
  const kpis = buildKpis(displayStats);

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-2xl" />
            ))
          : kpis.map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <Reveal key={kpi.label} delay={i * 0.08}>
                  <div className="p-5 rounded-2xl border border-white/10 bg-charcoal/60">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${kpi.color}`} />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-white">{kpi.value}</p>
                    <p className="text-muted text-xs mt-0.5">{kpi.label}</p>
                    <p className="text-xs text-green-400 mt-2">{kpi.change}</p>
                  </div>
                </Reveal>
              );
            })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <Reveal className="lg:col-span-2">
          <div className="p-6 rounded-2xl border border-white/10 bg-charcoal/60 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold">Active Projects</h3>
              <Activity className="w-4 h-4 text-muted" />
            </div>
            <div className="space-y-5">
              {loading
                ? [...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-14 rounded-xl" />
                  ))
                : displayProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-white text-sm font-medium">{project.name}</p>
                          <p className="text-muted text-xs">{project.client}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              statusColors[project.status] ?? 'bg-white/10 text-muted'
                            }`}
                          >
                            {project.status}
                          </p>
                          {project.due_date && (
                            <p className="text-muted text-xs mt-1">Due {project.due_date}</p>
                          )}
                        </div>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gold rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1 + 0.3, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-muted text-xs mt-1">{project.progress}% complete</p>
                    </motion.div>
                  ))}
            </div>
          </div>
        </Reveal>

        {/* Recent Activity */}
        <Reveal>
          <div className="p-6 rounded-2xl border border-white/10 bg-charcoal/60 h-full">
            <h3 className="text-white font-bold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {loading
                ? [...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-10 rounded-xl" />
                  ))
                : displayActivities.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3"
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          item.type ? (activityColors[item.type] ?? 'bg-muted') : 'bg-muted'
                        }`}
                      />
                      <div>
                        <p className="text-white/80 text-xs leading-snug">{item.text}</p>
                        <p className="text-muted text-xs mt-0.5">{item.time_label}</p>
                      </div>
                    </motion.div>
                  ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
