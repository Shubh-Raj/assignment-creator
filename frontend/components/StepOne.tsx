'use client';

import { useRef } from 'react';
import { useFormStore } from '@/store/formStore';

const QUESTION_TYPES = [
  'Multiple Choice Questions',
  'Short Questions',
  'Long Questions',
  'Diagram/Graph-Based Questions',
  'Numerical Problems',
  'Fill in the Blanks',
  'True or False',
  'Match the Following',
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  padding: '11px 14px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  color: '#111827',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  fontSize: '13.5px',
  color: '#374151',
  marginBottom: '8px',
};

export default function StepOne() {
  const { form, updateForm, addQuestionType, removeQuestionType, updateQuestionType } = useFormStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const totalQuestions = form.questionTypes.reduce((s, qt) => s + qt.count, 0);
  const totalMarks = form.questionTypes.reduce((s, qt) => s + qt.count * qt.marksEach, 0);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    updateForm({ file });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) updateForm({ file });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Assignment Title */}
      <div>
        <label htmlFor="title" style={labelStyle}>
          Assignment Title <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id="title"
          type="text"
          value={form.title}
          onChange={(e) => updateForm({ title: e.target.value })}
          placeholder="e.g. Quiz on Electricity"
          style={inputStyle}
          onFocus={(e) => { e.target.style.border = '1px solid #374151'; e.target.style.boxShadow = '0 0 0 3px rgba(17,24,39,0.08)'; }}
          onBlur={(e) => { e.target.style.border = '1px solid #e5e7eb'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate" style={labelStyle}>
          Due Date <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id="dueDate"
          type="date"
          value={form.dueDate}
          onChange={(e) => updateForm({ dueDate: e.target.value })}
          style={inputStyle}
          onFocus={(e) => { e.target.style.border = '1px solid #374151'; e.target.style.boxShadow = '0 0 0 3px rgba(17,24,39,0.08)'; }}
          onBlur={(e) => { e.target.style.border = '1px solid #e5e7eb'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* File Upload */}
      <div>
        <label style={labelStyle}>
          Reference File <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span>
        </label>
        <div
          role="button"
          tabIndex={0}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
          style={{
            border: '2px dashed #d1d5db',
            borderRadius: '12px',
            padding: '28px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: '#f9fafb',
            cursor: 'pointer',
            transition: 'border-color 0.15s, background 0.15s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = '#9ca3af';
            (e.currentTarget as HTMLElement).style.background = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = '#d1d5db';
            (e.currentTarget as HTMLElement).style.background = '#f9fafb';
          }}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.txt,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-upload"
          />
          {/* Upload icon — explicit size and color */}
          <svg
            width="36"
            height="36"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            style={{ marginBottom: '12px', flexShrink: 0 }}
          >
            <path d="M7 16a4 4 0 0 1-.88-7.903A5 5 0 1 1 15.9 6L16 6a5 5 0 0 1 1 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>

          {form.file ? (
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#111827', margin: '0 0 4px' }}>
                {form.file.name}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', margin: 0 }}>
                Click to change file
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#374151', margin: '0 0 4px' }}>
                Choose a file or drag & drop it here
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12.5px', color: '#9ca3af', margin: '0 0 14px' }}>
                PDF, TXT, PNG, JPG — up to 10 MB
              </p>
              <span style={{
                display: 'inline-block',
                padding: '7px 18px',
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '13px',
                color: '#374151',
              }}>
                Browse Files
              </span>
            </div>
          )}
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', textAlign: 'center', marginTop: '8px' }}>
          File content will be used as reference context for AI question generation
        </p>
      </div>

      {/* Question Types */}
      <div>
        <label style={labelStyle}>Question Types <span style={{ color: '#ef4444' }}>*</span></label>

        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 130px 110px 36px',
          gap: '10px',
          marginBottom: '10px',
          padding: '0 4px',
        }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#6b7280' }}>TYPE</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>QUESTIONS</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>MARKS EACH</span>
          <span/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {form.questionTypes.map((qt) => (
            <div key={qt.id} style={{ display: 'grid', gridTemplateColumns: '1fr 130px 110px 36px', gap: '10px', alignItems: 'center' }}>
              {/* Select */}
              <div style={{ position: 'relative' }}>
                <select
                  value={qt.type}
                  onChange={(e) => updateQuestionType(qt.id, { type: e.target.value })}
                  style={{
                    width: '100%',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    background: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '10px 36px 10px 12px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13.5px',
                    color: '#111827',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {QUESTION_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>

              {/* Count stepper */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '8px 12px',
              }}>
                <button
                  type="button"
                  onClick={() => updateQuestionType(qt.id, { count: Math.max(1, qt.count - 1) })}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0', display: 'flex' }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 12H4"/></svg>
                </button>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px', color: '#111827', minWidth: '24px', textAlign: 'center' }}>
                  {qt.count}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuestionType(qt.id, { count: qt.count + 1 })}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0', display: 'flex' }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>

              {/* Marks stepper */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '8px 12px',
              }}>
                <button
                  type="button"
                  onClick={() => updateQuestionType(qt.id, { marksEach: Math.max(1, qt.marksEach - 1) })}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0', display: 'flex' }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 12H4"/></svg>
                </button>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '14px', color: '#111827', minWidth: '20px', textAlign: 'center' }}>
                  {qt.marksEach}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuestionType(qt.id, { marksEach: qt.marksEach + 1 })}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0', display: 'flex' }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => form.questionTypes.length > 1 && removeQuestionType(qt.id)}
                disabled={form.questionTypes.length <= 1}
                style={{
                  background: 'none', border: 'none', cursor: form.questionTypes.length <= 1 ? 'not-allowed' : 'pointer',
                  color: form.questionTypes.length <= 1 ? '#e5e7eb' : '#d1d5db',
                  padding: '4px', display: 'flex', alignItems: 'center',
                }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Add row button */}
        <button
          type="button"
          onClick={addQuestionType}
          style={{
            marginTop: '14px',
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13.5px', color: '#374151',
            padding: '0',
          }}
        >
          <span style={{
            width: '22px', height: '22px', borderRadius: '50%',
            background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="11" height="11" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4"/>
            </svg>
          </span>
          Add Question Type
        </button>

        {/* Totals */}
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: '#f9fafb',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '24px',
        }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#6b7280' }}>
            Total Questions: <strong style={{ color: '#111827' }}>{totalQuestions}</strong>
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#6b7280' }}>
            Total Marks: <strong style={{ color: '#111827' }}>{totalMarks}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
