import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, isAdmin, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center px-6">
        <div className="max-w-sm w-full p-8 rounded-2xl border border-white/10 bg-charcoal/60 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">Access Denied</h2>
            <p className="text-muted text-sm mt-2">
              This area is restricted to authorised admins only.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => signOut()}
              className="w-full py-2.5 rounded-xl bg-gold text-ink text-sm font-semibold hover:opacity-90 transition"
            >
              Sign Out
            </button>
            <a
              href="/"
              className="text-muted text-sm hover:text-white transition underline underline-offset-4"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
