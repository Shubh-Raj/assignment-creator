'use client';

import TopBar from '@/components/TopBar';

const sections = [
  {
    title: 'Account',
    items: [
      { label: 'Display Name', value: 'John Doe', type: 'text' },
      { label: 'Email', value: 'john.doe@dps.edu', type: 'text' },
      { label: 'School', value: 'Delhi Public School, Bokaro Steel City', type: 'text' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { label: 'Default Language', value: 'English', type: 'select' },
      { label: 'Notifications', value: 'Enabled', type: 'toggle' },
      { label: 'AI Model', value: 'Gemini 1.5 Flash', type: 'text' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Settings" />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px', color: '#111827', margin: '0 0 4px' }}>
            Settings
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', margin: '0 0 24px' }}>
            Manage your account preferences and configurations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {sections.map((section) => (
              <div key={section.title}>
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                  {section.title}
                </h2>
                <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                  {section.items.map((item, i) => (
                    <div
                      key={item.label}
                      style={{
                        padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        borderBottom: i < section.items.length - 1 ? '1px solid #f9fafb' : 'none',
                      }}
                    >
                      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', color: '#374151' }}>
                        {item.label}
                      </span>
                      {item.type === 'toggle' ? (
                        <div style={{
                          width: '40px', height: '22px', borderRadius: '999px', background: '#18181b',
                          position: 'relative', cursor: 'pointer',
                        }}>
                          <div style={{
                            position: 'absolute', right: '3px', top: '3px',
                            width: '16px', height: '16px', borderRadius: '50%', background: '#ffffff',
                          }}/>
                        </div>
                      ) : (
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#6b7280' }}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Danger zone */}
            <div>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '12px', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                Danger Zone
              </h2>
              <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #fee2e2', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#111827', margin: '0 0 4px' }}>Delete Account</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', margin: 0 }}>Permanently delete your account and all data.</p>
                </div>
                <button style={{
                  padding: '9px 18px', background: 'none', border: '1px solid #ef4444',
                  borderRadius: '999px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13.5px',
                  color: '#ef4444', cursor: 'pointer',
                }}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
