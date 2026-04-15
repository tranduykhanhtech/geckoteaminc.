import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase-admin';
import styles from './page.module.css';

// Ngăn chặn bot của Google index trang web này
export const metadata: Metadata = {
  title: 'Quản Trị Khách Hàng',
  robots: {
    index: false,
    follow: false,
  }
};

// Chuyển page này thành Dynamic Rendering để luôn fetch dữ liệu mới nhất
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  const hasServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ? true : false;
  
  let contacts: any[] = [];
  
  // Bỏ qua RLS bằng Service Role Key, chỉ fetch nếu đã gắn key thành công
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) contacts = data;
  }

  return (
    <div className={styles.adminContainer}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Danh Sách Yêu Cầu Tư Vấn</h1>
          <div className="text-secondary">
            Tổng cộng: <strong>{contacts?.length || 0}</strong> liên hệ
          </div>
        </header>

        {!hasServiceKey && (
          <div className={styles.alertBox}>
            <strong>CẢNH BÁO BẢO MẬT:</strong> Chưa tìm thấy `SUPABASE_SERVICE_ROLE_KEY` trong file .env.local.<br />
            Bạn không thể đọc dữ liệu khách hàng nếu bị chặn bởi Row Level Security (RLS) trên Supabase. Hãy thêm Service Key để xem được danh sách bên dưới.
          </div>
        )}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Thời Gian</th>
                <th>Tên Khách Hàng</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Nội Dung Yêu Cầu</th>
              </tr>
            </thead>
            <tbody>
              {contacts && contacts.length > 0 ? (
                contacts.map((contact: any) => (
                  <tr key={contact.id}>
                    <td className={styles.timestamp}>
                      {new Date(contact.created_at).toLocaleString('vi-VN')}
                    </td>
                    <td style={{ fontWeight: 500 }}>{contact.name}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.email || '-'}</td>
                    <td style={{ maxWidth: '300px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {contact.message}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.emptyState}>
                    Chưa có khách hàng nào gửi form liên hệ.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
