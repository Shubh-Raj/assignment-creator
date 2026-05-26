import { Worker, Job } from 'bullmq';
import { Assignment } from '../models/Assignment';
import { buildPrompt } from '../services/promptBuilder';
import { generateQuestions } from '../services/llm';
import { broadcast } from '../ws/server';

interface AssignmentJobData {
  assignmentId: string;
}

const connection = {
  url: process.env.REDIS_URL,
};

async function processAssignment(job: Job<AssignmentJobData>) {
  const { assignmentId } = job.data;

  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) throw new Error(`Assignment not found: ${assignmentId}`);

  await Assignment.findByIdAndUpdate(assignmentId, { status: 'processing' });
  broadcast({ type: 'job:processing', assignmentId });

  const prompt = buildPrompt(assignment);
  const output = await generateQuestions(prompt);

  await Assignment.findByIdAndUpdate(assignmentId, {
    status: 'done',
    output,
  });

  broadcast({ type: 'job:done', assignmentId, output });
}

export function startWorker() {
  const worker = new Worker<AssignmentJobData>(
    'assignment-generation',
    processAssignment,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { connection: connection as any, concurrency: 3 }
  );

  worker.on('failed', async (job, err) => {
    if (!job) return;
    const { assignmentId } = job.data;
    await Assignment.findByIdAndUpdate(assignmentId, {
      status: 'failed',
      error: err.message,
    });
    broadcast({ type: 'job:failed', assignmentId, error: err.message });
    console.error(`Job ${job.id} failed:`, err.message);
  });

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
  });

  console.log('BullMQ worker started');
  return worker;
}
