import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaGlobe } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.logo}>
            <span>Gecko</span> Team
          </Link>
          <p className={styles.description}>
            Cung cấp giải pháp phần mềm quản lý tối ưu hoá cho các cửa hàng, quán cafe, mô hình kinh doanh F&B vừa và nhỏ.
            Chúng tôi giúp bạn tiết kiệm thời gian và nguồn lực.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" aria-label="Facebook"><FaFacebook size={20} /></a>
            <a href="#" aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="#" aria-label="Website"><FaGlobe size={20} /></a>
          </div>
        </div>

        <div className={styles.footerGroup}>
          <h3 className={styles.footerTitle}>Sitemap</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/giai-phap">Giải pháp F&B</Link></li>
            <li><Link href="/ve-chung-toi">Về chúng tôi</Link></li>
            <li><Link href="/thanh-tuu">Thành tựu</Link></li>
          </ul>
        </div>

        <div className={styles.footerGroup}>
          <h3 className={styles.footerTitle}>Giải Pháp</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/giai-phap#pos">Hệ thống POS</Link></li>
            <li><Link href="/giai-phap#hr">Quản lý nhân sự</Link></li>
            <li><Link href="/giai-phap#inventory">Quản lý kho bãi</Link></li>
            <li><Link href="/giai-phap#crm">Chăm sóc khách hàng</Link></li>
          </ul>
        </div>

        <div className={styles.footerGroup}>
          <h3 className={styles.footerTitle}>Liên Hệ</h3>
          <ul className={styles.contactInfo}>
            <li>
              <MapPin size={18} className={styles.icon} />
              <span>Tầng 3, Tòa nhà Innovation, TP. Hồ Chí Minh</span>
            </li>
            <li>
              <Phone size={18} className={styles.icon} />
              <a href="tel:+84123456789">0123 456 789</a>
            </li>
            <li>
              <Mail size={18} className={styles.icon} />
              <a href="mailto:contact@gecko.io.vn">contact@gecko.io.vn</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Gecko Team Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
