"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, X, Send, User, CheckCircle2, Clock, Eye } from 'lucide-react';
import { sendReplyEmail } from './actions';
import styles from './page.module.css';

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
}

export default function AdminTableClient({ contacts }: { contacts: Contact[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'pending' | 'resolved'>('pending');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', isError: false });
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Filter dữ liệu
  // Mặc định những user chưa có cột status sẽ được coi là pending
  const pendingContacts = contacts.filter(c => !c.status || c.status === 'pending');
  const resolvedContacts = contacts.filter(c => c.status === 'resolved');

  const filteredContacts = activeTab === 'pending' ? pendingContacts : resolvedContacts;

  const openReplyModal = (contact: Contact) => {
    setSelectedContact(contact);
    setStatusMsg({ text: '', isError: false });
    setIsReadOnly(false);
    
    // Mẫu chuẩn
    setSubject(`[Gecko Team Inc.] Phản hồi yêu cầu tư vấn - Khách hàng ${contact.name}`);
    setMessage(`Kính gửi anh/chị ${contact.name},\n\nGecko Team Inc. chân thành cảm ơn anh/chị đã quan tâm đến giải pháp quản lý F&B của chúng tôi.\n\nVề câu hỏi/nỗi đau mà anh/chị đã gửi:\n"${contact.message}"\n\n[Nhập nội dung tư vấn/khắc phục hỗ trợ vào đây...]\n\nCần hỗ trợ gấp, xin vui lòng gọi vào Hotline: 0388 494 802.\n\nTrân trọng,\nBộ phận hỗ trợ - Gecko Team Inc.`);
  };

  const openViewModal = (contact: Contact) => {
    setSelectedContact(contact);
    setStatusMsg({ text: '', isError: false });
    setIsReadOnly(true);
    setSubject(`[Lịch sử gửi] Phản hồi Email`);
    setMessage(contact.reply_content || 'Không có nội dung lưu trữ.');
  };

  const closeReplyModal = () => {
    setSelectedContact(null);
  };

  const handleSendEmail = async () => {
    if (!selectedContact || !selectedContact.email) return;

    setIsSending(true);
    setStatusMsg({ text: '', isError: false });

    // Đổi xuống HTML format kèm cấu trúc Khung tiêu chuẩn để chống bị Spam (Google/Yahoo)
    const formattedText = message.replace(/\n/g, '<br />');
    
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
            ${formattedText}
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
      setStatusMsg({ text: ' Gửi thành công! Hồ sơ đã được chuyển hóa án sang phần "Đã xử lý".', isError: false });
      
      // Update local UI
      router.refresh();

      setTimeout(() => {
        closeReplyModal();
        if (activeTab === 'pending') {
          setActiveTab('resolved');
        }
      }, 2000);
    } else {
      setStatusMsg({ text: result.message, isError: true });
    }
    
    setIsSending(false);
  };

  return (
    <>
      <div className={styles.tabsContainer}>
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

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Thời Gian Gửi form</th>
              <th>Tên Khách Hàng</th>
              <th>Số Điện Thoại</th>
              <th>Email</th>
              <th>Nội Dung Yêu Cầu</th>
              <th>{activeTab === 'pending' ? 'Thao Tác' : 'Lịch Sử'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <tr key={contact.id} className={activeTab === 'resolved' ? styles.rowResolved : ''}>
                  <td className={styles.timestamp}>
                    {new Date(contact.created_at).toLocaleString('vi-VN')}
                  </td>
                  <td style={{ fontWeight: 500 }}>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email || '-'}</td>
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
                        <span className={styles.timestamp}>Không có Mail</span>
                      )
                    ) : (
                      <button 
                        className={styles.viewBtn} 
                        onClick={() => openViewModal(contact)}
                      >
                        <Eye size={16} style={{ marginRight: '6px' }} /> Xem lại Mail
                        <br/>
                        <span style={{ fontSize: '10px', opacity: 0.7 }}>
                          vào {contact.replied_at ? new Date(contact.replied_at).toLocaleString('vi-VN') : 'N/A'}
                        </span>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  {activeTab === 'pending' 
                    ? 'Tuyệt vời! Bạn không còn yêu cầu nào tồn đọng.' 
                    : 'Chưa có khách hàng nào được giải quyết.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Popup */}
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
            
            <div className={styles.modalBody}>
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
                    style={{ background: 'white', borderRadius: 'var(--radius-sm)' }}
                  />
                ) : (
                  <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className={styles.modalTextarea} 
                  />
                )}
              </div>

              {statusMsg.text && (
                <div className={`${styles.statusMsg} ${statusMsg.isError ? styles.errorMsg : styles.successMsg}`}>
                  {statusMsg.text}
                </div>
              )}
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
