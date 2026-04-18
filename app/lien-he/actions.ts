"use server";

import { supabaseAdmin } from '@/lib/supabase-admin';
import { headers } from 'next/headers';

// In-memory Rate Limiter (Thích hợp cho VPS/Server vật lý)
interface RateLimitData {
  count: number;
  resetAt: number;
  blockedUntil?: number;
}
const rateLimitMap = new Map<string, RateLimitData>();

export async function submitContact(formData: { name: string, phone: string, email: string, message: string }) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown_ip';
    
    // --- RATE LIMITING LOGIC ---
    const now = Date.now();
    const WINDOW_1M = 60 * 1000;
    const PENALTY_15M = 15 * 60 * 1000;

    let record = rateLimitMap.get(ip);

    if (record) {
      if (record.blockedUntil && record.blockedUntil > now) {
        const remainingMin = Math.ceil((record.blockedUntil - now) / 60000);
        return { success: false, message: `Bạn đang bị chặn do Spam. Vui lòng thử lại sau ${remainingMin} phút nữa.` };
      }

      if (now > record.resetAt) {
        // Hết 1 phút reset số lần đếm
        record = { count: 1, resetAt: now + WINDOW_1M };
      } else {
        record.count += 1;
        if (record.count > 5) {
          // Phạt 15 phút nếu gửi quá 5 lần trong 1 phút hiện hành
          record.blockedUntil = now + PENALTY_15M;
          rateLimitMap.set(ip, record);
          return { success: false, message: 'Hệ thống phát hiện Spam! Bạn bị chặn gửi yêu cầu trong 15 phút.' };
        }
      }
    } else {
      record = { count: 1, resetAt: now + WINDOW_1M };
    }
    
    rateLimitMap.set(ip, record);
    // --- END RATE LIMITING ---

    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('contacts')
        .insert([{
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            created_at: new Date().toISOString()
        }]);
        
      if (error) throw error;
      return { success: true };
    } else {
      return { success: false, message: 'Database không khả dụng.' };
    }
  } catch (err: any) {
    console.error('Submit error:', err);
    return { success: false, message: err.message || 'Lỗi máy chủ nội bộ.' };
  }
}
