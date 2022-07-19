import { SuggestionDto } from './suggestion.dto'
import * as SuggestionModel from './suggestion.model'
class SuggestionDao {
  suggestionSchema = SuggestionModel.suggestionSchema
  suggestionModel = SuggestionModel.suggestionModel

  async searchSuggestion(
    body: SuggestionDto
  ): Promise<{ suggestions: SuggestionModel.SuggestionDocument[] }> {
    console.log('request body', body)

    const matchObj = { name: new RegExp('^' + body.q) }
    const pipeline = []

    if (body.latitude && body.longitude && body.radius) {
      pipeline.push({
        $geoNear: {
          near: [+body.longitude, +body.latitude],
          distanceField: 'distance',
          spherical: true,
          maxDistance: +body.radius * 1000,
          distanceMultiplier: 6378.1 // convert radians to kilometers
        }
      })
    }
    pipeline.push({ $match: matchObj })
    pipeline.push({
      $project: {
        name: 1,
        latitude: '$lat',
        longitude: '$long',
        distance: 1
      }
    })
    if (body.sort && ['name', 'distance'].includes(body.sort.toLowerCase())) {
      pipeline.push({ $sort: { [body.sort]: 1 } })
    }
    const suggs = await this.suggestionModel.aggregate(pipeline)
    return { suggestions: suggs }
  }
  async migrate() {
    await this.suggestionModel.aggregate([
      {
        $match: { location: { $exists: false } }
      },
      {
        $addFields: {
          location: { type: 'Point', coordinates: ['$long', '$lat'] }
        }
      },
      {
        $merge: { into: 'suggestions' }
      }
    ])
    return { ok: true }
  }
}

export default new SuggestionDao()
