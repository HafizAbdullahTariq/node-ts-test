// import { ResponseInterface } from '../../common/interfaces/ResponseInterface'
import { SuggestionDocument } from './suggestion.model'
import suggestionDao from './suggestion.dao'
import { SuggestionDto } from './suggestion.dto'
class SuggestionService {
  async searchSuggestion(
    body: SuggestionDto
  ): Promise<{ suggestions: SuggestionDocument[] }> {
    return suggestionDao.searchSuggestion(body)
  }
  async migrate() {
    return suggestionDao.migrate()
  }
}

export default new SuggestionService()
