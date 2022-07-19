/**
 * Auther : Ronak Amlani
 */
import express from 'express'
import { CommonRoutesConfig } from '../../common/common.routes.config'
import bodyValidationMiddleware from '../../common/middlewares/body.validation.middleware'
import suggestionController from './suggestion.controller'
import suggestionValidationRule from './suggestion.validation'

/**
 * % Access at :/api/suggestion
 * ? Class Responsibility :
 *  1. Validate the suggestion input
 *  2. Pass the input to the controller.
 */
export class SuggestionRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'suggestionRoutes')
  }

  // (we'll add the actual route configuration here next)
  configureRoutes() {
    const suggestionRouter: express.IRouter = express.Router()

    //Suggestion
    suggestionRouter.get(
      '/',
      suggestionValidationRule,
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      suggestionController.suggestion
    )
    suggestionRouter.get(
      '/migrate',
      suggestionController.migrate
    )

    //Map with the main app.

    return suggestionRouter
  }
}
