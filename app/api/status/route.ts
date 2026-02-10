import { NextResponse } from 'next/server'
import { QueueService } from '@/services/queue.service'

export async function GET() {
  try {
    const status = await QueueService.getQueueStatus()
    return NextResponse.json(status)
  } catch (error) {
    console.error('Error fetching queue status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { status: 500 },
    )
  }
}
