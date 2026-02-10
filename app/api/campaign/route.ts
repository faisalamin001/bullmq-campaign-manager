import { NextResponse } from 'next/server'
import { QueueService } from '@/services/queue.service'
import { CampaignRequest } from '@/types/queue'

export async function POST(req: Request) {
  try {
    const { emails } = (await req.json()) as CampaignRequest

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json(
        { error: 'Invalid emails array' },
        { status: 400 },
      )
    }

    await QueueService.addEmailsToQueue(emails)

    return NextResponse.json({
      success: true,
      message: `Queued ${emails.length} emails.`,
    })
  } catch (error) {
    console.error('Error adding jobs to queue:', error)
    return NextResponse.json({ error: 'Failed to queue jobs' }, { status: 500 })
  }
}
