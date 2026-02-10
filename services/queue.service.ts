import { emailQueue } from '@/lib/queue'
import { JOB_NAMES } from '@/constants/queue'
import { Job, JobStatus, QueueStatus } from '@/types/queue'

export class QueueService {
  static async addEmailsToQueue(emails: string[]) {
    const jobs = emails.map((email) => ({
      name: JOB_NAMES.SEND_EMAIL,
      data: { email },
    }))

    return await emailQueue.addBulk(jobs)
  }

  static async getQueueStatus(): Promise<QueueStatus> {
    const states: JobStatus[] = ['active', 'waiting', 'completed', 'failed']

    const [jobs, counts] = await Promise.all([
      emailQueue.getJobs(states),
      emailQueue.getJobCounts('active', 'waiting', 'completed', 'failed'),
    ])

    console.log('Queue Counts:', counts)

    const jobData = await Promise.all(
      jobs.map(async (job) => {
        const state = (await job.getState()) as JobStatus
        return {
          id: job.id!,
          name: job.name,
          data: job.data,
          status: state,
          progress: Number(job.progress) || 0,
        }
      }),
    )

    return {
      active: counts.active || 0,
      waiting: counts.waiting || 0,
      completed: counts.completed || 0,
      failed: counts.failed || 0,
      jobs: jobData as Job[],
    }
  }

  static async pauseQueue() {
    return await emailQueue.pause()
  }

  static async resumeQueue() {
    return await emailQueue.resume()
  }

  static async clearQueue() {
    await emailQueue.drain()
    await Promise.all([
      emailQueue.clean(0, 1000, 'completed'),
      emailQueue.clean(0, 1000, 'failed'),
    ])
  }
}
