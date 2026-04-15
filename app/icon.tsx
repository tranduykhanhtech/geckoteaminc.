import { ImageResponse } from 'next/og';

// Tùy chỉnh kích thước cho favicon
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse component
      <div
        style={{
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10b981',
          fontSize: 22,
          fontWeight: 900,
          borderRadius: '8px',
          border: '2px solid #10b981',
        }}
      >
        G
      </div>
    ),
    { ...size }
  );
}
