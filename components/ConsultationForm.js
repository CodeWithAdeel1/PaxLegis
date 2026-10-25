'use client';
import { useEffect, useRef, useState } from 'react';
import { AlertCircle, CalendarDays, CheckCircle2, Globe2, Mail, MessageSquare, Phone, Scale, Users, WhatsApp } from '../lib/icons';
import { LoaderCircle } from 'lucide-react';

export default function ConsultationForm({ services, preset }) {
  const [state, setState] = useState({ status: 'idle', error: '' });
  const initialService = useRef(preset || services[0]);
  const [selectedService, setSelectedService] = useState(initialService.current);

  useEffect(() => {
    const requestedService = new URLSearchParams(window.location.search).get('service');
    if (requestedService && services.includes(requestedService)) {
      initialService.current = requestedService;
      setSelectedService(requestedService);
    }
  }, [services]);

  async function onSubmit(e) {
    e.preventDefault();
    setState({ status: 'sending', error: '' });
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong.');
      setState({ status: 'ok', error: '' });
      form.reset();
      setSelectedService(initialService.current);
    } catch (err) {
      setState({ status: 'err', error: err instanceof Error ? err.message : 'We could not send your request. Please try again.' });
    }
  }

  return (
    <form className="f" onSubmit={onSubmit} aria-busy={state.status === 'sending'}>
      <label><span>Full name</span><span className="field-control"><Users size={18} aria-hidden="true" /><input name="name" required maxLength={120} autoComplete="name" /></span></label>
      <label><span>Email</span><span className="field-control"><Mail size={18} aria-hidden="true" /><input name="email" type="email" required maxLength={160} autoComplete="email" /></span></label>
      <label><span>Phone / WhatsApp (with country code)</span><span className="field-control"><Phone size={18} aria-hidden="true" /><input name="phone" type="tel" required maxLength={40} autoComplete="tel" /></span></label>
      <label><span>Country you live in</span><span className="field-control"><Globe2 size={18} aria-hidden="true" /><input name="country" maxLength={80} autoComplete="country-name" /></span></label>
      <label><span>Legal matter</span>
        <span className="field-control"><Scale size={18} aria-hidden="true" /><select name="service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)} required>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select></span>
      </label>
      <label><span>Briefly describe your case</span><span className="field-control field-control-textarea"><MessageSquare size={18} aria-hidden="true" /><textarea name="message" rows={4} maxLength={2000} /></span></label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />
      <button className="btn gold" type="submit" disabled={state.status === 'sending'}>
        {state.status === 'sending' ? <LoaderCircle className="form-spinner" size={19} aria-hidden="true" /> : <CalendarDays size={19} strokeWidth={1.75} aria-hidden="true" />}
        {state.status === 'sending' ? 'Sending...' : 'Request consultation'}
      </button>
      <div role="status" aria-live="polite" aria-atomic="true">
        {state.status === 'ok' && <p className="msg ok"><CheckCircle2 size={25} strokeWidth={1.75} aria-hidden="true" /> Thank you. Your request was received. Our office will contact you soon.</p>}
        {state.status === 'err' && <p className="msg err"><AlertCircle size={19} strokeWidth={1.75} aria-hidden="true" /> {state.error} You can also contact us by <WhatsApp size={17} aria-hidden="true" /> WhatsApp or phone.</p>}
      </div>
    </form>
  );
}
