import IORedis from 'ioredis'
import { REDIS_CONFIG } from '@/constants/queue'

export const redisConnection = new IORedis(REDIS_CONFIG.URL, {
  maxRetriesPerRequest: null,
})

redisConnection.on('error', (err) => {
  console.error('Redis connection error:', err)
})

redisConnection.on('connect', () => {
  console.log('Redis connected')
})
