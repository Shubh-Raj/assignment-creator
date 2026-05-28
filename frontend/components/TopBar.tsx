'use client';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function TopBar({ title = 'Assignment', showBack = false, onBack }: TopBarProps) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 8px 8px 20px',
        marginBottom: '20px',
        flexShrink: 0,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {showBack && (
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: '#9ca3af',
            }}
            aria-label="Go back"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>
            </svg>
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af' }}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '13.5px', color: '#6b7280' }}>
            {title}
          </span>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Bell */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <svg width="19" height="19" fill="none" stroke="#9ca3af" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
          <span
            style={{
              position: 'absolute',
              top: '-1px',
              right: '-1px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#f97316',
              border: '1.5px solid #ffffff',
            }}
          />
        </div>

        {/* User pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px 4px 4px',
            background: '#f9fafb',
            borderRadius: '999px',
            cursor: 'pointer',
            border: '1px solid #f3f4f6',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '10px',
              fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {/* Avatar with user icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="white" fillOpacity="0.9"/>
              <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '13px', color: '#374151' }}>
            Shubh
          </span>
          <svg width="13" height="13" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
