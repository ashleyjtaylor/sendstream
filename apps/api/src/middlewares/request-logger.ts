import { randomUUID } from 'crypto'
import { Request, Response, NextFunction } from 'express'

import { logger } from '@/utils/logger.js'

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const reqId = typeof req.headers['x-request-id'] === 'string'
    ? req.headers['x-request-id']
    : randomUUID()

  req.id = reqId

  req.log = logger.child({
    reqId,
    path: req.path,
    method: req.method
  })

  res.setHeader('x-request-id', reqId)

  next()
}
