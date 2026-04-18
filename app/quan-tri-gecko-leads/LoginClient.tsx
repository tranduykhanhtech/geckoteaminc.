"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, UserCircle, Lock, Loader2 } from 'lucide-react';
import { loginAdmin } from './actions';
import styles from './page.module.css';

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    const result = await loginAdmin(email, password);
    
    if (result.success) {
      router.refresh(); // Refresh page to bypass server cookie check and load UI
    } else {
      setErrorMsg(result.message || 'Lỗi mạng, vui lòng thử lại.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.loginIconBox}>
            <ShieldCheck size={40} color="var(--primary-color)" />
          </div>
          <h2>Xác Thực Quản Trị Mạng</h2>
          <p>Yêu cầu quyền hạn để truy cập thông tin Khách hàng Leads</p>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.loginInputGroup}>
            <label><UserCircle size={16} /> Email Quản Trị:</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. admin@gecko.io.vn"
              disabled={isLoading}
              required
            />
          </div>

          <div className={styles.loginInputGroup}>
            <label><Lock size={16} /> Mật Khẩu Truy Cập:</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={isLoading}
              required
            />
          </div>

          {errorMsg && <div className={styles.errorText}>{errorMsg}</div>}

          <button type="submit" className={styles.loginSubmitBtn} disabled={isLoading}>
            {isLoading ? (
              <><Loader2 className={styles.spinIcon} size={18} /> Đang xác thực...</>
            ) : (
              'Cấp Quyền Truy Cập'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
