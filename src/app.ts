import express from 'express'

import * as winston from 'winston'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import * as expressWinston from 'express-winston'
import cors from 'cors'
import helmet from 'helmet'
import debug from 'debug'

import { initRoutes } from './modules/index'

import * as dotenv from 'dotenv'

const app: express.Application = express()

const setupApp = () => {
  const port: number = parseInt(process.env.app_port) || 3000
  const debugLog: debug.IDebugger = debug('app')

  dotenv.config()

  debugLog('process.env.app_port**', port)

  // here we are adding middleware to allow cross-origin requests
  app.use(cors())
  app.use(helmet())

  // Limit a connection to 1000 requests per minute
  const limiter = rateLimit({
    max: 5,
    windowMs: 60 * 1000,
    message: 'Too many requests from this IP.\n Please try again in an minute.'
  })
  app.use('/api', limiter)

  // Body parser, reads data from body into req.body
  app.use(express.json({ limit: '10kb' }))
  app.use(cookieParser())

  app.use(compression())
  app.use(express.urlencoded({ extended: false }))
  app.use(compression())

  // here we are preparing the expressWinston logging middleware configuration,
  // which will automatically log all HTTP requests handled by Express.js
  const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
    )
  }

  if (!process.env.DEBUG) {
    loggerOptions.meta = false // when not debugging, log requests as one-liners
  }

  // initialize the logger with the above configuration
  app.use(expressWinston.logger(loggerOptions))

  // here we are adding the SuggestionRoutes to our array,
  // after sending the Express.js application object to have the routes added to our app!
  //initRoutes(app,routes);
  initRoutes(app)

  // this is a simple route to make sure everything is working properly
  const runningMessage = `Server running at http://localhost:${port}`
  app.get('/', (_req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
  })

  app.listen(port, () => {
    console.log(`app started at http://localhost:${port}`)
    app.emit('app_started')
  })
}

setupApp()

export default app
