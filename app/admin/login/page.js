'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Eye, EyeOff, LoaderCircle, LockKeyhole, UserRound } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setSending(true);
    setError('');
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.get('username'),
          password: form.get('password'),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not sign in. Please try again.');
      router.replace('/admin');
      router.refresh();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="admin-login">
      <section className="admin-login-brand">
        <img src="/logo-light.svg" alt="PaxLegis" />
        <div className="admin-login-brand-copy">
          <h1>Peace<br />through Law.</h1>
          <p>Welcome to your private office. Manage every client request with care, clarity, and confidence.</p>
        </div>
        <p className="admin-login-brand-footer">PaxLegis Advocates &amp; Legal Consultants</p>
      </section>
      <section className="admin-login-panel">
        <div className="admin-login-card">
          <p className="admin-eyebrow">PaxLegis office</p>
          <h2>Welcome back</h2>
          <p>Sign in to continue to your consultation dashboard.</p>
          <form className="admin-form" onSubmit={submit}>
            <label>Username
              <span className="admin-input-wrap"><UserRound aria-hidden="true" /><input name="username" autoComplete="username" required maxLength={80} autoFocus /></span>
            </label>
            <label>Password
              <span className="admin-input-wrap">
                <LockKeyhole aria-hidden="true" />
                <input name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required maxLength={200} />
                <button className="admin-password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </button>
              </span>
            </label>
            <label className="admin-remember"><input type="checkbox" name="remember" />Remember me</label>
            {error && <p className="admin-alert error" role="alert"><AlertCircle aria-hidden="true" size={19} />{error}</p>}
            <button className="admin-button primary" type="submit" disabled={sending}>
              {sending ? <><LoaderCircle className="admin-spinner" aria-hidden="true" />Signing in...</> : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
