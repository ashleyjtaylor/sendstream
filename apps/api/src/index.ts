import app from './app.js'

import { logger } from '@/utils/logger.js'

const port = process.env.PORT ?? 3000

const server = app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`)
})

let shuttingDown = false

const shutdown = (signal: string) => {
  if (shuttingDown) return
  shuttingDown = true

  logger.info(`${signal} received. Closing HTTP server...`)

  server.close(() => {
    logger.info('HTTP server closed.')
    process.exit(0)
  })

  setTimeout(() => {
    logger.error('Force exiting after 10s timeout')
    process.exit(1)
  }, 10_000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

process.on('unhandledRejection', err => {
  logger.error({ err }, 'Unhandled Rejection')
  shutdown('unhandledRejection')
})

process.on('uncaughtException', err => {
  logger.error({ err }, 'Uncaught Exception')
  shutdown('uncaughtException')
})
