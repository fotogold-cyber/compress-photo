import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Сжать фото онлайн — Бесплатный компрессор в браузере';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0c10',
          padding: 60,
          fontFamily: 'sans-serif',
          border: '12px solid #161a24',
          position: 'relative',
        }}
      >
        {/* Reticle corner marks */}
        <div style={{ position: 'absolute', top: 30, left: 30, width: 30, height: 30, borderTop: '4px solid #ff5500', borderLeft: '4px solid #ff5500' }} />
        <div style={{ position: 'absolute', top: 30, right: 30, width: 30, height: 30, borderTop: '4px solid #ff5500', borderRight: '4px solid #ff5500' }} />
        <div style={{ position: 'absolute', bottom: 30, left: 30, width: 30, height: 30, borderBottom: '4px solid #ff5500', borderLeft: '4px solid #ff5500' }} />
        <div style={{ position: 'absolute', bottom: 30, right: 30, width: 30, height: 30, borderBottom: '4px solid #ff5500', borderRight: '4px solid #ff5500' }} />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 20px',
            borderRadius: 9999,
            background: '#161a24',
            border: '2px solid #283142',
            color: '#ff5500',
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 2,
            marginBottom: 30,
          }}
        >
          ● 100% PRIVATE CLIENT-SIDE OPTICS ENGINE
        </div>

        {/* Big H1 */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.15,
            letterSpacing: -1,
            textTransform: 'uppercase',
            maxWidth: 1000,
          }}
        >
          СЖАТЬ ФОТО ОНЛАЙН <br />
          <span style={{ color: '#ff5500' }}>БЕЗ ПОТЕРИ КАЧЕСТВА</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            textAlign: 'center',
            marginTop: 24,
            maxWidth: 800,
          }}
        >
          Мгновенная обработка JPEG, PNG, WebP и AVIF прямо в браузере. Без серверов и лимитов.
        </div>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 40,
          }}
        >
          {['≤ 100 KB ГОСУСЛУГИ', 'PNG В WEBP', 'JPEG ОПТИМИЗАЦИЯ', 'BATCH ZIP'].map((tag, i) => (
            <div
              key={i}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                background: '#131722',
                border: '1px solid #242e40',
                color: '#e2e8f0',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
