'use client';
import { useState } from 'react';
import { AlertCircle, CheckCircle2, FileUp, Mail, MapPin, MessageSquare, Phone, UserRound, BriefcaseBusiness, Link as LinkIcon, LoaderCircle } from 'lucide-react';

export default function ApplyForm({ job }) {
  const [state, setState] = useState({ status:'idle', error:'' });
  function validateFile(file) { if (!file) return 'Please attach your CV.'; const ok = ['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']; const ext = file.name.toLowerCase().split('.').pop(); if (!['pdf','doc','docx'].includes(ext) || !ok.includes(file.type)) return 'Please attach a PDF, DOC or DOCX CV.'; if (file.size > 2*1024*1024) return 'Your CV must be 2 MB or smaller.'; return ''; }
  async function submit(event) { event.preventDefault(); const form=event.currentTarget; const file=form.elements.cv.files[0]; const fileError=validateFile(file); if(fileError){setState({status:'error',error:fileError});return;} setState({status:'sending',error:''}); try { const res=await fetch('/api/apply',{method:'POST',body:new FormData(form)}); const data=await res.json(); if(!res.ok) throw new Error(data.error || 'We could not submit your application. Please try again.'); setState({status:'success',error:''}); form.reset(); } catch(error) { setState({status:'error',error:error.message || 'We could not submit your application. Please try again.'}); } }
  if(state.status==='success') return <div className="apply-success" role="status"><CheckCircle2 aria-hidden="true" /><h2>Application received</h2><p>Thank you. Your application for {job.title} has been submitted to our office.</p><button type="button" className="btn secondary" onClick={() => setState({status:'idle',error:''})}>Submit another application</button></div>;
  return <form className="apply-form" onSubmit={submit} aria-busy={state.status==='sending'}><input type="hidden" name="jobSlug" value={job.slug} />
    <label><span>Full name</span><span className="field-control"><UserRound aria-hidden="true" /><input name="name" required maxLength={120} autoComplete="name" /></span></label>
    <label><span>Email</span><span className="field-control"><Mail aria-hidden="true" /><input name="email" type="email" required maxLength={160} autoComplete="email" /></span></label>
    <label><span>Phone / WhatsApp</span><span className="field-control"><Phone aria-hidden="true" /><input name="phone" required maxLength={40} autoComplete="tel" /></span></label>
    <label><span>City</span><span className="field-control"><MapPin aria-hidden="true" /><input name="city" required maxLength={80} autoComplete="address-level2" /></span></label>
    <label><span>Years of experience</span><span className="field-control"><BriefcaseBusiness aria-hidden="true" /><select name="experience" required><option value="">Select</option><option>0-1</option><option>1-3</option><option>3-5</option><option>5+</option></select></span></label>
    <label><span>Bar council enrolment/licence status</span><span className="field-control"><BriefcaseBusiness aria-hidden="true" /><select name="licenceStatus" required><option value="">Select</option><option>Licensed advocate</option><option>High Court enrolled</option><option>Pending</option><option>Not yet</option></select></span></label>
    <label><span>Current position/chambers (optional)</span><span className="field-control"><BriefcaseBusiness aria-hidden="true" /><input name="currentPosition" maxLength={160} /></span></label>
    <label><span>LinkedIn URL (optional)</span><span className="field-control"><LinkIcon aria-hidden="true" /><input name="linkedin" type="url" maxLength={300} /></span></label>
    <label className="apply-full"><span>Cover note</span><span className="field-control field-control-textarea"><MessageSquare aria-hidden="true" /><textarea name="coverNote" maxLength={1500} rows={6} /></span></label>
    <label className="apply-full"><span>CV (PDF, DOC or DOCX, maximum 2 MB)</span><span className="field-control"><FileUp aria-hidden="true" /><input name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required /></span></label>
    <label className="apply-consent apply-full"><input type="checkbox" name="consent" required value="yes" /><span>I agree that PaxLegis may store my details to process my application</span></label>
    <input className="apply-honeypot" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className="btn gold apply-full" type="submit" disabled={state.status==='sending'}>{state.status==='sending' ? <LoaderCircle className="form-spinner" aria-hidden="true" /> : <BriefcaseBusiness aria-hidden="true" />}{state.status==='sending' ? 'Submitting application...' : 'Submit application'}</button>
    <div className="apply-full" role="status" aria-live="polite">{state.status==='error' && <p className="msg err"><AlertCircle aria-hidden="true" />{state.error}</p>}</div>
  </form>;
}
