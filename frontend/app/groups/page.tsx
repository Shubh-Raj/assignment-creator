'use client';

import TopBar from '@/components/TopBar';

const groups = [
  { name: 'Class 8 - Science', members: 32, color: '#dbeafe', textColor: '#1d4ed8' },
  { name: 'Class 5 - English', members: 28, color: '#dcfce7', textColor: '#15803d' },
  { name: 'Class 10 - Math', members: 24, color: '#fef3c7', textColor: '#b45309' },
  { name: 'Class 7 - History', members: 30, color: '#fae8ff', textColor: '#7e22ce' },
];

export default function GroupsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="My Groups" />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px', color: '#111827', margin: 0 }}>My Groups</h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', margin: '4px 0 0' }}>Manage your student groups and classes.</p>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '10px 20px', background: '#18181b', border: 'none',
            borderRadius: '999px', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13.5px', color: '#ffffff',
          }}>
            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Group
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {groups.map((g) => (
            <div
              key={g.name}
              style={{
                background: '#ffffff', borderRadius: '16px', padding: '24px',
                border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: g.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '14px',
              }}>
                <svg width="22" height="22" fill="none" stroke={g.textColor} strokeWidth="1.75" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '15px', color: '#111827', margin: '0 0 6px' }}>
                {g.name}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', margin: 0 }}>
                {g.members} students
              </p>
            </div>
          ))}
        </div>

        {/* Coming soon notice */}
        <div style={{
          marginTop: '24px', background: '#f9fafb', borderRadius: '16px',
          padding: '20px', border: '1px dashed #e5e7eb', textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#9ca3af' }}>
            Group management features coming soon — share assignments, track submissions, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
