const BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export interface Assignment {
  _id: string;
  title: string;
  dueDate: string;
  subject: string;
  className: string;
  status: 'pending' | 'queued' | 'processing' | 'done' | 'failed';
  createdAt: string;
  output?: AssignmentOutput;
  error?: string;
  questionTypes: Array<{ type: string; count: number; marksEach: number }>;
  additionalInstructions?: string;
}

export interface AssignmentOutput {
  schoolName: string;
  subject: string;
  className: string;
  timeAllowed: string;
  totalMarks: number;
  sections: Section[];
}

export interface Section {
  title: string;
  instruction: string;
  questions: Question[];
}

export interface Question {
  number: number;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
}

export async function fetchAssignments(): Promise<Assignment[]> {
  const res = await fetch(`${BASE}/api/assignments`);
  if (!res.ok) throw new Error('Failed to fetch assignments');
  const data = await res.json();
  return data.assignments;
}

export async function fetchAssignment(id: string): Promise<Assignment> {
  const res = await fetch(`${BASE}/api/assignments/${id}`);
  if (!res.ok) throw new Error('Assignment not found');
  const data = await res.json();
  return data.assignment;
}

export async function createAssignment(formData: FormData): Promise<Assignment> {
  const res = await fetch(`${BASE}/api/assignments`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create assignment');
  }
  const data = await res.json();
  return data.assignment;
}

export async function deleteAssignment(id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/assignments/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete assignment');
}

export async function regenerateAssignment(id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/assignments/${id}/regenerate`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to regenerate');
}

export function getPdfUrl(id: string): string {
  return `${BASE}/api/assignments/${id}/pdf`;
}
