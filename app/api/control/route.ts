import { NextResponse } from 'next/server'
import { QueueService } from '@/services/queue.service'
import { QueueAction } from '@/types/queue'

export async function POST(req: Request) {
  try {
    const { action } = (await req.json()) as { action: QueueAction }

    switch (action) {
      case 'pause':
        await QueueService.pauseQueue()
        return NextResponse.json({ message: 'Queue paused' })
      case 'resume':
        await QueueService.resumeQueue()
        return NextResponse.json({ message: 'Queue resumed' })
      case 'clear':
        await QueueService.clearQueue()
        return NextResponse.json({ message: 'Queue cleared' })
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Control error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
