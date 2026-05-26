import { Queue } from 'bullmq';

const connection = {
  url: process.env.REDIS_URL,
};

export const assignmentQueue = new Queue('assignment-generation', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connection: connection as any,
  defaultJobOptions: {
    attempts: 2,
    backoff: { type: 'exponential', delay: 3000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  },
});
