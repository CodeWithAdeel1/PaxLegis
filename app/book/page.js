import { SERVICES } from '../../lib/site';
import ConsultationForm from '../../components/ConsultationForm';
import { Clock3, Globe2, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Book a Legal Consultation',
  description: 'Request a legal consultation with PaxLegis about family, criminal, civil or other matters in Pakistan. Remote consultations may be available.',
  alternates: { canonical: '/book' },
  openGraph: {
    title: 'Book a Legal Consultation | PaxLegis',
    description: 'Request a legal consultation with PaxLegis about a matter in Pakistan.',
    url: '/book',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'PaxLegis Advocates & Legal Consultants' }],
  },
  twitter: { card: 'summary_large_image', title: 'Book a Legal Consultation | PaxLegis', description: 'Request a legal consultation about a matter in Pakistan.', images: ['/opengraph-image'] },
};

export default function Book() {
  const options = [...SERVICES.map((s) => s.area), 'Other'];
  return (
    <section className="section booking-section">
      <div className="wrap booking-layout">
        <div className="booking-copy">
          <p className="eyebrow">A first step towards clarity</p>
          <h1>Book an online consultation</h1>
          <p className="booking-intro">Tell us a little about your matter. The office will contact you using the details you provide to discuss availability and next steps.</p>
          <ul className="booking-reassurance">
            <li><ShieldCheck aria-hidden="true" /><span><strong>Confidential conversation</strong><small>Your initial details are handled with care.</small></span></li>
            <li><Clock3 aria-hidden="true" /><span><strong>We’ll be in touch</strong><small>Our office will contact you about availability and next steps.</small></span></li>
            <li><Globe2 aria-hidden="true" /><span><strong>Overseas friendly</strong><small>Remote consultations may be available for Pakistanis abroad.</small></span></li>
          </ul>
          <p className="booking-privacy">Please do not include highly sensitive information in this first form. You can discuss how to share documents securely after we contact you.</p>
        </div>
        <div className="panel booking-panel"><ConsultationForm services={options} /></div>
      </div>
    </section>
  );
}
