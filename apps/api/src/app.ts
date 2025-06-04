import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'

import { requestLogger } from '@/middlewares/request-logger.js'

const app = express()

app.set('trust proxy', true)

app.use(helmet())
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(requestLogger)

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'ok' })
})

app.get('/health', (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({ message: 'ok' })
})

app.all('*', (_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Error) {
    req.log?.error({ err }, 'Unhandled error')
  } else {
    req.log?.error({ err }, 'Unknown thrown value')
  }

  res.status(500).json({ error: 'Internal Server Error' })
})

export default app
