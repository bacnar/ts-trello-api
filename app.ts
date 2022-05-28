import 'dotenv/config'
import express from 'express'
import routes from './routes/routes'
import morgan from 'morgan'
import { logger, stream } from './utils/logger'
import swaggerDefinition from './swagger/swagger-definition'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swStats from 'swagger-stats'
import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import redisClient from './utils/redisClient'

const swaggerJson = require('./swagger.json')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('short', { stream: stream }))

const options = {
  swaggerDefinition,
  apis: ['./routes/*.ts', './routes/**/*.ts']
}
app.use(swStats.getMiddleware({ swaggerSpec: swaggerJson }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)))

const limiter = rateLimit({
  windowMs: 10000, // 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'To many requests',
  store: new RedisStore({
    client: redisClient
  })
})

app.use('/1/', limiter, routes)

app.listen(process.env.SERVER_PORT)

logger.log('info', `api running on port ${process.env.SERVER_PORT}`)

export default app
