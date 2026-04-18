"use client";

import { useState, useRef } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import { submitContact } from './actions';
import styles from './page.module.css';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setStatus('loading');
    setErrorMessage('');

    const result = await submitContact(formData);

    if (result.success) {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } else {
      setStatus('error');
      setErrorMessage(result.message || 'Lỗi truyền tải dữ liệu.');
    }
  };

  return (
    <main>
      <section className={styles.header}>
        <div className="container">
          <AnimatedSection>
            <h1 className={styles.title}>Kết Nối Với <span className="text-gradient">Gecko Team</span></h1>
            <p className={styles.subtitle}>
              Trò chuyện cùng chuyên gia của chúng tôi để tìm ra giải pháp phù hợp nhất cho mô hình kinh doanh của bạn.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="container section">
        <div className={styles.contactContainer}>
          <AnimatedSection className={styles.infoSection}>
            <h2>Thông tin liên hệ</h2>
            <p>
              Gecko Team Inc. luôn sẵn sàng lắng nghe mọi khó khăn trong việc quản lý cửa hàng của bạn.
              Hãy liên hệ qua các kênh dưới đây hoặc điền vào form đăng ký để được tư vấn miễn phí 100%.
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}><MapPin size={24} /></div>
                <div className={styles.infoText}>
                  <h4>Trụ Sở Chính</h4>
                  <p>289, Nguyễn Thái Sơn, Phường An Nhơn, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}><Phone size={24} /></div>
                <div className={styles.infoText}>
                  <h4>Hotline Tư Vấn</h4>
                  <p>0388494802 (Hỗ trợ 24/7)</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}><Mail size={24} /></div>
                <div className={styles.infoText}>
                  <h4>Email</h4>
                  <p>support@gecko.io.vn</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className={`glass-card ${styles.formBox}`}>
            <h3>Gửi yêu cầu tư vấn</h3>
            <p className="mb-4 text-secondary">
              Nhập thông tin bên dưới, đội ngũ Gecko sẽ gọi lại cho bạn trong vòng 30 phút làm việc.
            </p>

            {status === 'success' && (
              <div className={`${styles.statusMessage} ${styles.success}`}>
                🎉 Cảm ơn bạn! Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ sớm nhất.
              </div>
            )}

            {status === 'error' && (
              <div className={`${styles.statusMessage} ${styles.error}`}>
                ⚠️ {errorMessage}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Họ và tên *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={styles.input}
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Số điện thoại *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className={styles.input}
                  placeholder="09xx xxx xxx"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email (Tùy chọn)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Nỗi đau/Vấn đề bạn đang gặp phải *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className={styles.textarea}
                  placeholder="Ví dụ: Tôi tính lương cho 10 nhân viên rất mất thời gian..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`btn btn-primary ${styles.submitBtn}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Đang gửi dữ liệu...' : (
                  <>Gửi Yêu Cầu <Send size={18} style={{ marginLeft: '6px' }} /></>
                )}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
