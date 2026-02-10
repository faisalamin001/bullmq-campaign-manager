import { Queue } from 'bullmq'
import { redisConnection } from './redis'
import { QUEUE_NAMES } from '@/constants/queue'

export const emailQueue = new Queue(QUEUE_NAMES.EMAIL_CAMPAIGN, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: {
      count: 100, // Keep last 100 completed jobs
      age: 24 * 3600, // Keep for 24 hours
    },
    removeOnFail: {
      count: 500, // Keep last 500 failed jobs
    },
  },
})
