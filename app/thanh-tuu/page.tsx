import { Metadata } from 'next';
import { Quote } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Thành Tựu',
  description: 'Những con số biết nói và đánh giá từ khách hàng đã ứng dụng giải pháp của Gecko Team Inc. vào vận hành cửa hàng F&B.',
  alternates: {
    canonical: 'https://gecko.io.vn/thanh-tuu',
  }
};

export default function Achievements() {
  const testimonials = [
    {
      id: 1,
      quote: "Từ khi chuyển sang dùng POS của Gecko, nhân viên thu ngân của tôi giảm được 50% thời gian xử lý đơn hàng lúc đông khách. Quán chạy mượt mà hơn hẳn, không còn tình trạng nhầm order.",
      author: "Anh Tuấn",
      role: "Chủ chuỗi Cafe The Locals",
      initial: "T"
    },
    {
      id: 2,
      quote: "Tuyệt vời nhất là hệ thống tự động trừ kho. Tôi quản lý 3 chi nhánh mà chỉ cần mở điện thoại là biết chính xác từng chi nhánh còn bao nhiêu ly nhựa, bao nhiêu kg cafe.",
      author: "Chị Mai",
      role: "Quản lý Bánh Mì Bà Lan",
      initial: "M"
    },
    {
      id: 3,
      quote: "Phần mềm tính lương và ghép ca tự động là vị cứu tinh của mình. Trước đây mất 3 ngày cuối tháng để đối soát, giờ hệ thống Gecko làm xong trong 5 phút.",
      author: "Anh Hoàng",
      role: "Giám đốc vận hành Nhà Hàng Biển Đêm",
      initial: "H"
    }
  ];

  return (
    <main>
      <section className={styles.header}>
        <div className="container">
          <AnimatedSection>
            <h1 className={styles.title}>Dấu Ấn <span className="text-gradient">Thành Tựu</span></h1>
            <p className={styles.subtitle}>
              Sự thành công của khách hàng đo lường giá trị của Gecko Team Inc. Chúng tôi tự hào được đồng hành cùng hàng trăm cửa hàng vươn xa.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className={`container section ${styles.statsSection}`}>
        <div className={styles.statsGrid}>
          <AnimatedSection delay={0.1} className={styles.statCard}>
            <div className={styles.statNumber}>1000+</div>
            <div className={styles.statLabel}>Khách Hàng F&B</div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2} className={styles.statCard}>
            <div className={styles.statNumber}>5</div>
            <div className={styles.statLabel}>Sản Phẩm Cốt Lõi</div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3} className={styles.statCard}>
            <div className={styles.statNumber}>2Tr+</div>
            <div className={styles.statLabel}>Đơn Hàng Đã Xử Lý</div>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.timelineSection}>
        <div className="container">
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>Khách Hàng Nói Về Chúng Tôi</h2>
          </AnimatedSection>

          <div className={styles.testimonialGrid}>
            {testimonials.map((testi, index) => (
              <AnimatedSection key={testi.id} delay={index * 0.1} className={`glass-card ${styles.testimonialCard}`}>
                <Quote size={40} className={styles.quoteIcon} />
                <p className={styles.quoteText}>"{testi.quote}"</p>
                <div className={styles.authorInfo}>
                  <div className={styles.authorAvatar}>{testi.initial}</div>
                  <div className={styles.authorDetails}>
                    <h4>{testi.author}</h4>
                    <p>{testi.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
