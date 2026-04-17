import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Loader from './components/Loader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';

// Lazy-loaded public pages
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Services = React.lazy(() => import('./pages/Services'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const CaseStudies = React.lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = React.lazy(() => import('./pages/CaseStudyDetail'));
const Pricing = React.lazy(() => import('./pages/Pricing'));
const Resources = React.lazy(() => import('./pages/Resources'));
const Booking = React.lazy(() => import('./pages/Booking'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Contact = React.lazy(() => import('./pages/Contact'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Lazy-loaded admin pages
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const Admin = React.lazy(() => import('./pages/Admin'));

// Lazy-loaded client demos
const EleganceDemo = React.lazy(() => import('./pages/demos/EleganceDemo'));
const LussoDemo = React.lazy(() => import('./pages/demos/LussoDemo'));
const SuitUpDemo = React.lazy(() => import('./pages/demos/SuitUpDemo'));

function AnimatedRoutes() {
  const location = useLocation();
  const isStandalone =
    location.pathname.startsWith('/admin') || location.pathname.startsWith('/demos');

  return (
    <>
      {!isStandalone && <Loader />}
      {!isStandalone && <Navbar />}

      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={null}>
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin routes — no Navbar / Footer / WhatsAppFAB */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />

            {/* Client demo routes — standalone, no Lisgraphix shell */}
            <Route path="/demos/elegance" element={<EleganceDemo />} />
            <Route path="/demos/lusso" element={<LussoDemo />} />
            <Route path="/demos/suitup" element={<SuitUpDemo />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      {!isStandalone && <Footer />}
      {!isStandalone && <WhatsAppFAB />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-ink dark:bg-ink">
            <AnimatedRoutes />
            <Analytics />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
