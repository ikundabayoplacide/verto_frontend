import { useState } from 'react';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

const SERVICE_OPTIONS = [
  { value: '',                    label: 'Select a service' },
  { value: 'construction',        label: 'Construction' },
  { value: 'renovation',          label: 'Renovation' },
  { value: 'project-management',  label: 'Project Management' },
  { value: 'consultation',        label: 'Consultation' },
  { value: 'other',               label: 'Other' },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', service: '', message: '',
  });
  const [errors,  setErrors]  = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim())    e.name    = 'Full name is required.';
    if (!form.email.trim())   e.email   = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.service)        e.service = 'Please select a service.';
    if (!form.message.trim()) e.message = 'Message is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    /* Replace with real API call */
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="bg-primary-800 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        {/* Info side */}
        <div className="flex flex-col gap-8" data-reveal="left">
          <div>
            <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest">
              Get In Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-100 mt-2 leading-tight">
              Let's Discuss Your{" "}
              <span className="text-primary-400">Next Project</span>
            </h2>
            <p className="text-secondary-400 mt-4 leading-relaxed">
              Have a project in mind? Fill in the form and our team will get
              back to you within 24 hours with a personalised response.
            </p>
          </div>

          {/* Contact details */}
          <ul className="flex flex-col gap-5" role="list">
            {[
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                ),
                label: "Phone",
                value: "+250782170000",
                href: "tel:+250782170000",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                ),
                label: "Email",
                value: "info@handmgroup.co.ke",
                href: "mailto:info@handmgroup.co.ke",
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                ),
                label: "Office",
                value: "Kigali, Rwanda",
                href: undefined,
              },
              {
                icon: (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                label: "Working Hours",
                value: "Mon – Fri, 8 AM – 6 PM",
                href: undefined,
              },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-4">
                <span className="shrink-0 w-10 h-10 rounded-xl bg-primary-700 flex items-center justify-center text-primary-300">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs text-secondary-500 font-medium">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-secondary-200 hover:text-primary-300 transition-colors duration-150"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-secondary-200">{item.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form side */}
        <div
          className="bg-primary-800 rounded-2xl border border-primary-700 p-6 md:p-8"
          data-reveal="right"
        >
          {success && (
            <Alert
              type="success"
              title="Message sent!"
              message="Thank you for reaching out. We'll get back to you within 24 hours."
              dismissible
              onDismiss={() => setSuccess(false)}
              className="mb-6"
            />
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange("name")}
                error={errors.name}
                fullWidth
                required
                autoComplete="name"
              />
              <Input
                label="Phone Number"
                placeholder="+254 700 000 000"
                value={form.phone}
                onChange={handleChange("phone")}
                error={errors.phone}
                fullWidth
                type="tel"
                autoComplete="tel"
              />
            </div>

            <Input
              label="Email Address"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange("email")}
              error={errors.email}
              fullWidth
              required
              type="email"
              autoComplete="email"
            />

            <Select
              label="Service of Interest"
              options={SERVICE_OPTIONS}
              value={form.service}
              onChange={handleChange("service")}
              error={errors.service}
              fullWidth
            />

            <Textarea
              label="Message"
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={handleChange("message")}
              error={errors.message}
              fullWidth
              rows={5}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
