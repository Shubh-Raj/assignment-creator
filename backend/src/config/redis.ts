// BullMQ bundles its own ioredis — pass a plain connection options object
// to avoid type conflicts between the two ioredis copies.
export const redisConnection = {
  url: process.env.REDIS_URL!,
} as const;

export const REDIS_URL = process.env.REDIS_URL!;
