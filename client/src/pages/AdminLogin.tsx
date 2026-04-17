import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';

export default function AdminLogin() {
  const { user, isAdmin, signIn, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Already logged in as admin — go straight to panel
  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [loading, user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Sign in failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Admin Login | Lisgraphix</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-ink flex items-center justify-center px-6 bg-radial-dark">
        <div className="w-full max-w-md">
          {/* Brand header */}
          <div className="text-center mb-10">
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.3em] mb-3">
              Lisgraphix Studio
            </p>
            <h1 className="text-3xl font-black text-white tracking-tight">Admin Panel</h1>
            <p className="text-muted text-sm mt-2">Sign in to manage your dashboard</p>
          </div>

          {/* Card */}
          <div className="p-8 rounded-2xl border border-white/10 bg-charcoal/60 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted font-medium uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lisgraphix17@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-ink/60 border border-white/10 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs text-muted font-medium uppercase tracking-wider">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-ink/60 border border-white/10 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-gold text-ink text-sm font-bold hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-ink border-t-transparent animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Note */}
            <p className="text-center text-muted/60 text-xs mt-6">
              Admin access only — authorised personnel
            </p>
          </div>

          {/* Back link */}
          <p className="text-center mt-6">
            <a
              href="/"
              className="text-muted text-sm hover:text-white transition underline underline-offset-4"
            >
              Back to Lisgraphix
            </a>
          </p>
        </div>
      </div>
    </PageTransition>
  );
}
