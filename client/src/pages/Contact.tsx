import { useState } from 'react';
import { Mail, MessageCircle, ExternalLink, MapPin, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import PageTransition from '../components/layout/PageTransition';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import { postContact } from '../lib/api';
import { site } from '../data/site';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

const initial: FormData = { name: '', email: '', subject: '', message: '', website: '' };

export default function Contact() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 20) e.message = 'Please write at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await postContact(form);
      setStatus('success');
      setForm(initial);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const fieldClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl bg-smoke border ${
      errors[field] ? 'border-red-500/70' : 'border-white/10'
    } text-white placeholder:text-muted text-sm focus:outline-none focus:border-gold transition-colors`;

  return (
    <PageTransition>
      <SEO
        title="Contact"
        description="Get in touch with Lisgraphix — WhatsApp, email, or contact form. Based in Accra, Ghana."
        path="/contact"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-ink bg-radial-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold" /> Get In Touch
            </p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6 max-w-3xl">
              Let's start a conversation
            </h1>
            <p className="text-muted text-lg max-w-xl">
              Whether you have a project in mind, a question, or just want to say hello — we'd love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact info */}
          <Reveal className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white mb-6">Contact us directly</h2>

              <div className="space-y-5">
                {/* WhatsApp */}
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-gold/20 bg-gold/5 hover:bg-gold/10 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-bold">WhatsApp</p>
                    <p className="text-muted text-sm">{site.phone}</p>
                    <p className="text-gold text-xs mt-1 group-hover:underline">Chat now →</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-charcoal/60 hover:border-gold/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-muted group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Email</p>
                    <p className="text-muted text-sm">{site.email}</p>
                  </div>
                </a>

                {/* TikTok */}
                <a
                  href={site.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-charcoal/60 hover:border-gold/20 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-6 h-6 text-muted group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <p className="text-white font-bold">TikTok</p>
                    <p className="text-muted text-sm">@lisgraphix</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-charcoal/30">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-muted" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Location</p>
                    <p className="text-muted text-sm">{site.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-charcoal/30">
              <Clock className="w-4 h-4 text-gold flex-shrink-0" />
              <p className="text-muted text-xs">
                Response time: within 24 hours, Monday–Saturday.
              </p>
            </div>
          </Reveal>

          {/* Right: Contact form */}
          <Reveal className="lg:col-span-3">
            <div className="p-8 rounded-2xl border border-white/10 bg-charcoal/60">
              <h2 className="text-white font-bold text-xl mb-6">Send us a message</h2>

              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message received!</h3>
                  <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
                    Thank you for reaching out. We'll reply within 24 hours.
                  </p>
                  <Button onClick={() => setStatus('idle')} variant="outline" size="sm">
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handle}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Full Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handle} placeholder="Kofi Mensah" className={fieldClass('name')} />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handle} placeholder="kofi@example.com" className={fieldClass('email')} />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Subject *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handle} placeholder="What's this about?" className={fieldClass('subject')} />
                    {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Message *</label>
                    <textarea name="message" value={form.message} onChange={handle} rows={5} placeholder="Tell us about your project, question, or idea..." className={`${fieldClass('message')} resize-none`} />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <Button type="submit" variant="primary" size="lg" disabled={status === 'loading'} className="w-full">
                    {status === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </PageTransition>
  );
}
