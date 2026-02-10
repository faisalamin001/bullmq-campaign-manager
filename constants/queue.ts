export const QUEUE_NAMES = {
  EMAIL_CAMPAIGN: 'email-campaign',
} as const

export const JOB_NAMES = {
  SEND_EMAIL: 'send-email',
} as const

export const REDIS_CONFIG = {
  URL: process.env.REDIS_URL || 'redis://localhost:6379',
} as const
