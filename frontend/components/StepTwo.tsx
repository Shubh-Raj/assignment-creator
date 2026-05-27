'use client';

import { useFormStore } from '@/store/formStore';

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

export default function StepTwo() {
  const { form, updateForm } = useFormStore();
  const totalQ = form.questionTypes.reduce((s, qt) => s + qt.count, 0);
  const totalM = form.questionTypes.reduce((s, qt) => s + qt.count * qt.marksEach, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Subject */}
      <div>
        <label htmlFor="subject" style={labelStyle}>
          Subject <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id="subject"
          type="text"
          value={form.subject}
          onChange={(e) => updateForm({ subject: e.target.value })}
          placeholder="e.g. Science, Mathematics, English"
          style={inputStyle}
          onFocus={(e) => { e.target.style.border = '1px solid #374151'; e.target.style.boxShadow = '0 0 0 3px rgba(17,24,39,0.08)'; }}
          onBlur={(e) => { e.target.style.border = '1px solid #e5e7eb'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Class */}
      <div>
        <label htmlFor="className" style={labelStyle}>
          Class / Grade <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id="className"
          type="text"
          value={form.className}
          onChange={(e) => updateForm({ className: e.target.value })}
          placeholder="e.g. Class 8, Grade 10, 5th Standard"
          style={inputStyle}
          onFocus={(e) => { e.target.style.border = '1px solid #374151'; e.target.style.boxShadow = '0 0 0 3px rgba(17,24,39,0.08)'; }}
          onBlur={(e) => { e.target.style.border = '1px solid #e5e7eb'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      {/* Additional instructions */}
      <div>
        <label htmlFor="instructions" style={labelStyle}>
          Additional Instructions{' '}
          <span style={{ fontWeight: 400, color: '#9ca3af' }}>(for better output)</span>
        </label>
        <textarea
          id="instructions"
          value={form.additionalInstructions}
          onChange={(e) => updateForm({ additionalInstructions: e.target.value })}
          placeholder="e.g. Generate a 45-minute exam paper. Include NCERT chapters 1-5. Focus on application-based questions."
          rows={5}
          style={{
            ...inputStyle,
            resize: 'vertical',
            border: '2px dashed #e5e7eb',
            borderRadius: '12px',
            padding: '14px',
            lineHeight: '1.6',
          }}
          onFocus={(e) => { e.target.style.border = '2px dashed #9ca3af'; }}
          onBlur={(e) => { e.target.style.border = '2px dashed #e5e7eb'; }}
        />
      </div>

      {/* Summary */}
      <div style={{
        background: '#f9fafb',
        borderRadius: '12px',
        padding: '18px 20px',
        border: '1px solid #f1f5f9',
      }}>
        <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '13px', color: '#374151', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Assignment Summary
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { label: 'Title', value: form.title || '—' },
            { label: 'Due Date', value: form.dueDate || '—' },
            { label: 'Total Questions', value: String(totalQ) },
            { label: 'Total Marks', value: String(totalM) },
            ...(form.file ? [{ label: 'Reference File', value: form.file.name }] : []),
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#6b7280' }}>{label}</span>
              <span style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13.5px', fontWeight: 600, color: '#111827',
                maxWidth: '60%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
              }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
