import winston from 'winston'

const level = process.env.LOG_LEVEL || 'debug'
const silent = process.env.NODE_ENV === 'test'

const loggerFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `{"level": "${level}", "timestamp": "${timestamp}", "message": "${message}"}`
})

const logger = winston.createLogger({
  level,
  format: winston.format.combine(
    winston.format.timestamp(),
    loggerFormat
  ),
  transports: [
    new winston.transports.Console()
  ],
  exitOnError: false,
  silent
})

const stream = {
  write: (message: string) => {
    logger.info(message.trim())
  }
}

export {
  logger,
  stream
}
