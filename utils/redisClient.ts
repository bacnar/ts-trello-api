import RedisClient from 'redis'
import { logger } from './logger'

const redisUrl: string = process.env.REDIS_CONNECTION || 'redis://127.0.0.1:6379'

const client = RedisClient.createClient({
  url: redisUrl
})

client.on('error', (err) => logger.error('Redis Client Error', err))

export default client
