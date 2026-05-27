'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import AssignmentCard from '@/components/AssignmentCard';
import { fetchAssignments, Assignment } from '@/lib/api';
import { subscribe, initSocket } from '@/lib/socket';

/* ── Empty state illustration matching screenshot 1 ── */
function NoAssignmentsIllustration() {
  return (
    <svg width="240" height="210" viewBox="0 0 240 210" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Large purple-lavender background circle */}
      <ellipse cx="118" cy="125" rx="94" ry="84" fill="#E8E4F3"/>

      {/* Main document (white card, slightly tilted) */}
      <rect x="58" y="50" width="90" height="115" rx="5" fill="white" stroke="#DDD8EC" strokeWidth="1.2"/>
      {/* Document lines */}
      <rect x="70" y="70" width="54" height="5.5" rx="2.5" fill="#1f2937" opacity="0.75"/>
      <rect x="70" y="83" width="66" height="3.5" rx="1.75" fill="#d1d5db"/>
      <rect x="70" y="93" width="58" height="3.5" rx="1.75" fill="#d1d5db"/>
      <rect x="70" y="103" width="62" height="3.5" rx="1.75" fill="#d1d5db"/>
      <rect x="70" y="113" width="50" height="3.5" rx="1.75" fill="#e5e7eb"/>
      <rect x="70" y="123" width="55" height="3.5" rx="1.75" fill="#e5e7eb"/>

      {/* Top-right small card overlay */}
      <rect x="118" y="38" width="64" height="42" rx="5" fill="white" stroke="#DDD8EC" strokeWidth="1.2"/>
      <rect x="128" y="50" width="32" height="3.5" rx="1.75" fill="#d1d5db"/>
      <rect x="128" y="60" width="24" height="3.5" rx="1.75" fill="#e5e7eb"/>

      {/* Magnifying glass outer ring (colored) */}
      <circle cx="116" cy="118" r="39" fill="rgba(196,181,229,0.4)" stroke="#C4B5D9" strokeWidth="3"/>
      {/* Magnifying glass inner (white) */}
      <circle cx="116" cy="118" r="34" fill="rgba(255,255,255,0.85)"/>

      {/* Red X */}
      <line x1="103" y1="105" x2="129" y2="131" stroke="#EF4444" strokeWidth="5.5" strokeLinecap="round"/>
      <line x1="129" y1="105" x2="103" y2="131" stroke="#EF4444" strokeWidth="5.5" strokeLinecap="round"/>

      {/* Magnifying glass handle */}
      <line x1="146" y1="146" x2="166" y2="166" stroke="#B0A0CC" strokeWidth="8" strokeLinecap="round"/>

      {/* Blue dot decoration */}
      <circle cx="168" cy="113" r="6" fill="#60A5FA"/>

      {/* 4-pointed sparkle/diamond */}
      <path d="M80 36 L83.5 45.5 L93 49 L83.5 52.5 L80 62 L76.5 52.5 L67 49 L76.5 45.5 Z"
        fill="#818CF8" fillOpacity="0.7"/>

      {/* Script pen/curl decoration */}
      <path d="M60 46 C52 33 50 20 66 15" stroke="#1e293b" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <circle cx="66" cy="15" r="2.5" fill="#1e293b"/>
    </svg>
  );
}

export default function HomePage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    initSocket();
    load();
    const unsub = subscribe((msg) => {
      if (['job:done', 'job:failed', 'job:processing', 'job:queued'].includes(msg.type)) {
        load();
      }
    });
    return unsub;
  }, []);

  async function load() {
    try {
      const data = await fetchAssignments();
      setAssignments(data);
      setError('');
    } catch {
      setError('Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  }

  function handleDeleted(id: string) {
    setAssignments((prev) => prev.filter((a) => a._id !== id));
  }

  const filtered = assignments.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Assignment" />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, paddingBottom: '88px' }}>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <svg style={{ animation: 'spin 1s linear infinite', width: 32, height: 32 }} fill="none" viewBox="0 0 24 24">
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="4"/>
              <path style={{ opacity: 0.75 }} fill="#9ca3af" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </div>
        )}

        {!loading && error && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <p style={{ color: '#ef4444', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>{error}</p>
          </div>
        )}

        {/* ── EMPTY STATE — matches screenshot 1 ── */}
        {!loading && !error && assignments.length === 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            padding: '0 32px',
          }}>
            <NoAssignmentsIllustration />

            <h2 style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              color: '#111827',
              marginTop: '20px',
              marginBottom: '8px',
            }}>
              No assignments yet
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '13.5px',
              color: '#6b7280',
              lineHeight: '1.6',
              maxWidth: '320px',
              marginBottom: '28px',
            }}>
              Create your first assignment to start collecting and grading student
              submissions. You can set up rubrics, define marking criteria, and let AI
              assist with grading.
            </p>
            <Link
              href="/create"
              id="btn-create-first"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#18181b',
                borderRadius: '999px',
                textDecoration: 'none',
                color: '#ffffff',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }}
            >
              <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create Your First Assignment
            </Link>
          </div>
        )}

        {/* ── LIST VIEW — matches screenshot 4 ── */}
        {!loading && !error && assignments.length > 0 && (
          <>
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#4ade80',
                  boxShadow: '0 0 0 3px rgba(74,222,128,0.2)',
                  flexShrink: 0,
                }}/>
                <h1 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#111827',
                }}>
                  Assignments
                </h1>
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '13px',
                color: '#6b7280',
                paddingLeft: '20px',
              }}>
                Manage and create assignments for your classes.
              </p>
            </div>

            {/* Filter / Search toolbar */}
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              marginBottom: '20px',
              border: '1px solid #f1f5f9',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '13px',
                color: '#6b7280',
                padding: '0',
              }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                </svg>
                Filter By
              </button>

              <div style={{ position: 'relative', width: '280px' }}>
                <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}
                  width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                  id="search-input"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Assignment"
                  style={{
                    width: '100%',
                    paddingLeft: '34px',
                    paddingRight: '14px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '999px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    color: '#374151',
                    outline: 'none',
                    background: '#ffffff',
                  }}
                />
              </div>
            </div>

            {/* Cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {filtered.map((a) => (
                <AssignmentCard key={a._id} assignment={a} onDeleted={handleDeleted} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p style={{ textAlign: 'center', color: '#9ca3af', fontFamily: 'Inter, sans-serif', fontSize: '13.5px', paddingTop: '40px' }}>
                No assignments match your search.
              </p>
            )}
          </>
        )}
      </div>

      {/* ── FAB — centered in main ── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '236px',
        right: 0,
        height: '100px',
        background: 'linear-gradient(to top, #eeeeee 40%, transparent)',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '20px',
      }}>
        <Link
          href="/create"
          id="fab-create"
          style={{
            pointerEvents: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            background: '#18181b',
            borderRadius: '999px',
            textDecoration: 'none',
            color: '#ffffff',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}
        >
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Create Assignment
        </Link>
      </div>
    </div>
  );
}
