import './admin.css';

export const metadata = {
  title: { default: 'Admin', template: '%s | PaxLegis Admin' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="admin-shell">{children}</div>;
}
