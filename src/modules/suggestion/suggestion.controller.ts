import express from 'express'
import suggestionService from './suggestion.service'

/**
 * ? We will perform suggestion create, password change, profile edit kind of operations over here.
 */
class SuggestionsController {
  //Create a new suggestion
  async suggestion(req: express.Request, res: express.Response) {
    return res
      .status(200)
      .json(await suggestionService.searchSuggestion(req.query as any))
  }
  async migrate(_: express.Request, res: express.Response) {
    return res.status(200).json(await suggestionService.migrate())
  }
}

export default new SuggestionsController()
