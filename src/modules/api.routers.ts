import { Router, Application } from 'express'
import { error500 } from '../common/errorHandler'

export const apiRouter = (app: Application) => {
  const routers: Router = Router()
  routers.use(error500)
  return routers
}
