import { useState } from 'react';
import { useSubmitContactMutation } from '../../app/api';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

const SERVICE_OPTIONS = [
  { value: '',                        label: 'Select a service' },
  { value: 'capital-raising',         label: 'Capital Raising' },
  { value: 'business-plan',           label: 'Business Plan Development' },
  { value: 'asset-management',        label: 'Asset Management' },
  { value: 'corporate-finance',       label: 'Corporate Finance' },
  { value: 'private-equity',          label: 'Private Equity' },
  { value: 'esg-sustainable-finance', label: 'ESG & Sustainable Finance' },
  { value: 'capital-market',          label: 'Capital Market Development' },
  { value: 'commodities-trading',     label: 'Commodities Trading' },
  { value: 'other',                   label: 'Other' },
];

interface FormState { name: string; email: string; phone: string; service: string; message: string; }
interface FormErrors { name?: string; email?: string; service?: string; message?: string; }

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submit, { isLoading }] = useSubmitContactMutation();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim())    e.name    = 'Full name is required.';
    if (!form.email.trim())   e.email   = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.service)        e.service = 'Please select a service.';
    if (!form.message.trim()) e.message = 'Message is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await submit({ name: form.name, email: form.email, phone: form.phone, subject: form.service, message: form.message }).unwrap();
      setSuccess(true);
      setServerError('');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch {
      setServerError('Something went wrong. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {success && (
        <Alert
          type="success"
          title="Message sent!"
          message="Thank you for reaching out. We'll get back to you within 24 hours."
          dismissible
          onDismiss={() => setSuccess(false)}
        />
      )}
      {serverError && (
        <Alert type="error" title="Error" message={serverError} dismissible onDismiss={() => setServerError('')} />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Full Name" placeholder="John Doe" value={form.name} onChange={handleChange('name')} error={errors.name} fullWidth required autoComplete="name" />
        <Input label="Phone Number" placeholder="+250 788 359 600" value={form.phone} onChange={handleChange('phone')} fullWidth type="tel" autoComplete="tel" />
      </div>
      <Input label="Email Address" placeholder="you@example.com" value={form.email} onChange={handleChange('email')} error={errors.email} fullWidth required type="email" autoComplete="email" />
      <Select label="Service of Interest" options={SERVICE_OPTIONS} value={form.service} onChange={handleChange('service')} error={errors.service} fullWidth />
      <Textarea label="Message" placeholder="Tell us about your project or inquiry..." value={form.message} onChange={handleChange('message')} error={errors.message} fullWidth rows={5} />
      <Button type="submit" variant="primary" size="lg" fullWidth loading={isLoading}>
        Send Message
      </Button>
    </form>
  );
}
