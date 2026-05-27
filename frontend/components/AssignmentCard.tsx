'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteAssignment } from '@/lib/api';

interface Assignment {
  _id: string;
  title: string;
  dueDate: string;
  createdAt: string;
  status: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
  onDeleted: (id: string) => void;
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  } catch {
    return dateStr;
  }
}

export default function AssignmentCard({ assignment, onDeleted }: AssignmentCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteAssignment(assignment._id);
      onDeleted(assignment._id);
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '20px 22px 18px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '120px',
        position: 'relative',
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            color: '#111827',
            lineHeight: '1.3',
            paddingRight: '8px',
            flex: 1,
          }}
        >
          {assignment.title}
        </h2>

        {/* 3-dot menu */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            id={`menu-${assignment._id}`}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              color: '#d1d5db',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '4px',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#6b7280'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#d1d5db'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
            </svg>
          </button>

          {menuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '28px',
                right: 0,
                background: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                border: '1px solid #f1f5f9',
                padding: '4px',
                minWidth: '150px',
                zIndex: 20,
              }}
            >
              <Link
                href={`/assignments/${assignment._id}`}
                style={{
                  display: 'block',
                  padding: '9px 14px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '13.5px',
                  color: '#374151',
                  textDecoration: 'none',
                  borderRadius: '6px',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f9fafb'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
                onClick={() => setMenuOpen(false)}
              >
                View Assignment
              </Link>
              <button
                id={`delete-${assignment._id}`}
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '9px 14px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '13.5px',
                  color: '#ef4444',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  opacity: deleting ? 0.5 : 1,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#fef2f2'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Date row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#6b7280' }}>
          <span style={{ fontWeight: 600, color: '#374151' }}>Assigned on :</span>{' '}
          {formatDate(assignment.createdAt)}
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#6b7280' }}>
          <span style={{ fontWeight: 600, color: '#374151' }}>Due :</span>{' '}
          {assignment.dueDate}
        </span>
      </div>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setMenuOpen(false)} />
      )}
    </div>
  );
}
