'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, Mail, MessageCircle, Phone, Save, Trash2 } from 'lucide-react';

export default function AdminRequestActions({ id, status, notes, phone, whatsappUrl, email }) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentNotes, setCurrentNotes] = useState(notes || '');
  const [toast, setToast] = useState(null);
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!confirmDelete) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'Escape') setConfirmDelete(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmDelete]);

  async function save(data, setSaving, successMessage) {
    setSaving(true);
    setToast(null);
    try {
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not save. Please try again.');
      setToast({ type: 'success', text: successMessage });
      router.refresh();
    } catch (saveError) {
      setToast({ type: 'error', text: saveError.message });
    } finally {
      setSaving(false);
    }
  }

  async function removeRequest() {
    setDeleting(true);
    setToast(null);
    try {
      const response = await fetch(`/api/admin/requests/${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not delete this request.');
      router.replace('/admin?notice=deleted');
      router.refresh();
    } catch (deleteError) {
      setToast({ type: 'error', text: deleteError.message });
      setConfirmDelete(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <aside className="admin-actions">
        <section className="admin-action-card">
          <h2>Contact client</h2>
          <div className="admin-action-buttons">
            {phone && <a className="admin-button primary" href={`tel:${phone}`}><Phone size={18} aria-hidden="true" />Call</a>}
            {whatsappUrl && <a className="admin-button whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />WhatsApp</a>}
            <a className="admin-button secondary" href={`mailto:${email}`}><Mail size={18} aria-hidden="true" />Email</a>
          </div>
        </section>
        <form className="admin-action-card" onSubmit={(event) => { event.preventDefault(); save({ status: currentStatus }, setSavingStatus, 'Status updated.'); }}>
          <label>Status</label>
          <div className="admin-segmented" role="group" aria-label="Request status">
            {['new', 'contacted', 'closed'].map((value) => (
              <button key={value} type="button" aria-pressed={currentStatus === value} onClick={() => setCurrentStatus(value)}>{value}</button>
            ))}
          </div>
          <button className="admin-button primary" type="submit" disabled={savingStatus}><Save size={17} aria-hidden="true" />{savingStatus ? 'Saving...' : 'Save status'}</button>
        </form>
        <form className="admin-action-card" onSubmit={(event) => { event.preventDefault(); save({ notes: currentNotes }, setSavingNotes, 'Notes saved.'); }}>
          <label htmlFor="admin-office-notes">Office notes
            <textarea id="admin-office-notes" value={currentNotes} onChange={(event) => setCurrentNotes(event.target.value)} maxLength={10000} rows={7} placeholder="Add a note for the office team" />
          </label>
          <button className="admin-button primary" type="submit" disabled={savingNotes}><Save size={17} aria-hidden="true" />{savingNotes ? 'Saving...' : 'Save notes'}</button>
        </form>
        <button className="admin-button danger" type="button" onClick={() => setConfirmDelete(true)}><Trash2 size={18} aria-hidden="true" />Delete request</button>
      </aside>
      <div className="sr-only" aria-live="polite" aria-atomic="true">{toast?.text}</div>
      {toast && <div className={`admin-toast${toast.type === 'error' ? ' error' : ''}`} role={toast.type === 'error' ? 'alert' : 'status'}>
        {toast.type === 'error' ? <AlertCircle size={19} aria-hidden="true" /> : <CheckCircle2 size={19} aria-hidden="true" />}{toast.text}
      </div>}
      {confirmDelete && (
        <div className="admin-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmDelete(false); }}>
          <section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-delete-title" aria-describedby="admin-delete-description">
            <h2 id="admin-delete-title">Delete this request?</h2>
            <p id="admin-delete-description">This action cannot be undone. The consultation request will be permanently removed.</p>
            <div className="admin-modal-actions">
              <button className="admin-button secondary" type="button" onClick={() => setConfirmDelete(false)} disabled={deleting}>Cancel</button>
              <button className="admin-button danger" type="button" onClick={removeRequest} disabled={deleting}><Trash2 size={17} aria-hidden="true" />{deleting ? 'Deleting...' : 'Delete request'}</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
