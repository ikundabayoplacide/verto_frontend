import { useState } from 'react';
import { FiCheckCircle, FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../app/api';
import Logo from '../assets/Logo.png';
import { Spinner } from '../components/ui/Spinner';

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!token) {
      setError('This reset link is invalid or has expired.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await resetPassword({ token, password }).unwrap();
      setDone(true);
    } catch {
      setError('This reset link is invalid or has expired. Please request a new one.');
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

        {done ? (
          <div className="flex flex-col items-center text-center gap-4 py-6">
            <span className="w-14 h-14 rounded-full bg-success-500/15 text-success-500 flex items-center justify-center">
              <FiCheckCircle size={28} />
            </span>
            <h1 className="text-xl font-extrabold text-secondary-900 leading-tight">Password updated</h1>
            <p className="text-sm text-secondary-500 leading-relaxed">
              Your password has been changed successfully. You can now sign in with your new password.
            </p>
            <Link
              to="/login"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold transition-colors"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-secondary-400 text-sm mb-0.5">Choose a new password</p>
            <h1 className="text-[1.75rem] font-extrabold text-secondary-900 mb-7 leading-tight tracking-tight">
              Reset password
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="rp-pass"
                  className="text-[11px] font-semibold text-secondary-400 uppercase tracking-wider"
                >
                  New Password
                </label>
                <div className="relative flex items-center border-b-2 border-secondary-200 focus-within:border-primary-500 transition-colors">
                  <FiLock
                    size={14}
                    className="absolute left-0 bottom-[10px] text-secondary-300 pointer-events-none"
                  />
                  <input
                    id="rp-pass"
                    type={show ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    placeholder="Minimum 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 pb-2 pt-1 pl-5 pr-6 text-sm text-secondary-800 placeholder:text-secondary-300 outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-0 bottom-[9px] text-secondary-300 hover:text-secondary-500 transition-colors"
                  >
                    {show ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="rp-confirm"
                  className="text-[11px] font-semibold text-secondary-400 uppercase tracking-wider"
                >
                  Confirm New Password
                </label>
                <div className="relative flex items-center border-b-2 border-secondary-200 focus-within:border-primary-500 transition-colors">
                  <FiLock
                    size={14}
                    className="absolute left-0 bottom-[10px] text-secondary-300 pointer-events-none"
                  />
                  <input
                    id="rp-confirm"
                    type={show ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    placeholder="Re-enter new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="flex-1 pb-2 pt-1 pl-5 pr-6 text-sm text-secondary-800 placeholder:text-secondary-300 outline-none bg-transparent"
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
                    Updating…
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>

            <p className="text-center text-xs text-secondary-400 mt-6">
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
