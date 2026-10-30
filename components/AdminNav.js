'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BriefcaseBusiness, ClipboardList, ExternalLink, KeyRound, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';

export default function AdminNav({ username }) {
  const router = useRouter();
  const pathname = usePathname();
  const [error, setError] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function logout() {
    setError('');
    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' });
      if (!response.ok) throw new Error('Could not sign out. Please try again.');
      router.replace('/admin/login');
      router.refresh();
    } catch (logoutError) {
      setError(logoutError.message);
    }
  }

  const navLinks = [
    { href: '/admin', label: 'Dashboard', Icon: LayoutDashboard, active: pathname === '/admin' },
    { href: '/admin#admin-requests', label: 'All Requests', Icon: ClipboardList, active: pathname.startsWith('/admin/requests') },
    { href: '/admin/jobs', label: 'Careers & Jobs', Icon: BriefcaseBusiness, active: pathname.startsWith('/admin/jobs') },
    { href: '/admin/applications', label: 'Job Applications', Icon: BriefcaseBusiness, active: pathname.startsWith('/admin/applications') },
    { href: '/admin/change-password', label: 'Change Password', Icon: KeyRound, active: pathname === '/admin/change-password' },
  ];

  function Navigation({ closeDrawer = false }) {
    return (
      <>
        <Link href="/admin" className="admin-sidebar-brand" onClick={() => closeDrawer && setDrawerOpen(false)}>
          <img src="/logo-light.svg" alt="PaxLegis" />
        </Link>
        <nav className="admin-nav-links" aria-label="Admin navigation">
          {navLinks.map(({ href, label, Icon, active }) => (
            <Link key={label} href={href} className={`admin-nav-link${active ? ' active' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => closeDrawer && setDrawerOpen(false)}>
              <Icon aria-hidden="true" />{label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          {error && <p className="admin-nav-error" role="alert">{error}</p>}
          <Link className="admin-nav-link admin-view-link" href="/" target="_blank" rel="noopener noreferrer" onClick={() => closeDrawer && setDrawerOpen(false)}>
            <ExternalLink aria-hidden="true" />View website
          </Link>
          <div className="admin-identity">
            <span className="admin-avatar" aria-hidden="true">{username.slice(0, 2)}</span>
            <span>Signed in as<br /><strong>{username}</strong></span>
          </div>
          <button type="button" className="admin-logout" onClick={logout}><LogOut aria-hidden="true" size={18} />Log out</button>
        </div>
      </>
    );
  }

  return (
    <>
      <aside className="admin-sidebar"><Navigation /></aside>
      <header className="admin-mobile-header">
        <Link href="/admin" aria-label="PaxLegis admin home"><img src="/logo-light.svg" alt="" /></Link>
        <button type="button" className="admin-menu-button" aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={drawerOpen} onClick={() => setDrawerOpen(!drawerOpen)}>
          {drawerOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>
      {drawerOpen && (
        <>
          <button className="admin-drawer-overlay" type="button" aria-label="Close navigation" onClick={() => setDrawerOpen(false)} />
          <aside className="admin-mobile-drawer" aria-label="Admin navigation"><Navigation closeDrawer /></aside>
        </>
      )}
    </>
  );
}
