export type JobStatus =
  | 'active'
  | 'waiting'
  | 'completed'
  | 'failed'
  | 'delayed'
  | 'paused'

export interface JobData {
  email: string
}

export interface Job {
  id: string
  name: string
  data: JobData
  status: JobStatus
  progress: number
}

export interface QueueStatus {
  active: number
  waiting: number
  completed: number
  failed: number
  jobs: Job[]
}

export interface CampaignRequest {
  emails: string[]
}

export type QueueAction = 'pause' | 'resume' | 'clear'
