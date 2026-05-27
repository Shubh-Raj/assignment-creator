'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  assignmentCount?: number;
}

const navItems = [
  {
    label: 'Home',
    href: '/home',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
  {
    label: 'My Groups',
    href: '/groups',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Assignments',
    href: '/',
    showBadge: true,
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    label: "AI Teacher's Toolkit",
    href: '/toolkit',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="9" y1="22" x2="15" y2="22"/><line x1="12" y1="17" x2="12" y2="22"/>
      </svg>
    ),
  },
  {
    label: 'My Library',
    href: '/library',
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

export default function Sidebar({ assignmentCount = 0 }: SidebarProps) {
  const pathname = usePathname();
  const isAssignmentsPage = pathname === '/' || pathname.startsWith('/assignments');

  return (
    <aside
      style={{
        width: '220px',
        flexShrink: 0,
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      {/* ── Logo ── */}
      <div style={{ padding: '24px 20px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src="/logo.png"
          alt="VedaAI"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            flexShrink: 0,
            objectFit: 'cover',
          }}
        />
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '18px',
            color: '#111827',
            letterSpacing: '-0.01em',
          }}
        >
          VedaAI
        </span>
      </div>

      {/* ── Create CTA ── */}
      <div style={{ padding: '0 16px 20px' }}>
        <Link
          href="/create"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '7px',
            padding: '10px 16px',
            background: '#18181b',
            borderRadius: '999px',
            textDecoration: 'none',
            boxShadow: '0 0 0 1.5px rgba(249,115,22,0.5), 0 0 14px rgba(249,115,22,0.18)',
          }}
        >
          {/* Sparkle star icon */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
            <path d="M12 3l2.09 6.26L20 12l-5.91 2.74L12 21l-2.09-6.26L4 12l5.91-2.74L12 3z"/>
          </svg>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              color: '#ffffff',
              letterSpacing: '0.01em',
            }}
          >
            Create Assignment
          </span>
        </Link>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const active = item.label === 'Assignments' ? isAssignmentsPage : pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                backgroundColor: active ? '#f3f4f6' : 'transparent',
                color: active ? '#111827' : '#6b7280',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#f9fafb';
                  (e.currentTarget as HTMLElement).style.color = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#6b7280';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.icon}
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: active ? 600 : 500, fontSize: '13.5px' }}>
                  {item.label}
                </span>
              </div>
              {item.showBadge && assignmentCount > 0 && (
                <span
                  style={{
                    background: '#f97316',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    padding: '1px 7px',
                    borderRadius: '999px',
                    minWidth: '22px',
                    textAlign: 'center',
                  }}
                >
                  {assignmentCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Settings + School ── */}
      <div style={{ padding: '12px 12px 16px' }}>
        <Link
          href="/settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#6b7280',
            marginBottom: '8px',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f9fafb'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '13.5px' }}>Settings</span>
        </Link>

        {/* School card */}
        <div
          style={{
            background: '#f3f4f6',
            borderRadius: '12px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #fb923c 0%, #92400e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            {/* Tiger/mascot illustration approximation */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="none"/>
              {/* Simple face */}
              <circle cx="10" cy="12" r="1.5" fill="white" fillOpacity="0.9"/>
              <circle cx="18" cy="12" r="1.5" fill="white" fillOpacity="0.9"/>
              <path d="M11 17 Q14 20 17 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              {/* Ears */}
              <path d="M7 8 L5 4 L10 7 Z" fill="white" fillOpacity="0.7"/>
              <path d="M21 8 L23 4 L18 7 Z" fill="white" fillOpacity="0.7"/>
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12.5px', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Delhi Public School
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '11.5px', color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Bokaro Steel City
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
