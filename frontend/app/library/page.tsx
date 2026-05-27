'use client';

import TopBar from '@/components/TopBar';
import Link from 'next/link';

const categories = [
  { label: 'All Resources', count: 24, active: true },
  { label: 'Question Banks', count: 8 },
  { label: 'Lesson Plans', count: 5 },
  { label: 'Worksheets', count: 11 },
];

const resources = [
  { title: 'NCERT Chapter 14 — Electroplating', type: 'Question Bank', subject: 'Science', class: 'Class 8', date: '23-06-2025' },
  { title: 'English Grammar Worksheet Set', type: 'Worksheet', subject: 'English', class: 'Class 5', date: '21-06-2025' },
  { title: 'Math Unit 4 — Fractions', type: 'Question Bank', subject: 'Mathematics', class: 'Class 6', date: '19-06-2025' },
  { title: 'History — Mughal Empire Overview', type: 'Lesson Plan', subject: 'History', class: 'Class 7', date: '18-06-2025' },
  { title: 'Physics — Motion and Laws', type: 'Question Bank', subject: 'Physics', class: 'Class 9', date: '15-06-2025' },
  { title: 'Chemistry — Acids and Bases', type: 'Worksheet', subject: 'Chemistry', class: 'Class 10', date: '12-06-2025' },
];

const typeColors: Record<string, { bg: string; text: string }> = {
  'Question Bank': { bg: '#dbeafe', text: '#1d4ed8' },
  'Worksheet': { bg: '#dcfce7', text: '#15803d' },
  'Lesson Plan': { bg: '#fae8ff', text: '#7e22ce' },
};

export default function LibraryPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="My Library" />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px', color: '#111827', margin: '0 0 4px' }}>
              My Library
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', margin: 0 }}>
              Browse and reuse your saved teaching resources.
            </p>
          </div>
          <Link
            href="/create"
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '10px 20px', background: '#18181b', borderRadius: '999px',
              textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13.5px', color: '#ffffff',
            }}
          >
            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Resource
          </Link>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {categories.map((c) => (
            <button
              key={c.label}
              style={{
                padding: '7px 16px',
                borderRadius: '999px',
                border: c.active ? '1.5px solid #18181b' : '1px solid #e5e7eb',
                background: c.active ? '#18181b' : '#ffffff',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                color: c.active ? '#ffffff' : '#6b7280',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              {c.label}
              <span style={{
                background: c.active ? 'rgba(255,255,255,0.2)' : '#f3f4f6',
                color: c.active ? '#fff' : '#374151',
                fontSize: '11px', fontWeight: 700,
                padding: '1px 6px', borderRadius: '999px',
              }}>
                {c.count}
              </span>
            </button>
          ))}
        </div>

        {/* Resources table/list */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          {resources.map((r, i) => (
            <div
              key={r.title}
              style={{
                padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: '16px',
                borderBottom: i < resources.length - 1 ? '1px solid #f9fafb' : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#fafafa'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: typeColors[r.type]?.bg ?? '#f3f4f6',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="18" height="18" fill="none" stroke={typeColors[r.type]?.text ?? '#6b7280'} strokeWidth="1.75" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#111827', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.title}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#6b7280', margin: 0 }}>
                  {r.subject} · {r.class}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <span style={{
                  padding: '3px 10px', borderRadius: '999px',
                  background: typeColors[r.type]?.bg ?? '#f3f4f6',
                  color: typeColors[r.type]?.text ?? '#374151',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11.5px',
                }}>
                  {r.type}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af' }}>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
