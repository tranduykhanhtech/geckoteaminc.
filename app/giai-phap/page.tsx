import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MonitorSmartphone, Users, PackageSearch, HeartHandshake } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Giải Pháp Gecko',
  description: 'Trọn bộ giải pháp quản lý F&B từ Gecko Team Inc., bao gồm POS, Quản lý Nhân sự, Kho bãi và Chăm sóc khách hàng CRM.',
  alternates: {
    canonical: 'https://gecko.io.vn/giai-phap',
  }
};

export default function Solutions() {
  const solutions = [
    {
      id: 'pos',
      title: 'Hệ Thống Bán Hàng (POS)',
      tag: 'Cốt lõi',
      desc: 'Phần mềm quản lý bán hàng toàn diện, thao tác nhanh trên mọi thiết bị. Đồng bộ dữ liệu real-time giữa thu ngân, pha chế và quản lý.',
      features: ['Order nhanh chóng chỉ với 3 thao tác', 'Đồng bộ hóa đơn và in bếp tự động', 'Thanh toán QR tĩnh/động', 'Hoạt động offline khi mất mạng'],
      icon: <MonitorSmartphone size={48} />,
      image: '/POS.svg',
      reverse: false
    },
    {
      id: 'hr',
      title: 'Quản Lý Nhân Sự (HR)',
      tag: 'Tối ưu',
      desc: 'Giải pháp chấm công và phân ca làm việc tự động thông minh. Chấm công bằng khuôn mặt (FaceID) hoặc định vị GPS, tính lương chính xác từng phút.',
      features: ['Lên lịch làm việc tự động (Smart Scheduling)', 'Tính lương tự động cuối tháng', 'Đánh giá năng lực nhân viên', 'Quản lý ứng lương và hoa hồng'],
      icon: <Users size={48} />,
      image: '/HR.svg',
      reverse: true
    },
    {
      id: 'inventory',
      title: 'Quản Lý Kho Nguyên Liệu',
      tag: 'Tiết kiệm',
      desc: 'Kiểm soát chặt chẽ thất thoát nguyên vật liệu. Tự động trừ kho theo định mức món ăn ngay khi có phát sinh giao dịch thành công.',
      features: ['Thiết lập định mức hao hụt', 'Cảnh báo tồn kho tối thiểu', 'Quản lý nhà cung cấp và nhập hàng', 'Kiểm kê kho trên điện thoại'],
      icon: <PackageSearch size={48} />,
      image: '/INVENTORY.svg',
      reverse: false
    },
    {
      id: 'crm',
      title: 'Chăm Sóc Khách Hàng (CRM)',
      tag: 'Đột phá',
      desc: 'Giữ chân khách hàng cũ và thu hút khách hàng mới dễ dàng với các chương trình membership, thẻ tích điểm và voucher ưu đãi tự động.',
      features: ['Tự động phân nhóm khách hàng', 'Thiết lập hạng thẻ thành viên', 'Gửi SMS/Zalo chúc mừng sinh nhật', 'Quản lý chiến dịch khuyến mại'],
      icon: <HeartHandshake size={48} />,
      image: '/CRM.svg',
      reverse: true
    }
  ];

  return (
    <main>
      <section className={styles.header}>
        <div className="container">
          <AnimatedSection>
            <h1 className={styles.title}>Hệ Sinh Thái <span className="text-gradient">Giải Pháp</span></h1>
            <p className={styles.subtitle}>
              Lựa chọn từng phần mềm riêng lẻ hoặc trang bị toàn bộ hệ sinh thái Gecko Team Inc. để tạo ra cỗ máy vận hành F&B tự động hoàn chỉnh.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="container section">
        <div className={styles.solutionsGrid}>
          {solutions.map((item, index) => (
            <div key={item.id} id={item.id} className={`${styles.solutionCard} ${item.reverse ? styles.reverse : ''}`}>
              <AnimatedSection delay={0.1} className={styles.imageWrapper}>
                {item.image ? (
                  <img src={item.image} alt={item.title} className={styles.solutionImage} />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    {item.icon}
                    <span>Mô phỏng Giao diện {item.title}</span>
                  </div>
                )}
              </AnimatedSection>

              <AnimatedSection delay={0.2} className={styles.content}>
                <span className={styles.tag}>{item.tag}</span>
                <h2 className={styles.solutionTitle}>{item.title}</h2>
                <p className={styles.solutionDesc}>{item.desc}</p>
                <ul className={styles.featureList}>
                  {item.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={20} className={styles.checkIcon} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://company.gecko.io.vn" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: 'fit-content' }}>
                  Dùng thử ngay <ArrowRight size={18} />
                </a>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
