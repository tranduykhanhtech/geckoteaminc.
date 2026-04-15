import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Kích thước chuẩn cho share Facebook/Zalo
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      // Vùng nền của ảnh Share
      <div
        style={{
          background: 'linear-gradient(to bottom right, #050505, #111116)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          color: 'white',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          {/* Logo hộp xanh */}
          <div
            style={{
              width: 100,
              height: 100,
              background: '#0a0a0f',
              border: '4px solid #10b981',
              borderRadius: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
              fontSize: 64,
              fontWeight: 900,
              marginRight: 32,
            }}
          >
            G
          </div>
          <h1
            style={{
              fontSize: 84,
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Gecko Team Inc.
          </h1>
        </div>

        <h2
          style={{
            fontSize: 42,
            fontWeight: 500,
            color: '#a1a1aa',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          Hệ sinh thái Phần mềm Quản lý Cửa hàng F&B<br />
          <span style={{ color: '#10b981' }}>Tối ưu thời gian - Tự động hóa vận hành</span>
        </h2>
      </div>
    ),
    {
      ...size,
    }
  );
}
