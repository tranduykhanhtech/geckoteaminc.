import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Clock, Smartphone, Zap } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Trang Chủ',
  description: 'Website chính thức của Gecko Team Inc. Cung cấp các giải pháp quản lý cửa hàng F&B hiện đại, chuyên nghiệp, tối ưu hóa thời gian và nguồn lực.',
  alternates: {
    canonical: 'https://gecko.io.vn',
  }
};

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={`container ${styles.heroContent}`}>
          <AnimatedSection>
            <h1 className={styles.title}>
              Tối Ưu Hoá Quy Trình <br />
              <span className="text-gradient">Giải Phóng Thời Gian</span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <p className={styles.subtitle}>
              Gecko Team Inc. mang đến các giải pháp phần mềm quản lý ưu việt nhất cho cửa hàng F&B, quán cafe và nhà hàng vừa và nhỏ.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4}>
            <div className={styles.ctaGroup}>
              <Link href="/giai-phap" className="btn btn-primary">
                Khám phá giải pháp <ArrowRight size={18} />
              </Link>
              <Link href="/lien-he" className="btn btn-secondary">
                Nhận tư vấn miễn phí
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features Section */}
      <section className={`section ${styles.featuresSection}`}>
        <div className="container">
          <AnimatedSection className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Giải Quyết Nỗi Đau Quản Lý</h2>
            <p className={styles.sectionSubtitle}>
              Chúng tôi hiểu những khó khăn trong việc vận hành một cửa hàng F&B. Dưới đây là cách Gecko Team Inc. giúp bạn.
            </p>
          </AnimatedSection>

          <div className={styles.featuresGrid}>
            <AnimatedSection delay={0.1} className={`glass-card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><Clock size={28} /></div>
              <h3 className={styles.featureTitle}>Tiết Kiệm Thời Gian</h3>
              <p className={styles.featureDesc}>
                Các quy trình thủ công được tự động hóa hoàn toàn. Bạn có thêm 3-5 giờ mỗi tuần để tập trung vào việc phát triển kinh doanh thay vì cắm mặt vào sổ sách.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className={`glass-card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><Smartphone size={28} /></div>
              <h3 className={styles.featureTitle}>Quản Lý Từ Xa 24/7</h3>
              <p className={styles.featureDesc}>
                Nhận thông báo, theo dõi doanh thu và hoạt động của nhân viên trực tiếp trên điện thoại dù bạn không có mặt tại quán.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className={`glass-card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><BarChart3 size={28} /></div>
              <h3 className={styles.featureTitle}>Báo Cáo Trực Quan</h3>
              <p className={styles.featureDesc}>
                Hệ thống Dashboard thông minh, cung cấp biểu đồ chi tiết về doanh thu, tồn kho và hiệu suất làm việc của nhân sự.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className={`glass-card ${styles.featureCard}`}>
              <div className={styles.featureIcon}><Zap size={28} /></div>
              <h3 className={styles.featureTitle}>Triển Khai Siêu Tốc</h3>
              <p className={styles.featureDesc}>
                Chỉ mất chưa đến 15 phút để setup toàn bộ hệ thống POS, HR, CRM cho cửa hàng của bạn với sự hỗ trợ tận tình từ Gecko Team.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`section ${styles.statsSection}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>Được Tin Dùng Bởi</h2>
            <p className={styles.sectionSubtitle}>Chất lượng dịch vụ được bảo chứng bằng những con số thực tế</p>
          </AnimatedSection>
          
          <div className={styles.statsGrid}>
            <AnimatedSection delay={0.1} className={styles.statItem}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Cửa hàng F&B</div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className={styles.statItem}>
              <div className={styles.statNumber}>10k+</div>
              <div className={styles.statLabel}>Giờ được tiết kiệm</div>
            </AnimatedSection>
            <AnimatedSection delay={0.3} className={styles.statItem}>
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statLabel}>Khách hàng hài lòng</div>
            </AnimatedSection>
            <AnimatedSection delay={0.4} className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Hỗ trợ kỹ thuật</div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>Sẵn Sàng Mở Rộng Cùng Gecko?</h2>
            <p className={styles.sectionSubtitle} style={{ marginBottom: "2rem" }}>
              Liên hệ với chúng tôi ngay hôm nay để nhận được bản demo miễn phí giải pháp quản lý cửa hàng.
            </p>
            <Link href="/lien-he" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
              Đăng Ký Tư Vấn Ngay
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
