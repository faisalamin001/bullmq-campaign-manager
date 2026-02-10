'use server'

import { QueueService } from '@/services/queue.service'
import { QueueAction } from '@/types/queue'
import { revalidatePath } from 'next/cache'

export async function addCampaignAction(emails: string[]) {
  try {
    await QueueService.addEmailsToQueue(emails)
    // We don't strictly need revalidatePath for the client-side polling dashboard,
    // but it's good practice for Server Components.
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error in addCampaignAction:', error)
    return { success: false, error: 'Failed to add campaign' }
  }
}

export async function performQueueAction(action: QueueAction) {
  try {
    switch (action) {
      case 'pause':
        await QueueService.pauseQueue()
        break
      case 'resume':
        await QueueService.resumeQueue()
        break
      case 'clear':
        await QueueService.clearQueue()
        break
      default:
        throw new Error('Invalid action')
    }
    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    console.error('Error in performQueueAction:', error)
    return { success: false, error: error.message }
  }
}
