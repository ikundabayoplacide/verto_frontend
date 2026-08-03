import { useState } from 'react';
import { FiCheckCircle, FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../app/api';
import { setCredentials } from '../app/authSlice';
import { useAppDispatch } from '../app/hooks';
import Logo from '../assets/Logo.png';
import { Spinner } from '../components/ui/Spinner';

const FEATURES = [
  'Manage services, team members & media in one centralised portal.',
  'Real-time analytics and performance insights across all divisions.',
  'Secure role-based access for administrators and editors.',
];

export default function LoginPage() {
  const navigate   = useNavigate();
  const dispatch   = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm]                 = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [error, setError]               = useState('');

  const handleChange =
    (field: 'email' | 'password') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (error) setError('');
    };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form).unwrap();
      if (rememberMe) localStorage.setItem('rememberMe', 'true');
      dispatch(setCredentials({ user: res.user, token: res.token }));
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    /* Full-screen vivid-blue backdrop — no scroll */
    <div
      className="h-screen w-full overflow-hidden relative flex items-center justify-center p-4 sm:p-6 lg:p-10"
      style={{
        backgroundImage: 'url(/images/imigongo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay so the card pops */}
      <div className="absolute inset-0 bg-primary-900/65 backdrop-blur-[2px]" aria-hidden="true" />

      {/* ── Card shell — never taller than the viewport ── */}
      <div
        className="relative z-10 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex"
        style={{ height: 'min(520px, calc(100vh - 2rem))' }}
      >

        {/* ══════════════════════════════════════════════
            BLUE RIGHT BG — fills the whole card first,
            white panel sits on top (z-10)
        ══════════════════════════════════════════════ */}
        <div className="absolute inset-0 bg-primary-800" aria-hidden="true">
          {/* Decorative circles bottom-right */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary-500/50" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-primary-400/40" />
          {/* Top-right circle */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-700/35" />
        </div>

        {/* ══════════════════════════════════════════════
            WHITE FORM PANEL — left ~50%, z-10
            Shape: left edge straight, right edge curved
            via clip-path using an SVG path-like curve.
            We use a CSS clip-path with a smooth cubic bezier
            expressed as a path() value (Chrome/Edge/FF supported).
        ══════════════════════════════════════════════ */}
        <div
          className="relative z-10 bg-white flex flex-col w-full md:w-1/2 shrink-0 px-8 sm:px-10 py-7 overflow-y-auto"
          style={{
            /*
             * Smooth S-curve on the right edge using many polygon points.
             * Each point is (x%, y%) stepping down the right side.
             * The curve: flush at top → dips inward at 25% height →
             * bulges outward at 50% → dips back at 75% → flush at bottom.
             */
            clipPath: [
              'polygon(',
              '0% 0%,',           // top-left
              '88% 0%,',          // top, near-right
              '92% 3%,',
              '97% 8%,',
              '100% 14%,',        // top-right outer peak
              '98% 20%,',
              '93% 26%,',
              '88% 30%,',         // inward dip
              '84% 65%,',
              '83% 42%,',
              '84% 50%,',         // mid
              '88% 57%,',
              '93% 62%,',
              '97% 67%,',
              '100% 73%,',        // lower outer peak  (mirrors top)
              '98% 79%,',
              '93% 85%,',
              '88% 90%,',
              '92% 95%,',
              '88% 100%,',        // bottom, near-right
              '0% 100%',          // bottom-left
              ')',
            ].join(''),
          }}
        >
          <div className="mb-4">
            <img src={Logo} alt="Verto Holdings" className="h-8 object-contain" />
          </div>

          {/* Heading */}
          <p className="text-secondary-400 text-sm mb-0.5">Welcome to</p>
          <h1 className="text-[1.75rem] font-extrabold text-secondary-900 mb-6 leading-tight tracking-tight">
            Verto Portal
          </h1>

          {/* Form — pr keeps content from touching the wave edge */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 pr-10" noValidate>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lg-email"
                className="text-[11px] font-semibold text-secondary-400 uppercase tracking-wider"
              >
                Username
              </label>
              <div className="relative flex items-center">
                <FiMail
                  size={14}
                  className="absolute left-0 bottom-[10px] text-secondary-300 pointer-events-none"
                />
                <input
                  id="lg-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@verto.rw"
                  value={form.email}
                  onChange={handleChange('email')}
                  className="w-full border-b-2 border-secondary-200 focus:border-primary-500 outline-none pb-2 pt-1 pl-5 pr-6 text-sm text-secondary-800 placeholder:text-secondary-300 transition-colors bg-transparent"
                />
                {form.email && (
                  <FiCheckCircle
                    size={14}
                    className="absolute right-0 bottom-[10px] text-accent-500"
                  />
                )}
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lg-pass"
                className="text-[11px] font-semibold text-secondary-400 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative flex items-center border-b-2 border-secondary-200 focus-within:border-primary-500 transition-colors">
                <FiLock
                  size={14}
                  className="absolute left-0 bottom-[10px] text-secondary-300 pointer-events-none"
                />
                <input
                  id="lg-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={form.password}
                  onChange={handleChange('password')}
                  className="flex-1 pb-2 pt-1 pl-5 pr-6 text-sm text-secondary-800 placeholder:text-secondary-300 outline-none bg-transparent"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-0 bottom-[9px] text-secondary-300 hover:text-secondary-500 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-secondary-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded accent-primary-600 cursor-pointer"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-primary-500 hover:text-primary-700 font-semibold transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="text-xs text-error-500 font-medium flex items-center gap-1.5 -mt-1"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-error-500 shrink-0 inline-block" />
                {error}
              </p>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm tracking-[0.15em] uppercase transition-colors disabled:opacity-60 shadow-md flex items-center justify-center gap-2 mt-1"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" color="white" />
                  Signing in…
                </>
              ) : (
                'Login'
              )}
            </button>

            {/* <p className="text-center text-xs text-secondary-400">
              Don&rsquo;t have an account?{' '}
              <span className="text-primary-500 font-semibold cursor-pointer hover:underline">
                Contact admin
              </span>
            </p> */}
          </form>

          {/* Footer */}
          {/* <div className="pt-4 text-[11px] text-secondary-300 flex gap-2 justify-center items-center">
            {['FAQ', 'Features', 'Support'].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-2">
                <Link
                  to={item === 'Support' ? '/contact' : '/'}
                  className="hover:text-secondary-500 transition-colors"
                >
                  {item}
                </Link>
                {i < arr.length - 1 && <span className="opacity-40">|</span>}
              </span>
            ))}
          </div> */}
        </div>

        {/* ══════════════════════════════════════════════
            RIGHT PANEL CONTENT — text over the blue bg
            Hidden on mobile, shown md+
        ══════════════════════════════════════════════ */}
        <div className="hidden md:flex flex-1 relative z-10 flex-col justify-center pl-16 pr-10 py-12">
          <h2 className="text-xl font-bold text-white mb-3">About Verto</h2>
          <p className="text-primary-100 text-xs leading-relaxed mb-7 max-w-[250px]">
            Verto Holdings is a diversified investment and advisory firm driving sustainable growth
            across Rwanda and East Africa through strategic partnerships and innovation.
          </p>

          <h3 className="text-sm font-bold text-white mb-4">Features</h3>
          <ul className="flex flex-col gap-3.5">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 text-xs text-primary-100 max-w-[230px] leading-relaxed"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-2 h-2 rounded-full bg-accent-400 shrink-0"
                />
                {f}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
