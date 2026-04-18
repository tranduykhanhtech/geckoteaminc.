"use client";

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, X, Send, User, CheckCircle2, Clock, Eye, Trash2, RefreshCw } from 'lucide-react';
import { sendReplyEmail, deleteContact } from './actions';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import styles from './page.module.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div style={{padding: '1rem', color: 'white'}}>Đang tải bộ soạn thảo siêu cấp...</div> 
});

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  created_at: string;
  status: string;
  reply_content: string | null;
  replied_at: string | null;
  read_at: string | null;
}

export default function AdminTableClient({ contacts }: { contacts: Contact[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'pending' | 'resolved'>('pending');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleRefreshData = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const pendingContacts = contacts.filter(c => !c.status || c.status === 'pending');
  const resolvedContacts = contacts.filter(c => c.status === 'resolved');
  const filteredContacts = activeTab === 'pending' ? pendingContacts : resolvedContacts;

  const openReplyModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsReadOnly(false);
    
    setSubject(`[Gecko Team Inc.] Phản hồi yêu cầu tư vấn - Khách hàng ${contact.name}`);
    setMessage(`<p>Kính gửi anh/chị <strong>${contact.name}</strong>,</p>
                <p>Gecko Team Inc. chân thành cảm ơn anh/chị đã quan tâm đến giải pháp quản lý F&B của chúng tôi.</p>
                <p>Về sự cố/yêu cầu mà anh/chị đã gửi: <br/><i>"${contact.message}"</i></p>
                <p><br/></p>
                <p>[Nhập nội dung tư vấn chi tiết vào đây...]</p>
                <p><br/></p>
                <p>Cần hỗ trợ gấp, xin vui lòng gọi vào Hotline: <strong>0388 494 802</strong>.</p>
                <p>Trân trọng,<br/>Bộ phận hỗ trợ - Gecko Team Inc.</p>`);
  };

  const openViewModal = (contact: Contact) => {
    setSelectedContact(contact);
    setIsReadOnly(true);
    setSubject(`[Lịch sử gửi] Lời giải đáp`);
    setMessage(contact.reply_content || 'Không có nội dung lưu trữ.');
  };

  const closeReplyModal = () => {
    setSelectedContact(null);
  };

  const handleSendEmail = async () => {
    if (!selectedContact || !selectedContact.email) return;

    setIsSending(true);

    const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 30px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #10b981; margin: 0;">Gecko Team Inc.</h2>
          </div>
          <div style="font-size: 15px;">
            ${message}
          </div>
          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0 20px 0;" />
          <div style="font-size: 13px; color: #888888; text-align: center;">
            Đây là email tự động và được gửi từ hệ thống chăm sóc khách hàng của Gecko Team Inc.<br/>
            Website: <a href="https://gecko.io.vn" style="color: #10b981; text-decoration: none;">https://gecko.io.vn</a>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await sendReplyEmail(selectedContact.id, selectedContact.email, subject, htmlMessage);
    
    if (result.success) {
      toast.success('Gửi email thành công!', {
        description: 'Đã chuyển hồ sơ sang luồng Đã Xử Lý.'
      });
      
      router.refresh();

      setTimeout(() => {
        closeReplyModal();
        if (activeTab === 'pending') {
          setActiveTab('resolved');
        }
      }, 1000);
    } else {
      toast.error('Gửi thất bại', { description: result.message });
    }
    
    setIsSending(false);
  };

  const handleDelete = async (contactId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá vĩnh viễn dữ liệu của khách hàng này? Mọi thông tin lịch sử sẽ bị xoá sạch!")) {
      return;
    }
    
    const promise = deleteContact(contactId).then((res: { success: boolean; message?: string }) => {
      if (!res.success) throw new Error(res.message);
      router.refresh();
      return true;
    });

    toast.promise(promise, {
      loading: 'Đang tiến hành xoá dữ liệu...',
      success: 'Hồ sơ đã bị bốc hơi vĩnh viễn!',
      error: (err) => `Không thể xoá: ${err.message}`
    });
  };

  return (
    <>
      <div className={styles.tabsContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'pending' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            <Clock size={16} /> Yêu cầu chờ xử lý ({pendingContacts.length})
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'resolved' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('resolved')}
          >
            <CheckCircle2 size={16} /> Khách đã phản hồi ({resolvedContacts.length})
          </button>
        </div>
        
        <button 
          onClick={handleRefreshData}
          disabled={isPending}
          className={styles.tabBtn}
          style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            opacity: isPending ? 0.5 : 1,
            cursor: isPending ? 'not-allowed' : 'pointer'
          }}
        >
          <RefreshCw size={16} className={isPending ? 'animate-spin' : ''} />
          {isPending ? 'Đang tải...' : 'Làm mới'}
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Thời Gian Gửi</th>
              <th>Tên Khách Hàng</th>
              <th>Liên Hệ</th>
              <th>Nội Dung Yêu Cầu</th>
              <th>{activeTab === 'pending' ? 'Thao Tác' : 'Lịch Sử & Tracking'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <tr key={contact.id} className={activeTab === 'resolved' ? styles.rowResolved : ''}>
                  <td className={styles.timestamp}>
                    {new Date(contact.created_at).toLocaleString('vi-VN')}
                  </td>
                  <td style={{ fontWeight: 500 }}>
                    {contact.name}
                  </td>
                  <td>
                    <div>{contact.phone}</div>
                    <div style={{fontSize: '0.85rem', opacity: 0.8}}>{contact.email || 'Không Email'}</div>
                  </td>
                  <td style={{ maxWidth: '300px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    {contact.message}
                  </td>
                  <td>
                    {activeTab === 'pending' ? (
                      contact.email ? (
                        <button 
                          className={styles.replyBtn} 
                          onClick={() => openReplyModal(contact)}
                        >
                          <Mail size={16} style={{ marginRight: '6px' }} /> Phản hồi
                        </button>
                      ) : (
                        <span className={styles.timestamp}>Thiếu Mail</span>
                      )
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <button 
                            className={styles.viewBtn} 
                            onClick={() => openViewModal(contact)}
                          >
                            <span style={{display: 'flex', alignItems: 'center'}}><Eye size={16} style={{ marginRight: '6px' }} /> Xem Mail</span>
                          </button>

                          <button 
                            className={styles.viewBtn}
                            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '6px 12px' }}
                            onClick={() => handleDelete(contact.id)}
                            title="Xoá vĩnh viễn"
                          >
                            <Trash2 size={16} /> Xoá
                          </button>
                        </div>
                        
                        <span style={{ fontSize: '10px', opacity: 0.7 }}>
                          Gửi lúc: {contact.replied_at ? new Date(contact.replied_at).toLocaleString('vi-VN') : 'N/A'}
                        </span>
                        
                        {contact.read_at && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#10b981', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                            <CheckCircle2 size={14} /> ĐÃ MỞ ĐỌC: {new Date(contact.read_at).toLocaleTimeString('vi-VN')}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  {activeTab === 'pending' 
                    ? 'Tuyệt vời! Bạn không còn yêu cầu nào tồn đọng.' 
                    : 'Chưa có khách hàng nào được giải quyết.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedContact && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={20} color="var(--primary-color)" /> 
                {isReadOnly ? 'Lịch sử Mail của:' : 'Soạn Email:'} <span style={{ color: 'var(--primary-color)' }}>{selectedContact.name}</span>
              </h3>
              <button className={styles.closeBtn} onClick={closeReplyModal}><X size={24} /></button>
            </div>
            
            <div className={styles.modalBody} style={{ padding: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
              <div className={styles.inputGroup}>
                <label className={styles.modalLabel}>Tới Email:</label>
                <input type="text" value={selectedContact.email || ''} readOnly className={`${styles.modalInput} ${styles.readOnly}`} />
              </div>

              {!isReadOnly && (
                <div className={styles.inputGroup}>
                  <label className={styles.modalLabel}>Tiêu đề (Subject):</label>
                  <input 
                    type="text" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                    className={styles.modalInput} 
                  />
                </div>
              )}

              <div className={styles.inputGroup}>
                <label className={styles.modalLabel}>{isReadOnly ? 'Bản xem trước Email đã gửi:' : 'Nội dung Email chính:'}</label>
                {isReadOnly ? (
                  <iframe 
                    srcDoc={message} 
                    className={`${styles.modalTextarea} ${styles.readOnly}`} 
                    title="Email Preview"
                    style={{ background: 'white', borderRadius: 'var(--radius-sm)', minHeight: '350px' }}
                  />
                ) : (
                  <div style={{ background: 'white', color: 'black', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                     <ReactQuill 
                        theme="snow" 
                        value={message} 
                        onChange={setMessage} 
                        style={{ height: '280px', marginBottom: '40px' }}
                     />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button 
                className={styles.cancelBtn} 
                onClick={closeReplyModal}
                disabled={isSending}
              >
                {isReadOnly ? 'Đóng' : 'Hủy bỏ'}
              </button>
              
              {!isReadOnly && (
                <button 
                  className={styles.sendBtn} 
                  onClick={handleSendEmail}
                  disabled={isSending || !message.trim()}
                >
                  {isSending ? 'Đang gửi...' : (
                    <>Gửi Email ngay <Send size={16} style={{ marginLeft: '6px' }} /></>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
