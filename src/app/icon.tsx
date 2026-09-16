import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#0a0c10',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff5500',
          borderRadius: 6,
          border: '2px solid #ff5500',
          fontWeight: 900,
        }}
      >
        ◈
      </div>
    ),
    {
      ...size,
    }
  );
}
