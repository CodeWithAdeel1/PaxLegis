export default function manifest() {
  return {
    name: 'PaxLegis Advocates & Legal Consultants',
    short_name: 'PaxLegis',
    description: 'Legal guidance in Pakistan and for overseas clients.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f6f3',
    theme_color: '#102f2b',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
