'use client';

import { Section, Question } from '@/lib/api';

interface ExamPaperProps {
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  totalMarks: number;
  sections: Section[];
}

const difficultyLabel: Record<string, string> = {
  easy: 'Easy',
  medium: 'Moderate',
  hard: 'Challenging',
};

const difficultyColors: Record<string, { bg: string; text: string }> = {
  easy: { bg: '#dcfce7', text: '#15803d' },
  medium: { bg: '#fef3c7', text: '#b45309' },
  hard: { bg: '#fee2e2', text: '#b91c1c' },
};

export default function ExamPaper({
  schoolName,
  subject,
  className,
  timeAllowed,
  totalMarks,
  sections,
}: ExamPaperProps) {
  return (
    <div
      id="exam-paper"
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        padding: '48px 56px',
        fontFamily: 'Georgia, "Times New Roman", Times, serif',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '22px', color: '#111827', margin: 0, marginBottom: '4px' }}>
          {schoolName}
        </h1>
        <p style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '15px', color: '#1f2937', margin: '2px 0' }}>
          Subject: {subject}
        </p>
        <p style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '15px', color: '#1f2937', margin: '2px 0' }}>
          Class: {className}
        </p>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '14px', color: '#1f2937' }}>
          Time Allowed: {timeAllowed}
        </span>
        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '14px', color: '#1f2937' }}>
          Maximum Marks: {totalMarks}
        </span>
      </div>

      <p style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '20px' }}>
        All questions are compulsory unless stated otherwise.
      </p>

      {/* Student info */}
      <div style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { label: 'Name', width: '200px' },
          { label: 'Roll Number', width: '160px' },
          { label: `Class: ${className} Section`, width: '120px' },
        ].map(({ label, width }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '14px', color: '#111827', whiteSpace: 'nowrap' }}>
              {label}:
            </span>
            <div style={{ width, borderBottom: '1px solid #374151', height: '20px' }}/>
          </div>
        ))}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '28px' }}/>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {sections.map((section, si) => (
          <div key={si}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              fontSize: '16px',
              color: '#111827',
              textAlign: 'center',
              margin: '0 0 6px',
            }}>
              {section.title}
            </h2>
            <p style={{
              fontFamily: 'Georgia, serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#1f2937',
              margin: '0 0 4px',
            }}>
              {section.instruction.split('.')[0]}
            </p>
            {section.instruction.includes('.') && (
              <p style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: '13.5px',
                color: '#4b5563',
                margin: '0 0 16px',
              }}>
                {section.instruction.split('.').slice(1).join('.').trim()}
              </p>
            )}

            {/* Questions — inline format exactly matching screenshot */}
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {section.questions.map((q: Question, qi) => (
                <li key={q.number ?? qi} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#1f2937', lineHeight: '1.6' }}>
                  <span style={{ flexShrink: 0, fontFamily: 'Georgia, serif', fontWeight: 400, minWidth: '22px' }}>
                    {q.number ?? qi + 1}.
                  </span>
                  <span style={{ fontFamily: 'Georgia, serif' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: difficultyColors[q.difficulty]?.bg ?? '#f3f4f6',
                      color: difficultyColors[q.difficulty]?.text ?? '#374151',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      marginRight: '6px',
                      fontFamily: 'Inter, sans-serif',
                      verticalAlign: 'middle',
                    }}>
                      {difficultyLabel[q.difficulty] ?? q.difficulty}
                    </span>
                    {q.text}{' '}
                    <span style={{ fontWeight: 700 }}>
                      [{q.marks} Mark{q.marks !== 1 ? 's' : ''}]
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: 'Georgia, serif',
        fontWeight: 700,
        fontSize: '14px',
        color: '#111827',
        marginTop: '32px',
        paddingTop: '20px',
        borderTop: '1px solid #e5e7eb',
      }}>
        End of Question Paper
      </p>
    </div>
  );
}
