import { Worker } from 'bullmq'
import * as dotenv from 'dotenv'
import IORedis from 'ioredis'
import { processEmail } from './processors/email.processor'

dotenv.config()

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'

const connection = new IORedis(REDIS_URL, {
  maxRetriesPerRequest: null,
})

const worker = new Worker(
  'email-campaign',
  async (job) => {
    return await processEmail(job)
  },
  {
    connection,
    concurrency: 5, // Process 5 emails at a time
  },
)

worker.on('completed', (job) => {
  console.log(`Job ${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  console.log(`Job ${job?.id} has failed with ${err.message}`)
})

console.log('🚀 Email Worker is running and listening for jobs...')
