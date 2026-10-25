'use client';
import { useState } from 'react';

export default function AdminPasswordForm() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setSending(true);
    setMessage('');
    setError('');
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    try {
      const response = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.get('currentPassword'),
          newPassword: form.get('newPassword'),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not change your password.');
      setMessage('Your password has been changed.');
      formElement.reset();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="admin-login-card password-card">
      <form className="admin-form" onSubmit={submit}>
        <label>Current password<input type="password" name="currentPassword" required autoComplete="current-password" maxLength={200} /></label>
        <label>New password<input type="password" name="newPassword" required minLength={10} maxLength={200} autoComplete="new-password" /><small>Use at least 10 characters.</small></label>
        {message && <p className="admin-alert success" role="status">{message}</p>}
        {error && <p className="admin-alert error" role="alert">{error}</p>}
        <button className="admin-button primary" disabled={sending}>{sending ? 'Saving...' : 'Save new password'}</button>
      </form>
    </section>
  );
}
