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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '24px', padding: '24px' }}>
      <TopBar title="Home" />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Welcome banner */}
        <div style={{
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
          borderRadius: '24px',
          padding: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#a1a1aa', marginBottom: '8px' }}>
              Welcome back to your dashboard
            </p>
            <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '32px', color: '#ffffff', margin: '0 0 12px' }}>
              John Doe 👋
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#71717a', margin: 0 }}>
              Delhi Public School, Bokaro Steel City
            </p>
          </div>
          <Link
            href="/create"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px 28px',
              background: '#ffffff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              color: '#09090b',
              whiteSpace: 'nowrap',
              transition: 'transform 0.2s, background 0.2s',
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create New Assignment
          </Link>
        </div>

        {/* Quick actions grid */}
        <section>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', color: '#18181b', marginBottom: '20px' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {quickActions.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '24px',
                  textDecoration: 'none',
                  border: '1px solid #e4e4e7',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontSize: '32px' }}>{a.icon}</div>
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: '#09090b', margin: 0 }}>{a.label}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#71717a', margin: 0 }}>{a.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent activity list */}
        <section>
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', color: '#18181b', marginBottom: '20px' }}>
            Recent Activity
          </h2>
          <div style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e4e4e7', overflow: 'hidden' }}>
            {recentActivity.map((item, i) => (
              <div
                key={item.label}
                style={{
                  padding: '20px 24px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: i < recentActivity.length - 1 ? '1px solid #f4f4f5' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}/>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '15px', color: '#09090b' }}>{item.label}</span>
                </div>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#a1a1aa' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
