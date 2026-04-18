"use server";

import nodemailer from 'nodemailer';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { cookies } from 'next/headers';

export async function sendReplyEmail(contactId: string, replyToEmail: string, subject: string, htmlMessage: string) {
  try {
    const user = process.env.LARK_SMTP_USER?.trim();
    const pass = process.env.LARK_SMTP_PASS?.trim();

    if (!user || !pass) {
      return { 
        success: false, 
        message: 'Lỗi cấu hình: Chưa khai báo LARK_SMTP_USER và LARK_SMTP_PASS trong file .env.local' 
      };
    }

    // Khởi tạo kênh kết nối SMTP chuẩn Lark Mail
    const transporter = nodemailer.createTransport({
      host: 'smtp.larksuite.com',
      port: 465,
      secure: true, // true for port 465
      auth: {
        user,
        pass,
      },
      authMethod: 'LOGIN', // Ép sử dụng AUTH LOGIN thay vì AUTH PLAIN cho Lark
      logger: true,
      debug: true,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gecko.io.vn';
    const trackingPixel = `<img src="${siteUrl}/api/track/${contactId}" width="1" height="1" style="display:none; opacity:0; pointer-events:none;" alt="" />`;
    
    // Nhúng cấy thẻ Pixel vào thân của Thư HTML an toàn trước thẻ đóng body
    const finalHtmlMessage = htmlMessage.includes('</body>') 
        ? htmlMessage.replace('</body>', `${trackingPixel}\n</body>`)
        : htmlMessage + trackingPixel;

    // Cấu hình lá thư
    const mailOptions = {
      from: `"Bộ phận hỗ trợ - Gecko Team Inc." <${user}>`, // Sender address
      to: replyToEmail,                                     // Receiver address
      subject: subject,                                     // Subject line
      html: finalHtmlMessage,                               // HTML text body w/ tracker
    };

    // Thực thi việc gửi
    await transporter.sendMail(mailOptions);
    
    // Cập nhật CSDL
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('contacts')
        .update({ 
          status: 'resolved', 
          reply_content: htmlMessage, 
          replied_at: new Date().toISOString() 
        })
        .eq('id', contactId);
      
      if (error) {
         console.error('Lỗi khi update database:', error);
      }
    }

    return { success: true, message: 'Gửi Email phản hồi thành công!' };
  } catch (error: any) {
    console.error('Lỗi khi gửi email:', error);
    return { success: false, message: error.message || 'Hệ thống Lark Mail từ chối kết nối. Vui lòng kiểm tra lại mật khẩu ứng dụng.' };
  }
}

export async function loginAdmin(email: string, pass: string) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && pass === adminPass) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });
    return { success: true };
  }
  return { success: false, message: 'Sai thông tin đăng nhập' };
}

export async function deleteContact(contactId: string) {
    if (!supabaseAdmin) {
        return { success: false, message: 'Database Administration chưa được kết nối.' };
    }

    try {
        const { error } = await supabaseAdmin
            .from('contacts')
            .delete()
            .eq('id', contactId);

        if (error) throw error;
        return { success: true };
    } catch (err: any) {
        console.error('Lỗi khi xoá vé hỗ trợ:', err);
        return { success: false, message: err.message || 'Có lỗi xảy ra khi thực hiện xoá.' };
    }
}
