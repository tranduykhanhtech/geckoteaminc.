import { Metadata } from 'next';
import { Target, Heart, Lightbulb, ShieldCheck } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi',
  description: 'Câu chuyện hình thành và phát triển của Gecko Team Inc. Sứ mệnh của chúng tôi là đồng hành cùng sự phát triển của các doanh nghiệp F&B.',
  alternates: {
    canonical: 'https://gecko.io.vn/ve-chung-toi',
  }
};

export default function AboutUs() {
  return (
    <main>
      <section className={styles.header}>
        <div className="container">
          <AnimatedSection>
            <h1 className={styles.title}>Câu Chuyện <span className="text-gradient">Gecko Team</span></h1>
            <p className={styles.subtitle}>
              Từ những người thấu hiểu nỗi vất vả trong ngành F&B đến đội ngũ kiến tạo công nghệ thay đổi tương lai quản lý.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="container section">
        <div className={styles.storyGrid}>
          <AnimatedSection className={styles.storyContent}>
            <h2>Khởi nguồn từ sự thấu hiểu</h2>
            <p>
              Gecko Team Inc. được thành lập vào năm 2024 bởi một nhóm các kỹ sư phần mềm trẻ năng động và có nhiều kinh nghiệm trong thị trường F&B.
            </p>
            <p>
              Nhận thấy đa phần các cửa hàng vừa và nhỏ hiện đang sử dụng những hệ thống cồng kềnh, chi phí cao hoặc thực hiện mọi thứ thủ công gây lãng phí nhiều thời gian và tiền bạc, chúng tôi quyết tâm xây dựng một hệ thống tối giản nhưng mạnh mẽ.
            </p>
            <p>
              Tên gọi "Gecko" (Tắc kè hoa) tượng trưng cho sự thích nghi nhanh chóng với mọi loại hình kinh doanh F&B, từ xe cafe take-away đến hệ thống nhà hàng sang trọng.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className={styles.storyImage}>
            <div className="text-center text-muted">
              <span className="opacity-50">Hình Ảnh Đội Ngũ Gecko Team Inc.</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className={styles.coreValues}>
        <div className="container">
          <AnimatedSection>
            <h2 className={styles.valuesTitle}>Giá Trị Cốt Lõi</h2>
          </AnimatedSection>

          <div className={styles.valuesGrid}>
            <AnimatedSection delay={0.1} className={`glass-card ${styles.valueCard}`}>
              <div className={styles.valueIcon}><Target size={32} /></div>
              <h3 className={styles.valueTitle}>Tập trung vào hiệu quả</h3>
              <p className={styles.valueDesc}>
                Chúng tôi không làm ra những tính năng thừa thãi rườm rà. Mỗi tính năng trên hệ thống phải giải quyết cụ thể một nỗi đau của nhà bán hàng.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className={`glass-card ${styles.valueCard}`}>
              <div className={styles.valueIcon}><Lightbulb size={32} /></div>
              <h3 className={styles.valueTitle}>Đổi mới không ngừng</h3>
              <p className={styles.valueDesc}>
                Liên tục cập nhật công nghệ và thấu hiểu phản hồi từ phía khách hàng để mang đến phiên bản ứng dụng hoàn hảo nhất mỗi tháng.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3} className={`glass-card ${styles.valueCard}`}>
              <div className={styles.valueIcon}><ShieldCheck size={32} /></div>
              <h3 className={styles.valueTitle}>Bảo mật tối đa</h3>
              <p className={styles.valueDesc}>
                Dữ liệu khách hàng, hóa đơn, doanh thu của bạn là tài sản quý giá nhất. Chúng tôi cam kết bảo vệ tuyệt đối theo chuẩn quốc tế.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className={`glass-card ${styles.valueCard}`}>
              <div className={styles.valueIcon}><Heart size={32} /></div>
              <h3 className={styles.valueTitle}>Tận tâm phục vụ</h3>
              <p className={styles.valueDesc}>
                Bộ phận hỗ trợ kỹ thuật của Gecko Team hoạt động 24/7. Chúng tôi không bỏ rơi khách hàng sau khi bán phần mềm.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
