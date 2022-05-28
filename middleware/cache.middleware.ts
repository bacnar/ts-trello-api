import apicache from 'apicache'
import redisClient from '../utils/redisClient'

const cacheWithRedis = apicache.options(
  {
    redisClient: redisClient,
    statusCodes: { include: [200] }
  }).middleware

export default cacheWithRedis
