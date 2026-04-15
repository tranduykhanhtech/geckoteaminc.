"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giải pháp', path: '/giai-phap' },
    { name: 'Về chúng tôi', path: '/ve-chung-toi' },
    { name: 'Thành tựu', path: '/thanh-tuu' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <span>Gecko</span> Team
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} className={styles.navLink}>
              {link.name}
            </Link>
          ))}
          <Link href="/lien-he" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
            Liên hệ tư vấn
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button className={styles.mobileMenuBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          <Link href="/lien-he" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setIsOpen(false)}>
            Liên hệ tư vấn
          </Link>
        </div>
      )}
    </header>
  );
}
