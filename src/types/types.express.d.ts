import { SuggestionDocument } from '../modules/suggestion/models/SuggestionModel'

declare global {
  namespace Express {
    export interface Request {
      suggestion?: SuggestionDocument
    }

    export interface Request {
      suggestion?: SuggestionDocument
    }
  }
}
