import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Liên Hệ Tư Vấn',
  description: 'Liên hệ Gecko Team Inc. ngay hôm nay để nhận giải pháp tối ưu cho cửa hàng F&B. Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ 24/7.',
  alternates: {
    canonical: 'https://gecko.io.vn/lien-he',
  }
};

export default function ContactPage() {
  return <ContactContent />;
}
