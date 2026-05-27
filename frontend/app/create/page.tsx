'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import StepOne from '@/components/StepOne';
import StepTwo from '@/components/StepTwo';
import { useFormStore } from '@/store/formStore';
import { createAssignment } from '@/lib/api';

export default function CreatePage() {
  const router = useRouter();
  const { step, setStep, form, reset } = useFormStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function validateStep1() {
    if (!form.title.trim()) return 'Assignment title is required.';
    if (!form.dueDate) return 'Due date is required.';
    if (form.questionTypes.length === 0) return 'Add at least one question type.';
    for (const qt of form.questionTypes) {
      if (!qt.type) return 'All question types must be selected.';
      if (qt.count < 1) return 'Number of questions must be at least 1.';
      if (qt.marksEach < 1) return 'Marks per question must be at least 1.';
    }
    return '';
  }

  function validateStep2() {
    if (!form.subject.trim()) return 'Subject is required.';
    if (!form.className.trim()) return 'Class/Grade is required.';
    return '';
  }

  function handleNext() {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError('');
    setStep(2);
  }

  async function handleSubmit() {
    const err = validateStep2();
    if (err) { setError(err); return; }
    setError('');
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('dueDate', form.dueDate);
      fd.append('subject', form.subject);
      fd.append('className', form.className);
      fd.append('questionTypes', JSON.stringify(
        form.questionTypes.map(({ type, count, marksEach }) => ({ type, count, marksEach }))
      ));
      fd.append('additionalInstructions', form.additionalInstructions);
      if (form.file) fd.append('file', form.file);
      const assignment = await createAssignment(fd);
      reset();
      router.push(`/assignments/${assignment._id}`);
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Create Assignment" showBack onBack={() => (step === 2 ? setStep(1) : router.push('/'))} />

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%', paddingBottom: '100px' }}>

          {/* Step indicator */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 0 3px rgba(74,222,128,0.2)',
              }}/>
              <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '22px', color: '#111827', margin: 0 }}>
                Create Assignment
              </h1>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#6b7280', paddingLeft: '20px', margin: 0 }}>
              Set up a new assignment for your students
            </p>

            {/* Progress pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '20px' }}>
              <div style={{ height: '4px', width: '80px', borderRadius: '999px', background: '#18181b' }}/>
              <div style={{ height: '4px', width: '80px', borderRadius: '999px', background: step >= 2 ? '#18181b' : '#e5e7eb' }}/>
            </div>
            <p style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
              Step {step} of 2 — {step === 1 ? 'Assignment Details' : 'AI Configuration'}
            </p>
          </div>

          {/* Form card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '36px 40px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9',
          }}>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px', color: '#111827', margin: '0 0 4px' }}>
                {step === 1 ? 'Assignment Details' : 'AI Configuration'}
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#6b7280', margin: 0 }}>
                {step === 1 ? 'Basic information and question structure' : 'Subject details and additional context for the AI'}
              </p>
            </div>

            {step === 1 ? <StepOne /> : <StepTwo />}
          </div>

          {error && (
            <p style={{
              marginTop: '16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13.5px',
              color: '#ef4444',
              fontWeight: 500,
              textAlign: 'center',
            }}>
              {error}
            </p>
          )}
        </div>
      </div>

      {/* Sticky action bar at bottom */}
      <div style={{
        flexShrink: 0,
        borderTop: '1px solid #f1f5f9',
        background: '#eeeeee',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '720px',
        width: '100%',
        alignSelf: 'center',
      }}>
        <button
          id="btn-cancel"
          onClick={() => (step === 1 ? router.push('/') : setStep(1))}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '11px 24px',
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '999px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            color: '#374151',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>
          </svg>
          {step === 1 ? 'Cancel' : 'Previous'}
        </button>

        {step === 1 ? (
          <button
            id="btn-next"
            onClick={handleNext}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '11px 28px',
              background: '#18181b',
              border: 'none',
              borderRadius: '999px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: '#ffffff',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}
          >
            Next
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        ) : (
          <button
            id="btn-generate"
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '11px 28px',
              background: submitting ? '#6b7280' : '#18181b',
              border: 'none',
              borderRadius: '999px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: '#ffffff',
              cursor: submitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}
          >
            {submitting ? (
              <>
                <svg style={{ animation: 'spin 1s linear infinite', width: 16, height: 16 }} fill="none" viewBox="0 0 24 24">
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                  <path style={{ opacity: 0.75 }} fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Generating…
              </>
            ) : (
              <>
                Generate Paper
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 3l2.09 6.26L20 12l-5.91 2.74L12 21l-2.09-6.26L4 12l5.91-2.74L12 3z"/>
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
