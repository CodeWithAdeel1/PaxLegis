'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { mailLink, waLink } from '../lib/site';
import { ChevronDown, Mail, Menu, SERVICE_ICONS, WhatsApp, X } from '../lib/icons';

export default function Header({ services }) {
  const pathname = usePathname();
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [mobilePracticeOpen, setMobilePracticeOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const practiceRef = useRef(null);
  const practiceButtonRef = useRef(null);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 0);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    setPracticeOpen(false);
    setDrawerOpen(false);
    setMobilePracticeOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!practiceOpen) return undefined;
    function onPointerDown(event) {
      if (!practiceRef.current?.contains(event.target)) setPracticeOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setPracticeOpen(false);
        practiceButtonRef.current?.focus();
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [practiceOpen]);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector('a, button')?.focus();
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = [...drawerRef.current.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [drawerOpen]);

  function closeDrawer() {
    setDrawerOpen(false);
    setMobilePracticeOpen(false);
  }

  function activeClass(href) {
    const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
    return active ? ' active' : '';
  }

  function serviceLinks(mobile = false) {
    return services.map((service) => (
      <Link key={service.slug} href={`/${service.slug}`} className={`practice-option${activeClass(`/${service.slug}`)}`} onClick={mobile ? closeDrawer : undefined}>
        <span className="practice-option-icon" aria-hidden="true">
          {(() => { const Icon = SERVICE_ICONS[service.icon]; return <Icon size={20} strokeWidth={1.75} aria-hidden="true" />; })()}
        </span>
        <span className="practice-option-copy"><strong>{service.nav}</strong><small>{service.items?.[0]?.[1] || service.desc}</small></span>
      </Link>
    ));
  }

  const waHref = waLink('Hi, I need legal advice.');
  const emailHref = mailLink('Legal consultation request');
  const isPracticeActive = services.some((service) => pathname === `/${service.slug}`);

  return (
    <header className={`top${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap top-inner">
        <Link href="/" className="site-logo" aria-label="PaxLegis home">
          <Image src="/logo.svg" width={330} height={64} priority alt="PaxLegis Advocates & Legal Consultants" />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link className={`nav-link${activeClass('/')}`} href="/" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
          <div className="practice-menu" ref={practiceRef} onMouseEnter={() => setPracticeOpen(true)} onMouseLeave={() => setPracticeOpen(false)}>
            <button ref={practiceButtonRef} className={`nav-link practice-toggle${isPracticeActive ? ' active' : ''}`} type="button" aria-expanded={practiceOpen} aria-haspopup="true" aria-controls="practice-dropdown" onClick={() => setPracticeOpen((open) => !open)}>
              Practice Areas <ChevronDown className="nav-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
            {practiceOpen && <div className="practice-dropdown" id="practice-dropdown">{serviceLinks()}</div>}
          </div>
          <Link className={`nav-link${pathname === '/about' ? ' active' : ''}`} href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>About</Link>
        </nav>

        <div className="desktop-actions">
          <a className="header-email" href={emailHref} aria-label="Email PaxLegis" title="Email us"><Mail size={21} strokeWidth={1.75} aria-hidden="true" /></a>
          <a className="header-whatsapp" href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Contact PaxLegis on WhatsApp"><WhatsApp size={21} aria-hidden="true" /></a>
          <Link className="header-book" href="/book">Book Consultation</Link>
        </div>

        <div className="mobile-actions">
          <a className="header-email" href={emailHref} aria-label="Email PaxLegis" title="Email us"><Mail size={21} strokeWidth={1.75} aria-hidden="true" /></a>
          <a className="header-whatsapp" href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Contact PaxLegis on WhatsApp"><WhatsApp size={21} aria-hidden="true" /></a>
          <button ref={menuButtonRef} className="menu-btn" type="button" aria-expanded={drawerOpen} aria-controls="mobile-navigation" aria-label={drawerOpen ? 'Close menu' : 'Open menu'} onClick={() => setDrawerOpen((open) => !open)}>
            {drawerOpen ? <X size={25} aria-hidden="true" /> : <Menu size={25} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {drawerOpen && (
        <>
          <button className="nav-overlay" type="button" aria-label="Close navigation menu" onClick={closeDrawer} />
          <nav className="mobile-drawer" id="mobile-navigation" ref={drawerRef} aria-label="Mobile navigation">
            <Link className={`drawer-link${activeClass('/')}`} href="/" onClick={closeDrawer}>Home</Link>
            <div className="drawer-practice">
              <button className={`drawer-link drawer-practice-toggle${isPracticeActive ? ' active' : ''}`} type="button" aria-expanded={mobilePracticeOpen} aria-controls="mobile-practice-list" onClick={() => setMobilePracticeOpen((open) => !open)}>
                Practice Areas <ChevronDown className={mobilePracticeOpen ? 'nav-chevron rotated' : 'nav-chevron'} size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
              {mobilePracticeOpen && <div className="mobile-practice-list" id="mobile-practice-list">{serviceLinks(true)}</div>}
            </div>
            <Link className={`drawer-link${pathname === '/about' ? ' active' : ''}`} href="/about" onClick={closeDrawer}>About</Link>
            <div className="drawer-actions">
              <Link className="header-book" href="/book" onClick={closeDrawer}>Book Consultation</Link>
              <a className="drawer-whatsapp" href={waHref} target="_blank" rel="noopener noreferrer" onClick={closeDrawer}><WhatsApp size={21} aria-hidden="true" /> WhatsApp</a>
              <a className="drawer-email" href={emailHref} onClick={closeDrawer}><Mail size={21} strokeWidth={1.75} aria-hidden="true" /> Email us</a>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
