import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <SEO title="404 — Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <div className="min-h-screen flex items-center justify-center px-6 bg-ink">
        <div className="text-center">
          <p className="text-gold font-black text-[120px] md:text-[200px] leading-none opacity-10 select-none">
            404
          </p>
          <div className="-mt-8 md:-mt-16">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Page not found</h1>
            <p className="text-muted text-lg mb-10 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink font-semibold text-sm hover:bg-gold/90 transition-colors"
              >
                <Home className="w-4 h-4" /> Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/70 font-semibold text-sm hover:border-gold/40 hover:text-gold transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
