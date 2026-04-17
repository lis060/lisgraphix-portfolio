import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { postBooking } from '../../lib/api';
import Button from '../ui/Button';

const services = [
  'Web Design & Development',
  'E-commerce Development',
  'Graphic Design',
  'Software Development',
  'Social Media & Automation',
  'Other / Not Sure Yet',
];

const budgets = [
  'Under GHS 2,500',
  'GHS 2,500 – 5,000',
  'GHS 5,000 – 9,500',
  'GHS 9,500 – 20,000',
  'Over GHS 20,000',
  'Let\'s discuss',
];

const planServiceMap: Record<string, string> = {
  starter: 'Web Design & Development',
  business: 'Web Design & Development',
  premium: 'E-commerce Development',
};

const planBudgetMap: Record<string, string> = {
  starter: 'GHS 2,500 – 5,000',
  business: 'GHS 5,000 – 9,500',
  premium: 'GHS 9,500 – 20,000',
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  preferredDate: string;
  notes: string;
}

const initial: FormData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  preferredDate: '',
  notes: '',
};

export default function BookingForm() {
  const [params] = useSearchParams();
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const plan = params.get('plan') || '';
    setForm((prev) => ({
      ...prev,
      service: planServiceMap[plan] || prev.service,
      budget: planBudgetMap[plan] || prev.budget,
    }));
  }, [params]);

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.service) e.service = 'Please select a service';
    if (!form.budget) e.budget = 'Please select a budget range';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      await postBooking(form);
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

  if (status === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-gold" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Booking Request Sent!</h3>
        <p className="text-muted max-w-sm mx-auto">
          Thank you! We'll review your project details and reach out within 24 hours to schedule your consultation.
        </p>
        <Button onClick={() => setStatus('idle')} variant="outline" className="mt-8">
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Full Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="Kofi Mensah"
            className={fieldClass('name')}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handle}
            placeholder="kofi@example.com"
            className={fieldClass('email')}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Phone / WhatsApp *</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handle}
          placeholder="+233 XX XXX XXXX"
          className={fieldClass('phone')}
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Service Needed *</label>
          <select name="service" value={form.service} onChange={handle} className={fieldClass('service')}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Budget Range *</label>
          <select name="budget" value={form.budget} onChange={handle} className={fieldClass('budget')}>
            <option value="">Select budget</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Preferred Start Date</label>
        <input
          type="date"
          name="preferredDate"
          value={form.preferredDate}
          onChange={handle}
          className={fieldClass('preferredDate')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Project Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handle}
          rows={4}
          placeholder="Tell me about your business, what you need, and any relevant details..."
          className={`${fieldClass('notes')} resize-none`}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={status === 'loading'}
        className="w-full"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Sending Request...
          </>
        ) : (
          'Send Booking Request'
        )}
      </Button>
    </form>
  );
}
