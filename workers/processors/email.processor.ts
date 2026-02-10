import { Job } from 'bullmq'

export async function processEmail(job: Job) {
  const { email } = job.data

  console.log(`[Job ${job.id}] Starting email process for ${email}`)

  // Simulate email processing with progress updates
  for (let i = 0; i <= 100; i += 25) {
    await job.updateProgress(i)
    // Add some jitter to make it look realistic
    const delay = 300 + Math.random() * 400
    await new Promise((resolve) => setTimeout(resolve, delay))
  }

  console.log(`[Job ${job.id}] Successfully sent email to ${email}`)
  return { sentAt: new Date().toISOString(), to: email }
}
