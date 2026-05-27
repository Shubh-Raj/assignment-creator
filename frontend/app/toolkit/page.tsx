'use client';

import TopBar from '@/components/TopBar';

const tools = [
  {
    title: 'Question Paper Generator',
    desc: 'Create AI-powered exam papers tailored to your syllabus, class, and difficulty level.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      </svg>
    ),
    tag: 'Available',
    tagColor: '#dcfce7',
    tagText: '#15803d',
    href: '/create',
  },
  {
    title: 'Smart Rubric Builder',
    desc: 'Define marking criteria and grading rubrics with AI assistance.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#6366f1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    tag: 'Coming Soon',
    tagColor: '#fef3c7',
    tagText: '#b45309',
    href: '#',
  },
  {
    title: 'Auto-Grade Assistant',
    desc: 'Upload student answers and let AI provide preliminary grading suggestions.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#10b981" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    tag: 'Coming Soon',
    tagColor: '#fef3c7',
    tagText: '#b45309',
    href: '#',
  },
  {
    title: 'Lesson Planner',
    desc: 'Generate structured lesson plans aligned with NCERT and CBSE curriculum.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="#3b82f6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    tag: 'Coming Soon',
    tagColor: '#fef3c7',
    tagText: '#b45309',
    href: '#',
  },
];

export default function ToolkitPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="AI Teacher's Toolkit" />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px', color: '#111827', margin: '0 0 4px' }}>
            AI Teacher's Toolkit
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', margin: 0 }}>
            Powerful AI tools designed specifically for educators.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {tools.map((tool) => (
            <a
              key={tool.title}
              href={tool.href}
              style={{
                background: '#ffffff', borderRadius: '16px', padding: '24px',
                border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '14px',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {tool.icon}
                </div>
                <span style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: '999px',
                  background: tool.tagColor, color: tool.tagText,
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11.5px',
                }}>
                  {tool.tag}
                </span>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '15px', color: '#111827', margin: '0 0 6px' }}>
                  {tool.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6b7280', margin: 0, lineHeight: '1.6' }}>
                  {tool.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
