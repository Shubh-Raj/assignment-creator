'use client';

import TopBar from '@/components/TopBar';
import Link from 'next/link';

const quickActions = [
  { label: 'Create Assignment', href: '/create', desc: 'Generate an AI-powered question paper', icon: '✦' },
  { label: 'My Assignments', href: '/', desc: 'View and manage all your assignments', icon: '📋' },
  { label: "AI Teacher's Toolkit", href: '/toolkit', desc: 'Smart tools for educators', icon: '🤖' },
  { label: 'My Library', href: '/library', desc: 'Browse saved resources', icon: '📚' },
];

const recentActivity = [
  { label: 'Quiz on Electricity', time: '2 hours ago', status: 'done' },
  { label: 'English Grammar Test', time: 'Yesterday', status: 'done' },
  { label: 'Math Unit 4 Exam', time: '3 days ago', status: 'done' },
];

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Home" />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {/* Welcome banner */}
        <div style={{
          background: '#18181b',
          borderRadius: '20px',
          padding: '28px 32px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9ca3af', marginBottom: '6px' }}>
              Welcome back,
            </p>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '24px', color: '#ffffff', margin: '0 0 8px' }}>
              John Doe 👋
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', margin: 0 }}>
              Delhi Public School, Bokaro Steel City
            </p>
          </div>
          <Link
            href="/create"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 22px',
              background: '#ffffff',
              borderRadius: '999px',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#111827',
              whiteSpace: 'nowrap',
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Assignment
          </Link>
        </div>

        {/* Quick actions */}
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '15px', color: '#374151', marginBottom: '14px' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          {quickActions.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '20px',
                textDecoration: 'none',
                border: '1px solid #f1f5f9',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column', gap: '8px',
                transition: 'transform 0.1s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
            >
              <span style={{ fontSize: '24px' }}>{a.icon}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px', color: '#111827' }}>{a.label}</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#6b7280' }}>{a.desc}</span>
            </Link>
          ))}
        </div>

        {/* Recent activity */}
        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '15px', color: '#374151', marginBottom: '14px' }}>
          Recent Activity
        </h2>
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          {recentActivity.map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: '16px 20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: i < recentActivity.length - 1 ? '1px solid #f9fafb' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', flexShrink: 0 }}/>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#111827' }}>{item.label}</span>
              </div>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#9ca3af' }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
