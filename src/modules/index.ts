import { Application } from 'express'
import { apiRouter } from './api.routers'

export const initRoutes = (app: Application) => {
  app.use('/api', apiRouter(app))
}
