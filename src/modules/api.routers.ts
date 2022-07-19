import { Router, Application } from 'express'
import { SuggestionRoutes } from './suggestion/suggestion.routes'
import { error500 } from '../common/errorHandler'

export const apiRouter = (app: Application) => {
  const routers: Router = Router()
  routers.use('/suggestion', new SuggestionRoutes(app).configureRoutes())
  routers.use(error500)
  return routers
}
