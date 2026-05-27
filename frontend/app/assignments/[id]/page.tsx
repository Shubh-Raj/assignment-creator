'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import ExamPaper from '@/components/ExamPaper';
import { fetchAssignment, regenerateAssignment, getPdfUrl, Assignment } from '@/lib/api';
import { subscribe, initSocket } from '@/lib/socket';

export default function OutputPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    initSocket();
    load();
    const unsub = subscribe((msg) => {
      if (msg.assignmentId === id) load();
    });
    return unsub;
  }, [id]);

  async function load() {
    try {
      const data = await fetchAssignment(id);
      setAssignment(data);
    } catch {}
    finally { setLoading(false); }
  }

  async function handleRegenerate() {
    setRegenerating(true);
    try {
      await regenerateAssignment(id);
      setAssignment((prev) => prev ? { ...prev, status: 'queued' } : prev);
      await load();
    } finally { setRegenerating(false); }
  }

  const isProcessing = assignment?.status === 'queued' || assignment?.status === 'processing';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Create New" showBack onBack={() => router.push('/')} />

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, paddingBottom: '24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* ── Dark context banner matching screenshot 2 ── */}
          <div style={{
            background: '#18181b',
            borderRadius: '16px',
            padding: '22px 28px',
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '14.5px',
              color: '#ffffff',
              lineHeight: '1.65',
              marginBottom: assignment?.status === 'done' ? '18px' : '0',
            }}>
              {assignment
                ? `Certainly! Here is your customized Question Paper for your ${assignment.className} ${assignment.subject} classes${assignment.additionalInstructions ? ' based on your instructions' : ''}.`
                : 'Preparing your AI-generated question paper…'}
            </p>

            {assignment?.status === 'done' && (
              <a
                id="btn-download-pdf"
                href={getPdfUrl(id)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: '#ffffff',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  color: '#111827',
                }}
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download as PDF
              </a>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #f1f5f9' }}>
              <svg style={{ animation: 'spin 1s linear infinite', width: 36, height: 36 }} fill="none" viewBox="0 0 24 24">
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="4"/>
                <path style={{ opacity: 0.75 }} fill="#6b7280" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>Loading…</p>
            </div>
          )}

          {/* Processing */}
          {!loading && isProcessing && (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #f1f5f9', textAlign: 'center' }}>
              <svg style={{ animation: 'spin 1s linear infinite', width: 40, height: 40 }} fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="#374151" strokeWidth="4"/>
                <path style={{ opacity: 0.75 }} fill="#374151" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px', color: '#111827', marginTop: '20px', marginBottom: '6px' }}>
                {assignment?.status === 'queued' ? 'In queue…' : 'Generating your question paper…'}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#9ca3af' }}>
                This usually takes 10–30 seconds.
              </p>
            </div>
          )}

          {/* Failed */}
          {!loading && assignment?.status === 'failed' && (
            <div style={{ background: '#fff', borderRadius: '16px', padding: '48px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #fee2e2', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <svg width="22" height="22" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '8px' }}>Generation Failed</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#6b7280', marginBottom: '24px', maxWidth: '360px' }}>
                {assignment.error || 'An unexpected error occurred.'}
              </p>
              <button
                id="btn-retry"
                onClick={handleRegenerate}
                disabled={regenerating}
                style={{
                  padding: '11px 28px',
                  background: '#18181b',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '999px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  opacity: regenerating ? 0.6 : 1,
                }}
              >
                {regenerating ? 'Retrying…' : 'Try Again'}
              </button>
            </div>
          )}

          {/* ── Exam paper output ── */}
          {!loading && assignment?.status === 'done' && assignment.output && (
            <>
              <ExamPaper
                schoolName={assignment.output.schoolName}
                subject={assignment.output.subject}
                className={assignment.output.className}
                timeAllowed={assignment.output.timeAllowed}
                totalMarks={assignment.output.totalMarks}
                sections={assignment.output.sections}
              />

              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4px', paddingBottom: '8px' }}>
                <button
                  id="btn-regenerate"
                  onClick={handleRegenerate}
                  disabled={regenerating}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 22px',
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '999px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '13.5px',
                    color: '#374151',
                    cursor: 'pointer',
                    opacity: regenerating ? 0.6 : 1,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M8 16H3v5"/>
                  </svg>
                  {regenerating ? 'Regenerating…' : 'Regenerate Paper'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
