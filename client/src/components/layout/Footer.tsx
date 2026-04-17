import { Link } from 'react-router-dom';
import { Mail, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { site } from '../../data/site';

const explore = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

const serviceLinks = [
  { to: '/services#web-design', label: 'Web Design' },
  { to: '/services#ecommerce', label: 'E-commerce' },
  { to: '/services#graphic-design', label: 'Graphic Design' },
  { to: '/services#software-development', label: 'Software Dev' },
  { to: '/services#social-media-automation', label: 'Automation' },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/5 mt-auto">
      {/* Gold hairline */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-black text-2xl tracking-widest uppercase inline-block mb-4">
              <span className="text-gold">LIS</span>
              <span className="text-white">GRAPHIX</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              {site.tagline}. Premium web design, graphics & software solutions in Accra, Ghana.
            </p>
            <div className="mt-6 flex items-center gap-1.5 text-muted text-sm">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{site.location}</span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Explore</h3>
            <ul className="flex flex-col gap-3">
              {explore.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted text-sm hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Services</h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted text-sm hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Contact</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-muted text-sm hover:text-gold transition-colors group"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  <span>{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted text-sm hover:text-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-gold" />
                  <span>WhatsApp: {site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted text-sm hover:text-gold transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gold" />
                  <span>TikTok @lisgraphix</span>
                </a>
              </li>
            </ul>

            <Link
              to="/booking"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-ink text-sm font-semibold hover:bg-gold/90 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} Lisgraphix. All rights reserved.
          </p>
          <p className="text-muted text-xs">
            Crafted with care in Accra, Ghana 🇬🇭
          </p>
        </div>
      </div>
    </footer>
  );
}
