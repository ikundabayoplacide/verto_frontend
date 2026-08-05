import { useEffect, useState } from 'react';
import { FiLock, FiSave, FiUser } from 'react-icons/fi';
import { useUpdateMeMutation } from '../../app/api';
import { selectCurrentUser, setCredentials } from '../../app/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Alert } from '../../components/ui/Alert';
import { Button } from '../../components/ui/Button';

const inputClass =
  'w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-sm text-secondary-800 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors';

type Notice = { type: 'success' | 'error'; message: string };

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [updateMe, { isLoading: saving }] = useUpdateMeMutation();

  const [profile, setProfile] = useState({ name: '', email: '' });
  const [passwords, setPasswords] = useState({ password: '', confirm: '' });
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    if (user) setProfile({ name: user.name, email: user.email });
  }, [user]);

  const handleSaveProfile = async () => {
    setNotice(null);
    try {
      const res = await updateMe({ name: profile.name.trim(), email: profile.email.trim() }).unwrap();
      if (user) {
        dispatch(
          setCredentials({
            user: { ...user, ...res.user },
            token: localStorage.getItem('token') ?? '',
          }),
        );
      }
      setNotice({ type: 'success', message: 'Profile updated successfully.' });
    } catch {
      setNotice({ type: 'error', message: 'Failed to update profile. Please try again.' });
    }
  };

  const handleSavePassword = async () => {
    setNotice(null);
    if (passwords.password.length < 8) {
      setNotice({ type: 'error', message: 'Password must be at least 8 characters long.' });
      return;
    }
    if (passwords.password !== passwords.confirm) {
      setNotice({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    try {
      await updateMe({ password: passwords.password }).unwrap();
      setPasswords({ password: '', confirm: '' });
      setNotice({ type: 'success', message: 'Password changed successfully.' });
    } catch {
      setNotice({ type: 'error', message: 'Failed to change password. Please try again.' });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-bold text-secondary-800">My Profile</h1>
        <p className="text-sm text-secondary-400">Manage your account details and password</p>
      </div>

      {notice && (
        <Alert type={notice.type} message={notice.message} dismissible onDismiss={() => setNotice(null)} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* ── Account details ── */}
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <h2 className="text-sm font-bold text-secondary-800 uppercase tracking-wider mb-5">Account Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-secondary-700">Name</label>
              <input
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-secondary-700">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-secondary-700">Role</label>
              <input
                value={user?.role ?? ''}
                readOnly
                disabled
                className={`${inputClass} bg-secondary-50 text-secondary-400 cursor-not-allowed uppercase`}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<FiSave />}
              onClick={handleSaveProfile}
              loading={saving}
            >
              Save Changes
            </Button>
          </div>
        </div>

        {/* ── Change password ── */}
        <div className="bg-white rounded-xl border border-secondary-200 p-6">
          <h2 className="text-sm font-bold text-secondary-800 uppercase tracking-wider mb-5">Change Password</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-secondary-700">New Password</label>
              <input
                type="password"
                value={passwords.password}
                onChange={(e) => setPasswords((p) => ({ ...p, password: e.target.value }))}
                placeholder="Minimum 8 characters"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-secondary-700">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                placeholder="Re-enter new password"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<FiLock />}
              onClick={handleSavePassword}
              loading={saving}
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
