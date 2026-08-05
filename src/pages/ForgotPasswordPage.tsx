import { useState } from 'react';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '../app/api';
import Logo from '../assets/Logo.png';
import { Spinner } from '../components/ui/Spinner';

export default function ForgotPasswordPage() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      await forgotPassword({ email: email.trim() }).unwrap();
      setSent(true);
    } catch {
      setError('We could not find an account with that email. Please try again.');
    }
  };

  return (
    <div
      className="h-screen w-full overflow-hidden relative flex items-center justify-center p-4 sm:p-6"
      style={{
        backgroundImage: 'url(/images/imigongo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary-900/65 backdrop-blur-[2px]" aria-hidden="true" />

      <Link
        to="/"
        className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white text-primary-900 text-sm font-semibold px-4 py-2 shadow-lg backdrop-blur transition-colors"
      >
        <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
        <Link to="/" className="inline-block mb-6">
          <img src={Logo} alt="Verto Holdings" className="h-9 object-contain" />
        </Link>

        {sent ? (
          <div className="flex flex-col items-center text-center gap-4 py-6">
            <span className="w-14 h-14 rounded-full bg-success-500/15 text-success-500 flex items-center justify-center">
              <FiCheckCircle size={28} />
            </span>
            <h1 className="text-xl font-extrabold text-secondary-900 leading-tight">Check your inbox</h1>
            <p className="text-sm text-secondary-500 leading-relaxed">
              If an account exists for <span className="font-semibold text-secondary-700">{email}</span>,
              we&rsquo;ve sent a password reset link. Follow the link to choose a new password.
            </p>
            <Link
              to="/login"
              className="mt-2 text-sm font-semibold text-primary-500 hover:text-primary-700 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-secondary-400 text-sm mb-0.5">Trouble signing in?</p>
            <h1 className="text-[1.75rem] font-extrabold text-secondary-900 mb-2 leading-tight tracking-tight">
              Reset your password
            </h1>
            <p className="text-sm text-secondary-500 leading-relaxed mb-7">
              Enter the email associated with your account and we&rsquo;ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fp-email"
                  className="text-[11px] font-semibold text-secondary-400 uppercase tracking-wider"
                >
                  Email
                </label>
                <div className="relative flex items-center">
                  <FiMail
                    size={14}
                    className="absolute left-0 bottom-[10px] text-secondary-300 pointer-events-none"
                  />
                  <input
                    id="fp-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="admin@verto.rw"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b-2 border-secondary-200 focus:border-primary-500 outline-none pb-2 pt-1 pl-5 pr-6 text-sm text-secondary-800 placeholder:text-secondary-300 transition-colors bg-transparent"
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="text-xs text-error-500 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-error-500 shrink-0 inline-block" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold text-sm tracking-[0.15em] uppercase transition-colors disabled:opacity-60 shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" color="white" />
                    Sending…
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-secondary-400 mt-6">
              Remembered it?{' '}
              <Link to="/login" className="text-primary-500 font-semibold hover:underline">
                Back to Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
