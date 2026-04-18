import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// Ảnh GIF 1x1 pixel trong suốt (Base64 decoded)
const transparentGif = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
);

export async function GET(request: Request, context: any) {
  try {
    const params = await context.params;
    const { id } = params;

    if (id && supabaseAdmin) {
      // Update timezone ISO => Đã mở mail
      await supabaseAdmin
        .from('contacts')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id);
    }
  } catch (err) {
    console.error('Lỗi khi tracking email:', err);
  }

  // Phản hồi về HTTP mượt mà nhất để trình duyệt không khựng
  return new NextResponse(transparentGif, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
