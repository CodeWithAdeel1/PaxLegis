import { ImageResponse } from 'next/og';

export const alt = 'PaxLegis Advocates & Legal Consultants — Peace through Law';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '76px', background: '#102f2b', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', color: '#e7c982', fontSize: 26, letterSpacing: 4 }}>PAXLEGIS <span style={{ color: '#ffffff', fontSize: 18, letterSpacing: 2 }}>ADVOCATES &amp; LEGAL CONSULTANTS</span></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 64, fontWeight: 700, lineHeight: 1.12, maxWidth: 950 }}><span>Clear legal guidance.</span><span>A steadier way forward.</span></div>
        <div style={{ fontSize: 28, color: '#d5e0dc' }}>Pakistan · Remote consultations for overseas clients</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#e7c982', fontSize: 22 }}>PEACE THROUGH LAW <span style={{ height: 2, width: 120, background: '#b18a42' }} /></div>
    </div>,
    size
  );
}
